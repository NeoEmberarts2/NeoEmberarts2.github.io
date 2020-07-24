Blockly.Blocks['listLength'] = {
    init: function () {
        this.appendValueInput("length")
            .setCheck(["String", "Array"])
            .appendField("length of");
        this.setOutput(true, null);
        this.setColour(270);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['listLength'] = function (block) {
    var value_length = Blockly.JavaScript.valueToCode(block, 'length', Blockly.JavaScript.ORDER_ATOMIC) || '[]';
    // TODO: Assemble JavaScript into code variable.
    var code = value_length + ".length";
    return [code, Blockly.JavaScript.ORDER_NONE];
};