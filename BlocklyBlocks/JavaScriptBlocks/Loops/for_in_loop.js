Blockly.Blocks['for_in_loop'] = {
    init: function () {
        this.appendValueInput("NAME")
            .setCheck(["Array", "String"])
            .appendField("Starting at 0")
            .appendField(new Blockly.FieldVariable("i"), "variable")
            .appendField("to length of list:");
        this.appendStatementInput("code")
            .setCheck(null)
            .appendField("do");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(330);
        this.setTooltip("Starting at 0 and going up to the size of the list or string attached");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['for_in_loop'] = function (block) {
    var variable_variable = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('variable'), Blockly.Variables.NAME_TYPE);
    var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
    var statements_code = Blockly.JavaScript.statementToCode(block, 'code');

    var code = "for(" + variable_variable + " in " + (value_name ? value_name : "[]") + "){" + statements_code + " }";
    return code;
};