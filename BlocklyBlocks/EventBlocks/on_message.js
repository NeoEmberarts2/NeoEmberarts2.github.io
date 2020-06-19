Blockly.Blocks['on_message'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("On new message");
        this.appendStatementInput("events")
            .setCheck(["Boolean", "Number", "String", "Array", "Block-type2"]);
        this.setPreviousStatement(true, "Other");
        this.setNextStatement(true, ["final", "Other"]);
        this.setColour(230);
        this.setTooltip("This activates every time a message is sent in any server");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['on_message'] = function (block) {
    var statements_events = Blockly.JavaScript.statementToCode(block, 'events');
    // TODO: Assemble JavaScript into code variable.
    var code = "client.on(\"message\", function(msg){" + statements_events + "});";
    return code;
};
