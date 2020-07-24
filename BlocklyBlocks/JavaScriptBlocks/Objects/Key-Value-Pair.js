Blockly.Blocks['Key-Value-Pair'] = {
    init: function () {
        this.appendValueInput("Key")
            .setCheck(null)
            .appendField("key");
        this.appendDummyInput()
            .appendField(":");
        this.appendValueInput("Value")
            .setCheck(null)
            .appendField("value");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour("#00820f");
        this.setTooltip("");
        this.setOutput(true, "Key-Value-Pair");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['Key-Value-Pair'] = function (block) {
    var value_key = Blockly.JavaScript.valueToCode(block, 'Key', Blockly.JavaScript.ORDER_ATOMIC) || "[Symbol(0)]";
    var value_value = Blockly.JavaScript.valueToCode(block, 'Value', Blockly.JavaScript.ORDER_ATOMIC) || "0";

    var code = value_key + " : " + value_value + ",";

    return [code, Blockly.JavaScript.ORDER_NONE];
};