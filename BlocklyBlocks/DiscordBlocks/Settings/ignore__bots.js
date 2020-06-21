Blockly.Blocks['ignore__bots'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Ignore bots")
            .appendField(new Blockly.FieldDropdown([["true", "if(msg.author.bot) return;"], ["false", ""]]), "NAME");
        this.setPreviousStatement(true, ["Boolean", "Number", "String", "Array"]);
        this.setNextStatement(true, ["Boolean", "Number", "String", "Array"]);
        this.setColour(20);
        this.setTooltip("Choose whether your bot ignores other bots including itself");
        this.setHelpUrl("");
    }
};


Blockly.JavaScript['ignore__bots'] = function (block) {
    var dropdown_name = block.getFieldValue('NAME');
    // TODO: Assemble JavaScript into code variable.
    var code = dropdown_name;
    return code;
};