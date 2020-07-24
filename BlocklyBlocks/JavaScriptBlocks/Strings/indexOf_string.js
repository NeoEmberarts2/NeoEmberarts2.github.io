Blockly.Blocks['indexOf_string'] = {
    init: function () {
        this.appendValueInput("index")
            .setCheck("String")
            .appendField("in text");
        this.appendDummyInput()
            .appendField("find")
            .appendField(new Blockly.FieldDropdown([["first", ".indexOf"], ["last", ".lastIndexOf"]]), "last_first");
        this.appendValueInput("from")
            .setCheck("Number")
            .appendField("starting at position");
        this.appendValueInput("find")
            .setCheck("String")
            .appendField("find index of");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(120);
        this.setTooltip("Gives the index of a specified string inside a string. Otherwise will return with -1");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['indexOf_string'] = function (block) {
    var value_index = Blockly.JavaScript.valueToCode(block, 'index', Blockly.JavaScript.ORDER_ATOMIC) || '""';
    var dropdown_last_first = block.getFieldValue('last_first');
    var value_from = Blockly.JavaScript.valueToCode(block, 'from', Blockly.JavaScript.ORDER_ATOMIC) || "0";
    var value_find = Blockly.JavaScript.valueToCode(block, 'find', Blockly.JavaScript.ORDER_ATOMIC) || '""';

    var code = value_index + dropdown_last_first + "(" + value_find + "," + value_from + ")";

    return [code, Blockly.JavaScript.ORDER_NONE];
};