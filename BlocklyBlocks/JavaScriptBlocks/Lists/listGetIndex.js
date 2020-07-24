Blockly.Blocks['listGetIndex'] = {
    /**
     * Block for getting element at index.
     * @this {Blockly.Block}
     */
    init: function () {
        var MODE =
            [
                [Blockly.Msg['LISTS_GET_INDEX_GET'], 'GET'],
                [Blockly.Msg['LISTS_GET_INDEX_GET_REMOVE'], 'GET_REMOVE'],
                [Blockly.Msg['LISTS_GET_INDEX_REMOVE'], 'REMOVE']
            ];
        this.WHERE_OPTIONS =
            [
                [Blockly.Msg['LISTS_GET_INDEX_FROM_START'], 'FROM_START'],
                [Blockly.Msg['LISTS_GET_INDEX_FROM_END'], 'FROM_END'],
                [Blockly.Msg['LISTS_GET_INDEX_FIRST'], 'FIRST'],
                [Blockly.Msg['LISTS_GET_INDEX_LAST'], 'LAST'],
                [Blockly.Msg['LISTS_GET_INDEX_RANDOM'], 'RANDOM']
            ];
        this.setHelpUrl(Blockly.Msg['LISTS_GET_INDEX_HELPURL']);
        this.setStyle('list_blocks');
        var modeMenu = new Blockly.FieldDropdown(MODE, function (value) {
            var isStatement = (value == 'REMOVE');
            this.getSourceBlock().updateStatement_(isStatement);
        });
        this.appendValueInput('VALUE')
            .setCheck('Array')
            .appendField(Blockly.Msg['LISTS_GET_INDEX_INPUT_IN_LIST']);
        this.appendDummyInput()
            .appendField(modeMenu, 'MODE')
            .appendField('', 'SPACE');
        this.appendDummyInput('AT');
        if (Blockly.Msg['LISTS_GET_INDEX_TAIL']) {
            this.appendDummyInput('TAIL')
                .appendField(Blockly.Msg['LISTS_GET_INDEX_TAIL']);
        }
        this.setInputsInline(true);
        this.setOutput(true);
        this.updateAt_(true);
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip(function () {
            var mode = thisBlock.getFieldValue('MODE');
            var where = thisBlock.getFieldValue('WHERE');
            var tooltip = '';
            switch (mode + ' ' + where) {
                case 'GET FROM_START':
                case 'GET FROM_END':
                    tooltip = Blockly.Msg['LISTS_GET_INDEX_TOOLTIP_GET_FROM'];
                    break;
                case 'GET FIRST':
                    tooltip = Blockly.Msg['LISTS_GET_INDEX_TOOLTIP_GET_FIRST'];
                    break;
                case 'GET LAST':
                    tooltip = Blockly.Msg['LISTS_GET_INDEX_TOOLTIP_GET_LAST'];
                    break;
                case 'GET RANDOM':
                    tooltip = Blockly.Msg['LISTS_GET_INDEX_TOOLTIP_GET_RANDOM'];
                    break;
                case 'GET_REMOVE FROM_START':
                case 'GET_REMOVE FROM_END':
                    tooltip = Blockly.Msg['LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_FROM'];
                    break;
                case 'GET_REMOVE FIRST':
                    tooltip = Blockly.Msg['LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_FIRST'];
                    break;
                case 'GET_REMOVE LAST':
                    tooltip = Blockly.Msg['LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_LAST'];
                    break;
                case 'GET_REMOVE RANDOM':
                    tooltip = Blockly.Msg['LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_RANDOM'];
                    break;
                case 'REMOVE FROM_START':
                case 'REMOVE FROM_END':
                    tooltip = Blockly.Msg['LISTS_GET_INDEX_TOOLTIP_REMOVE_FROM'];
                    break;
                case 'REMOVE FIRST':
                    tooltip = Blockly.Msg['LISTS_GET_INDEX_TOOLTIP_REMOVE_FIRST'];
                    break;
                case 'REMOVE LAST':
                    tooltip = Blockly.Msg['LISTS_GET_INDEX_TOOLTIP_REMOVE_LAST'];
                    break;
                case 'REMOVE RANDOM':
                    tooltip = Blockly.Msg['LISTS_GET_INDEX_TOOLTIP_REMOVE_RANDOM'];
                    break;
            }
            if (where == 'FROM_START' || where == 'FROM_END') {
                var msg = (where == 'FROM_START') ?
                    Blockly.Msg['LISTS_INDEX_FROM_START_TOOLTIP'] :
                    Blockly.Msg['LISTS_INDEX_FROM_END_TOOLTIP'];
                tooltip += '  ' + msg.replace('%1',
                    thisBlock.workspace.options.oneBasedIndex ? '#1' : '#0');
            }
            return tooltip;
        });
    },
    /**
     * Create XML to represent whether the block is a statement or a value.
     * Also represent whether there is an 'AT' input.
     * @return {!Element} XML storage element.
     * @this {Blockly.Block}
     */
    mutationToDom: function () {
        var container = Blockly.utils.xml.createElement('mutation');
        var isStatement = !this.outputConnection;
        container.setAttribute('statement', isStatement);
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
        // so 'statement' defaults to false and 'at' defaults to true.
        var isStatement = (xmlElement.getAttribute('statement') == 'true');
        this.updateStatement_(isStatement);
        var isAt = (xmlElement.getAttribute('at') != 'false');
        this.updateAt_(isAt);
    },
    /**
     * Switch between a value block and a statement block.
     * @param {boolean} newStatement True if the block should be a statement.
     *     False if the block should be a value.
     * @private
     * @this {Blockly.Block}
     */
    updateStatement_: function (newStatement) {
        var oldStatement = !this.outputConnection;
        if (newStatement != oldStatement) {
            this.unplug(true, true);
            if (newStatement) {
                this.setOutput(false);
                this.setPreviousStatement(true);
                this.setNextStatement(true);
            } else {
                this.setPreviousStatement(false);
                this.setNextStatement(false);
                this.setOutput(true);
            }
        }
    },
    /**
     * Create or delete an input for the numeric index.
     * @param {boolean} isAt True if the input should exist.
     * @private
     * @this {Blockly.Block}
     */
    updateAt_: function (isAt) {
        // Destroy old 'AT' and 'ORDINAL' inputs.
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
        this.getInput('AT').appendField(menu, 'WHERE');
        if (Blockly.Msg['LISTS_GET_INDEX_TAIL']) {
            this.moveInputBefore('TAIL', null);
        }
    }
};

