Blockly.Blocks['number'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldNumber(0), "number");
        this.setOutput(true, "Number");
        this.setColour(60);
        this.setTooltip("Gives a number");
        this.setHelpUrl("");
    }
};
Blockly.JavaScript['number'] = function (block) {
    var number_number = block.getFieldValue('number');
    // TODO: Assemble JavaScript into code variable.
    var code = number_number;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
};