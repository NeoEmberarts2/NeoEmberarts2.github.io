Blockly.Blocks['send_embed'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Create Embed | Title");
        this.appendValueInput("Title")
            .setCheck(null)
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput("Descriptioon")
            .setCheck(null)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Description");
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Color")
            .appendField(new Blockly.FieldDropdown([["Black", "0"], ["darker grey", "2830390"], ["Brighter grey", "7569011"], ["White", "16777214"], ["Sky blue", "7587007"], ["Light Blue", "34302"], ["light bluish green", "65534"], ["Medium spring green", "65426"], ["grass green", "52480"], ["update green", "2604342"], ["Light pink", "16752639"], ["Hot pink", "16711935"], ["Purple", "10223871"], ["Yellow", "16776960"], ["Orange", "16776960"], ["Bright red", "16711680"], ["Dark red", "10485760"]]), "NAME");
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(120);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['send_embed'] = function (block) {
    var value_title = Blockly.JavaScript.valueToCode(block, 'Title', Blockly.JavaScript.ORDER_ATOMIC);
    var value_descriptioon = Blockly.JavaScript.valueToCode(block, 'Descriptioon', Blockly.JavaScript.ORDER_ATOMIC);
    var dropdown_name = block.getFieldValue('NAME');
    var temptitle = value_title.replace("(", "");
    temptitle = temptitle.replace(")", "");
    var tempdesc = value_descriptioon.replace("(", "");
    tempdesc = tempdesc.replace(")", "");

    var code = "msg.channel.send({embed: {title: " + temptitle + ", description: " + tempdesc + ", color: " + dropdown_name + "}});";
    return code;
};