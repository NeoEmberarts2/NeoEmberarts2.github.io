Blockly.Blocks['client_login'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Set bot token to")
            .appendField(new Blockly.FieldTextInput("Paste token here"), "Token");
        this.setPreviousStatement(true, "final");
        this.setColour(65);
        this.setTooltip("This should be the very last thing thats ever called");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['client_login'] = function (block) {
    var text_token = block.getFieldValue('Token');
    // TODO: Assemble JavaScript into code variable.
    var code = "client.login(\"" + text_token + "\");";
    return code;
};