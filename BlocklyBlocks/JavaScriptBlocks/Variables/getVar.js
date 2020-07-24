Blockly.defineBlocksWithJsonArray([

    {
        "type": "getVar",
        "message0": "%1",
        "args0": [
            {
                "type": "field_variable",
                "name": "VAR",
                "variable": "%{BKY_VARIABLES_DEFAULT_NAME}"
            }
        ],
        "output": null,
        "style": "variable_blocks",
        "helpUrl": "%{BKY_VARIABLES_GET_HELPURL}",
        "tooltip": "%{BKY_VARIABLES_GET_TOOLTIP}",
        "extensions": ["contextMenu_variableSetterGetter"]
    }

]);


Blockly.JavaScript['getVar'] = function (block) {
    // Variable getter.
    var code = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'),
        Blockly.VARIABLE_CATEGORY_NAME);
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};