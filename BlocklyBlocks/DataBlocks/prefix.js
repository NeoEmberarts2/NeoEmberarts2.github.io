Blockly.Blocks['prefix'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Get prefix");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(290);
        this.setTooltip("Gets the current prefix");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['prefix'] = function (block) {
    // TODO: Assemble JavaScript into code variable.
    var code = "prefix";
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
};