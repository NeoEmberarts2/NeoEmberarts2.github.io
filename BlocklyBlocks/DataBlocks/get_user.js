Blockly.Blocks['get_user'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Get User")
            .appendField(new Blockly.FieldDropdown([["ID", "msg.authhor"], ["Name", "msg.author.username"], ["Tag", "msg.author.tag"]]), "NAME");
        this.setOutput(true, null);
        this.setColour(290);
        this.setTooltip("Gets users details");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['get_user'] = function (block) {
    var dropdown_name = block.getFieldValue('NAME');
    // TODO: Assemble JavaScript into code variable.
    var code = dropdown_name;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
};