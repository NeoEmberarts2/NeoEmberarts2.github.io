Blockly.defineBlocksWithJsonArray([

    {
        "type": "setVar",
        "message0": "%{BKY_VARIABLES_SET}",
        "args0": [
            {
                "type": "field_variable",
                "name": "VAR",
                "variable": "%{BKY_VARIABLES_DEFAULT_NAME}"
            },
            {
                "type": "input_value",
                "name": "VALUE"
            }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "style": "variable_blocks",
        "tooltip": "%{BKY_VARIABLES_SET_TOOLTIP}",
        "helpUrl": "%{BKY_VARIABLES_SET_HELPURL}",
        "extensions": ["contextMenu_variableSetterGetter"]
    }

]);

Blockly.JavaScript['setVar'] = function (block) {
    // Variable setter.
    var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE',
        Blockly.JavaScript.ORDER_ASSIGNMENT) || '0';
    var varName = Blockly.JavaScript.variableDB_.getName(
        block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
    return varName + ' = ' + argument0 + ';\n';
};
