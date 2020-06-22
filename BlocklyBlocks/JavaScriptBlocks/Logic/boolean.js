Blockly.Blocks['boolean'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["true", "true"], ["false", "false"]]), "bool");
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("returns true or false");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['boolean'] = function (block) {
    var dropdown_bool = block.getFieldValue('bool');

    var code = dropdown_bool;

    return [code, Blockly.JavaScript.ORDER_NONE];
};