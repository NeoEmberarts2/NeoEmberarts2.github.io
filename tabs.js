/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview JavaScript for Blockly's Code demo.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

/**
 * Create a namespace for the application.
 */
var Code = {};



/**
 * Blockly's main workspace.
 * @type {Blockly.WorkspaceSvg}
 */
Code.workspace = null;

//Declare the Code Viewer Element
Code.editor = null;

/**
 * Bind a function to a button's click event.
 * On touch enabled browsers, ontouchend is treated as equivalent to onclick.
 * @param {!Element|string} el Button element or ID thereof.
 * @param {!Function} func Event handler to bind.
 */
Code.bindClick = function (el, func) {
    if (typeof el == 'string') {
        el = document.getElementById(el);
    }
    el.addEventListener('click', func, true);
    el.addEventListener('touchend', func, true);
};

/**
 * Compute the absolute coordinates and dimensions of an HTML element.
 * @param {!Element} element Element to match.
 * @return {!Object} Contains height, width, x, and y properties.
 * @private
 */
Code.getBBox_ = function (element) {

    var height = element.offsetHeight;
    var width = element.offsetWidth;
    var x = 0;
    var y = 0;
    do {
        x += element.offsetLeft;
        y += element.offsetTop;
        element = element.offsetParent;
    } while (element);
    return {
        height: height,
        width: width,
        x: x,
        y: y
    };
};


/**
 * List of tab names.
 * @private
 */
//Make sure these match the id's of the <td> elements in the index file. This is the part that is after the underscore(_)
Code.TABS_ = ['blocks', 'viewcode', "download"];

/**
 * List of tab names with casing, for display in the UI.
 * @private
 */
//Text That is displayed on the Active Tab
Code.TABS_DISPLAY_ = [
    'Blocks', 'ViewCode', "download"];

Code.selected = 'blocks';

/**
 * Switch the visible pane when a tab is clicked.
 * @param {string} clickedName Name of tab clicked.
 */
Code.tabClick = function (clickedName) {

    if (clickedName == "download") {

        Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
        var code = Blockly.JavaScript.workspaceToCode(Code.workspace);

        download("BotCode.js", "const Discord = require(\'discord.js\'); \nconst client = new Discord.Client();\n" + js_beautify(code));
        clickedName = "viewcode";
    }

    if (document.getElementById('tab_blocks').classList.contains('tabon')) {
        Code.workspace.setVisible(false);
    }
    // Deselect all tabs and hide all panes.
    for (var i = 0; i < Code.TABS_.length; i++) {
        var name = Code.TABS_[i];
        var tab = document.getElementById('tab_' + name);
        tab.classList.add('taboff');
        tab.classList.remove('tabon');
        document.getElementById('content_' + name).style.visibility = 'hidden';
    }

    // Select the active tab.
    Code.selected = clickedName;
    var selectedTab = document.getElementById('tab_' + clickedName);
    selectedTab.classList.remove('taboff');
    selectedTab.classList.add('tabon');
    // Show the selected pane.
    document.getElementById('content_' + clickedName).style.visibility =
        'visible';
    Code.renderContent();
    // The code menu tab is on if the blocks tab is off.
    var codeMenuTab = document.getElementById('tab_code');

    if (clickedName == 'blocks') {
        Code.workspace.setVisible(true);
        codeMenuTab.className = 'taboff';
        this.editor.setShowPrintMargin(false);
    } else {
        codeMenuTab.className = 'tabon';
    }
    if (clickedName == 'viewcode') {
        //document.getElementById('Codeview').style.visibility = "visible";
        Code.editor.setTheme("ace/theme/pastel_on_dark");
        Code.editor.session.setMode("ace/mode/javascript");
        this.editor.setShowPrintMargin(true);

        showCode();
    }

    // Sync the menu's value with the clicked tab value if needed.
    var codeMenu = document.getElementById('code_menu');
    for (var i = 0; i < codeMenu.options.length; i++) {
        if (codeMenu.options[i].value == clickedName) {
            codeMenu.selectedIndex = i;
            break;
        }
    }
    Blockly.svgResize(Code.workspace);
};

function download (filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}
/**
 * Populate the currently selected pane with content generated from the blocks.
 */
Code.renderContent = function () {

};

/**
 * Attempt to generate the code and display it in the UI, pretty printed.
 * @param generator {!Blockly.Generator} The generator to use.
 */
function showCode () {

    // Generate JavaScript code and display it.
    Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
    var code = Blockly.JavaScript.workspaceToCode(Code.workspace);
    //document.getElementById("Codeveiw").innerHTML = code;

    Code.editor.setValue(js_beautify("const Discord = require('discord.js'); const client = new Discord.Client(); \n" + code));
    Code.editor.selection.clearSelection();

}

/**
 * Check whether all blocks in use have generator functions.
 * @param generator {!Blockly.Generator} The generator to use.
 */
Code.checkAllGeneratorFunctionsDefined = function (generator) {
    var blocks = Code.workspace.getAllBlocks(false);
    var missingBlockGenerators = [];
    for (var i = 0; i < blocks.length; i++) {
        var blockType = blocks[i].type;
        if (!generator[blockType]) {
            if (missingBlockGenerators.indexOf(blockType) == -1) {
                missingBlockGenerators.push(blockType);
            }
        }
    }

    var valid = missingBlockGenerators.length == 0;
    if (!valid) {
        var msg = 'The generator code for the following blocks not specified for ' +
            generator.name_ + ':\n - ' + missingBlockGenerators.join('\n - ');
        Blockly.alert(msg);  // Assuming synchronous. No callback.
    }
    return valid;
};

