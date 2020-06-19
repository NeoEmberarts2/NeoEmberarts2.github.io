Blockly.Blocks['delete_message'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Delete users message");
        this.setPreviousStatement(true, ["Number", "Boolean", "Array", "String", "other"]);
        this.setNextStatement(true, ["Number", "Boolean", "Array", "String", "other"]);
        this.setColour(120);
        this.setTooltip("Deletes the latest message sent by the user that activated this line of code");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['delete_message'] = function (block) {
    // TODO: Assemble JavaScript into code variable.
    var code = "msg.delete().catch(O_o=>{});\n";
    return code;
};