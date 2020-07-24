Blockly.Blocks['toBlankCase'] = {
    /**
     * Block for changing capitalization.
     * @this {Blockly.Block}
     */
    init: function () {
        var OPERATORS = [
            ["to upper case", 'UPPERCASE'],
            [Blockly.Msg['TEXT_CHANGECASE_OPERATOR_LOWERCASE'], 'LOWERCASE'],
            ["to title case", 'TITLECASE']
        ];
        this.setHelpUrl(Blockly.Msg['TEXT_CHANGECASE_HELPURL']);
        this.setStyle('text_blocks');
        this.appendValueInput('TEXT')
            .setCheck('String')
            .appendField(new Blockly.FieldDropdown(OPERATORS), 'CASE');
        this.setOutput(true, 'String');
        this.setTooltip(Blockly.Msg['TEXT_CHANGECASE_TOOLTIP']);
    }
};


Blockly.JavaScript['toBlankCase'] = function (block) {
    // Change capitalization.
    var OPERATORS = {
        'UPPERCASE': '.toUpperCase()',
        'LOWERCASE': '.toLowerCase()',
        'TITLECASE': null
    };
    var operator = OPERATORS[block.getFieldValue('CASE')];
    var textOrder = operator ? Blockly.JavaScript.ORDER_MEMBER :
        Blockly.JavaScript.ORDER_NONE;
    var text = Blockly.JavaScript.valueToCode(block, 'TEXT',
        textOrder) || '\'\'';
    if (operator) {
        // Upper and lower case are functions built into JavaScript.
        var code = text + operator;
    } else {
        // Title case is not a native JavaScript function.  Define one.
        var functionName = Blockly.JavaScript.provideFunction_(
            'textToTitleCase',
            ['function ' + Blockly.JavaScript.FUNCTION_NAME_PLACEHOLDER_ +
                '(str) {',
                '  return str.replace(/\\S+/g,',
            '      function(txt) {return txt[0].toUpperCase() + ' +
            'txt.substring(1).toLowerCase();});',
                '}']);
        var code = functionName + '(' + text + ')';
    }
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};
