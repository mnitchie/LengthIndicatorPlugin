LengthIndicatorPlugin
=====================

A simple length indicator jQuery plugin for text input elements

My first stab at writing a jQuery plugin. Created in a test driven manner using QUnit

Include LengthIndicator.js into your html document (after jQuery!)

`$('someInput').lengthIndicator();`

Options:
```
$('someInput').lengthIndicator({
  wrapperClass: // the class of the wrapper that will be placed around the element
  hintClass: // the class of the hint text. "Characters Remaining"
  outputClass: // the class of the output text. Default is 
  hintText: // The text of the Hint. Default is "Characters remaining"
  maxLength: // The max allowed length of the input element. Default is 144
});
```

See index.html for a short demo
