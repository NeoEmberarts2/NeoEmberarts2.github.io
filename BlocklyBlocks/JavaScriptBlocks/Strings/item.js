Blockly.Blocks['item'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Item");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(210);
        this.setTooltip("join strings together");
        this.setHelpUrl("");
    }
};


Blockly.JavaScript['item'] = function (block) {
    // TODO: Assemble JavaScript into code variable.

    return "";
};