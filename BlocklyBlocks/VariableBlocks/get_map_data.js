
Blockly.Blocks['get_map_data'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Get Map Data")
            .appendField(new Blockly.FieldTextInput("MapID"), "id");
        this.appendValueInput("Key")
            .setCheck(null)
            .appendField("With key");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(330);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['get_map_data'] = function (block) {
    var text_id = block.getFieldValue('id');
    var value_key = Blockly.JavaScript.valueToCode(block, 'Key', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var id = value_key.replace("\"", "");
    id = id.replace("(", "");
    id = id.replace(")", "");
    hasmaps = true;
    var code = "getMapData(\"" + text_id + "\", \"" + id + ")";
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
};
