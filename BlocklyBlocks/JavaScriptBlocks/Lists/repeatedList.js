Blockly.defineBlocksWithJsonArray([

    {
        "type": "repeatedList",
        "message0": "%{BKY_LISTS_REPEAT_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "ITEM"
            },
            {
                "type": "input_value",
                "name": "NUM",
                "check": "Number"
            }
        ],
        "output": "Array",
        "style": "list_blocks",
        "tooltip": "%{BKY_LISTS_REPEAT_TOOLTIP}",
        "helpUrl": "%{BKY_LISTS_REPEAT_HELPURL}"
    }

]);

Blockly.JavaScript['repeatedList'] = function (block) {
    // Create a list with one element repeated.
    var functionName = Blockly.JavaScript.provideFunction_(
        'listsRepeat',
        ['function ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ +
            '(value, n) {',
            '  var array = [];',
            '  for (var i = 0; i < n; i++) {',
            '    array[i] = value;',
            '  }',
            '  return array;',
            '}']);
    var element = Blockly.JavaScript.valueToCode(block, 'ITEM',
        Blockly.JavaScript.ORDER_COMMA) || 'null';
    var repeatCount = Blockly.JavaScript.valueToCode(block, 'NUM',
        Blockly.JavaScript.ORDER_COMMA) || '0';
    var code = functionName + '(' + element + ', ' + repeatCount + ')';
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};