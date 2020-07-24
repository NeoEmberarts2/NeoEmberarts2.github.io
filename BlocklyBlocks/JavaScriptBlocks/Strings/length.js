Blockly.Blocks['length'] = {
    init: function () {
        this.appendValueInput("length")
            .setCheck("String")
            .appendField("get length of");
        this.setOutput(true, null);
        this.setColour(120);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['length'] = function (block) {
    var value_length = Blockly.JavaScript.valueToCode(block, 'length', Blockly.JavaScript.ORDER_ATOMIC);

    var code = (value_length ? value_length : '""') + ".length";

    return [code, Blockly.JavaScript.ORDER_NONE];
};