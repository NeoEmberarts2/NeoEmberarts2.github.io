Blockly.Blocks['if_prefix_equals'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("if message contains prefix");
        this.appendStatementInput("code_inside")
            .setCheck(["Number", "Boolean", "String", "Array"]);
        this.setInputsInline(true);
        this.setPreviousStatement(true, ["Boolean", "Number", "String", "Array", "Block-type2"]);
        this.setNextStatement(true, ["Boolean", "Number", "String", "Array", "Block-type2"]);
        this.setColour(195);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};


Blockly.JavaScript['if_prefix_equals'] = function (block) {
    var statements_code_inside = Blockly.JavaScript.statementToCode(block, 'code_inside');
    // TODO: Assemble JavaScript into code variable.
    var code = "if(msg.content.startsWith(prefix)){" + statements_code_inside + "}";
    return code;
};