Blockly.Blocks['common_constants'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["π", "Math.PI"], ["e", "Math.E"], ["∞", "Infinity"], ["-∞", "-Infinity"]]), "equalValues");
        this.setInputsInline(false);
        this.setOutput(true, null);
        this.setColour(60);
        this.setTooltip("Returns one of these constant numbers");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['common_constants'] = function (block) {
    var dropdown_equalvalues = block.getFieldValue('equalValues');

    var code = "(" + dropdown_equalvalues + ")";

    return [code, Blockly.JavaScript.ORDER_NONE];
};