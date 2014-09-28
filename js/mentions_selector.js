(function() {
    $(document).ready(function() {
        var MAX_USERNAME_LENGTH = 20;
        var MENTION_REGEX = /^[\s,\.>()]?@([\d\w_åäöÅÄÖ\.]{1,20}$)/i;
        var MENTION_REPLACE_REGEX = /^@[\d\w_åäöÅÄÖ\.]{1,20}$/i;
        var mentionsList;
        var textarea;
        var typingMention = false;

        function setup() {
            mentionsList = document.createElement('ul');
            mentionsList.className = 'MentionsList ac_results';
            document.body.appendChild(mentionsList);

            var previousMention;
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
                    case 17: // ctrl
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
                var mention = getMention(e.target.value, e.target.selectionStart);
                if (mention) {
                    if (mention != previousMention) {
                        previousMention = mention;
                        typingMention = true;
                        getProposals(mention);
                    }
                } else {
                    discardMentions();
                }
            });

            $(mentionsList).on('click', 'li', function(e) {
                replaceMention(e.target.textContent);
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

                    if (usernames.length > 1 && !usernames[usernames.length-1]) {
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
                var username = usernames[i].substring(mention.length);

                var listItem = document.createElement('li');
                var strong = document.createElement('strong');
                strong.textContent = mention;
                listItem.appendChild(strong);
                listItem.appendChild(document.createTextNode(username));

                mentionsList.appendChild(listItem);
            }

            var caretPosition = getCaretCoordinatesFn(textarea, textarea.selectionEnd);
            var textareaPosition = textarea.getBoundingClientRect();
            mentionsList.style.display = 'block';
            mentionsList.style.top = textareaPosition.top + caretPosition.top + 30 + 'px';
            mentionsList.style.left = textareaPosition.left + caretPosition.left + 'px';
            mentionsList.style.position = 'fixed';
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
