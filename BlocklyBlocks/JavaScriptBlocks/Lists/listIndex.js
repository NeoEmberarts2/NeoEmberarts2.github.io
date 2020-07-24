Blockly.Blocks['listIndex'] = {
    /**
     * Block for finding an item in the list.
     * @this {Blockly.Block}
     */
    init: function () {
        var OPERATORS =
            [
                [Blockly.Msg['LISTS_INDEX_OF_FIRST'], 'FIRST'],
                [Blockly.Msg['LISTS_INDEX_OF_LAST'], 'LAST']
            ];
        this.setHelpUrl(Blockly.Msg['LISTS_INDEX_OF_HELPURL']);
        this.setStyle('list_blocks');
        this.setOutput(true, 'Number');
        this.appendValueInput('VALUE')
            .setCheck('Array')
            .appendField(Blockly.Msg['LISTS_INDEX_OF_INPUT_IN_LIST']);
        this.appendValueInput('FIND')
            .appendField(new Blockly.FieldDropdown(OPERATORS), 'END');
        this.setInputsInline(true);
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip(function () {
            return Blockly.Msg['LISTS_INDEX_OF_TOOLTIP'].replace('%1',
                thisBlock.workspace.options.oneBasedIndex ? '0' : '-1');
        });
    }
};

Blockly.JavaScript['listIndex'] = function (block) {
    // Find an item in the list.
    var operator = block.getFieldValue('END') == 'FIRST' ?
        'indexOf' : 'lastIndexOf';
    var item = Blockly.JavaScript.valueToCode(block, 'FIND',
        Blockly.JavaScript.ORDER_NONE) || '\'\'';
    var list = Blockly.JavaScript.valueToCode(block, 'VALUE',
        Blockly.JavaScript.ORDER_MEMBER) || '[]';
    var code = list + '.' + operator + '(' + item + ')';
    if (block.workspace.options.oneBasedIndex) {
        return [code, Blockly.JavaScript.ORDER_ADDITION];
    }
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};