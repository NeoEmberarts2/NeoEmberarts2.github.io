
Blockly.Blocks['substring'] = {
    /**
     * Block for getting substring.
     * @this {Blockly.Block}
     */
    init: function () {
        this['WHERE_OPTIONS_1'] = [
            [Blockly.Msg['TEXT_GET_SUBSTRING_START_FROM_START'], 'FROM_START'],
            [Blockly.Msg['TEXT_GET_SUBSTRING_START_FROM_END'], 'FROM_END'],
            [Blockly.Msg['TEXT_GET_SUBSTRING_START_FIRST'], 'FIRST']
        ];
        this['WHERE_OPTIONS_2'] = [
            [Blockly.Msg['TEXT_GET_SUBSTRING_END_FROM_START'], 'FROM_START'],
            [Blockly.Msg['TEXT_GET_SUBSTRING_END_FROM_END'], 'FROM_END'],
            [Blockly.Msg['TEXT_GET_SUBSTRING_END_LAST'], 'LAST']
        ];
        this.setHelpUrl(Blockly.Msg['TEXT_GET_SUBSTRING_HELPURL']);
        this.setStyle('text_blocks');
        this.appendValueInput('STRING')
            .setCheck('String')
            .appendField(Blockly.Msg['TEXT_GET_SUBSTRING_INPUT_IN_TEXT']);
        this.appendDummyInput('AT1');
        this.appendDummyInput('AT2');
        if (Blockly.Msg['TEXT_GET_SUBSTRING_TAIL']) {
            this.appendDummyInput('TAIL')
                .appendField(Blockly.Msg['TEXT_GET_SUBSTRING_TAIL']);
        }
        this.setInputsInline(true);
        this.setOutput(true, 'String');
        this.updateAt_(1, true);
        this.updateAt_(2, true);
        this.setTooltip(Blockly.Msg['TEXT_GET_SUBSTRING_TOOLTIP']);
    },
    /**
     * Create XML to represent whether there are 'AT' inputs.
     * @return {!Element} XML storage element.
     * @this {Blockly.Block}
     */
    mutationToDom: function () {
        var container = Blockly.utils.xml.createElement('mutation');
        var isAt1 = this.getInput('AT1').type == Blockly.INPUT_VALUE;
        container.setAttribute('at1', isAt1);
        var isAt2 = this.getInput('AT2').type == Blockly.INPUT_VALUE;
        container.setAttribute('at2', isAt2);
        return container;
    },
    /**
     * Parse XML to restore the 'AT' inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this {Blockly.Block}
     */
    domToMutation: function (xmlElement) {
        var isAt1 = (xmlElement.getAttribute('at1') == 'true');
        var isAt2 = (xmlElement.getAttribute('at2') == 'true');
        this.updateAt_(1, isAt1);
        this.updateAt_(2, isAt2);
    },
    /**
     * Create or delete an input for a numeric index.
     * This block has two such inputs, independent of each other.
     * @param {number} n Specify first or second input (1 or 2).
     * @param {boolean} isAt True if the input should exist.
     * @private
     * @this {Blockly.Block}
     */
    updateAt_: function (n, isAt) {
        // Create or delete an input for the numeric index.
        // Destroy old 'AT' and 'ORDINAL' inputs.
        this.removeInput('AT' + n);
        this.removeInput('ORDINAL' + n, true);
        // Create either a value 'AT' input or a dummy input.
        if (isAt) {
            this.appendValueInput('AT' + n).setCheck('Number');
            if (Blockly.Msg['ORDINAL_NUMBER_SUFFIX']) {
                this.appendDummyInput('ORDINAL' + n)
                    .appendField(Blockly.Msg['ORDINAL_NUMBER_SUFFIX']);
            }
        } else {
            this.appendDummyInput('AT' + n);
        }
        // Move tail, if present, to end of block.
        if (n == 2 && Blockly.Msg['TEXT_GET_SUBSTRING_TAIL']) {
            this.removeInput('TAIL', true);
            this.appendDummyInput('TAIL')
                .appendField(Blockly.Msg['TEXT_GET_SUBSTRING_TAIL']);
        }
        var menu = new Blockly.FieldDropdown(this['WHERE_OPTIONS_' + n],
            function (value) {
                var newAt = (value == 'FROM_START') || (value == 'FROM_END');
                // The 'isAt' variable is available due to this function being a
                // closure.
                if (newAt != isAt) {
                    var block = this.getSourceBlock();
                    block.updateAt_(n, newAt);
                    // This menu has been destroyed and replaced.
                    // Update the replacement.
                    block.setFieldValue(value, 'WHERE' + n);
                    return null;
                }
                return undefined;
            });

        this.getInput('AT' + n)
            .appendField(menu, 'WHERE' + n);
        if (n == 1) {
            this.moveInputBefore('AT1', 'AT2');
            if (this.getInput('ORDINAL1')) {
                this.moveInputBefore('ORDINAL1', 'AT2');
            }
        }
    }
};




