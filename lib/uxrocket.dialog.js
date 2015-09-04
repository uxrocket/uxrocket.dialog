/**
 * @author Bilal Cinarli
 */

(function($) {
    var ux, // localshorthand
        rocketName = 'uxrDialog',

        defaults = {
            title        : '',
            message      : '',
            type         : 'warning',
            confirm      : {
                show     : true,
                className: 'primary-action',
                text     : 'Tamam'
            },
            cancel       : {
                show     : true,
                className: 'button',
                text     : 'Vazgeç'
            },
            // other buttons
            buttons      : {},
            // close icon
            close        : false,
            blockUI      : true,
            className    : '',
            allowMultiple: false,
            openOnload   : false,

            onReady  : false,
            onConfirm: false,
            onCancel : false,
            onOpen   : false,
            onClose  : false
        },
        events = {
            click: 'click.' + rocketName
        },
        ns = {
            prefix : 'uxr-',
            rocket : 'uxRocket',
            data   : rocketName,
            classes: {
                ready: 'ready'
            }
        },
        i = 1;

    var Dialog = function(el, options, selector) {

        i++;
    };

    ux = $.fn.dialog = $.uxrdialog = function(options) {
        var selector = this.selector;

        // direct call to dialog
        if(typeof this === 'function') {
            new Dialog(null, options, null);
            return;
        }

        return this.each(function() {
            if($.data(this, ns.data)) {
                return;
            }

            // Bind the plugin and attach the instance to data
            $.data(this, ns.data, new Dialog(this, options, selector));
        });
    };

    // version
    ux.version = '0.3.0';

    // settings
    ux.settings = defaults;
})(jQuery);