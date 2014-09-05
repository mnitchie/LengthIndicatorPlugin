(function($) {
    'use strict'
    
    var settings,
        $indicatorWrapper,
        $indicatorHint,
        $indicatorOutput
        ;
    
    function generateWrapper($el) {
        $indicatorWrapper = $('<div>').addClass(settings.wrapperClass);
        $indicatorHint = $('<div>').addClass(settings.hintClass).text(settings.hintText + ": ");
        $indicatorOutput = $('<span>').addClass(settings.outputClass).text(settings.maxLength);
        
        $el.wrap($indicatorWrapper);
        $indicatorHint.append($indicatorOutput);        
        $indicatorHint.insertBefore($el);
    }
    
    function initializeOutput($el) {
        var curLength = $el.val().length;
        var charsRemaining = settings.maxLength - curLength;
        if (charsRemaining < 0) {
            $el.val($el.val().substring(0, settings.maxLength));
            curLength = $el.val().length;
            charsRemaining = settings.maxLength - curLength;
        }
        $indicatorOutput.text(charsRemaining);
    }

    $.fn.lengthIndicator = function(options) {

        settings = $.extend({}, $.fn.lengthIndicator.defaults, options);

        this.attr('maxlength', settings.maxLength);
        
        generateWrapper(this);
        initializeOutput(this);
        
        this.on('input', function(event) {
            $indicatorOutput.text(settings.maxLength - $(this).val().length);
        });
        
        return this;
    };

    $.fn.lengthIndicator.defaults = {
        wrapperClass : "LILengthIndicatorWrapper",
        hintClass : "LILLengthIndicatorHint",
        outputClass : "LILengthIndicatorOutput",
        hintText: "Characters remaining",
        maxLength: 144
    };

}(jQuery));
