Blockly.Blocks['basic_math_functions'] = {
    init: function () {
        this.appendValueInput("expression")
            .setCheck("Number")
            .appendField(new Blockly.FieldDropdown([["√", "Math.sqrt"], ["absolute value", "Math.abs"], ["negative", "-"], ["ln", "Math.log"], ["log", "Math.log10"], ["e^", "Math.pow(Math.E,"], ["10^", "Math.pow(10,"]]), "equalValues");
        this.setInputsInline(false);
        this.setOutput(true, null);
        this.setColour(60);
        this.setTooltip("Math expressions to use on numbers");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['basic_math_functions'] = function (block) {
    var dropdown_equalvalues = block.getFieldValue('equalValues');
    var value_expression = Blockly.JavaScript.valueToCode(block, 'expression', Blockly.JavaScript.ORDER_ATOMIC);

    if (!value_expression) value_expression = 0;
    let obj = {
        "Math.sqrt": "Math.sqrt(" + value_expression + ")",
        "Math.abs": "Math.abs(" + value_expression + ")",
        "-": "-" + value_expression,
        "Math.log": "Math.log(" + value_expression + ")",
        "Math.log10": "(Math.log(" + value_expression + ")/" + "Math.log(10))",
        "Math.pow(Math.E,": "Math.pow(Math.E, " + value_expression + ")",
        "Math.pow(10,": "Math.pow(10, " + value_expression + ")"
    };

    var code = obj[dropdown_equalvalues];

    return [code, Blockly.JavaScript.ORDER_NONE];
};