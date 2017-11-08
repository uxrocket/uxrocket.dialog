/**
 * @author Bilal Cinarli
 */

(function($) {
    var ux, // localshorthand
        rocketName = 'uxrDialog',
        instance = 1,

        defaults = {
            title        : '',
            message      : '',
            confirmText  : null,
            cancelText   : null,
            confirmClass : null,
            cancelClass  : null,

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

            test         : this.type,
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
            click: 'click.' + rocketName,
            ready: 'uxrready.' + rocketName
        },
        ns = {
            prefix : 'uxr-',
            rocket : 'uxRocket',
            data   : rocketName,
            classes: {
                ready: 'ready'
            }
        };


    var Dialog = function(el, options, selector) {
        this._name = rocketName;
        this._defaults = defaults;
        this._instance = instance;
        this._direct = false;

        if(el === null) {
            el = document.createElement('a');
            this._direct = true;
        }

        this.el = el;
        this.$el = $(el);
        this.options = $.extend(true, {}, defaults, options, this.$el.data());
        this.selector = selector;

        instance++;

        this.init();
    };

    Dialog.prototype.init = function() {
        var uxrocket = this.$el.data(ns.rocket) || {};

        // register plugin data to rocket
        uxrocket[ns.data] = {hasWrapper: false, ready: utils.getClassname('ready'), selector: this.selector, options: this.options};
        this.$el.data(ns.rocket, uxrocket);

        this.bindUIActions();

        this.$el.addClass(utils.getClassname('ready'));

        this.prepare();

        this.emitEvent('ready');

        if(this._direct === true || this.options.openOnload) {
            ux.open(this);
        }
    };

    Dialog.prototype.bindUIActions = function() {
        var _this = this,
            $body = $('body');

        this.$el.on(events.click, function(e) {
            e.preventDefault();

            // close any other opened instances
            if(!_this.options.allowMultiple) {
                ux.close();
            }

            if(typeof $(this).attr('href') === 'undefined' || $(this).attr('href') === '' || $(this).attr('href').charAt(0) === '#'){
                ux.open(_this);
            }else{
                ux.open(_this,this.href);
            }
        });

        $body.on(events.click, '#uxr-dialog-' + _this._instance + ' .uxr-dialog-confirm-button', function(e) {
            e.preventDefault();
            utils.callback(_this.options.onConfirm);
            ux.close(_this);
        });

        $body.on(events.click, '#uxr-dialog-' + _this._instance + ' .uxr-dialog-cancel-button', function(e) {
            e.preventDefault();
            utils.callback(_this.options.onCancel);
            ux.close(_this);
        });

        $body.on(events.click, '#uxr-dialog-' + _this._instance + ' .uxr-dialog-close', function(e) {
            e.preventDefault();
            ux.close(_this);
        });
    };

    Dialog.prototype.prepare = function(content) {
        var html = '' +
            '<div id="uxr-dialog-' + this._instance + '" class="uxr-dialog uxr-dialog-' + this.options.type + ' ' + this.options.className + '">';


        if(typeof this.options.confirm === 'string'){

        }

        if(this.options.blockUI === true && this.options.allowMultiple === false) {
            html += '\n' +
                '<div id="uxr-dialog-cover"></div>';
        }

        html += '\n' +
            '<div id="uxr-dialog-content" class="note dialog-note note-' + this.options.type + '">';

        if(this.options.title !== '') {
            html += '<h3 class="uxr-dialog-title note-title">' + this.options.title + '</h3>';
        }

        if(this.options.message !== '') {
            html += '<div class="uxr-dialog-content note-content">' + this.options.message + '</div>';
        }

        if(typeof this.$el.attr('href') !== 'undefined') {
            if(this.$el.attr('href').charAt(0) === '#'){
                var content = $(this.$el.attr('href')).html();
                if( !content ){ return; }
                html += '<div class="uxr-dialog-content note-content">'+content+'</div>';
            }else{
                html += '<div class="uxr-dialog-content note-content"></div>';
            }

        }

        if(this.options.confirm.show || this.options.cancel.show || this.options.buttons.length > 0) {

            var buttons = {
                confirm: {
                    text: this.options.confirmText || this.options.confirm.text,
                    class:this.options.confirmClass || this.options.confirm.className
                },
                cancel: {
                    text:this.options.cancelText || this.options.cancel.text,
                    class:this.options.cancelClass || this.options.cancel.className
                }
            };


            html += '<div class="uxr-dialog-buttons note-buttons">';

            if(this.options.cancel.show) {
                html += '<a href="#" class="uxr-dialog-button uxr-dialog-cancel-button ' + buttons.cancel.class + '">' + buttons.cancel.text+ '</a>';
            }

            $.each(this.options.buttons, function(item) {
                html += '<a href="#" class="uxr-dialog-button ' + item.className + '">' + item.text + '</a>';
            });

            if(this.options.confirm.show) {
                html += '<a href="#" class="uxr-dialog-button uxr-dialog-confirm-button ' + buttons.confirm.class + '">' + buttons.confirm.text + '</a>';
            }


            html += '</div>';
        }

        if(this.options.close) {
            html += '<a href="#" class="uxr-dialog-close"><i class="uxr-dialog-close-icon"></i></a>';
        }

        html += '   </div>' + // end of dialog content
            '</div>';

        this.dialog = html;
    };

    Dialog.prototype.emitEvent = function(which) {
        this.$el.trigger(events[which]);
    };

    var utils = {
        callback: function(fn) {
            // if callback string is function call it directly
            if(typeof fn === 'function') {
                fn.apply(this);
            }

            // if callback defined via data-attribute, call it via new Function
            else {
                if(fn !== false) {
                    var func = new Function('return ' + fn);
                    func();
                }
            }
        },

        escapeSelector: function(selector) {
            var is_ID = selector.charAt(0) === '#',
                re = /([ !"#$%&'()*+,.\/:;<=>?@[\\\]^`{|}~])/g;

            return is_ID ? '#' + selector.substring(1).replace(re, '\\$1') : selector;
        },

        getStringVariable: function(str) {
            var val;
            // check if it is chained
            if(str.indexOf('.') > -1) {
                var chain = str.split('.'),
                    chainVal = window[chain[0]];

                for(var i = 1; i < chain.length; i++) {
                    chainVal = chainVal[chain[i]];
                }

                val = chainVal;
            }

            else {
                val = window[str];
            }

            return val;
        },

        getClassname: function(which) {
            return ns.prefix + ns.name + '-' + ns.classes[which];
        },

        getAjaxContent: function(url,instance){
            $.get(url,function(data){
                    $(instance).find('.uxr-dialog-content').html(data);
                }
            );
        }
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

    ux.close = function(dialog) {
        var _dialog = dialog || {},
            instance = _dialog._instance || false;

        if(instance) {
            $('#uxr-dialog-' + instance).remove();
        }

        else {
            $('.uxr-dialog').remove();
        }

        if(instance !== false && typeof _dialog.options !== 'undefined') {
            utils.callback(_dialog.options.onClose);
        }
    };

    ux.open = function(dialog,href) {
        $('body').append(dialog.dialog);
        utils.callback(dialog.options.onOpen);
        if(href){
            utils.getAjaxContent(href,'#uxr-dialog-'+dialog._instance);
        }
    };

    // version
    ux.version = '0.4.0';

    // settings
    ux.settings = defaults;
})(jQuery);