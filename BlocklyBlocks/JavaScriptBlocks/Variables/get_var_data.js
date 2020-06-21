Blockly.Blocks['get_var_data'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("get data from variable")
            .appendField(new Blockly.FieldTextInput("var"), "varName");
        this.setOutput(true, null);
        this.setColour(330);
        this.setTooltip("gets the data that was stored inside a variable");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['get_var_data'] = function (block) {
    var text_varname = block.getFieldValue('varName');
    // TODO: Assemble JavaScript into code variable.
    var code = text_varname;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
};