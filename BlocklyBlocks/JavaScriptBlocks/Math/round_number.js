Blockly.Blocks['round_number'] = {
    init: function () {
        this.appendValueInput("round")
            .setCheck("Number")
            .appendField(new Blockly.FieldDropdown([["round up", "up"], ["round down", "down"], ["round", "round"]]), "type");
        this.setOutput(true, "Number");
        this.setColour(60);
        this.setTooltip("Rounds a number");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['round_number'] = function (block) {
    var dropdown_type = block.getFieldValue('type');
    var value_round = Blockly.JavaScript.valueToCode(block, 'round', Blockly.JavaScript.ORDER_ATOMIC) || 0;

    var code = "Math." + (dropdown_type == 'up' ? "ceil(" : dropdown_type == 'down' ? 'floor(' : "round(") + value_round + ")";

    return [code, Blockly.JavaScript.ORDER_NONE];
};