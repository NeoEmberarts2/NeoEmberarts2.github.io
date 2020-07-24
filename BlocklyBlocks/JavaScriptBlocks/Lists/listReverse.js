Blockly.Blocks['listReverse'] = {
    init: function () {
        this.appendValueInput("LIST")
            .setCheck("Array")
            .appendField("reverse");
        this.setColour(260);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.JavaScript['listReverse'] = function (block) {
    var value_list = Blockly.JavaScript.valueToCode(block, 'LIST', Blockly.JavaScript.ORDER_ATOMIC) || '[]';
    // TODO: Assemble JavaScript into code variable. 
    var code = value_list + ".reverse()";
    return code;
};