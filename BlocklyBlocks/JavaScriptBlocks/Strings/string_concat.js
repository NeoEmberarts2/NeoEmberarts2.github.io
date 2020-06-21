Blockly.Blocks['string_concat'] = {
    init: function () {
        this.appendValueInput("IF0")
            .setCheck(["String", "Number"])
            .appendField("Join Strings: ");
        this.setOutput(true, null);
        this.setColour(120);
        this.setTooltip("create text with strings or numbers");
        this.setHelpUrl("");
        this.setMutator(new Blockly.Mutator(['item']));

        this.elseifCount_ = 0;

    },

    mutationToDom: function () {
        if (!this.elseifCount_ && !this.elseCount_) {
            return null;

        }
        var container = document.createElement('mutation');
        if (this.elseifCount_) {
            container.setAttribute('elseif', this.elseifCount_);

        }
        if (this.elseCount_) {
            container.setAttribute('else', 1);

        }
        return container;

    },
    domToMutation: function (xmlElement) {
        this.elseifCount_ = parseInt(xmlElement.getAttribute('elseif'), 10) || 0;
        this.elseCount_ = parseInt(xmlElement.getAttribute('else'), 10) || 0;
        this.updateShape_();

    },
    decompose: function (workspace) {
        var containerBlock = workspace.newBlock('item');//TODO: create another seperate block so that the blocks arn't disabled
        containerBlock.initSvg();
        var connection = containerBlock.nextConnection;
        for (var i = 1; i <= this.elseifCount_; i++) {
            var elseifBlock = workspace.newBlock('item');
            elseifBlock.initSvg();
            connection.connect(elseifBlock.previousConnection);
            connection = elseifBlock.nextConnection;

        }
        if (this.elseCount_) {
            var elseBlock = workspace.newBlock('controls_if_else');
            elseBlock.initSvg();
            connection.connect(elseBlock.previousConnection);

        }
        return containerBlock;

    },
    compose: function (containerBlock) {
        var clauseBlock = containerBlock.nextConnection.targetBlock();
        // Count number of inputs.
        this.elseifCount_ = 0;
        this.elseCount_ = 0;
        var valueConnections = [null];
        var statementConnections = [null];
        var elseStatementConnection = null;
        while (clauseBlock) {
            switch (clauseBlock.type) {
                case 'item':
                    this.elseifCount_++;
                    valueConnections.push(clauseBlock.valueConnection_);
                    statementConnections.push(clauseBlock.statementConnection_);
                    break;
                case 'controls_if_else':
                    this.elseCount_++;
                    elseStatementConnection = clauseBlock.statementConnection_;
                    break;
                default:
                    throw 'Unknown block type.';
            };
            clauseBlock = clauseBlock.nextConnection &&
                clauseBlock.nextConnection.targetBlock();

        }
        this.updateShape_();
        for (var i = 1; i <= this.elseifCount_; i++) {
            Blockly.Mutator.reconnect(valueConnections[i], this, 'IF' + i);

        }
        Blockly.Mutator.reconnect(elseStatementConnection, this, 'ELSE');
    },
    saveConnections: function (containerBlock) {
        var clauseBlock = containerBlock.nextConnection.targetBlock();
        var i = 1;
        while (clauseBlock) {
            switch (clauseBlock.type) {
                case 'item':
                    var inputIf = this.getInput('IF' + i);
                    clauseBlock.valueConnection_ =
                        inputIf && inputIf.connection.targetConnection;

                    i++;
                    break;
                case 'controls_if_else':
                    var inputDo = this.getInput('ELSE');
                    clauseBlock.statementConnection_ =
                        inputDo && inputDo.connection.targetConnection;
                    break;
                default:
                    throw 'Unknown block type.';

            }
            clauseBlock = clauseBlock.nextConnection &&
                clauseBlock.nextConnection.targetBlock();

        }

    },
    updateShape_: function () {
        // Delete everything.
        if (this.getInput('ELSE')) {
            this.removeInput('ELSE');
            ;
        }
        var i = 1;
        while (this.getInput('IF' + i)) {
            this.removeInput('IF' + i);
            i++;

        }
        // Rebuild block.
        for (var i = 1; i <= this.elseifCount_; i++) {
            this.appendValueInput('IF' + i)
                .setCheck('Boolean')
                .appendField("and");

        };


    }

};


Blockly.JavaScript['string_concat'] = function (block) {

    var n = 0;
    var code = '', conditionCode;

    do {
        conditionCode = Blockly.JavaScript.valueToCode(block, 'IF' + n, Blockly.JavaScript.ORDER_NONE) || "";

        code += (n > 0 ? '+' : '') + conditionCode.toString();
        ++n;
    } while (block.getInput("IF" + n));

    return code;//[code, Blockly.JavaScript.ORDER_NONE];
};