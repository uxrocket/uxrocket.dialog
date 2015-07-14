/**
 * @author Bilal Cinarli
 */

(function($) {
    var ux, // localshorthand

        defaults = {
            title        : "",
            message      : "",
            type         : "warning",
            confirm      : {
                show     : true,
                className: "primary-action",
                text     : "Tamam"
            },
            cancel       : {
                show     : true,
                className: "button",
                text     : "Vazgeç"
            },
            // other buttons
            buttons      : {},
            // close icon
            close        : false,
            blockUI      : true,
            className    : '',
            allowMultiple: false,

            onReady  : false,
            onConfirm: false,
            onCancel : false,
            onOpen   : false,
            onClose  : false
        },
        events = {
            click: 'click.uxDialog'
        },
        ns = {
            rocket: 'uxRocket',
            data  : 'uxDialog',
            ready : 'uxitd-dialog-ready'
        },
        i = 1;

    var Dialog = function(el, options, selector) {
        var $el = $(el),
            opts = $.extend(true, {}, defaults, options, $el.data(), {'selector': selector});

        callback(opts.onReady);

        // prerender dialog content
        opts.instance = i;
        opts.dialog = buildDialog(opts);

        $el.data(ns.data, opts);

        i++;

        // bind the UI actions
        bindUIActions($el);
    };

    var bindUIActions = function($el) {
        var _opts = $el.data(ns.data),
            $body = $("body");

        $el.on(events.click, function(e) {
            e.preventDefault();

            // close any other opened instances
            if(!_opts.allowMultiple) {
                ux.close();
            }

            $("body").append(_opts.dialog);
            callback(_opts.onOpen);
        });

        $body.on(events.click, "#uxitd-dialog-" + _opts.instance + " .uxitd-dialog-confirm-button", function(e) {
            e.preventDefault();
            callback(_opts.onConfirm);
            ux.close(_opts);
        });

        $body.on(events.click, "#uxitd-dialog-" + _opts.instance + " .uxitd-dialog-cancel-button", function(e) {
            e.preventDefault();
            callback(_opts.onCancel);
            ux.close(_opts);
        });

        $body.on(events.click, "#uxitd-dialog-" + _opts.instance + " .uxitd-dialog-close", function(e) {
            e.preventDefault();
            ux.close(_opts);
        });
    };

    // maybe we could use handlebars
    var buildDialog = function(opts) {
        var html = '' +
                   '<div id="uxitd-dialog-' + opts.instance + '" class="uxitd-dialog uxitd-dialog-' + opts.type + ' ' + opts.className + '">';

        if(opts.blockUI === true && opts.allowMultiple === false) {
            html += '\n' +
                    '<div id="uxitd-dialog-cover"></div>';
        }

        html += '\n' +
                '<div id="uxitd-dialog-content" class="note dialog-note note-' + opts.type + '">';

        if(opts.title !== "") {
            html += '<h3 class="uxitd-dialog-title note-title">' + opts.title + '</h3>';
        }

        if(opts.message !== "") {
            html += '<div class="uxitd-dialog-content note-content">' + opts.message + '</div>';
        }

        if(opts.confirm.show || opts.cancel.show || opts.buttons.length > 0) {
            html += '<div class="uxitd-dialog-buttons note-buttons">';

            if(opts.cancel.show) {
                html += '<a href="#" class="uxitd-dialog-button uxitd-dialog-cancel-button ' + opts.cancel.className + '">' + opts.cancel.text + '</a>';
            }

            $.each(opts.buttons, function(item) {
                html += '<a href="#" class="uxitd-dialog-button ' + item.className + '">' + item.text + '</a>';
            });

            if(opts.confirm.show) {
                html += '<a href="#" class="uxitd-dialog-button uxitd-dialog-confirm-button ' + opts.confirm.className + '">' + opts.confirm.text + '</a>';
            }


            html += '</div>';
        }

        if(opts.close) {
            html += '<a href="#" class="uxitd-dialog-close"><i class="uxitd-dialog-close-icon"></i></a>'
        }

        html += '   </div>' + // end of dialog content
                '</div>';

        return html;
    };

    // global callback
    var callback = function(fn) {
        // if callback string is function call it directly
        if(typeof fn === "function") {
            fn.apply(this);
        }

        // if callback defined via data-attribute, call it via new Function
        else {
            if(fn !== false) {
                var func = new Function("return " + fn);
                func();
            }
        }
    };

    ux = $.fn.dialog = $.uxdialog = function(options) {
        var selector = this.selector;

        return this.each(function() {
            var $el = $(this),
                uxrocket = $el.data(ns.rocket) || {},
                dialog;

            if($el.hasClass(ns.ready)) {
                return;
            }

            $el.addClass(ns.ready);

            uxrocket[ns.data] = {"hasWrapper": false, "ready": ns.ready, "selector": selector, "options": options};

            $el.data(ns.rocket, uxrocket);
            dialog = new Dialog(this, options, selector);
        });
    };

    ux.close = function(_opts) {
        var opts = _opts || {},
            instance = opts.instance || false;

        if(instance) {
            console.log(instance);
            $("#uxitd-dialog-" + instance).remove();
        }

        else {
            $(".uxitd-dialog").remove();
        }

        if(opts.onClose) {
            callback(opts.onClose);
        }
    };

    // version
    ux.version = "0.1.0";

    // settings
    ux.settings = defaults;
})(jQuery);