/**
 * Initialize Blockly and Ace Editor.  Called on page load.
 */
Code.init = function () {

    //Inits the Code viewer element
    Code.editor = ace.edit("Codeveiw");
    var container = document.getElementById('content_area');
    var onresize = function (e) {
        var bBox = Code.getBBox_(container);
        for (var i = 0; i < Code.TABS_.length; i++) {
            var el = document.getElementById('content_' + Code.TABS_[i]);
            el.style.top = bBox.y + 'px';
            el.style.left = bBox.x + 'px';
            // Height and width need to be set, read back, then set again to
            // compensate for scrollbars.
            el.style.height = bBox.height + 'px';
            el.style.height = (2 * bBox.height - el.offsetHeight) + 'px';
            el.style.width = bBox.width + 'px';
            el.style.width = (2 * bBox.width - el.offsetWidth) + 'px';
        }

        // Make the 'Blocks' tab line up with the toolbox.
        if (Code.workspace && Code.workspace.getToolbox().width) {
            document.getElementById('tab_blocks').style.minWidth =
                (Code.workspace.getToolbox().width - 38) + 'px';
            // Account for the 19 pixel margin and on each side.
        }



    };

    window.addEventListener('resize', onresize, false);

    // The toolbox XML specifies each category name using Blockly's messaging
    // format (eg. `<category name="%{BKY_CATLOGIC}">`).
    // These message keys need to be defined in `Blockly.Msg` in order to
    // be decoded by the library. Therefore, we'll use the `MSG` dictionary that's
    // been defined for each language to import each category name message
    // into `Blockly.Msg`.
    // TODO: Clean up the message files so this is done explicitly instead of
    // through this for-loop.


    // Construct the toolbox XML, replacing translated variable names.
    var toolboxText = document.getElementById('toolbox').outerHTML;
    toolboxText = toolboxText.replace(/(^|[^%]){(\w+)}/g,
        function (m, p1, p2) {return p1 + MSG[p2];});
    var toolboxXml = Blockly.Xml.textToDom(toolboxText);
    //declare your workspace options
    var options = {
        toolbox: toolbox,
        collapse: true,
        comments: true,
        disable: true,
        maxBlocks: Infinity,
        trashcan: true,
        horizontalLayout: false,
        toolboxPosition: 'start',
        css: true,
        media: 'media/',
        rtl: false,
        scrollbars: true,
        sounds: true,
        oneBasedIndex: true,
        grid: {
            spacing: 8,
            length: 1,
            colour: '#888',
            snap: true
        }
    };

    Code.workspace = Blockly.inject('content_blocks',
        options);

    //inject your Initial workspace blocks
    var workspaceBlocks = document.getElementById("workspaceBlocks");

    /* Load blocks to workspace. */
    Blockly.Xml.domToWorkspace(workspaceBlocks, Code.workspace);

    // Add to reserved word list: Local variables in execution environment (runJS)
    // and the infinite loop detection function.
    //  Blockly.JavaScript.addReservedWords('code,timeouts,checkTimeout');


    //Set the Blockly Theme to dark (Colors can be customised)
    Blockly.Themes.Dark = Blockly.Theme.defineTheme('dark', {
        'base': Blockly.Themes.Classic,
        'componentStyles': {
            'workspaceBackgroundColour': '#C7CECE',//background col
            'toolboxBackgroundColour': '#6F7373',
            'toolboxForegroundColour': '#fff',
            'flyoutBackgroundColour': '#252526',
            'flyoutForegroundColour': '#ccc',
            'flyoutOpacity': 1,
            'scrollbarColour': '#797979',
            'insertionMarkerColour': '#fff',
            'insertionMarkerOpacity': 0.3,
            'scrollbarOpacity': 0.4,
            'cursorColour': '#d0d0d0'
        }
    });

    //Set Blockly Theme
    Code.workspace.setTheme(Blockly.Themes.Dark);

    //Select Initial Tab
    Code.tabClick(Code.selected);



    for (var i = 0; i < Code.TABS_.length; i++) {
        var name = Code.TABS_[i];
        Code.bindClick('tab_' + name,
            function (name_) {return function () {Code.tabClick(name_);};}(name));
    }
    Code.bindClick('tab_code', function (e) {
        if (e.target !== document.getElementById('tab_code')) {
            // Prevent clicks on child codeMenu from triggering a tab click.
            return;
        }
        Code.changeCodingLanguage();
    });

    onresize();
    Blockly.svgResize(Code.workspace);

    // Lazy-load the syntax-highlighting.

};



/**
 * Discard all blocks from the workspace.
 */
Code.discard = function () {
    var count = Code.workspace.getAllBlocks(false).length;
    if (count < 2 ||
        window.confirm(Blockly.Msg['DELETE_ALL_BLOCKS'].replace('%1', count))) {
        Code.workspace.clear();
        if (window.location.hash) {
            window.location.hash = '';
        }
    }
};


window.addEventListener('load', Code.init);