Blockly.JavaScript['substring'] = function (block) {
    // Get substring.
    var text = Blockly.JavaScript.valueToCode(block, 'STRING',
        Blockly.JavaScript.ORDER_FUNCTION_CALL) || '\'\'';
    var where1 = block.getFieldValue('WHERE1');
    var where2 = block.getFieldValue('WHERE2');
    if (where1 == 'FIRST' && where2 == 'LAST') {
        var code = text;
    } else if (text.match(/^'?\w+'?$/) ||
        (where1 != 'FROM_END' && where1 != 'LAST' &&
            where2 != 'FROM_END' && where2 != 'LAST')) {
        // If the text is a variable or literal or doesn't require a call for
        // length, don't generate a helper function.
        switch (where1) {
            case 'FROM_START':
                var at1 = Blockly.JavaScript.getAdjusted(block, 'AT1');
                break;
            case 'FROM_END':
                var at1 = Blockly.JavaScript.getAdjusted(block, 'AT1', 1, false,
                    Blockly.JavaScript.ORDER_SUBTRACTION);
                at1 = text + '.length - ' + at1;
                break;
            case 'FIRST':
                var at1 = '0';
                break;
            default:
                throw Error('Unhandled option (text_getSubstring).');
        }
        switch (where2) {
            case 'FROM_START':
                var at2 = Blockly.JavaScript.getAdjusted(block, 'AT2', 1);
                break;
            case 'FROM_END':
                var at2 = Blockly.JavaScript.getAdjusted(block, 'AT2', 0, false,
                    Blockly.JavaScript.ORDER_SUBTRACTION);
                at2 = text + '.length - ' + at2;
                break;
            case 'LAST':
                var at2 = text + '.length';
                break;
            default:
                throw Error('Unhandled option (text_getSubstring).');
        }
        code = text + '.slice(' + at1 + ', ' + at2 + ')';
    } else {
        var at1 = Blockly.JavaScript.getAdjusted(block, 'AT1');
        var at2 = Blockly.JavaScript.getAdjusted(block, 'AT2');
        var getIndex_ = Blockly.JavaScript.text.getIndex_;
        var wherePascalCase = {
            'FIRST': 'First', 'LAST': 'Last',
            'FROM_START': 'FromStart', 'FROM_END': 'FromEnd'
        };
        var functionName = Blockly.JavaScript.provideFunction_(
            'subsequence' + wherePascalCase[where1] + wherePascalCase[where2],
            ['function ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ +
                '(sequence' +
                // The value for 'FROM_END' and'FROM_START' depends on `at` so
                // we add it as a parameter.
                ((where1 == 'FROM_END' || where1 == 'FROM_START') ? ', at1' : '') +
                ((where2 == 'FROM_END' || where2 == 'FROM_START') ? ', at2' : '') +
                ') {',
            '  var start = ' + getIndex_('sequence', where1, 'at1') + ';',
            '  var end = ' + getIndex_('sequence', where2, 'at2') + ' + 1;',
                '  return sequence.slice(start, end);',
                '}']);
        var code = functionName + '(' + text +
            // The value for 'FROM_END' and 'FROM_START' depends on `at` so we
            // pass it.
            ((where1 == 'FROM_END' || where1 == 'FROM_START') ? ', ' + at1 : '') +
            ((where2 == 'FROM_END' || where2 == 'FROM_START') ? ', ' + at2 : '') +
            ')';
    }
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};