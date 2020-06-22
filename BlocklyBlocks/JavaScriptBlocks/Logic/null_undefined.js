Blockly.Blocks['null_undefined'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["null", "null"], ["undefined", "undefined"]]), "nulled");
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("returns an empty value");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['null_undefined'] = function (block) {
    var dropdown_nulled = block.getFieldValue('nulled');
    // TODO: Assemble JavaScript into code variable.
    var code = dropdown_nulled;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
};