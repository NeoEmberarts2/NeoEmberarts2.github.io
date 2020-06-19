Blockly.Blocks['send_message'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Send")
            .appendField(new Blockly.FieldDropdown([["Message", "msg.channel.send("], ["Reply", "msg.reply("]]), "NAME");
        this.appendValueInput("NAME")
            .setCheck("String");
        this.setInputsInline(true);
        this.setPreviousStatement(true, ["Boolean", "Number", "String", "Array"]);
        this.setNextStatement(true, ["Boolean", "Number", "String", "Array"]);
        this.setColour(120);
        this.setTooltip("Sends either a message or reply. Must be in an event to be called correctly");
        this.setHelpUrl("");
    }
};


Blockly.JavaScript['send_message'] = function (block) {
    var dropdown_name = block.getFieldValue('NAME');
    var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = dropdown_name + value_name +
        ";";
    return code;
};