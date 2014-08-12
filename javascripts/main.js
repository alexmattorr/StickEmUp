// ///////////////////////////////////////////////
// name:      StickEmUp
// purpose:   to stick things up
// usage:     markup required is:
// //////     <div class="stick-em-up"></div>
//
// ///////////////////////////////////////////////

app.StickEmUp = (function($, app) {
    
    var def = function(el) {
        this.name = 'stick-em-up';
        this.$els = $(el);

        this.states = {
            'fixed': 'fixed',
            'abs': 'absolute'
        };

        this.base = this.$els.eq(0).offset().top;

        init.call(this);
    };

    var init = function() {
        this.load();
        this.bind();
    };

    def.prototype = {

        bind: function() {
            var self = this;

            $(window).on('scroll', function() {
                self.scroll();
            });
        },

        load: function() {
            var self = this;

            this.$els.each(function() {
                var stick = $(this);

                $(this).wrap('<div class="'+self.name+'-container"></div>');

                stick.parent().height(stick.outerHeight(true));

                $.data(stick[0], 'pos', stick.offset().top);
            });
        },

        scroll: function() {
            var self = this;

            this.$els.each(function(i) {
                var stick = $(this),
                    next = self.$els.eq(i+1),
                    prev = self.$els.eq(i-1),
                    pos = $.data(stick[0], 'pos');

                if(pos <= $(window).scrollTop()) {
                    stick.addClass(self.states.fixed);

                    if(next.length > 0 && stick.offset().top >= $.data(stick[0], 'pos') - stick.outerHeight()) {
                        stick.addClass(self.states.abs).css('top', $.data(next[0], 'pos') - (stick.outerHeight() * 2) - (self.base - self.$els.eq(i).outerHeight()) );
                    }
                } else {
                    stick.removeClass(self.states.fixed);

                    if (prev.length > 0 && $(window).scrollTop() <= $.data(stick[0], 'pos') - prev.outerHeight()) {
                        prev.removeClass(self.states.abs).removeAttr('style');
                    }
                }
            });
        }

    };

    return def;
}).call(this, jQuery, app);