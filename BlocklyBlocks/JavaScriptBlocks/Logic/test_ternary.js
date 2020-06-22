Blockly.Blocks['test_ternary'] = {
    init: function () {
        this.appendValueInput("test")
            .setCheck(null)
            .appendField("test");
        this.appendValueInput("true")
            .setCheck(null)
            .appendField("if true");
        this.appendValueInput("false")
            .setCheck(null)
            .appendField("if false");
        this.setInputsInline(false);
        this.setOutput(true, null);
        this.setColour(240);
        this.setTooltip("Checks if the condition in 'test' is true, if it is, it will return what's in 'if true' otherwise it'll return what's in 'if false'");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['test_ternary'] = function (block) {
    var value_test = Blockly.JavaScript.valueToCode(block, 'test', Blockly.JavaScript.ORDER_ATOMIC);
    var value_true = Blockly.JavaScript.valueToCode(block, 'true', Blockly.JavaScript.ORDER_ATOMIC);
    var value_false = Blockly.JavaScript.valueToCode(block, 'false', Blockly.JavaScript.ORDER_ATOMIC);

    var code = (value_test ? value_test : false) + "?" + (value_true ? value_true : null) + ":" + (value_false ? value_false : null);

    return [code, Blockly.JavaScript.ORDER_NONE];
};