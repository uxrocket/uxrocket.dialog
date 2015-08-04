# UX Rocket Dialog

Simple jQuery dialog plugin. Opens a confirmation dialog. 

Sample usage,

```html
<a href="#" class="dialog">Open Dialog</a>
```

```js
$(".dialog").dialog({
    title: "Hello World!",
    message: "This is my first message",
    confirm: {
        text: "OK",
        className: "confirm-button"
    }
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
$.uxdialog(options)         | Directly opens a dialog with desired options
$.uxdialog.version          | Shows the plugin version
$.uxdialog.settings         | Shows the default settings


