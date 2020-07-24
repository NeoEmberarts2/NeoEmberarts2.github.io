Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
    // Block for colour picker.
    {
        "type": "colorPicker",
        "message0": "%1",
        "args0": [
            {
                "type": "field_colour",
                "name": "COLOUR",
                "colour": "#00ff00"
            }
        ],
        "output": ["Colour", "String"],
        "helpUrl": "%{BKY_COLOUR_PICKER_HELPURL}",
        "colour": "#FF0000",
        "tooltip": "%{BKY_COLOUR_PICKER_TOOLTIP}",
        "extensions": ["parent_tooltip_when_inline"]
    }
]);


Blockly.JavaScript['colorPicker'] = function (block) {
    // Colour picker.
    var code = Blockly.JavaScript.quote_(block.getFieldValue('COLOUR'));
    return [code, Blockly.JavaScript.ORDER_ATOMIC];
};