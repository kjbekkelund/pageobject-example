define(function(require) {

    var BaseView = require('base/view'),

        template = require('text!./dropDownView.mustache');

    require('css!./dropDownView.css');

    var DropDownView = BaseView.extend({
        events: {
            "click .dropdown-trigger": "triggerClicked",
            "click .option a": "optionClicked"
        },

        initialize: function(options) {
            this.defaultOption = options.defaultOption;
            this.options = (options.options || {});
        },

        renderWith: function(options) {
            this.options = options.options;
            return this.render();
        },

        render: function() {
            this.$el.addClass('dropdown');

            this.renderTemplate(template, {
                defaultOption: this.defaultOption,
                options: this.options
            });

            return this;
        },

        triggerClicked: function(event) {
            event.preventDefault();
            this.$(".dropdown-menu").toggleClass("hide");
        },

        optionClicked: function(event) {
            event.preventDefault();
            this.$(".dropdown-menu").addClass("hide");

            var option = this.$(event.currentTarget).attr("data-value");
            this.$(".dropdown-trigger .chosen-value").text(option);
            this.trigger("selected", option);
        }
    });

    return DropDownView;
});
