Blockly.Blocks['set_activity'] = {
    init: function () {
        this.appendValueInput("Activity")
            .setCheck(null)
            .appendField("Set game status to playing");
        this.setInputsInline(true);
        this.setPreviousStatement(true, ["Number", "Boolean", "Array", "String", "other"]);
        this.setNextStatement(true, ["Number", "Boolean", "Array", "String", "other"]);
        this.setColour(20);
        this.setTooltip("Sets the bots activity status as a game");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['set_activity'] = function (block) {
    var value_activity = Blockly.JavaScript.valueToCode(block, 'Activity', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var val5 = value_activity.replace("(", "");
    var val5 = val5.replace(")", "");
    var code = "client.user.setActivity(" + val5 + ");\n";
    return code;
};