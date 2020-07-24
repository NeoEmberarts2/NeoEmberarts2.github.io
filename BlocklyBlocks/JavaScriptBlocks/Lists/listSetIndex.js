Blockly.Blocks['listSetIndex'] = {
    /**
     * Block for setting the element at index.
     * @this {Blockly.Block}
     */
    init: function () {
        var MODE =
            [
                [Blockly.Msg['LISTS_SET_INDEX_SET'], 'SET'],
                [Blockly.Msg['LISTS_SET_INDEX_INSERT'], 'INSERT']
            ];
        this.WHERE_OPTIONS =
            [
                [Blockly.Msg['LISTS_GET_INDEX_FROM_START'], 'FROM_START'],
                [Blockly.Msg['LISTS_GET_INDEX_FROM_END'], 'FROM_END'],
                [Blockly.Msg['LISTS_GET_INDEX_FIRST'], 'FIRST'],
                [Blockly.Msg['LISTS_GET_INDEX_LAST'], 'LAST'],
                [Blockly.Msg['LISTS_GET_INDEX_RANDOM'], 'RANDOM']
            ];
        this.setHelpUrl(Blockly.Msg['LISTS_SET_INDEX_HELPURL']);
        this.setStyle('list_blocks');
        this.appendValueInput('LIST')
            .setCheck('Array')
            .appendField(Blockly.Msg['LISTS_SET_INDEX_INPUT_IN_LIST']);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown(MODE), 'MODE')
            .appendField('', 'SPACE');
        this.appendDummyInput('AT');
        this.appendValueInput('TO')
            .appendField(Blockly.Msg['LISTS_SET_INDEX_INPUT_TO']);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip(Blockly.Msg['LISTS_SET_INDEX_TOOLTIP']);
        this.updateAt_(true);
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('MODE');
            var where = thisBlock.getFieldValue('WHERE');
            var tooltip = '';
            switch (mode + ' ' + where) {
                case 'SET FROM_START':
                case 'SET FROM_END':
                    tooltip = Blockly.Msg['LISTS_SET_INDEX_TOOLTIP_SET_FROM'];
                    break;
                case 'SET FIRST':
                    tooltip = Blockly.Msg['LISTS_SET_INDEX_TOOLTIP_SET_FIRST'];
                    break;
                case 'SET LAST':
                    tooltip = Blockly.Msg['LISTS_SET_INDEX_TOOLTIP_SET_LAST'];
                    break;
                case 'SET RANDOM':
                    tooltip = Blockly.Msg['LISTS_SET_INDEX_TOOLTIP_SET_RANDOM'];
                    break;
                case 'INSERT FROM_START':
                case 'INSERT FROM_END':
                    tooltip = Blockly.Msg['LISTS_SET_INDEX_TOOLTIP_INSERT_FROM'];
                    break;
                case 'INSERT FIRST':
                    tooltip = Blockly.Msg['LISTS_SET_INDEX_TOOLTIP_INSERT_FIRST'];
                    break;
                case 'INSERT LAST':
                    tooltip = Blockly.Msg['LISTS_SET_INDEX_TOOLTIP_INSERT_LAST'];
                    break;
                case 'INSERT RANDOM':
                    tooltip = Blockly.Msg['LISTS_SET_INDEX_TOOLTIP_INSERT_RANDOM'];
                    break;
            }
            if (where == 'FROM_START' || where == 'FROM_END') {
                tooltip += '  ' + Blockly.Msg['LISTS_INDEX_FROM_START_TOOLTIP']
                    .replace('%1',
                        thisBlock.workspace.options.oneBasedIndex ? '#1' : '#0');
            }
            return tooltip;
        });
    },
    /**
     * Create XML to represent whether there is an 'AT' input.
     * @return {!Element} XML storage element.
     * @this {Blockly.Block}
     */
    mutationToDom: function () {
        var container = Blockly.utils.xml.createElement('mutation');
        var isAt = this.getInput('AT').type == Blockly.INPUT_VALUE;
        container.setAttribute('at', isAt);
        return container;
    },
    /**
     * Parse XML to restore the 'AT' input.
     * @param {!Element} xmlElement XML storage element.
     * @this {Blockly.Block}
     */
    domToMutation: function (xmlElement) {
        // Note: Until January 2013 this block did not have mutations,
        // so 'at' defaults to true.
        var isAt = (xmlElement.getAttribute('at') != 'false');
        this.updateAt_(isAt);
    },
    /**
     * Create or delete an input for the numeric index.
     * @param {boolean} isAt True if the input should exist.
     * @private
     * @this {Blockly.Block}
     */
    updateAt_: function (isAt) {
        // Destroy old 'AT' and 'ORDINAL' input.
        this.removeInput('AT');
        this.removeInput('ORDINAL', true);
        // Create either a value 'AT' input or a dummy input.
        if (isAt) {
            this.appendValueInput('AT').setCheck('Number');
            if (Blockly.Msg['ORDINAL_NUMBER_SUFFIX']) {
                this.appendDummyInput('ORDINAL')
                    .appendField(Blockly.Msg['ORDINAL_NUMBER_SUFFIX']);
            }
        } else {
            this.appendDummyInput('AT');
        }
        var menu = new Blockly.FieldDropdown(this.WHERE_OPTIONS, function (value) {
            var newAt = (value == 'FROM_START') || (value == 'FROM_END');
            // The 'isAt' variable is available due to this function being a closure.
            if (newAt != isAt) {
                var block = this.getSourceBlock();
                block.updateAt_(newAt);
                // This menu has been destroyed and replaced.  Update the replacement.
                block.setFieldValue(value, 'WHERE');
                return null;
            }
            return undefined;
        });
        this.moveInputBefore('AT', 'TO');
        if (this.getInput('ORDINAL')) {
            this.moveInputBefore('ORDINAL', 'TO');
        }

        this.getInput('AT').appendField(menu, 'WHERE');
    }
};

