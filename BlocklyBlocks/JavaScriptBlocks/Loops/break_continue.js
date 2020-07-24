Blockly.Blocks['break_continue'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["break out of loop", "break"], ["stop current iteration and go to next", "halt"]]), "halt");
        this.setPreviousStatement(true, null);
        this.setColour(330);
        this.setTooltip("break out or stop the current iteration and move to the next of the current loop");
        this.setHelpUrl("");
    },
    onchange: function (event) {//to detect if it's in a for loop or not. Will disable if it's not

        if (event.type.toString() == "move") {
            if (Blockly.mainWorkspace.getBlockById(event.blockId) && Blockly.mainWorkspace.getBlockById(event.blockId).type == "break_continue") {

                let nextID = event.newParentId;
                let isInLoop = nextID ? true : false;

                if (Blockly.mainWorkspace.getBlockById(nextID)) {


                    while (Blockly.mainWorkspace.getBlockById(nextID).type.indexOf("loop") == -1) {

                        nextID = Blockly.mainWorkspace.getBlockById(nextID).parentBlock_.id;
                        if (Blockly.mainWorkspace.getBlockById(nextID).type.indexOf("loop") > -1) {
                            isInLoop = true;
                            break;
                        } else isInLoop = false;

                    }
                }

                Blockly.mainWorkspace.getBlockById(event.blockId).setDisabled(!isInLoop);


            }
        }
    }
};

Blockly.JavaScript['break_continue'] = function (block) {
    var dropdown_halt = block.getFieldValue('halt');

    var code = (dropdown_halt.indexOf("break") > -1 ? "break;" : "continue;");
    return code;
};