Blockly.JavaScript['listGetIndex'] = function (block) {
    // Get element at index.
    // Note: Until January 2013 this block did not have MODE or WHERE inputs.
    var mode = block.getFieldValue('MODE') || 'GET';
    var where = block.getFieldValue('WHERE') || 'FROM_START';
    var listOrder = (where == 'RANDOM') ? Blockly.JavaScript.ORDER_COMMA :
        Blockly.JavaScript.ORDER_MEMBER;
    var list = Blockly.JavaScript.valueToCode(block, 'VALUE', listOrder) || '[]';

    switch (where) {
        case ('FIRST'):
            if (mode == 'GET') {
                var code = list + '[0]';
                return [code, Blockly.JavaScript.ORDER_MEMBER];
            } else if (mode == 'GET_REMOVE') {
                var code = list + '.shift()';
                return [code, Blockly.JavaScript.ORDER_MEMBER];
            } else if (mode == 'REMOVE') {
                return list + '.shift();\n';
            }
            break;
        case ('LAST'):
            if (mode == 'GET') {
                var code = list + '.slice(-1)[0]';
                return [code, Blockly.JavaScript.ORDER_MEMBER];
            } else if (mode == 'GET_REMOVE') {
                var code = list + '.pop()';
                return [code, Blockly.JavaScript.ORDER_MEMBER];
            } else if (mode == 'REMOVE') {
                return list + '.pop();\n';
            }
            break;
        case ('FROM_START'):
            var at = Blockly.JavaScript.getAdjusted(block, 'AT');
            if (mode == 'GET') {
                var code = list + '[' + at + ']';
                return [code, Blockly.JavaScript.ORDER_MEMBER];
            } else if (mode == 'GET_REMOVE') {
                var code = list + '.splice(' + at + ', 1)[0]';
                return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
            } else if (mode == 'REMOVE') {
                return list + '.splice(' + at + ', 1);\n';
            }
            break;
        case ('FROM_END'):
            var at = Blockly.JavaScript.getAdjusted(block, 'AT', 1, true);
            if (mode == 'GET') {
                var code = list + '.slice(' + at + ')[0]';
                return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
            } else if (mode == 'GET_REMOVE') {
                var code = list + '.splice(' + at + ', 1)[0]';
                return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
            } else if (mode == 'REMOVE') {
                return list + '.splice(' + at + ', 1);';
            }
            break;
        case ('RANDOM'):
            var functionName = Blockly.JavaScript.provideFunction_(
                'listsGetRandomItem',
                ['function ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ +
                    '(list, remove) {',
                    '  var x = Math.floor(Math.random() * list.length);',
                    '  if (remove) {',
                    '    return list.splice(x, 1)[0];',
                    '  } else {',
                    '    return list[x];',
                    '  }',
                    '}']);
            code = functionName + '(' + list + ', ' + (mode != 'GET') + ')';
            if (mode == 'GET' || mode == 'GET_REMOVE') {
                return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
            } else if (mode == 'REMOVE') {
                return code + ';\n';
            }
            break;
    }
    throw Error('Unhandled combination (lists_getIndex).');
};
