Blockly.Blocks['NaN'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Not a Number");
        this.setOutput(true, null);
        this.setColour(60);
        this.setTooltip("not a number");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['NaN'] = function (block) {

    var code = "NaN";

    return [code, Blockly.JavaScript.ORDER_NONE];
};