Blockly.Blocks['random'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("random fraction");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(65);
        this.setTooltip("get a random number between 0 and 1");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['random'] = function (block) {

    var code = "Math.random()";

    return [code, Blockly.JavaScript.ORDER_NONE];
};