Blockly.Blocks['colorHex'] = {
    init: function () {
        this.appendValueInput("hex")
            .setCheck(["String", "Number"])
            .appendField("Create color from hex code");
        this.setOutput(true, ["String", "Colour"]);
        this.setColour("#FF0000");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['colorHex'] = function (block) {
    var value_hex = Blockly.JavaScript.valueToCode(block, 'hex', Blockly.JavaScript.ORDER_ATOMIC) || '#000000';
    // TODO: Assemble JavaScript into code variable.
    if (!value_hex.indexOf("#") < 0) code += "#";
    var code = "'" + value_hex + "'";
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
};