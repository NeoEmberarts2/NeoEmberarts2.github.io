Blockly.Blocks['message'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Get message text")
            .appendField(new Blockly.FieldDropdown([["Without prefix", ".replaceAll(prefix,\"\")"], ["With prefix", "OPTIONNAME"]]), "NAME");
        this.setInputsInline(false);
        this.setOutput(true, null);
        this.setColour(290);
        this.setTooltip("Gets the latest message");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['message'] = function (block) {
    var dropdown_name = block.getFieldValue('NAME');
    // TODO: Assemble JavaScript into code variable.
    var code = "msg.content" + dropdown_name;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
};