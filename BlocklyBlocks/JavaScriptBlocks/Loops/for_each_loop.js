Blockly.Blocks['for_each_loop'] = {
    init: function () {
        this.appendValueInput("var")
            .setCheck(["Array", "String"])
            .appendField("for each item")
            .appendField(new Blockly.FieldVariable("i"), "variable")
            .appendField("in list");
        this.appendStatementInput("code")
            .setCheck(null)
            .appendField("do");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(330);
        this.setTooltip("With the variable 'i', starting at 'from' and go to 'to' and increment by 'value''");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['for_each_loop'] = function (block) {
    var variable_variable = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('variable'), Blockly.Variables.NAME_TYPE);
    var value_var = Blockly.JavaScript.valueToCode(block, 'var', Blockly.JavaScript.ORDER_ATOMIC);
    var statements_code = Blockly.JavaScript.statementToCode(block, 'code');

    var code = "for(" + variable_variable + " of " + (value_var ? value_var : "[]") + "){" + statements_code + " }";

    return code;
};