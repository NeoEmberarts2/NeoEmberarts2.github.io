Blockly.defineBlocksWithJsonArray([

    {
        "type": "colorRGB",
        "message0": "%{BKY_COLOUR_RGB_TITLE} %{BKY_COLOUR_RGB_RED} %1 %{BKY_COLOUR_RGB_GREEN} %2 %{BKY_COLOUR_RGB_BLUE} %3",
        "args0": [
            {
                "type": "input_value",
                "name": "RED",
                "check": "Number",
                "align": "RIGHT"
            },
            {
                "type": "input_value",
                "name": "GREEN",
                "check": "Number",
                "align": "RIGHT"
            },
            {
                "type": "input_value",
                "name": "BLUE",
                "check": "Number",
                "align": "RIGHT"
            }
        ],
        "output": ["Colour", "String"],
        "helpUrl": "%{BKY_COLOUR_RGB_HELPURL}",
        "colour": "#FF0000",
        "tooltip": "%{BKY_COLOUR_RGB_TOOLTIP}"
    }

]);

Blockly.JavaScript['colorRGB'] = function (block) {
    // Compose a colour from RGB components expressed as percentages.
    var red = Blockly.JavaScript.valueToCode(block, 'RED',
        Blockly.JavaScript.ORDER_COMMA) || 0;
    var green = Blockly.JavaScript.valueToCode(block, 'GREEN',
        Blockly.JavaScript.ORDER_COMMA) || 0;
    var blue = Blockly.JavaScript.valueToCode(block, 'BLUE',
        Blockly.JavaScript.ORDER_COMMA) || 0;
    var functionName = Blockly.JavaScript.provideFunction_(
        'colourRgb',
        ['function ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ +
            '(r, g, b) {',
            '  r = Math.max(Math.min(Number(r), 100), 0) * 2.55;',
            '  g = Math.max(Math.min(Number(g), 100), 0) * 2.55;',
            '  b = Math.max(Math.min(Number(b), 100), 0) * 2.55;',
            '  r = (\'0\' + (Math.round(r) || 0).toString(16)).slice(-2);',
            '  g = (\'0\' + (Math.round(g) || 0).toString(16)).slice(-2);',
            '  b = (\'0\' + (Math.round(b) || 0).toString(16)).slice(-2);',
            '  return \'#\' + r + g + b;',
            '}']);
    var code = functionName + '(' + red + ', ' + green + ', ' + blue + ')';
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};