Blockly.JavaScript['listSetIndex'] = function (block) {
    // Set element at index.
    // Note: Until February 2013 this block did not have MODE or WHERE inputs.
    var list = Blockly.JavaScript.valueToCode(block, 'LIST',
        Blockly.JavaScript.ORDER_MEMBER) || '[]';
    var mode = block.getFieldValue('MODE') || 'GET';
    var where = block.getFieldValue('WHERE') || 'FROM_START';
    var value = Blockly.JavaScript.valueToCode(block, 'TO',
        Blockly.JavaScript.ORDER_ASSIGNMENT) || 'null';
    // Cache non-trivial values to variables to prevent repeated look-ups.
    // Closure, which accesses and modifies 'list'.
    function cacheList () {
        if (list.match(/^\w+$/)) {
            return '';
        }
        var listVar = Blockly.JavaScript.variableDB_.getDistinctName(
            'tmpList', Blockly.VARIABLE_CATEGORY_NAME);
        var code = 'var ' + listVar + ' = ' + list + ';\n';
        list = listVar;
        return code;
    }
    switch (where) {
        case ('FIRST'):
            if (mode == 'SET') {
                return list + '[0] = ' + value + ';\n';
            } else if (mode == 'INSERT') {
                return list + '.unshift(' + value + ');\n';
            }
            break;
        case ('LAST'):
            if (mode == 'SET') {
                var code = cacheList();
                code += list + '[' + list + '.length - 1] = ' + value + ';\n';
                return code;
            } else if (mode == 'INSERT') {
                return list + '.push(' + value + ');\n';
            }
            break;
        case ('FROM_START'):
            var at = Blockly.JavaScript.getAdjusted(block, 'AT');
            if (mode == 'SET') {
                return list + '[' + at + '] = ' + value + ';\n';
            } else if (mode == 'INSERT') {
                return list + '.splice(' + at + ', 0, ' + value + ');\n';
            }
            break;
        case ('FROM_END'):
            var at = Blockly.JavaScript.getAdjusted(block, 'AT', 1, false,
                Blockly.JavaScript.ORDER_SUBTRACTION);
            var code = cacheList();
            if (mode == 'SET') {
                code += list + '[' + list + '.length - ' + at + '] = ' + value + ';\n';
                return code;
            } else if (mode == 'INSERT') {
                code += list + '.splice(' + list + '.length - ' + at + ', 0, ' + value +
                    ');\n';
                return code;
            }
            break;
        case ('RANDOM'):
            var code = cacheList();
            var xVar = Blockly.JavaScript.variableDB_.getDistinctName(
                'tmpX', Blockly.VARIABLE_CATEGORY_NAME);
            code += 'var ' + xVar + ' = Math.floor(Math.random() * ' + list +
                '.length);\n';
            if (mode == 'SET') {
                code += list + '[' + xVar + '] = ' + value + ';\n';
                return code;
            } else if (mode == 'INSERT') {
                code += list + '.splice(' + xVar + ', 0, ' + value + ');\n';
                return code;
            }
            break;
    }
    throw Error('Unhandled combination (lists_setIndex).');
};

