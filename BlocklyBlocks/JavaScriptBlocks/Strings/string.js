Blockly.Blocks['string'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("String"), "String");
        this.setOutput(true, "String");
        this.setColour(290);
        this.setTooltip("Input text");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['string'] = function (block) {
    var text_string = block.getFieldValue('String');
    var code = "\"" + text_string + "\"";

    return [code, Blockly.JavaScript.ORDER_NONE];
};