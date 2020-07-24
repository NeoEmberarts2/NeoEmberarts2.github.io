Blockly.Blocks['callReturn'] = {
    /**
     * Block for calling a procedure with a return value.
     * @this {Blockly.Block}
     */
    init: function () {
        this.appendDummyInput('TOPROW')
            .appendField('', 'NAME');
        this.setOutput(true);
        this.setStyle('procedure_blocks');
        // Tooltip is set in domToMutation.
        this.setHelpUrl(Blockly.Msg['PROCEDURES_CALLRETURN_HELPURL']);
        this.arguments_ = [];
        this.quarkConnections_ = {};
        this.quarkIds_ = null;
        this.previousEnabledState_ = true;
    },

    getProcedureCall: Blockly.Blocks['callVoid'].getProcedureCall,
    renameProcedure: Blockly.Blocks['callVoid'].renameProcedure,
    setProcedureParameters_:
        Blockly.Blocks['callVoid'].setProcedureParameters_,
    updateShape_: Blockly.Blocks['callVoid'].updateShape_,
    mutationToDom: Blockly.Blocks['callVoid'].mutationToDom,
    domToMutation: Blockly.Blocks['callVoid'].domToMutation,
    getVars: Blockly.Blocks['callVoid'].getVars,
    getVarModels: Blockly.Blocks['callVoid'].getVarModels,
    onchange: Blockly.Blocks['callVoid'].onchange,
    customContextMenu:
        Blockly.Blocks['callVoid'].customContextMenu,
    defType_: 'createReturnFunc'
};

Blockly.JavaScript['callReturn'] = function (block) {
    // Call a procedure with a return value.
    var funcName = Blockly.JavaScript.variableDB_.getName(
        block.getFieldValue('NAME'), Blockly.PROCEDURE_CATEGORY_NAME);
    var args = [];
    console.log(block);
    var variables = block.getVars || [];
    for (var i = 0; i < variables.length; i++) {
        args[i] = Blockly.JavaScript.valueToCode(block, 'ARG' + i,
            Blockly.JavaScript.ORDER_COMMA) || 'null';
    }
    var code = funcName + '(' + args.join(', ') + ')';
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};