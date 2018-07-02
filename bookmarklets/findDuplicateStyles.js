javascript:(function () { /* jshint ignore:line */
    /*
        This is a bookmarklet that, when executed on a page, iterates over all rendered stylesheets within the browser and logs out duplicate styles. Depending on which lines you uncomment, you can get the following behaviors:

        * StyleConsolidator.printAllRules(): print all the CSS rules that the browser has parsed.
        * StyleConsolidator.printHashedRules(): print out an object where the keys are stringified styles and the values is an array of their corresponding selectors.
        * StyleConsolidator.printDuplicates(): print out all the styles where there are multiple selectors for an identical style.
        * StyleConsolidator.printRewrittenRules(): prints out a flat version of the stylesheet rules where styles are not repeated.

        NOTE: Media queries and keyframes are currently ignored.
    */

    'use strict';

    /* globals console */

    /*
        RESOURCES
          * http://stackoverflow.com/a/24617033 (How to find duplicate styles in a CSS file? [closed])
          * http://www.overset.com/2008/09/01/javascript-natural-sort-algorithm/


        `[]` is used as a shorthand for `Array.prototype`. Note that although this is semantically equivalent to saying `Array.prototype`, it actually instantiates an array object ([]) only to access its prototype methods. This is a wasted instantiation. Saying `Array.prototype` is more efficient.

        `[].___.apply(thisArg, [argsArray])` retrieves the `___` function from an empty array instantiation. It then calls that function, but using `thisArg` as the `this` object instead of an actual array and arguments provided as an array (or an array-like object) `argsArray`.

        `[].___.call(thisArg[, arg1[, arg2[, ...]]])` retrieves the `___` function from an empty array instantiation. It then calls that function, but using `thisArg` as the `this` object instead of an actual array and arguments listed out as additional parameters. Note that while the syntax of this function is almost identical to that of `apply()`, the fundamental difference is that `call()` accepts an argument list, while `apply()` accepts a single array of arguments.

        `[].concat.apply` can be used to concatenate two arrays together
             * `[].concat.apply([], [array1, array2, ...])`
             * `[].concat.apply([], nodeList) is used to treat NodeLists into Arrays

        `[].map.call` can be used to treat NodeLists into Arrays
             * you call `map()` as if it was a function of NodeList using call()

        `[].slice.call` can be used to treat NodeLists into Arrays
             * you call `slice()` as if it was a function of NodeList using call()
             * `slice()` creates an empty array, then iterates through the object it's running on (originally an array, now a NodeList) and keeps appending the elements of that object to the empty array it created, which is eventually returned
    */

    /* **************************** */

    /*
     * Natural Sort algorithm for Javascript - Version 0.7 - Released under MIT license
     * Author: Jim Palmer (based on chunking idea from Dave Koelle)
     */
    function naturalSort (a, b) {
        var re = /(^-?[0-9]+(\.?[0-9]*)[df]?e?[0-9]?$|^0x[0-9a-f]+$|[0-9]+)/gi,
            sre = /(^[ ]*|[ ]*$)/g,
            dre = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,
            hre = /^0x[0-9a-f]+$/i,
            ore = /^0/,
            i = function(s) { return naturalSort.insensitive && (''+s).toLowerCase() || ''+s; },
            /* convert all to strings strip whitespace */
            x = i(a).replace(sre, '') || '',
            y = i(b).replace(sre, '') || '',
            /* chunk/tokenize */
            xN = x.replace(re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0'),
            yN = y.replace(re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0'),
            /* numeric, hex or date detection */
            xD = parseInt(x.match(hre)) || (xN.length != 1 && x.match(dre) && Date.parse(x)),
            yD = parseInt(y.match(hre)) || xD && y.match(dre) && Date.parse(y) || null,
            oFxNcL, oFyNcL;
        /* first try and sort Hex codes or Dates */
        if (yD) {
            if ( xD < yD ) { return -1; }
            else if ( xD > yD ) { return 1; }
        }
        /* natural sorting through split numeric strings and default strings */
        for(var cLoc=0, numS=Math.max(xN.length, yN.length); cLoc < numS; cLoc++) {
            /* find floats not starting with '0', string or 0 if not defined (Clint Priest) */
            oFxNcL = !(xN[cLoc] || '').match(ore) && parseFloat(xN[cLoc]) || xN[cLoc] || 0;
            oFyNcL = !(yN[cLoc] || '').match(ore) && parseFloat(yN[cLoc]) || yN[cLoc] || 0;
            /* handle numeric vs string comparison - number < string - (Kyle Adams) */
            if (isNaN(oFxNcL) !== isNaN(oFyNcL)) { return (isNaN(oFxNcL)) ? 1 : -1; }
            /* rely on string comparison if different types - i.e. '02' < 2 != '02' < '2' */
            else if (typeof oFxNcL !== typeof oFyNcL) {
                oFxNcL += '';
                oFyNcL += '';
            }
            if (oFxNcL < oFyNcL) { return -1; }
            if (oFxNcL > oFyNcL) { return 1; }
        }
        return 0;
    }

    function padRight (string, padding, length) {
        return string + padding.repeat(Math.max(0, length - string.length));
    }

    function alignArrayOfStringsOnChars (arrayOfStrings, alignDelimiter, paddingCharacter, leadingCharacter) {
        /*
            RESOURCES:
                * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max
                * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf
        */

        paddingCharacter = paddingCharacter || ' ';

        var lengths = arrayOfStrings.map(string => string.indexOf(alignDelimiter));
        var maxLength = Math.max(...lengths);

        return arrayOfStrings.map((string, index) => {
            var pre  = string.slice(0, lengths[index]);
            var post = string.slice(lengths[index], string.length);

            return padRight(pre, paddingCharacter, maxLength) +
                   (leadingCharacter ? leadingCharacter : '') +
                   post;
        });
    }

    var StyleConsolidator = {
        _getAllRules : function () {
            /*
                `document.styleSheets` returns a StyleSheetList (which seems to be an object-like structure with keys as consecutive zero-based indices and a length property)

                `list.cssRules` returns a CSSRuleList (which seems to be an object-like structure with keys as consecutive zero-based indices and a length property)

                Here, `[].map.call` is being used to iterate over array-like objects like true arrays

                Concatenates all the rules within `cssRules` of all stylesheets into a flat array.
            */
            return [].concat.apply([], [].map.call(document.styleSheets, function (stylesheet) {
                if (stylesheet.cssRules) { /* google fonts and other non-standard stylesheets won't have `cssRules` */
                    return [].map.call(stylesheet.cssRules, function (rule) {
                        return rule;
                    });
                } else {
                    return [];
                }
            }));
        },

        printAllRules : function () {
            console.info(this._getAllRules());
        },

        _hashRules : function (rules) {
            /*
                Here, we create an object where the key is a string of style blocks all written together.
                For example: `border-bottom-color:rgb(0, 102, 153);`.
                The value is an array of the rule that declares that given style.
                If the length of this array is 1, then we know that it is a unique style.
                However, if the length is greater than 1, then there are duplicate styles.
            */

            function getStyle (rule) {
                /* Returns all the style rule values as a string. */

                var style = rule.style;

                if (style) { /* media queries and keyframes won't have `style` */
                    return [].slice.call(style).sort().map(function (name) {
                        return name + ': ' + style[name];
                    }).join('; ');
                } else {
                    return '';
                }
            }

            return rules.reduce(function (final, rule) {
                var key = getStyle(rule);
                var list;

                list = final[key];

                if (!list) {
                    list = final[key] = [];
                }

                list.push(rule);

                return final;
            }, {});
        },

        getHashedRules : function () {
            return this._hashRules(this._getAllRules());
        },

        printHashedRules : function () {
            console.info(this.getHashedRules());
        },

        _rewriteRules : function (rules) {
            /* Here, we rewrite the rules */

            return Object.keys(rules).map(function (style) {
                return rules[style].map(function (rule) {
                    return rule.selectorText;
                }).join() + '{' + style + '}';
            }).join('\n');
        },

        getRewrittenRules : function () {
            return this._rewriteRules(this._hashRules(this._getAllRules()));
        },

        printRewrittenRules : function () {
            console.info(this.getRewrittenRules());
        },

        _findDuplicates : function (rules) {
            return Object.keys(rules).map(function (style) {
                var output;

                if (rules[style].length > 1) {
                    output = '{\n  ' +
                                alignArrayOfStringsOnChars(style.split('; '), ':', ' ', ' ').join(';\n  ') + ';\n' +
                             '}\n';

                    rules[style].forEach(function (ruleStyle) {
                        if (ruleStyle.selectorText) {
                            output = output + '    * ' + ruleStyle.selectorText + '\n';
                        }
                    });
                }

                return output;
            })
                .filter(n => !!n)
                .sort(naturalSort)
                .join('\n')
                .replace(/^\s*[\r\n]/gm, '\n');
        },

        getDuplicates : function () {
            return this._findDuplicates(this._hashRules(this._getAllRules()));
        },

        printDuplicates : function () {
            console.info(this.getDuplicates());
        }
    };

    /* StyleConsolidator.printAllRules(); */
    /* StyleConsolidator.printHashedRules(); */
    StyleConsolidator.printDuplicates();
    /* StyleConsolidator.printRewrittenRules(); */
})();
