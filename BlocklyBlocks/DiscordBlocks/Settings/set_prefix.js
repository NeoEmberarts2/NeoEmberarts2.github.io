Blockly.Blocks['set_prefix'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Set prefix to");
        this.appendValueInput("prefix")
            .setCheck("String");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, ["Boolean", "Number", "String", "Array", "Other"]);
        this.setColour(20);
        this.setTooltip("Sets the prefix for your bot");
        this.setHelpUrl("");
    }
};


Blockly.JavaScript['set_prefix'] = function (block) {
    var value_prefix = Blockly.JavaScript.valueToCode(block, 'prefix', Blockly.JavaScript.ORDER_ATOMIC);
    // TODO: Assemble JavaScript into code variable.
    var code = "prefix = " + value_prefix + ";";
    return code;
};
