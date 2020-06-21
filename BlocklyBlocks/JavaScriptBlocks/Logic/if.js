Blockly.Blocks['if'] = {
    init: function () {
        this.appendValueInput("statement1")
            .setCheck(null)
            .appendField("If");
        this.appendValueInput("statement2")
            .setCheck(null)
            .appendField(new Blockly.FieldDropdown([["Equals", "="], ["Does not equal", "!"], ["Contains", "."]]), "compare");
        this.appendStatementInput("codeinside")
            .setCheck(["Boolean", "Number", "String", "Array"]);
        this.setInputsInline(true);
        this.setPreviousStatement(true, ["Boolean", "Number", "String", "Array"]);
        this.setNextStatement(true, ["Boolean", "Number", "String", "Array"]);
        this.setColour(195);
        this.setTooltip("A simple if statement");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['if'] = function (block) {
    var value_statement1 = Blockly.JavaScript.valueToCode(block, 'statement1', Blockly.JavaScript.ORDER_ATOMIC);
    var dropdown_compare = block.getFieldValue('compare');
    var value_statement2 = Blockly.JavaScript.valueToCode(block, 'statement2', Blockly.JavaScript.ORDER_ATOMIC);
    var statements_codeinside = Blockly.JavaScript.statementToCode(block, 'codeinside');
    // TODO: Assemble JavaScript into code variable.
    if (dropdown_compare == "=") {
        code = "if (" + value_statement1 + " == " + value_statement2 + ") {" + statements_codeinside + "}";
    }
    if (dropdown_compare == "!") {
        code = "if (" + value_statement1 + " !== " + value_statement2 + ") {" + statements_codeinside + "}";
    }
    if (dropdown_compare == ".") {
        code = "if (" + value_statement1 + ".includes(" + value_statement2 + ")) {" + statements_codeinside + "}";
    }
    return code;
};