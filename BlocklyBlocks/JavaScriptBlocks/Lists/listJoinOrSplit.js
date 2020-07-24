Blockly.Blocks['listJoinOrSplit'] = {
    /**
     * Block for splitting text into a list, or joining a list into text.
     * @this {Blockly.Block}
     */
    init: function () {
        // Assign 'this' to a variable for use in the closures below.
        var thisBlock = this;
        var dropdown = new Blockly.FieldDropdown(
            [
                [Blockly.Msg['LISTS_SPLIT_LIST_FROM_TEXT'], 'SPLIT'],
                [Blockly.Msg['LISTS_SPLIT_TEXT_FROM_LIST'], 'JOIN']
            ],
            function (newMode) {
                thisBlock.updateType_(newMode);
            });
        this.setHelpUrl(Blockly.Msg['LISTS_SPLIT_HELPURL']);
        this.setStyle('list_blocks');
        this.appendValueInput('INPUT')
            .setCheck('String')
            .appendField(dropdown, 'MODE');
        this.appendValueInput('DELIM')
            .setCheck('String')
            .appendField(Blockly.Msg['LISTS_SPLIT_WITH_DELIMITER']);
        this.setInputsInline(true);
        this.setOutput(true, 'Array');
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('MODE');
            if (mode == 'SPLIT') {
                return Blockly.Msg['LISTS_SPLIT_TOOLTIP_SPLIT'];
            } else if (mode == 'JOIN') {
                return Blockly.Msg['LISTS_SPLIT_TOOLTIP_JOIN'];
            }
            throw Error('Unknown mode: ' + mode);
        });
    },
    /**
     * Modify this block to have the correct input and output types.
     * @param {string} newMode Either 'SPLIT' or 'JOIN'.
     * @private
     * @this {Blockly.Block}
     */
    updateType_: function (newMode) {
        var mode = this.getFieldValue('MODE');
        if (mode != newMode) {
            var inputConnection = this.getInput('INPUT').connection;
            inputConnection.setShadowDom(null);
            var inputBlock = inputConnection.targetBlock();
            if (inputBlock) {
                inputConnection.disconnect();
                if (inputBlock.isShadow()) {
                    inputBlock.dispose();
                } else {
                    this.bumpNeighbours();
                }
            }
        }
        if (newMode == 'SPLIT') {
            this.outputConnection.setCheck('Array');
            this.getInput('INPUT').setCheck('String');
        } else {
            this.outputConnection.setCheck('String');
            this.getInput('INPUT').setCheck('Array');
        }
    },
    /**
     * Create XML to represent the input and output types.
     * @return {!Element} XML storage element.
     * @this {Blockly.Block}
     */
    mutationToDom: function () {
        var container = Blockly.utils.xml.createElement('mutation');
        container.setAttribute('mode', this.getFieldValue('MODE'));
        return container;
    },
    /**
     * Parse XML to restore the input and output types.
     * @param {!Element} xmlElement XML storage element.
     * @this {Blockly.Block}
     */
    domToMutation: function (xmlElement) {
        this.updateType_(xmlElement.getAttribute('mode'));
    }
};

Blockly.JavaScript['listJoinOrSplit'] = function (block) {
    // Block for splitting text into a list, or joining a list into text.
    var input = Blockly.JavaScript.valueToCode(block, 'INPUT',
        Blockly.JavaScript.ORDER_MEMBER);
    var delimiter = Blockly.JavaScript.valueToCode(block, 'DELIM',
        Blockly.JavaScript.ORDER_NONE) || '\'\'';
    var mode = block.getFieldValue('MODE');
    if (mode == 'SPLIT') {
        if (!input) {
            input = '\'\'';
        }
        var functionName = 'split';
    } else if (mode == 'JOIN') {
        if (!input) {
            input = '[]';
        }
        var functionName = 'join';
    } else {
        throw Error('Unknown mode: ' + mode);
    }
    var code = input + '.' + functionName + '(' + delimiter + ')';
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
