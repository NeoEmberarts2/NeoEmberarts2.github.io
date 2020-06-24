Blockly.Blocks['random_between'] = {
    init: function () {
        this.appendValueInput("start")
            .setCheck("Number")
            .appendField("get random value between ");
        this.appendValueInput("end")
            .setCheck("Number")
            .appendField("and");
        this.setInputsInline(true);
        this.setOutput(true, null);
        this.setColour(65);
        this.setTooltip("get a random number between two values");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['random_between'] = function (block) {
    var value_start = Blockly.JavaScript.valueToCode(block, 'start', Blockly.JavaScript.ORDER_ATOMIC).replace(/\(|\)/gmi, "") || 0;
    var value_end = Blockly.JavaScript.valueToCode(block, 'end', Blockly.JavaScript.ORDER_ATOMIC).replace(/\(|\)/gmi, "") || 0;

    var code = '';
    var start = Math.min(Number(value_end), Number(value_start));
    var end = Math.max(Number(value_end), Number(value_start));
    console.log(typeof value_start, value_end, Math.min(value_start, value_end));

    if (!Number.isInteger(Number(value_start)) || !Number.isInteger(Number(value_end))) {
        code = "Math.random()*" + "(" + end + "-" + start + ")+" + start;
    } else {
        code = "Math.floor(Math.random()*" + "(" + end + "-" + start + "+1)+" + start + ")";
    }

    return [code, Blockly.JavaScript.ORDER_NONE];
};