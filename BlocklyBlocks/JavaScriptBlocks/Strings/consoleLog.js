
Blockly.Blocks['consoleLog'] = {
    /**
     * Block for print statement.
     * @this {Blockly.Block}
     */
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg['TEXT_PRINT_TITLE'],
            "args0": [
                {
                    "type": "input_value",
                    "name": "TEXT"
                }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "style": "text_blocks",
            "tooltip": "Log any value to the console",
            "helpUrl": Blockly.Msg['TEXT_PRINT_HELPURL']
        });
    }
};

Blockly.JavaScript['consoleLog'] = function (block) {
    // Print statement.
    var msg = Blockly.JavaScript.valueToCode(block, 'TEXT',
        Blockly.JavaScript.ORDER_NONE) || '\'\'';
    return 'console.log(' + msg + ');\n';
};