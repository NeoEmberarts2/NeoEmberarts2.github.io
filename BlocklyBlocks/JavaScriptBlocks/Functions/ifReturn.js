Blockly.Blocks['ifReturn'] = {
    /**
     * Block for conditionally returning a value from a procedure.
     * @this {Blockly.Block}
     */
    init: function () {
        this.appendValueInput('CONDITION')
            .setCheck('Boolean')
            .appendField(Blockly.Msg['CONTROLS_IF_MSG_IF']);
        this.appendValueInput('VALUE')
            .appendField(Blockly.Msg['PROCEDURES_DEFRETURN_RETURN']);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setStyle('procedure_blocks');
        this.setTooltip(Blockly.Msg['PROCEDURES_IFRETURN_TOOLTIP']);
        this.setHelpUrl(Blockly.Msg['PROCEDURES_IFRETURN_HELPURL']);
        this.hasReturnValue_ = true;
    },
    /**
     * Create XML to represent whether this block has a return value.
     * @return {!Element} XML storage element.
     * @this {Blockly.Block}
     */
    mutationToDom: function () {
        var container = Blockly.utils.xml.createElement('mutation');
        container.setAttribute('value', Number(this.hasReturnValue_));
        return container;
    },
    /**
     * Parse XML to restore whether this block has a return value.
     * @param {!Element} xmlElement XML storage element.
     * @this {Blockly.Block}
     */
    domToMutation: function (xmlElement) {
        var value = xmlElement.getAttribute('value');
        this.hasReturnValue_ = (value == 1);
        if (!this.hasReturnValue_) {
            this.removeInput('VALUE');
            this.appendDummyInput('VALUE')
                .appendField(Blockly.Msg['PROCEDURES_DEFRETURN_RETURN']);
        }
    },
    /**
     * Called whenever anything on the workspace changes.
     * Add warning if this flow block is not nested inside a loop.
     * @param {!Blockly.Events.Abstract} _e Change event.
     * @this {Blockly.Block}
     */
    onchange: function (_e) {
        if (!this.workspace.isDragging || this.workspace.isDragging()) {
            return;  // Don't change state at the start of a drag.
        }
        var legal = false;
        // Is the block nested in a procedure?
        var block = this;
        do {
            if (this.FUNCTION_TYPES.indexOf(block.type) != -1) {
                legal = true;
                break;
            }
            block = block.getSurroundParent();
        } while (block);
        if (legal) {
            // If needed, toggle whether this block has a return value.
            if (block.type == 'procedures_defnoreturn' && this.hasReturnValue_) {
                this.removeInput('VALUE');
                this.appendDummyInput('VALUE')
                    .appendField(Blockly.Msg['PROCEDURES_DEFRETURN_RETURN']);
                this.hasReturnValue_ = false;
            } else if (block.type == 'procedures_defreturn' &&
                !this.hasReturnValue_) {
                this.removeInput('VALUE');
                this.appendValueInput('VALUE')
                    .appendField(Blockly.Msg['PROCEDURES_DEFRETURN_RETURN']);
                this.hasReturnValue_ = true;
            }
            this.setWarningText(null);
            if (!this.isInFlyout) {
                this.setEnabled(true);
            }
        } else {
            this.setWarningText(Blockly.Msg['PROCEDURES_IFRETURN_WARNING']);
            if (!this.isInFlyout && !this.getInheritedDisabled()) {
                this.setEnabled(false);
            }
        }
    },
    /**
     * List of block types that are functions and thus do not need warnings.
     * To add a new function type add this to your code:
     * Blockly.Blocks['procedures_ifreturn'].FUNCTION_TYPES.push('custom_func');
     */
    FUNCTION_TYPES: ['createReturnFunc', 'createVoidFunc']
};

Blockly.JavaScript['ifReturn'] = function (block) {
    // Conditionally return value from a procedure.
    var condition = Blockly.JavaScript.valueToCode(block, 'CONDITION',
        Blockly.JavaScript.ORDER_NONE) || 'false';
    var code = 'if (' + condition + ') {\n';
    if (Blockly.JavaScript.STATEMENT_SUFFIX) {
        // Inject any statement suffix here since the regular one at the end
        // will not get executed if the return is triggered.
        code += Blockly.JavaScript.prefixLines(
            Blockly.JavaScript.injectId(Blockly.JavaScript.STATEMENT_SUFFIX, block),
            Blockly.JavaScript.INDENT);
    }
    if (block.hasReturnValue_) {
        var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
            Blockly.JavaScript.ORDER_NONE) || 'null';
        code += Blockly.JavaScript.INDENT + 'return ' + value + ';\n';
    } else {
        code += Blockly.JavaScript.INDENT + 'return;\n';
    }
    code += '}\n';
    return code;
};

