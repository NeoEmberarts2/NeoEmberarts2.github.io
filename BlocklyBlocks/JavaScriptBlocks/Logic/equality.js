Blockly.Blocks['equality'] = {
    init: function () {
        this.appendValueInput("statementOne")
            .setCheck(null);
        this.appendValueInput("equalityDropDown")
            .setCheck(null)
            .appendField(new Blockly.FieldDropdown([["=", "equal"], ["≠", "unequal"], [">", "greaterThan"], ["<", "lessThan"], ["≤", "lessEThan"], ["≥", "greatEThan"]]), "equalValues");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
        this.setOutput(true, "Boolean");

    }
};

Blockly.JavaScript['equality'] = function (block) {
    var value_statementone = Blockly.JavaScript.valueToCode(block, 'statementOne', Blockly.JavaScript.ORDER_ATOMIC);
    var dropdown_equalvalues = block.getFieldValue('equalValues');
    var value_equalitydropdown = Blockly.JavaScript.valueToCode(block, 'equalityDropDown', Blockly.JavaScript.ORDER_ATOMIC);


    let map = {
        "equal": "==",
        "unequal": "!=",
        "greaterThan": ">",
        "lessThan": "<",
        "lessEThan": "<=",
        "greatEThan": ">="
    };

    var code = "(" + (value_statementone ? value_statementone : false) + ")" + map[dropdown_equalvalues] + "(" + (value_equalitydropdown ? value_equalitydropdown : false) + ")";

    return [code, Blockly.JavaScript.ORDER_NONE];
};