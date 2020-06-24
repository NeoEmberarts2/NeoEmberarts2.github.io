Blockly.Blocks['max_min'] = {
    init: function () {
        this.appendValueInput("maxormin")
            .setCheck("Number")
            .appendField("get the")
            .appendField(new Blockly.FieldDropdown([["max", "max"], ["min", "min"]]), "min/max")
            .appendField("value between");
        this.appendValueInput("NAME")
            .setCheck("Number")
            .appendField("and");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(65);
        this.setTooltip("get the remainder of 2 numbers");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['max_min'] = function (block) {
    var dropdown_min_max = block.getFieldValue('min/max');
    var value_maxormin = Blockly.JavaScript.valueToCode(block, 'maxormin', Blockly.JavaScript.ORDER_ATOMIC) || 0;
    var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC) || 0;

    var code = "Math." + dropdown_min_max + "(" + value_maxormin + "," + value_name + ")";

    return [code, Blockly.JavaScript.ORDER_NONE];
};