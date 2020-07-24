Blockly.Blocks['createReturnFunc'] = {
    /**
     * Block for defining a procedure with a return value.
     * @this {Blockly.Block}
     */
    init: function () {
        var nameField = new Blockly.FieldTextInput('',
            Blockly.Procedures.rename);
        nameField.setSpellcheck(false);
        this.appendDummyInput()
            .appendField(Blockly.Msg['PROCEDURES_DEFRETURN_TITLE'])
            .appendField(nameField, 'NAME')
            .appendField('', 'PARAMS');
        this.appendValueInput('RETURN')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(Blockly.Msg['PROCEDURES_DEFRETURN_RETURN']);
        this.setMutator(new Blockly.Mutator(['procedures_mutatorarg']));
        if ((this.workspace.options.comments ||
            (this.workspace.options.parentWorkspace &&
                this.workspace.options.parentWorkspace.options.comments)) &&
            Blockly.Msg['PROCEDURES_DEFRETURN_COMMENT']) {
            this.setCommentText(Blockly.Msg['PROCEDURES_DEFRETURN_COMMENT']);
        }
        this.setStyle('procedure_blocks');
        this.setTooltip(Blockly.Msg['PROCEDURES_DEFRETURN_TOOLTIP']);
        this.setHelpUrl(Blockly.Msg['PROCEDURES_DEFRETURN_HELPURL']);
        this.arguments_ = [];
        this.argumentVarModels_ = [];
        this.setStatements_(true);
        this.statementConnection_ = null;
    },
    setStatements_: Blockly.Blocks['procedures_defnoreturn'].setStatements_,
    updateParams_: Blockly.Blocks['procedures_defnoreturn'].updateParams_,
    mutationToDom: Blockly.Blocks['procedures_defnoreturn'].mutationToDom,
    domToMutation: Blockly.Blocks['procedures_defnoreturn'].domToMutation,
    decompose: Blockly.Blocks['procedures_defnoreturn'].decompose,
    compose: Blockly.Blocks['procedures_defnoreturn'].compose,
    /**
     * Return the signature of this procedure definition.
     * @return {!Array} Tuple containing three elements:
     *     - the name of the defined procedure,
     *     - a list of all its arguments,
     *     - that it DOES have a return value.
     * @this {Blockly.Block}
     */
    getProcedureDef: function () {
        return [this.getFieldValue('NAME'), this.arguments_, true];
    },
    getVars: Blockly.Blocks['procedures_defnoreturn'].getVars,
    getVarModels: Blockly.Blocks['procedures_defnoreturn'].getVarModels,
    renameVarById: Blockly.Blocks['procedures_defnoreturn'].renameVarById,
    updateVarName: Blockly.Blocks['procedures_defnoreturn'].updateVarName,
    displayRenamedVar_: Blockly.Blocks['procedures_defnoreturn'].displayRenamedVar_,
    customContextMenu: Blockly.Blocks['procedures_defnoreturn'].customContextMenu,
    callType_: 'procedures_callreturn'
};


Blockly.JavaScript['createReturnFunc'] = function (block) {
    // Define a procedure with a return value.
    var funcName = Blockly.JavaScript.variableDB_.getName(
        block.getFieldValue('NAME'), Blockly.PROCEDURE_CATEGORY_NAME);
    var xfix1 = '';
    if (Blockly.JavaScript.STATEMENT_PREFIX) {
        xfix1 += Blockly.JavaScript.injectId(Blockly.JavaScript.STATEMENT_PREFIX,
            block);
    }
    if (Blockly.JavaScript.STATEMENT_SUFFIX) {
        xfix1 += Blockly.JavaScript.injectId(Blockly.JavaScript.STATEMENT_SUFFIX,
            block);
    }
    if (xfix1) {
        xfix1 = Blockly.JavaScript.prefixLines(xfix1, Blockly.JavaScript.INDENT);
    }
    var loopTrap = '';
    if (Blockly.JavaScript.INFINITE_LOOP_TRAP) {
        loopTrap = Blockly.JavaScript.prefixLines(
            Blockly.JavaScript.injectId(Blockly.JavaScript.INFINITE_LOOP_TRAP,
                block), Blockly.JavaScript.INDENT);
    }
    var branch = Blockly.JavaScript.statementToCode(block, 'STACK');
    var returnValue = Blockly.JavaScript.valueToCode(block, 'RETURN',
        Blockly.JavaScript.ORDER_NONE) || '';
    var xfix2 = '';
    if (branch && returnValue) {
        // After executing the function body, revisit this block for the return.
        xfix2 = xfix1;
    }
    if (returnValue) {
        returnValue = Blockly.JavaScript.INDENT + 'return ' + returnValue + ';\n';
    }
    var args = [];
    var variables = block.getVars();
    for (var i = 0; i < variables.length; i++) {
        args[i] = Blockly.JavaScript.variableDB_.getName(variables[i],
            Blockly.VARIABLE_CATEGORY_NAME);
    }
    var code = 'function ' + funcName + '(' + args.join(', ') + ') {\n' +
        xfix1 + loopTrap + branch + xfix2 + returnValue + '}';
    code = Blockly.JavaScript.scrub_(block, code);
    // Add % so as not to collide with helper functions in definitions list.
    Blockly.JavaScript.definitions_['%' + funcName] = code;
    return null;
};

