(function() {
    $(document).ready(function() {
        var MAX_USERNAME_LENGTH = 20;
        var UNICODE = '\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC';
        var MENTION_REGEX = new RegExp('^[\\s,\\.>()]?@([\\d\\.' + UNICODE + ']{1,20}$)', 'i');
        var MENTION_REPLACE_REGEX = new RegExp('^@[\\d\\.' + UNICODE + ']{1,20}$', 'i');
        var mentionsList;
        var textarea;
        var typingMention = false;

        function setup() {
            mentionsList = document.createElement('ul');
            mentionsList.className = 'MentionsList ac_results';
            mentionsList.style.position = 'fixed';
            document.body.appendChild(mentionsList);

            var previousMention;
            var shouldPropose = true;
            var $textarea = $('textarea.TextBox');
            textarea = $textarea.get(0);

            $textarea.on('keydown', function(e) {
                switch (e.keyCode) {
                    case 8: // backspace
                        $textarea.keypress();
                        return;
                    case 10:
                    case 13: // enter
                        if (typingMention && previousMention && acceptProposal(e.ctrlKey)) {
                            e.preventDefault();
                        }
                        return;
                    case 16: // shift
                    case 17: // ctrl
                        return;
                    case 27: // escape
                        shouldPropose = false;
                        discardMentions();
                        return;
                    case 38: // up
                        if (typingMention && previousMention) {
                            e.preventDefault();
                            moveUp();
                        }
                        return;
                    case 40: // down
                        if (typingMention && previousMention) {
                            e.preventDefault();
                            moveDown();
                        }
                        return;
                    default:
                        discardMentions();
                        return;
                }
            });

            $textarea.on('keypress', function(e) {
                window.setTimeout(function() {
                    var mention = getMention(e.target.value, e.target.selectionStart);
                    if (mention) {
                        if (mention != previousMention && shouldPropose) {
                            previousMention = mention;
                            typingMention = true;
                            getProposals(mention);
                        }
                    } else {
                        shouldPropose = true;
                        discardMentions();
                    }
                }, 0);
            });

            $(mentionsList).on('click', 'li', function(e) {
                replaceMention(e.currentTarget.textContent);
                textarea.focus();
            });
        }

        /**
         * Accept the currently selected proposal
         *
         * @param {boolean} force Take the first if none are selected
         * @returns {boolean} true if a proposal was inserted
         */
        function acceptProposal(force) {
            if (mentionsList.childNodes.length > 0) {
                var index = $(mentionsList).find('.Active').index();

                if (index >= 0 || force) {
                    if (force) {
                        index = 0;
                    }

                    return replaceMention(mentionsList.childNodes[index].textContent);
                }
            }

            return false;
        }

        /**
         * Remove all current mentions
         */
        function discardMentions() {
            typingMention = false;
            mentionsList.innerHTML = '';
            mentionsList.style.display = 'none';
        }

        /**
         * Get the currently typed mention or null if no valid mention are typed
         *
         * @param {string} text The full content of the textbox
         * @param {int} caretPosition The index of the caret
         * @returns {string}
         */
        function getMention(text, caretPosition) {
            var beforeCaret = text.substring(0, caretPosition);
            var mentionStart = beforeCaret.lastIndexOf('@');

            if (mentionStart < 0) {
                return null; // No @ before the caret
            }

            /**
             * Search from one char before so that we can validate that it's an allowed
             * location for a mention
             *
             * @type {string}
             */
            var searchString = beforeCaret.substring(mentionStart-1);
            if (searchString.length > MAX_USERNAME_LENGTH) {
                return null;
            }
            var match = searchString.match(MENTION_REGEX);

            if (!match) {
                return null; // No valid mention before the caret
            }

            return match[1];
        }

        /**
         * Get all proposed usernames matching mention
         *
         * @param {string} mention
         */
        function getProposals(mention) {
            $.get(gdn.url('/dashboard/user/autocomplete/'), {
                    'q': mention,
                    'limit': 10,
                    'timestamp': +new Date()
                },
                function(data){
                    var usernames = data.split(/\|\d+\n/); // Remove id and spilt names into an array

                    if (usernames.length >= 1 && !usernames[usernames.length-1]) {
                        usernames.pop(); // Remove last item if it's empty
                    }

                    renderProposals(mention, usernames);
                }
            );
        }

        /**
         * Move the selection
         * Goes down on positive length, up on negative
         *
         * @param {int} length
         */
        function move(length) {
            if (mentionsList.childNodes.length > 0) {
                var index = $(mentionsList).find('.Active').index();

                if (index < 0) {
                    if (length > 0) {
                        mentionsList.firstChild.className = 'Active';
                    } else {
                        mentionsList.lastChild.className = 'Active';
                    }
                } else {
                    mentionsList.childNodes[index].className = '';
                    var newIndex = index + length;

                    if (newIndex >= 0 && newIndex < mentionsList.childNodes.length) {
                        mentionsList.childNodes[newIndex].className = 'Active';
                    }
                }
            }
        }

        /**
         * Move the selection on step down
         */
        function moveDown() {
            move(1);
        }

        /**
         * Move the selection on step up
         */
        function moveUp() {
            move(-1);
        }

        /**
         * Render the proposal selection list
         *
         * @param {string} mention
         * @param {Array<string>} usernames
         */
        function renderProposals(mention, usernames) {
            mentionsList.innerHTML = '';

            for (var i = 0; i < usernames.length; i++) {
                var written = usernames[i].substring(0, mention.length);
                var proposed = usernames[i].substring(mention.length);

                var listItem = document.createElement('li');
                var strong = document.createElement('strong');
                strong.textContent = written;
                listItem.appendChild(strong);
                listItem.appendChild(document.createTextNode(proposed));

                mentionsList.appendChild(listItem);
            }

            if (usernames.length > 0) {
                var caretPosition = getCaretCoordinatesFn(textarea, textarea.selectionEnd);
                var textareaPosition = textarea.getBoundingClientRect();
                mentionsList.style.display = 'block';
                mentionsList.style.top = textareaPosition.top + caretPosition.top + 30 + 'px';
                mentionsList.style.left = textareaPosition.left + caretPosition.left + 'px';

                // Move back if out of screen
                if (parseInt(mentionsList.style.left) + mentionsList.offsetWidth > $(window).width()) {
                    mentionsList.style.left = $(window).width() - mentionsList.offsetWidth  + 'px';
                }
            } else {
                mentionsList.style.display = 'none';
            }
        }

        /**
         * Replace the currently typed mention with proposal
         *
         * @param {string} proposal
         * @returns {boolean}
         */
        function replaceMention(proposal) {
            var caretPosition = textarea.selectionStart;

            var beforeCaret = textarea.value.substring(0, caretPosition);
            var mentionStart = beforeCaret.lastIndexOf('@');

            if (mentionStart < 0) {
                return false; // No @ before the caret
            }

            var searchString = beforeCaret.substring(mentionStart);

            if (searchString.length > MAX_USERNAME_LENGTH) {
                return false;
            }
            var replacement = searchString.replace(MENTION_REPLACE_REGEX, '@' + proposal + ' ');
            var updatedBeforeCaret = beforeCaret.substring(0, mentionStart) + replacement;
            var afterCaret = textarea.value.substring(caretPosition);

            textarea.value = updatedBeforeCaret + afterCaret;
            textarea.selectionStart = updatedBeforeCaret.length;
            textarea.selectionEnd = updatedBeforeCaret.length;

            discardMentions();
            return true;
        }

        setup();
    });


    /*
        Below is textarea-caret-position from https://github.com/component/textarea-caret-position
        by Jonathan Ong
     */

    // The properties that we copy into a mirrored div.
    // Note that some browsers, such as Firefox,
    // do not concatenate properties, i.e. padding-top, bottom etc. -> padding,
    // so we have to do every single property specifically.
    var properties = [
        'direction',  // RTL support
        'boxSizing',
        'width',  // on Chrome and IE, exclude the scrollbar, so the mirror div wraps exactly as the textarea does
        'height',
        'overflowX',
        'overflowY',  // copy the scrollbar for IE

        'borderTopWidth',
        'borderRightWidth',
        'borderBottomWidth',
        'borderLeftWidth',

        'paddingTop',
        'paddingRight',
        'paddingBottom',
        'paddingLeft',

        // https://developer.mozilla.org/en-US/docs/Web/CSS/font
        'fontStyle',
        'fontVariant',
        'fontWeight',
        'fontStretch',
        'fontSize',
        'fontSizeAdjust',
        'lineHeight',
        'fontFamily',

        'textAlign',
        'textTransform',
        'textIndent',
        'textDecoration',  // might not make a difference, but better be safe

        'letterSpacing',
        'wordSpacing'
    ];

    var isFirefox = !(window.mozInnerScreenX == null);

    var getCaretCoordinatesFn = function (element, position, recalculate) {
        // mirrored div
        var div = document.createElement('div');
        div.id = 'input-textarea-caret-position-mirror-div';
        document.body.appendChild(div);

        var style = div.style;
        var computed = window.getComputedStyle? getComputedStyle(element) : element.currentStyle;  // currentStyle for IE < 9

        // default textarea styles
        style.whiteSpace = 'pre-wrap';
        if (element.nodeName !== 'INPUT')
            style.wordWrap = 'break-word';  // only for textarea-s

        // position off-screen
        style.position = 'absolute';  // required to return coordinates properly
        style.visibility = 'hidden';  // not 'display: none' because we want rendering

        // transfer the element's properties to the div
        properties.forEach(function (prop) {
            style[prop] = computed[prop];
        });

        if (isFirefox) {
            style.width = parseInt(computed.width) - 2 + 'px';  // Firefox adds 2 pixels to the padding - https://bugzilla.mozilla.org/show_bug.cgi?id=753662
            // Firefox lies about the overflow property for textareas: https://bugzilla.mozilla.org/show_bug.cgi?id=984275
            if (element.scrollHeight > parseInt(computed.height))
                style.overflowY = 'scroll';
        } else {
            style.overflow = 'hidden';  // for Chrome to not render a scrollbar; IE keeps overflowY = 'scroll'
        }

        div.textContent = element.value.substring(0, position);
        // the second special handling for input type="text" vs textarea: spaces need to be replaced with non-breaking spaces - http://stackoverflow.com/a/13402035/1269037
        if (element.nodeName === 'INPUT')
            div.textContent = div.textContent.replace(/\s/g, "\u00a0");

        var span = document.createElement('span');
        // Wrapping must be replicated *exactly*, including when a long word gets
        // onto the next line, with whitespace at the end of the line before (#7).
        // The  *only* reliable way to do that is to copy the *entire* rest of the
        // textarea's content into the <span> created at the caret position.
        // for inputs, just '.' would be enough, but why bother?
        span.textContent = element.value.substring(position) || '.';  // || because a completely empty faux span doesn't render at all
        div.appendChild(span);

        var coordinates = {
            top: span.offsetTop + parseInt(computed['borderTopWidth']),
            left: span.offsetLeft + parseInt(computed['borderLeftWidth'])
        };

        document.body.removeChild(div);

        return coordinates;
    };
})();
