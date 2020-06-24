Blockly.Blocks['number_check'] = {
    init: function () {
        this.appendValueInput("number")
            .setCheck("Number")
            .appendField("check");
        this.appendDummyInput()
            .appendField("is")
            .appendField(new Blockly.FieldDropdown([["even", "even"], ["odd", "odd"], ["whole", "whole"], ["positive", "positive"], ["negative", "negative"]]), "numCheck");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(60);
        this.setTooltip("check if a number is ... and will return true/false");
        this.setHelpUrl("");
    },

};

Blockly.JavaScript['number_check'] = function (block) {
    var value_number = Blockly.JavaScript.valueToCode(block, 'number', Blockly.JavaScript.ORDER_ATOMIC);
    var dropdown_numcheck = block.getFieldValue('numCheck');

    let num = value_number;
    let oper = dropdown_numcheck;

    let operations = {
        "even": num + " % 2 == 0",
        "odd": num + " % 2 == 1",
        "whole": num + " % 1 == 0",
        "positive": num + " > 0",
        "negative": num + " < 0"
    };

    var code = "(" + operations[oper] + ")";

    return [code, Blockly.JavaScript.ORDER_NONE];
};