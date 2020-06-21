Blockly.Blocks['for_loop'] = {
    init: function () {
        this.appendValueInput("fromNumber")
            .appendField("Repeat from")
            .appendField(new Blockly.FieldTextInput(0))
            .setCheck("Number")
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendDummyInput("toNumber")
            .appendField("To")
            .appendField(new Blockly.FieldTextInput(1));
        this.appendStatementInput("codeinside");
        this.setInputsInline(true);
        this.setPreviousStatement(true, "Other");
        this.setNextStatement(true, ["final", "Other"]);
        this.setColour("#C684C1");
        this.setTooltip("Loop between one number to the next!");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['for_loop'] = function (block) {
    let fromNumber = Blockly.JavaScript.valueToCode(block, "Repeat from", Blockly.JavaScript.ORDER_ATOMIC);
    let toNumber = Blockly.JavaScript.valueToCode(block, "toNumber", Blockly.JavaScript.ORDER_ATOMIC);
    console.log(fromNumber, toNumber);
    let statementInside = Blockly.JavaScript.statementToCode(block, 'codeinside');

    let code = '';

    if (fromNumber > toNumber) {
        code = `for(let i = ` + fromNumber + `; ` + fromNumber + ` > ` + toNumber + `; i--){
            `+ statementInside + `
        }`;
    } else {
        code = `for(let i = ` + fromNumber + `; ` + fromNumber + ` < ` + toNumber + `; i++){
            `+ statementInside + `
        }`;
    }

    return code;
};