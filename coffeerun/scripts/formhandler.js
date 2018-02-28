(function (window) {
    'use strict'
    var App = window.App || {};
    var $ = window.jQuery;

    function FormHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }

        this.$Element = $(selector);
        if (this.$Element.length === 0) {
            throw new Error('Could not found element with selector:' + selector);
        }
    }

    FormHandler.prototype.addSubmitHandler = function (fn) {
        console.log('Setting submit handler for form');
        this.$Element.on('submit', function (event) {
            event.preventDefault();
            var data = {};
            $(this).serializeArray().forEach(element => {
                data[element.name] = element.value;
                console.log(element.name + ' is ' + element.value);
            });
            console.log(data);
            fn(data)
                .then(function () {
                    this.reset();
                    this.elements[0].focus();
                }.bind(this));
        });
    };

    FormHandler.prototype.addInputHandler = function (fn) {
        console.log('Setting input handler for form');
        this.$Element.on('input', '[name="emailAddress"]', function (event) {
            var emailAddress = event.target.value;
            if (fn(emailAddress)) {
                event.target.setCustomValidity('');
            } else {
                var message = emailAddress + ' is not a authrized email address';
                event.target.setCustomValidity(message);
            }
        });
    }

    App.FormHandler = FormHandler;
    window.App = App;
})(window)