Blockly.defineBlocksWithJsonArray([
    {
        "type": "listEmpty",
        "message0": "%{BKY_LISTS_ISEMPTY_TITLE}",
        "args0": [
            {
                "type": "input_value",
                "name": "VALUE",
                "check": ["String", "Array"]
            }
        ],
        "output": "Boolean",
        "style": "list_blocks",
        "tooltip": "%{BKY_LISTS_ISEMPTY_TOOLTIP}",
        "helpUrl": "%{BKY_LISTS_ISEMPTY_HELPURL}"
    }
]);

Blockly.JavaScript['listEmpty'] = function (block) {
    // Is the string null or array empty?
    var list = Blockly.JavaScript.valueToCode(block, 'VALUE',
        Blockly.JavaScript.ORDER_MEMBER) || '[]';
    return ['!' + list + '.length', Blockly.JavaScript.ORDER_LOGICAL_NOT];
};