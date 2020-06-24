Blockly.Blocks['for_loop'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Count with")
            .appendField(new Blockly.FieldVariable("i"), "variable")
            .appendField("from")
            .appendField(new Blockly.FieldNumber(0), "from")
            .appendField("to")
            .appendField(new Blockly.FieldNumber(10), "to")
            .appendField("by")
            .appendField(new Blockly.FieldNumber(1, 0), "increment");
        this.appendStatementInput("code")
            .setCheck(null)
            .appendField("do");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(330);
        this.setTooltip("With the variable 'i', starting at 'from' and going to 'to', increment by 'value' for each iteration");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['for_loop'] = function (block) {
    var variable_variable = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('variable'), Blockly.Variables.NAME_TYPE);
    var number_from = block.getFieldValue('from');
    var number_to = block.getFieldValue('to');
    var number_increment = block.getFieldValue('increment');
    var statements_code = Blockly.JavaScript.statementToCode(block, 'code');

    let boolean = (number_from < number_to ? true : false);//determines if number from is greater than number to

    var code = "for(" + variable_variable + " = " + number_from + "; " + variable_variable +
        (boolean ? "<" : ">") + number_to + "; " + variable_variable + "+= " + (boolean ? number_increment : -1 * number_increment) + "){" + statements_code + "}";

    return code;
};