Blockly.defineBlocksWithJsonArray([
    {
        "type": "colorRandom",
        "message0": "%{BKY_COLOUR_RANDOM_TITLE}",
        "colour": "#FF0000",
        "output": ["Colour", "String"],
        "helpUrl": "%{BKY_COLOUR_RANDOM_HELPURL}",
        "tooltip": "%{BKY_COLOUR_RANDOM_TOOLTIP}"
    }
]);

Blockly.JavaScript['colorRandom'] = function (block) {
    // Generate a random colour.
    var functionName = Blockly.JavaScript.provideFunction_(
        'colourRandom',
        ['function ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ + '() {',
            '  var num = Math.floor(Math.random() * Math.pow(2, 24));',
            '  return \'#\' + (\'00000\' + num.toString(16)).substr(-6);',
            '}']);
    var code = functionName + '()';
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};