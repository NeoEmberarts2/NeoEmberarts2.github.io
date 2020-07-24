Blockly.Blocks['isNan'] = {
    init: function () {
        this.appendValueInput("Nan")
            .setCheck("Number")
            .appendField(new Blockly.FieldDropdown([["is", "!isNaN("], ["is not", "isNaN("]]), "notoris")
            .appendField("a number");
        this.setInputsInline(false);
        this.setOutput(true, null);
        this.setColour(65);
        this.setTooltip("check if something is or isn't a number");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['isNan'] = function (block) {
    var dropdown_notoris = block.getFieldValue('notoris');
    var value_nan = Blockly.JavaScript.valueToCode(block, 'Nan', Blockly.JavaScript.ORDER_ATOMIC) || 0;

    var code = dropdown_notoris + value_nan + ")";

    return [code, Blockly.JavaScript.ORDER_NONE];
};