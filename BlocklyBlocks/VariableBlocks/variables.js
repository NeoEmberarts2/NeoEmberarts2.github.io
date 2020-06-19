Blockly.Blocks['variables'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("variable")
            .appendField(new Blockly.FieldTextInput("var"), "varName")
            .appendField("=");
        this.appendValueInput("data")
            .setCheck(null);
        this.setInputsInline(true);
        this.setPreviousStatement(true, ["Boolean", "Number", "String", "Array"]);
        this.setNextStatement(true, ["Boolean", "Number", "String", "Array"]);
        this.setColour(330);
        this.setTooltip("Creates a variable that is stored for the lifetime of the bot");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['variables'] = function (block) {
    var text_varname = block.getFieldValue('varName');
    var value_data = Blockly.JavaScript.valueToCode(block, 'data', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = "var " + text_varname + " = " + value_data + ";";
    return code;
};