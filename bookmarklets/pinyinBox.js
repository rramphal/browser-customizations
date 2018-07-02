javascript:(function () {

    /* ======= GLOBALS ======= */

    var originalFocusedElement;
    var pinyinBox;
    var pinyinInput;

    /* ======= DOM ======= */

    function buildBox () {
        pinyinInput = document.createElement('input');
        pinyinBox   = document.createElement('div');

        pinyinInput.id                 = 'pinyinInput';
        pinyinInput.name               = 'pinyinInput';
        pinyinInput.style.borderColor  = 'black';
        pinyinInput.style.borderStyle  = 'solid';
        pinyinInput.style.borderWidth  = '1px';
        pinyinInput.style.fontSize     = '24px';
        pinyinInput.type               = 'text';

        pinyinBox.id                    = 'pinyinBox';
        pinyinBox.style.backgroundColor = 'lightgray';
        pinyinBox.style.borderRadius    = '5px';
        pinyinBox.style.margin          = '10px';
        pinyinBox.style.padding         = '10px';
        pinyinBox.style.position        = 'fixed';
        pinyinBox.style.right           = '0px';
        pinyinBox.style.top             = '0px';
        pinyinBox.style.zIndex          = '9999';
    }

    function addBoxToDOM () {
        pinyinBox.appendChild(pinyinInput);
        document.body.appendChild(pinyinBox);
    }

    function removeBoxFromDOM () {
        document.body.removeChild(pinyinBox);
    }

    function appendTextToOriginalElement () {
        originalFocusedElement.value = originalFocusedElement.value + pinyinInput.value;
    }

    /* ======= PINYIN ======= */

    function processInput() {
        var output = pinyinInput.value;

        output = output.replace(/a1/g, 'ā');
        output = output.replace(/a2/g, 'á');
        output = output.replace(/a3/g, 'ǎ');
        output = output.replace(/a4/g, 'à');
        output = output.replace(/a5/g, 'a');
        output = output.replace(/A1/g, 'Ā');
        output = output.replace(/A2/g, 'Á');
        output = output.replace(/A3/g, 'Ǎ');
        output = output.replace(/A4/g, 'À');
        output = output.replace(/A5/g, 'A');

        output = output.replace(/e1/g, 'ē');
        output = output.replace(/e2/g, 'é');
        output = output.replace(/e3/g, 'ě');
        output = output.replace(/e4/g, 'è');
        output = output.replace(/e5/g, 'e');
        output = output.replace(/E1/g, 'Ē');
        output = output.replace(/E2/g, 'É');
        output = output.replace(/E3/g, 'Ě');
        output = output.replace(/E4/g, 'È');
        output = output.replace(/E5/g, 'E');

        output = output.replace(/i1/g, 'ī');
        output = output.replace(/i2/g, 'í');
        output = output.replace(/i3/g, 'ǐ');
        output = output.replace(/i4/g, 'ì');
        output = output.replace(/i5/g, 'i');
        output = output.replace(/I1/g, 'Ī');
        output = output.replace(/I2/g, 'Í');
        output = output.replace(/I3/g, 'Ǐ');
        output = output.replace(/I4/g, 'Ì');
        output = output.replace(/I5/g, 'I');

        output = output.replace(/o1/g, 'ō');
        output = output.replace(/o2/g, 'ó');
        output = output.replace(/o3/g, 'ǒ');
        output = output.replace(/o4/g, 'ò');
        output = output.replace(/o5/g, 'o');
        output = output.replace(/O1/g, 'Ō');
        output = output.replace(/O2/g, 'Ó');
        output = output.replace(/O3/g, 'Ǒ');
        output = output.replace(/O4/g, 'Ò');
        output = output.replace(/O5/g, 'O');

        output = output.replace(/u1/g, 'ū');
        output = output.replace(/u2/g, 'ú');
        output = output.replace(/u3/g, 'ǔ');
        output = output.replace(/u4/g, 'ù');
        output = output.replace(/u5/g, 'u');
        output = output.replace(/U1/g, 'Ū');
        output = output.replace(/U2/g, 'Ú');
        output = output.replace(/U3/g, 'Ǔ');
        output = output.replace(/U4/g, 'Ù');
        output = output.replace(/U5/g, 'U');

        output = output.replace(/v1/g, 'ǖ');
        output = output.replace(/v2/g, 'ǘ');
        output = output.replace(/v3/g, 'ǚ');
        output = output.replace(/v4/g, 'ǜ');
        output = output.replace(/v5/g, 'ü');
        /* cannot be capitalized */

        output = output.replace(/an1/g, 'ān');
        output = output.replace(/an2/g, 'án');
        output = output.replace(/an3/g, 'ǎn');
        output = output.replace(/an4/g, 'àn');
        output = output.replace(/an5/g, 'an');
        output = output.replace(/An1/g, 'Ān');
        output = output.replace(/An2/g, 'Án');
        output = output.replace(/An3/g, 'Ǎn');
        output = output.replace(/An4/g, 'Àn');
        output = output.replace(/An5/g, 'An');

        output = output.replace(/ang1/g, 'āng');
        output = output.replace(/ang2/g, 'áng');
        output = output.replace(/ang3/g, 'ǎng');
        output = output.replace(/ang4/g, 'àng');
        output = output.replace(/ang5/g, 'ang');
        output = output.replace(/Ang1/g, 'Āng');
        output = output.replace(/Ang2/g, 'Áng');
        output = output.replace(/Ang3/g, 'Ǎng');
        output = output.replace(/Ang4/g, 'Àng');
        output = output.replace(/Ang5/g, 'Ang');

        output = output.replace(/en1/g, 'ēn');
        output = output.replace(/en2/g, 'én');
        output = output.replace(/en3/g, 'ěn');
        output = output.replace(/en4/g, 'èn');
        output = output.replace(/en5/g, 'en');
        output = output.replace(/En1/g, 'Ēn');
        output = output.replace(/En2/g, 'Én');
        output = output.replace(/En3/g, 'Ěn');
        output = output.replace(/En4/g, 'Èn');
        output = output.replace(/En5/g, 'En');

        output = output.replace(/eng1/g, 'ēng');
        output = output.replace(/eng2/g, 'éng');
        output = output.replace(/eng3/g, 'ěng');
        output = output.replace(/eng4/g, 'èng');
        output = output.replace(/eng5/g, 'eng');
        output = output.replace(/Eng1/g, 'Ēng');
        output = output.replace(/Eng2/g, 'Éng');
        output = output.replace(/Eng3/g, 'Ěng');
        output = output.replace(/Eng4/g, 'Èng');
        output = output.replace(/Eng5/g, 'Eng');

        output = output.replace(/in1/g, 'īn');
        output = output.replace(/in2/g, 'ín');
        output = output.replace(/in3/g, 'ǐn');
        output = output.replace(/in4/g, 'ìn');
        output = output.replace(/in5/g, 'in');
        /* cannot be capitalized */

        output = output.replace(/ing1/g, 'īng');
        output = output.replace(/ing2/g, 'íng');
        output = output.replace(/ing3/g, 'ǐng');
        output = output.replace(/ing4/g, 'ìng');
        output = output.replace(/ing5/g, 'ing');
        /* cannot be capitalized */

        output = output.replace(/ong1/g, 'ōng');
        output = output.replace(/ong2/g, 'óng');
        output = output.replace(/ong3/g, 'ǒng');
        output = output.replace(/ong4/g, 'òng');
        output = output.replace(/ong5/g, 'ong');
        /* cannot be capitalized */

        output = output.replace(/un1/g, 'ūn');
        output = output.replace(/un2/g, 'ún');
        output = output.replace(/un3/g, 'ǔn');
        output = output.replace(/un4/g, 'ùn');
        output = output.replace(/un5/g, 'un');
        /* cannot be capitalized */

        output = output.replace(/er1/g, 'ēr');
        output = output.replace(/er2/g, 'ér');
        output = output.replace(/er3/g, 'ěr');
        output = output.replace(/er4/g, 'èr');
        output = output.replace(/er5/g, 'er');
        output = output.replace(/Er1/g, 'Ēr');
        output = output.replace(/Er2/g, 'Ér');
        output = output.replace(/Er3/g, 'Ěr');
        output = output.replace(/Er4/g, 'Èr');
        output = output.replace(/Er5/g, 'Er');

        /* correct tonemark placement */
        output = output.replace(/aō/g, 'āo');
        output = output.replace(/aó/g, 'áo');
        output = output.replace(/aǒ/g, 'ǎo');
        output = output.replace(/aò/g, 'ào');
        output = output.replace(/oū/g, 'ōu');
        output = output.replace(/oú/g, 'óu');
        output = output.replace(/oǔ/g, 'ǒu');
        output = output.replace(/où/g, 'òu');
        output = output.replace(/aī/g, 'āi');
        output = output.replace(/aí/g, 'ái');
        output = output.replace(/aǐ/g, 'ǎi');
        output = output.replace(/aì/g, 'ài');
        output = output.replace(/eī/g, 'ēi');
        output = output.replace(/eí/g, 'éi');
        output = output.replace(/eǐ/g, 'ěi');
        output = output.replace(/eì/g, 'èi');

        pinyinInput.value = output;
    }

    /* ======= EVENTS ======= */

    function onInputKeyup (event) {
        var key = event.which ? event.which : event.keyCode;

        if (key === 13) { /* enter */
            event.preventDefault();
            appendTextToOriginalElement();
            teardown();
        } else {
            processInput();
        }
    }

    function addEventListeners () {
        pinyinInput.addEventListener('keyup', onInputKeyup);
        document.body.addEventListener('paste', teardown);
    }

    function removeEventListeners () {
        pinyinInput.removeEventListener('keyup', onInputKeyup);
        document.body.removeEventListener('paste', teardown);
    }

    /* ======= FOCUS ======= */

    function saveCurrentlyFocusedElement () {
        originalFocusedElement = document.activeElement;
    }

    function focusBox () {
        pinyinInput.focus();
    }

    function returnFocus () {
        originalFocusedElement.focus();
    }

    /* ======= LIFECYCLE ======= */

    function clearVariables () {
        originalFocusedElement = undefined;
        pinyinBox              = undefined;
        pinyinInput            = undefined;
    }

    function load () {
        saveCurrentlyFocusedElement();
        buildBox();
        addEventListeners();
        addBoxToDOM();
        focusBox();
    }

    function teardown () {
        removeEventListeners();
        removeBoxFromDOM();
        returnFocus();
        clearVariables();
    }

    /* ======= MAIN ======= */

    load();
})();
