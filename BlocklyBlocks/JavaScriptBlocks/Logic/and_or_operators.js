Blockly.Blocks['and_or_operators'] = {
    init: function () {
        this.appendValueInput("statementOne")
            .setCheck(null);
        this.appendValueInput("equalityDropDown")
            .setCheck(null)
            .appendField(new Blockly.FieldDropdown([["and", "&&"], ["or", "||"]]), "operator");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
        this.setOutput(true, "Boolean");
    }
};

Blockly.JavaScript['and_or_operators'] = function (block) {
    var value_statementone = Blockly.JavaScript.valueToCode(block, 'statementOne', Blockly.JavaScript.ORDER_ATOMIC);
    var dropdown_operator = block.getFieldValue('operator');
    var value_equalitydropdown = Blockly.JavaScript.valueToCode(block, 'equalityDropDown', Blockly.JavaScript.ORDER_ATOMIC);

    var code = "(" + (value_statementone ? value_statementone : 0) + ")" + dropdown_operator + "(" + (value_equalitydropdown ? value_equalitydropdown : 0) + ")";

    return [code, Blockly.JavaScript.ORDER_NONE];
};