Blockly.Blocks['append_string'] = {
    init: function () {
        this.appendValueInput("append")
            .setCheck("String")
            .appendField("to")
            .appendField(new Blockly.FieldVariable("item"), "var")
            .appendField("add text");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(135);
        this.setTooltip("Will append a value to an initilized variable.");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['append_string'] = function (block) {
    var variable_name = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('var'), Blockly.Variables.NAME_TYPE);
    var value_append = Blockly.JavaScript.valueToCode(block, 'append', Blockly.JavaScript.ORDER_ATOMIC);

    var code = variable_name + "+=" + value_append;

    return code;
};