# Browser Customizations

## Bookmarklets

To install, follow [these instructions](https://mreidsma.github.io/bookmarklets/installing.html).

Name | Description
--- | ---
`base64.js` | Adds a Base64 encoder/decoder (on top of any page). Taken from https://mikebywaters.wordpress.com/2012/07/17/javascript-base-64-encoderdecoder-bookmarklet-2/
`dumpLinks.js` | Logs all links in the console.
`findDuplicateStyles.js` | Logs duplicate styles in the console (see source for more comments).
`getElementAndStyle.js` | Allows the user to get a computed property for a given element in the console.
`inject_jQuery.js` | Loads the latest version of jQuery into the page.
`itransToIAST.js` | Converts selected text from ITRANS to IAST (Sanskrit transliteration).
`jetzt.js` | Displays selected text for speed reading (open-source implementation of [Spritz](http://spritzinc.com/). Taken from https://ds300.github.io/jetzt/).
`pinyinBox.js` | Adds a box where pinyin with numbers is converted to pinyin with tone marks (on top of any page).
`showLinks.js` | Shows the link `href` alongside the link text for every link on a page.
`trackClick.js` | Tracks elements being clicked on in the console. Toggles on and off.
`trackFocus.js` | Tracks which element currently has active focus in the console. Toggles on and off.

## Userstyles

For use with [Stylus](https://add0n.com/stylus.html).

Use `Write new style [x] as Usercss`.

Name | Description
--- | ---
`bodybuilding-exercises.user.css` | Make exercise thumbnails larger.
`facebook-ads.user.css` | Hide some(?) Facebook ads.
`google-search-ads.user.css` | Hides sponsored results at the top of Google search results.
`reddit-background-images.user.css` | Removes background images from all Reddit pages.
`undefined-blink.user.css` | Primarily to help with classname interpolation where the variable being interpolated is `undefined` (as with React.js). Using https://github.com/JedWatson/classnames can help.

## Userscripts

Primarily for use with [Tampermonkey](https://tampermonkey.net/).

Name | Description
--- | ---
`dontMakeMeWatch.js` | Keeps pages from detecting when the user has switched tabs/windows. Taken from https://github.com/NavinF/dont.
`linkedInRemoveModal.js` | Removes login modal on LinkedIn pages.
`orangeAnus.js` | Replace all Donald Trump references with Orange Anus. Inspired by http://donaldjdrumpf.com/.
`stripParams.js` | Strips a predefined set of params from a page's location and all of its links.
`wikipediaISBNLinksToAmazon.js` | Replace all ISBN links in Wikipedia pages to links to Amazon.
