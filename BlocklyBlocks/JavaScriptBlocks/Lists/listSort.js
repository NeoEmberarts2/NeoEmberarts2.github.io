Blockly.Blocks['listSort'] = {
    /**
     * Block for sorting a list.
     * @this {Blockly.Block}
     */
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg['LISTS_SORT_TITLE'],
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "TYPE",
                    "options": [
                        [Blockly.Msg['LISTS_SORT_TYPE_NUMERIC'], "NUMERIC"],
                        [Blockly.Msg['LISTS_SORT_TYPE_TEXT'], "TEXT"],
                        [Blockly.Msg['LISTS_SORT_TYPE_IGNORECASE'], "IGNORE_CASE"]
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "DIRECTION",
                    "options": [
                        [Blockly.Msg['LISTS_SORT_ORDER_ASCENDING'], "1"],
                        [Blockly.Msg['LISTS_SORT_ORDER_DESCENDING'], "-1"]
                    ]
                },
                {
                    "type": "input_value",
                    "name": "LIST",
                    "check": "Array"
                }
            ],
            "output": "Array",
            "style": "list_blocks",
            "tooltip": Blockly.Msg['LISTS_SORT_TOOLTIP'],
            "helpUrl": Blockly.Msg['LISTS_SORT_HELPURL']
        });
    }
};

Blockly.JavaScript['listSort'] = function (block) {
    // Block for sorting a list.
    var list = Blockly.JavaScript.valueToCode(block, 'LIST',
        Blockly.JavaScript.ORDER_FUNCTION_CALL) || '[]';
    var direction = block.getFieldValue('DIRECTION') === '1' ? 1 : -1;
    var type = block.getFieldValue('TYPE');
    var getCompareFunctionName = Blockly.JavaScript.provideFunction_(
        'listsGetSortCompare',
        ['function ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ +
            '(type, direction) {',
            '  var compareFuncs = {',
            '    "NUMERIC": function(a, b) {',
            '        return Number(a) - Number(b); },',
            '    "TEXT": function(a, b) {',
            '        return a.toString() > b.toString() ? 1 : -1; },',
            '    "IGNORE_CASE": function(a, b) {',
        '        return a.toString().toLowerCase() > ' +
        'b.toString().toLowerCase() ? 1 : -1; },',
            '  };',
            '  var compare = compareFuncs[type];',
            '  return function(a, b) { return compare(a, b) * direction; }',
            '}']);
    return [list + '.slice().sort(' +
        getCompareFunctionName + '("' + type + '", ' + direction + '))',
    Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
