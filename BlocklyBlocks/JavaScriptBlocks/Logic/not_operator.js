Blockly.Blocks['not_operator'] = {
    init: function () {
        this.appendValueInput("not")
            .setCheck(null)
            .appendField("not");
        this.setOutput(true, "Boolean");
        this.setTooltip("negates a value");
        this.setHelpUrl("");
        this.setColour(230);

    }
};

Blockly.JavaScript['not_operator'] = function (block) {
    var value_not = Blockly.JavaScript.valueToCode(block, 'not', Blockly.JavaScript.ORDER_ATOMIC);

    var code = value_not ? "!" + value_not : "!true";

    return [code, Blockly.JavaScript.ORDER_NONE];
};