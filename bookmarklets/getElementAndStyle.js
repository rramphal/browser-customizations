javascript:(function () { /* jshint ignore:line */
    /*
        Allows the user to get a computed property for a given element in the console.

        Usage: getElementAndStyle([SELECTOR], [CSS PROPERTY]).

        For example: getElementAndStyle('#id', 'padding-top').
    */

    'use strict';

    /* globals console */

    if (!window.getElementAndStyle) {
        window.getElementAndStyle = function (elementSelector, property) {
            if (elementSelector) {
                var element = document.querySelector(elementSelector);
                var output = {};
                if (element) {
                    output.element = element;
                    if (property) {
                        output[property] = window.getComputedStyle(element)[property];
                    } else {
                        return {
                            element: element,
                            error: 'Missing property parameter for element.'
                        };
                    }
                    return output;
                } else {
                    return 'No element found with selector: ' + elementSelector + '.';
                }
            } else {
                return 'No parameters passed in.';
            }
        };
        console.info('`getElementAndStyle` added to window. USAGE: getElementAndStyle(\'[SELECTOR]\', \'[CSS PROPERTY]\')');
    } else {
        delete window.getElementAndStyle;
        console.info('`getElementAndStyle` removed from window.');
    }
})();
