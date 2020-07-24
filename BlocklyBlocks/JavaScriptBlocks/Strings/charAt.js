Blockly.defineBlocksWithJsonArray([
    {
        "type": "charAt",
        "message0": "%{BKY_TEXT_CHARAT_TITLE}", // "in text %1 %2"
        "args0": [
            {
                "type": "input_value",
                "name": "VALUE",
                "check": "String"
            },
            {
                "type": "field_dropdown",
                "name": "WHERE",
                "options": [
                    ["%{BKY_TEXT_CHARAT_FROM_START}", "FROM_START"],
                    ["%{BKY_TEXT_CHARAT_FROM_END}", "FROM_END"],
                    ["%{BKY_TEXT_CHARAT_FIRST}", "FIRST"],
                    ["%{BKY_TEXT_CHARAT_LAST}", "LAST"],
                    ["%{BKY_TEXT_CHARAT_RANDOM}", "RANDOM"]
                ]
            }
        ],
        "output": "String",
        "style": "text_blocks",
        "helpUrl": "%{BKY_TEXT_CHARAT_HELPURL}",
        "inputsInline": true,
        "mutator": "text_charAt_mutator"
    }
]);

Blockly.JavaScript['charAt'] = function (block) {
    var where = block.getFieldValue('WHERE') || 'FROM_START';
    var textOrder = (where == 'RANDOM') ? Blockly.JavaScript.ORDER_NONE :
        Blockly.JavaScript.ORDER_MEMBER;
    var text = Blockly.JavaScript.valueToCode(block, 'VALUE',
        textOrder) || '\'\'';
    switch (where) {
        case 'FIRST':
            var code = text + '.charAt(0)';
            return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
        case 'LAST':
            var code = text + '.slice(-1)';
            return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
        case 'FROM_START':
            var at = Blockly.JavaScript.getAdjusted(block, 'AT');
            // Adjust index if using one-based indices.
            var code = text + '.charAt(' + at + ')';
            return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
        case 'FROM_END':
            var at = Blockly.JavaScript.getAdjusted(block, 'AT', 1, true);
            var code = text + '.slice(' + at + ').charAt(0)';
            return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
        case 'RANDOM':
            var functionName = Blockly.JavaScript.provideFunction_(
                'textRandomLetter',
                ['function ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ +
                    '(text) {',
                    '  var x = Math.floor(Math.random() * text.length);',
                    '  return text[x];',
                    '}']);
            var code = functionName + '(' + text + ')';
            return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
    }
    throw Error('Unhandled option (text_charAt).');
};


