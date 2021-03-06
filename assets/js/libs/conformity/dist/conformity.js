/*! v0.2.3 https://github.com/codekipple/conformity. Plugin adapted from this code:- http://codepen.io/micahgodbolt/details/FgqLc */

/*
    pass conformity a jquery collection of blocks inside a container, conformity will make sure each row is
    equal heights, call conformity on window resize for responsive equal heights

    Supports CommonJS, AMD or browser globals.
    see: https://github.com/umdjs/umd/blob/master/jqueryPluginCommonjs.js
*/
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    $.fn.conformity = function (options) {
        var settings = {
                'mode': 'min-height'
            },
            elements = $(this),
            currentTallest = 0,
            currentRowStart = 0,
            rowDivs = [],
            topPosition = 0;

        if (options) {
            $.extend(settings, options);
        }

        return elements.each(function() {

            /*
                alter height and min-height so we can get an accurate measure of the
                elements height
            */
            if (settings.mode === 'min-height') {
                this.style.height = "auto";
                this.style.minHeight = 0;
            } else if (settings.mode === 'height')  {
                this.style.height = "auto";
            }
            this.style.height = "auto";

            /*
                top offset is used to determine if the element is on the current
                row or a new one
            */
            topPosition = this.getBoundingClientRect().top;
                       // this.getBoundingClientRect().top + document.body.scrollTop;

            var elHeight;

            if ( currentRowStart != topPosition ) {
                for ( var i = rowDivs.length; i--; ) {
                    rowDivs[i].style[settings.mode] = currentTallest; 
                }
                rowDivs.length  = 0; // empty the array
                currentRowStart = topPosition;
                currentTallest  = this.offsetHeight;
                rowDivs.push(this);
            } else {
                elHeight = this.offsetHeight;
                rowDivs.push(this); 
                currentTallest = ( currentTallest < elHeight ) ? ( elHeight ) : ( currentTallest );
            }

            for ( var i = rowDivs.length; i--; ) {
                rowDivs[i].style[settings.mode] = currentTallest + "px";
            }

        });
    };
}));