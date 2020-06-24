Blockly.Blocks['operations'] = {
    init: function () {
        this.appendValueInput("statementOne")
            .setCheck(["Number", "Boolean"]);
        this.appendValueInput("equalityDropDown")
            .setCheck(["Number", "Boolean"])
            .appendField(new Blockly.FieldDropdown([["+", "+"], ["-", "-"], ["x", "*"], ["÷", "/"], ["^", "**"]]), "equalValues");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(60);
        this.setTooltip("Math expressions");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['operations'] = function (block) {
    var value_statementone = Blockly.JavaScript.valueToCode(block, 'statementOne', Blockly.JavaScript.ORDER_ATOMIC);
    var dropdown_equalvalues = block.getFieldValue('equalValues');
    var value_equalitydropdown = Blockly.JavaScript.valueToCode(block, 'equalityDropDown', Blockly.JavaScript.ORDER_ATOMIC);

    var code = "(" + (value_statementone ? value_statementone : 0) + " " + dropdown_equalvalues + " " + (value_equalitydropdown ? value_equalitydropdown : 0) + ")";

    return [code, Blockly.JavaScript.ORDER_NONE];
};