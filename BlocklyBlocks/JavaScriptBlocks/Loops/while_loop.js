Blockly.Blocks['while_loop'] = {
    init: function () {
        this.appendValueInput("condition")
            .setCheck(null)
            .appendField("Repeat")
            .appendField(new Blockly.FieldDropdown([["while", "while"], ["until", "until"]]), "while");
        this.appendStatementInput("code")
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(330);
        this.setTooltip("Execute this code a number of times");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['while_loop'] = function (block) {
    var dropdown_while = block.getFieldValue('while');
    var value_condition = Blockly.JavaScript.valueToCode(block, 'condition', Blockly.JavaScript.ORDER_ATOMIC);
    var statements_code = Blockly.JavaScript.statementToCode(block, 'code');

    var code = "";
    if (dropdown_while == "while") {

        code = "while (" + (value_condition ? value_condition : false) + "){" + statements_code + " }";

    } else if (dropdown_while == "until") {

        code = "while (!" + (value_condition ? value_condition : false) + "){" + statements_code + " }";

    }

    return code;
};