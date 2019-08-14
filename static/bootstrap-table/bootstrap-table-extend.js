
(function ($) {
    'use strict';
    var BootstrapTable = $.fn.bootstrapTable.Constructor;
    BootstrapTable.prototype.refresh = function (params) {
        if(!params) {
            this.options.pageNumber = 1;
        } else if(params && params.url) {
            this.options.url = params.url;
            this.options.pageNumber = 1;
        } else if(/(^[1-9]\d*$)/.test(params)) {
            this.options.pageNumber = params;
        }
        this.initServer(params && params.silent, params && params.query);
    };
})(jQuery);