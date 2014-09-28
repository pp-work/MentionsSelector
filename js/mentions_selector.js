$(document).ready(function() {
    var MAX_USERNAME_LENGTH = 20;
    var MENTION_REGEX = /^[\s,\.>()]?@([\d\w_åäöÅÄÖ\.]{1,20}$)/i;
    var MENTION_REPLACE_REGEX = /^@[\d\w_åäöÅÄÖ\.]{1,20}$/i;
    var mentionsList;
    var textarea;
    var typingMention = false;

    function setup() {
        mentionsList = document.createElement('ul');
        mentionsList.className = 'MentionsList';
        document.body.appendChild(mentionsList);

        var previousMention;
        var $textarea = $('textarea.TextBox');
        textarea = $textarea.get(0);

        $textarea.on('keydown', function(e) {
            switch (e.keyCode) {
                case 10:
                case 13:
                    if (typingMention && previousMention && selectMention(e.ctrlKey)) {
                        e.preventDefault();
                    }
                    return;
                case 27:
                    discardMentions();
                    return;
                case 38:
                    if (typingMention && previousMention) {
                        e.preventDefault();
                        moveUp();
                    }
                    return;
                case 40:
                    if (typingMention && previousMention) {
                        e.preventDefault();
                        moveDown();
                    }
                    return;
                default:
                    return;
            }
        });

        $textarea.on('keypress', function(e) {
            var mention = getMention(e.target.value, e.target.selectionStart);
            if (mention) {
                if (mention != previousMention) {
                    previousMention = mention;
                    typingMention = true;
                    getUsernames(mention);
                }
            } else {
                discardMentions();
            }
        });
    }

    /**
     * Remove all current mentions
     */
    function discardMentions() {
        mentionsList.innerHTML = '';
        typingMention = false;
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
     * Get all usernames matching mention
     *
     * @param {string} mention
     */
    function getUsernames(mention) {
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

                renderMentions(usernames);
            }
        );
    }

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

    function moveDown() {
        move(1);
    }

    function moveUp() {
        move(-1);
    }

    /**
     * Render the mention selection list
     *
     * @param {Array<string>} usernames
     */
    function renderMentions(usernames) {
        mentionsList.innerHTML = '';

        for (var i = 0; i < usernames.length; i++) {
            var username = usernames[i];

            var listItem = document.createElement('li');
            listItem.textContent = username;

            mentionsList.appendChild(listItem);
        }
    }

    function replaceMention(mention) {
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
        var replacement = searchString.replace(MENTION_REPLACE_REGEX, '@' + mention + ' ');
        var updatedBeforeCaret = beforeCaret.substring(0, mentionStart) + replacement;
        var afterCaret = textarea.value.substring(caretPosition);

        textarea.value = updatedBeforeCaret + afterCaret;
        textarea.selectionStart = updatedBeforeCaret.length;
        textarea.selectionEnd = updatedBeforeCaret.length;

        return true;
    }

    function selectMention(force) {
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

    setup();
});
