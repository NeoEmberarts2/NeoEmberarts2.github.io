Blockly.Blocks['toNum'] = {
    init: function () {
        this.appendValueInput("Num")
            .setCheck(null)
            .appendField("convert");
        this.appendDummyInput()
            .appendField("to a number");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(65);
        this.setTooltip("Will try to convert a string into a number if it is able to");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['toNum'] = function (block) {
    var value_num = Blockly.JavaScript.valueToCode(block, 'Num', Blockly.JavaScript.ORDER_ATOMIC);

    var code = "Number(" + value_num + ")";

    return [code, Blockly.JavaScript.ORDER_NONE];
};