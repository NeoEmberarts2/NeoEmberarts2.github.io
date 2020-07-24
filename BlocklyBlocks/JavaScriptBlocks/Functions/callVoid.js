Blockly.Blocks['callVoid'] = {
    /**
     * Block for calling a procedure with no return value.
     * @this {Blockly.Block}
     */
    init: function () {
        this.appendDummyInput('TOPROW')
            .appendField(this.id, 'NAME');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setStyle('procedure_blocks');
        // Tooltip is set in renameProcedure.
        this.setHelpUrl(Blockly.Msg['PROCEDURES_CALLNORETURN_HELPURL']);
        this.arguments_ = [];
        this.argumentVarModels_ = [];
        this.quarkConnections_ = {};
        this.quarkIds_ = null;
        this.previousEnabledState_ = true;
    },

    /**
     * Returns the name of the procedure this block calls.
     * @return {string} Procedure name.
     * @this {Blockly.Block}
     */
    getProcedureCall: function () {
        // The NAME field is guaranteed to exist, null will never be returned.
        return /** @type {string} */ (this.getFieldValue('NAME'));
    },
    /**
     * Notification that a procedure is renaming.
     * If the name matches this block's procedure, rename it.
     * @param {string} oldName Previous name of procedure.
     * @param {string} newName Renamed procedure.
     * @this {Blockly.Block}
     */
    renameProcedure: function (oldName, newName) {
        if (Blockly.Names.equals(oldName, this.getProcedureCall())) {
            this.setFieldValue(newName, 'NAME');
            var baseMsg = this.outputConnection ?
                Blockly.Msg['PROCEDURES_CALLRETURN_TOOLTIP'] :
                Blockly.Msg['PROCEDURES_CALLNORETURN_TOOLTIP'];
            this.setTooltip(baseMsg.replace('%1', newName));
        }
    },
    /**
     * Notification that the procedure's parameters have changed.
     * @param {!Array.<string>} paramNames New param names, e.g. ['x', 'y', 'z'].
     * @param {!Array.<string>} paramIds IDs of params (consistent for each
     *     parameter through the life of a mutator, regardless of param renaming),
     *     e.g. ['piua', 'f8b_', 'oi.o'].
     * @private
     * @this {Blockly.Block}
     */
    setProcedureParameters_: function (paramNames, paramIds) {
        // Data structures:
        // this.arguments = ['x', 'y']
        //     Existing param names.
        // this.quarkConnections_ {piua: null, f8b_: Blockly.Connection}
        //     Look-up of paramIds to connections plugged into the call block.
        // this.quarkIds_ = ['piua', 'f8b_']
        //     Existing param IDs.
        // Note that quarkConnections_ may include IDs that no longer exist, but
        // which might reappear if a param is reattached in the mutator.
        var defBlock = Blockly.Procedures.getDefinition(this.getProcedureCall(),
            this.workspace);
        var mutatorOpen = defBlock && defBlock.mutator &&
            defBlock.mutator.isVisible();
        if (!mutatorOpen) {
            this.quarkConnections_ = {};
            this.quarkIds_ = null;
        }
        if (!paramIds) {
            // Reset the quarks (a mutator is about to open).
            return;
        }
        // Test arguments (arrays of strings) for changes. '\n' is not a valid
        // argument name character, so it is a valid delimiter here.
        if (paramNames.join('\n') == this.arguments_.join('\n')) {
            // No change.
            this.quarkIds_ = paramIds;
            return;
        }
        if (paramIds.length != paramNames.length) {
            throw RangeError('paramNames and paramIds must be the same length.');
        }
        this.setCollapsed(false);
        if (!this.quarkIds_) {
            // Initialize tracking for this block.
            this.quarkConnections_ = {};
            this.quarkIds_ = [];
        }
        // Switch off rendering while the block is rebuilt.
        var savedRendered = this.rendered;
        this.rendered = false;
        // Update the quarkConnections_ with existing connections.
        for (var i = 0; i < this.arguments_.length; i++) {
            var input = this.getInput('ARG' + i);
            if (input) {
                var connection = input.connection.targetConnection;
                this.quarkConnections_[this.quarkIds_[i]] = connection;
                if (mutatorOpen && connection &&
                    paramIds.indexOf(this.quarkIds_[i]) == -1) {
                    // This connection should no longer be attached to this block.
                    connection.disconnect();
                    connection.getSourceBlock().bumpNeighbours();
                }
            }
        }
        // Rebuild the block's arguments.
        this.arguments_ = [].concat(paramNames);
        // And rebuild the argument model list.
        this.argumentVarModels_ = [];
        for (var i = 0; i < this.arguments_.length; i++) {
            var variable = Blockly.Variables.getOrCreateVariablePackage(
                this.workspace, null, this.arguments_[i], '');
            this.argumentVarModels_.push(variable);
        }

        this.updateShape_();
        this.quarkIds_ = paramIds;
        // Reconnect any child blocks.
        if (this.quarkIds_) {
            for (var i = 0; i < this.arguments_.length; i++) {
                var quarkId = this.quarkIds_[i];
                if (quarkId in this.quarkConnections_) {
                    var connection = this.quarkConnections_[quarkId];
                    if (!Blockly.Mutator.reconnect(connection, this, 'ARG' + i)) {
                        // Block no longer exists or has been attached elsewhere.
                        delete this.quarkConnections_[quarkId];
                    }
                }
            }
        }
        // Restore rendering and show the changes.
        this.rendered = savedRendered;
        if (this.rendered) {
            this.render();
        }
    },
    /**
     * Modify this block to have the correct number of arguments.
     * @private
     * @this {Blockly.Block}
     */
    updateShape_: function () {
        for (var i = 0; i < this.arguments_.length; i++) {
            var field = this.getField('ARGNAME' + i);
            if (field) {
                // Ensure argument name is up to date.
                // The argument name field is deterministic based on the mutation,
                // no need to fire a change event.
                Blockly.Events.disable();
                try {
                    field.setValue(this.arguments_[i]);
                } finally {
                    Blockly.Events.enable();
                }
            } else {
                // Add new input.
                field = new Blockly.FieldLabel(this.arguments_[i]);
                var input = this.appendValueInput('ARG' + i)
                    .setAlign(Blockly.ALIGN_RIGHT)
                    .appendField(field, 'ARGNAME' + i);
                input.init();
            }
        }
        // Remove deleted inputs.
        while (this.getInput('ARG' + i)) {
            this.removeInput('ARG' + i);
            i++;
        }
        // Add 'with:' if there are parameters, remove otherwise.
        var topRow = this.getInput('TOPROW');
        if (topRow) {
            if (this.arguments_.length) {
                if (!this.getField('WITH')) {
                    topRow.appendField(Blockly.Msg['PROCEDURES_CALL_BEFORE_PARAMS'], 'WITH');
                    topRow.init();
                }
            } else {
                if (this.getField('WITH')) {
                    topRow.removeField('WITH');
                }
            }
        }
    },
    /**
     * Create XML to represent the (non-editable) name and arguments.
     * @return {!Element} XML storage element.
     * @this {Blockly.Block}
     */
    mutationToDom: function () {
        var container = Blockly.utils.xml.createElement('mutation');
        container.setAttribute('name', this.getProcedureCall());
        for (var i = 0; i < this.arguments_.length; i++) {
            var parameter = Blockly.utils.xml.createElement('arg');
            parameter.setAttribute('name', this.arguments_[i]);
            container.appendChild(parameter);
        }
        return container;
    },
    /**
     * Parse XML to restore the (non-editable) name and parameters.
     * @param {!Element} xmlElement XML storage element.
     * @this {Blockly.Block}
     */
    domToMutation: function (xmlElement) {
        var name = xmlElement.getAttribute('name');
        this.renameProcedure(this.getProcedureCall(), name);
        var args = [];
        var paramIds = [];
        for (var i = 0, childNode; (childNode = xmlElement.childNodes[i]); i++) {
            if (childNode.nodeName.toLowerCase() == 'arg') {
                args.push(childNode.getAttribute('name'));
                paramIds.push(childNode.getAttribute('paramId'));
            }
        }
        this.setProcedureParameters_(args, paramIds);
    },
    /**
     * Return all variables referenced by this block.
     * @return {!Array.<string>} List of variable names.
     * @this {Blockly.Block}
     */
    getVars: function () {
        return this.arguments_;
    },
    /**
     * Return all variables referenced by this block.
     * @return {!Array.<!Blockly.VariableModel>} List of variable models.
     * @this {Blockly.Block}
     */
    getVarModels: function () {
        return this.argumentVarModels_;
    },
    /**
     * Procedure calls cannot exist without the corresponding procedure
     * definition.  Enforce this link whenever an event is fired.
     * @param {!Blockly.Events.Abstract} event Change event.
     * @this {Blockly.Block}
     */
    onchange: function (event) {
        if (!this.workspace || this.workspace.isFlyout) {
            // Block is deleted or is in a flyout.
            return;
        }
        if (!event.recordUndo) {
            // Events not generated by user. Skip handling.
            return;
        }
        if (event.type == Blockly.Events.BLOCK_CREATE &&
            event.ids.indexOf(this.id) != -1) {
            // Look for the case where a procedure call was created (usually through
            // paste) and there is no matching definition.  In this case, create
            // an empty definition block with the correct signature.
            var name = this.getProcedureCall();
            var def = Blockly.Procedures.getDefinition(name, this.workspace);
            if (def && (def.type != this.defType_ ||
                JSON.stringify(def.getVars()) != JSON.stringify(this.arguments_))) {
                // The signatures don't match.
                def = null;
            }
            if (!def) {
                Blockly.Events.setGroup(event.group);
                /**
                 * Create matching definition block.
                 * <xml xmlns="https://developers.google.com/blockly/xml">
                 *   <block type="procedures_defreturn" x="10" y="20">
                 *     <mutation name="test">
                 *       <arg name="x"></arg>
                 *     </mutation>
                 *     <field name="NAME">test</field>
                 *   </block>
                 * </xml>
                 */
                var xml = Blockly.utils.xml.createElement('xml');
                var block = Blockly.utils.xml.createElement('block');
                block.setAttribute('type', this.defType_);
                var xy = this.getRelativeToSurfaceXY();
                var x = xy.x + Blockly.SNAP_RADIUS * (this.RTL ? -1 : 1);
                var y = xy.y + Blockly.SNAP_RADIUS * 2;
                block.setAttribute('x', x);
                block.setAttribute('y', y);
                var mutation = this.mutationToDom();
                block.appendChild(mutation);
                var field = Blockly.utils.xml.createElement('field');
                field.setAttribute('name', 'NAME');
                field.appendChild(Blockly.utils.xml.createTextNode(
                    this.getProcedureCall()));
                block.appendChild(field);
                xml.appendChild(block);
                Blockly.Xml.domToWorkspace(xml, this.workspace);
                Blockly.Events.setGroup(false);
            }
        } else if (event.type == Blockly.Events.BLOCK_DELETE) {
            // Look for the case where a procedure definition has been deleted,
            // leaving this block (a procedure call) orphaned.  In this case, delete
            // the orphan.
            var name = this.getProcedureCall();
            var def = Blockly.Procedures.getDefinition(name, this.workspace);
            if (!def) {
                Blockly.Events.setGroup(event.group);
                this.dispose(true);
                Blockly.Events.setGroup(false);
            }
        } else if (event.type == Blockly.Events.CHANGE && event.element == 'disabled') {
            var name = this.getProcedureCall();
            var def = Blockly.Procedures.getDefinition(name, this.workspace);
            if (def && def.id == event.blockId) {
                // in most cases the old group should be ''
                var oldGroup = Blockly.Events.getGroup();
                if (oldGroup) {
                    // This should only be possible programmatically and may indicate a problem
                    // with event grouping. If you see this message please investigate. If the
                    // use ends up being valid we may need to reorder events in the undo stack.
                    console.log('Saw an existing group while responding to a definition change');
                }
                Blockly.Events.setGroup(event.group);
                if (event.newValue) {
                    this.previousEnabledState_ = this.isEnabled();
                    this.setEnabled(false);
                } else {
                    this.setEnabled(this.previousEnabledState_);
                }
                Blockly.Events.setGroup(oldGroup);
            }
        }
    },
    /**
     * Add menu option to find the definition block for this call.
     * @param {!Array} options List of menu options to add to.
     * @this {Blockly.Block}
     */
    customContextMenu: function (options) {
        if (!this.workspace.isMovable()) {
            // If we center on the block and the workspace isn't movable we could
            // loose blocks at the edges of the workspace.
            return;
        }

        var option = {enabled: true};
        option.text = Blockly.Msg['PROCEDURES_HIGHLIGHT_DEF'];
        var name = this.getProcedureCall();
        var workspace = this.workspace;
        option.callback = function () {
            var def = Blockly.Procedures.getDefinition(name, workspace);
            if (def) {
                workspace.centerOnBlock(def.id);
                def.select();
            }
        };
        options.push(option);
    },
    defType_: 'createVoidFunc'
};



Blockly.JavaScript['callVoid'] = function (block) {
    var tuple = Blockly.JavaScript['procedures_callreturn'](block);
    return tuple[0] + ';\n';
};