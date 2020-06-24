Blockly.Blocks['repeat_loop'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Repeat")
            .appendField(new Blockly.FieldNumber(0, 0), "counter")
            .appendField("Times");
        this.appendStatementInput("code")
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(330);
        this.setTooltip("Execute this code a number of times");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['repeat_loop'] = function (block) {
    var number_counter = block.getFieldValue('counter');
    var statements_code = Blockly.JavaScript.statementToCode(block, 'code');

    var code = "for(let i = 0; i < " + number_counter + "; i++){" + statements_code + " }";
    return code;
};