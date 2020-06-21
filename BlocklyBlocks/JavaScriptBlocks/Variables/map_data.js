Blockly.Blocks['map_data'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Map Data")
            .appendField(new Blockly.FieldTextInput("MapID"), "id");
        this.appendValueInput("Key")
            .setCheck(null)
            .appendField("Set Key");
        this.appendValueInput("Value")
            .setCheck(null)
            .appendField("With Value");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(330);
        this.setTooltip("Usefull for an economy bot. PRO TIP: use the key as a users ID, and the value will be the coins, then when you get the value. BOOM, the coin value was stored for that user");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['map_data'] = function (block) {
    var text_id = block.getFieldValue('id');
    var value_key = Blockly.JavaScript.valueToCode(block, 'Key', Blockly.JavaScript.ORDER_ATOMIC);
    var value_value = Blockly.JavaScript.valueToCode(block, 'Value', Blockly.JavaScript.ORDER_ATOMIC);
    code = "indexVal = " + text_id + "keys.indexOf(" + value_key + ");\nif (indexVal == -1) {\n" + text_id + "keys.push(" + value_key + ");\n" + text_id + "values.push(" + value_value + ");\n} else {\n" + text_id + "values[indexVal] = " + value_value + ";\n}\n";
    hasmaps = true;
    if (mapIDs.indexOf(text_id) == -1) {
        mapIDs.push(text_id);
    }

    return code;
};