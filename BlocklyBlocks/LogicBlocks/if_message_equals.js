Blockly.Blocks['if_message_equals'] = {
    init: function () {
        this.appendValueInput("Value")
            .setCheck("String")
            .appendField("if message")
            .appendField(new Blockly.FieldDropdown([["Equals", "==="], ["Contains", "contains"]]), "NAME");
        this.appendDummyInput()
            .appendField("Then");
        this.appendStatementInput("code_inside")
            .setCheck(["Number", "Boolean", "String", "Array"]);
        this.setPreviousStatement(true, ["Boolean", "Number", "String", "Array", "Block-type2"]);
        this.setNextStatement(true, ["Boolean", "Number", "String", "Array", "Block-type2"]);
        this.setColour(195);
        this.setTooltip("if message contains a string the the code inside will be executed");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['if_message_equals'] = function (block) {
    var dropdown_name = block.getFieldValue('NAME');
    var value_value = Blockly.JavaScript.valueToCode(block, 'Value', Blockly.JavaScript.ORDER_ATOMIC);
    var statements_code_inside = Blockly.JavaScript.statementToCode(block, 'code_inside');
    // TODO: Assemble JavaScript into code variable.
    if (dropdown_name == "===") {
        var code = "if (msg.content.toLowerCase() == " + value_value + ") {" + statements_code_inside + "}";
    } else if (dropdown_name == "contains") {
        var code = "if (msg.content.includes" + value_value + ") {" + statements_code_inside + "}";
    }
    return code;
};