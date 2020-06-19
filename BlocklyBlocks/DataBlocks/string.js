Blockly.Blocks['string'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("String"), "String");
        this.setOutput(true, null);
        this.setColour(290);
        this.setTooltip("Input text");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['string'] = function (block) {
    var text_string = block.getFieldValue('String');
    // TODO: Assemble JavaScript into code variable.
    var code = "\"" + text_string + "\"";
    // TODO: Change ORDER_NONE to the correct strength.
    return [code.toLowerCase(), Blockly.JavaScript.ORDER_NONE];
};