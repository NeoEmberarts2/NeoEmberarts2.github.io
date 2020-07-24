Blockly.Blocks['trim'] = {
    /**
     * Block for trimming spaces.
     * @this {Blockly.Block}
     */
    init: function () {
        var OPERATORS = [
            [Blockly.Msg['TEXT_TRIM_OPERATOR_BOTH'], 'BOTH'],
            [Blockly.Msg['TEXT_TRIM_OPERATOR_LEFT'], 'LEFT'],
            [Blockly.Msg['TEXT_TRIM_OPERATOR_RIGHT'], 'RIGHT']
        ];
        this.setHelpUrl(Blockly.Msg['TEXT_TRIM_HELPURL']);
        this.setStyle('text_blocks');
        this.appendValueInput('TEXT')
            .setCheck('String')
            .appendField(new Blockly.FieldDropdown(OPERATORS), 'MODE');
        this.setOutput(true, 'String');
        this.setTooltip(Blockly.Msg['TEXT_TRIM_TOOLTIP']);
    }
};

Blockly.JavaScript['trim'] = function (block) {
    // Trim spaces.
    var OPERATORS = {
        'LEFT': ".replace(/^[\\s\\xa0]+/, '')",
        'RIGHT': ".replace(/[\\s\\xa0]+$/, '')",
        'BOTH': '.trim()'
    };
    var operator = OPERATORS[block.getFieldValue('MODE')];
    var text = Blockly.JavaScript.valueToCode(block, 'TEXT',
        Blockly.JavaScript.ORDER_MEMBER) || '\'\'';
    return [text + operator, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};