Blockly.Blocks['remainder_of'] = {
    init: function () {
        this.appendValueInput("num1")
            .setCheck("Number")
            .appendField("remainder of");
        this.appendValueInput("num2")
            .setCheck("Number")
            .appendField("÷");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(60);
        this.setTooltip("get the remainder of 2 numbers");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['remainder_of'] = function (block) {
    var value_num1 = Blockly.JavaScript.valueToCode(block, 'num1', Blockly.JavaScript.ORDER_ATOMIC) || 0;
    var value_num2 = Blockly.JavaScript.valueToCode(block, 'num2', Blockly.JavaScript.ORDER_ATOMIC) || 0;

    var code = "(" + value_num1 + "%" + value_num2 + ")";

    return [code, Blockly.JavaScript.ORDER_NONE];
};