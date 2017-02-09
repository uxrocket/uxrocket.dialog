# UX Rocket Dialog

Simple jQuery dialog plugin. Opens a confirmation dialog. 

Sample usage,

```html
<a href="#" class="dialog">Open Dialog</a>
<a href="#sample-hidden-content" class="dialog">Open Dialog</a>
<a href="http://sample-template-file" class="dialog">Open Dialog</a>
```

```js
$(".dialog").dialog({
    title: "Hello World!",
    message: "This is my first message",
    confirm: {
        text: "OK",
        className: "confirm-button"
    },
    onConfirm: function(){
        form.submit();
    }
});
```

Direct usage for opening on load or after a callback
```js
$.uxrdialog({
    title: "Hello World!",
    message: "This is my first message",
    confirm: {
        text: "OK",
        className: "confirm-button"
    },
    onConfirm: function(){
        form.submit();
    }
});
```


### Options
Property	  | Default | Description
------------- | ------- | ------------------------------------------------------------------------
title         | null    | Title line of the dialog
message       | null    | Dialog message. Could be a plain text or html formatted text
type          | warning | Adds a dialog type class to the wrapper e.g. `uxitd-dialog-warning`
confirm       | Obj     | Has `show` (default: true), `text` (default: Tamam) and `className` (default: primary-action)attributes. Fires the confirm action
cancel        | Obj     | Has `show` (default: true), `text` (default: Vazgeç) and `className` (default: button) attributes. Fires the cancel action
buttons       | Obj     | Json array of other buttons
close         | false   | Visibility of close icon
blockUI       | true    | Adds an overlay at the top of the page
className     | null    | For advanced styling, allow to add your own style class to dialog wrapper
allowMultiple | false   | Allows to open more than one dialog simultaneously
openOnload    | false   | If true, desired dialog will open on page load then, it will be available with on click event. 


Data Attribute | Description
-------------- | ------------------------------------------------------------------------
title          | Title line of the dialog
message        | Dialog message. Could be a plain text or html formatted text
type           | Adds a dialog type class to the wrapper e.g. `uxitd-dialog-warning`
confirm        | Has `show` (default: true), `text` (default: Tamam) and `className` (default: primary-action)attributes. Fires the confirm action
cancel         | Has `show` (default: true), `text` (default: Vazgeç) and `className` (default: button) attributes. Fires the cancel action
close          | Visibility of close icon
blockUI        | Adds an overlay at the top of the page
class-name     | For advanced styling, allow to add your own style class to dialog wrapper
allow-multiple | Allows to open more than one dialog simultaneously
open-onload    | If true, desired dialog will open on page load then, it will be available with on click event.
on-ready       | Calls the function when plugin is ready
on-open        | Calls the function when dialog is opened
on-confirm     | Calls the function when confirm button clicked
on-cancel      | Calls the function when cancel button clicked
on-close	   | Calls the function when dialog is closed
confirm-text   | Custom confirm button text
cancel-text    | Custom cancel button text
confirm-class  | For advanced styling, allow to add your own style class to confirm button
cancel-class   | For advanced styling, allow to add your own style class to cancel button

Callback			 | &nbsp;
-------------------- | -----
onReady              | Calls the function when plugin is ready
onOpen       	     | Calls the function when dialog is opened
onConfirm     	     | Calls the function when confirm button clicked
onCancel     	     | Calls the function when cancel button clicked
onClose		         | Calls the function when dialog is closed

### Public Methods
Method						| Description
--------------------------- | -------------------------------------------------------
$(selector).dialog(options) | Binds the plugin 
$.uxrdialog(options)        | Directly opens a dialog with desired options
$.uxrdialog.version         | Shows the plugin version
$.uxrdialog.settings        | Shows the default settings


