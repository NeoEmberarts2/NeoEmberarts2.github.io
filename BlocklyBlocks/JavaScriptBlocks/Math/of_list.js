Blockly.Blocks['of_list'] = {
    init: function () {
        this.appendValueInput("list")
            .setCheck("Number")
            .appendField(new Blockly.FieldDropdown([["sum", "sum"], ["max", "max"], ["min", "min"], ["random item", "random"]]), "type")
            .appendField("of list");
        this.setOutput(true, "Number");
        this.setColour(60);
        this.setTooltip("Get the _ of a list");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['of_list'] = function (block) {
    var dropdown_type = block.getFieldValue('type');
    var value_list = Blockly.JavaScript.valueToCode(block, 'list', Blockly.JavaScript.ORDER_ATOMIC) || "[]";

    var code = '';

    let codeObj = {
        sum: value_list + ".reduce((i, j) => i + j))",
        max: "Math.max.apply(null, " + value_list + ")",
        min: "Math.min.apply(null, " + value_list + ")",
        random: value_list + "[Math.floor(Math.random()*" + value_list + ".length)]"
    };

    code = codeObj[dropdown_type];


    return [code, Blockly.JavaScript.ORDER_NONE];
};