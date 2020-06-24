Blockly.Blocks['trig'] = {
    init: function () {
        this.appendValueInput("expression")
            .setCheck("Number")
            .appendField(new Blockly.FieldDropdown([["sin", "Math.sin"], ["cos", "Math.cos"], ["tan", "Math.tan"], ["arcsin", "Math.asin"], ["arccos", "Math.acos"], ["arctan", "Math.atan"]]), "equalValues");
        this.setInputsInline(false);
        this.setOutput(true, null);
        this.setColour(60);
        this.setHelpUrl("");
        this.setTooltip("Find the sine value of a number in degrees");

    },
    onchange: function (event) {

        if (event.type == "change") {
            //console.log(event);
            // console.log(demoWorkspace.getBlockById(event.blockId));

            let currentSelection = demoWorkspace.getBlockById(event.blockId).inputList[0].fieldRow[0].value_;

            let toolTipObj = {
                "Math.sin": "sine value in degrees",
                "Math.cos": "cosine value in degrees",
                "Math.tan": "tangent value in degrees",
                "Math.asin": "arcsine",
                "Math.acos": "arccosine",
                "Math.atan": "arctangent"
            };

            this.setTooltip("Find the " + toolTipObj[currentSelection] + " of a number");

        }

    }

};

Blockly.JavaScript['trig'] = function (block) {
    var dropdown_equalvalues = block.getFieldValue('equalValues');
    var value_expression = Blockly.JavaScript.valueToCode(block, 'expression', Blockly.JavaScript.ORDER_ATOMIC);

    if (!value_expression) value_expression = 0;

    var code = dropdown_equalvalues + "(" + value_expression + ")";

    return [code, Blockly.JavaScript.ORDER_NONE];
};