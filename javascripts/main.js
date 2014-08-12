// ///////////////////////////////////////////////
// name:      equalHeights
// purpose:   to maintain equal heights across columns 
// usage:     markup required is:
// //////     <div class="equal-height-group">
// //////     	<div class="equal-height-item"></div>
// //////     	<div class="equal-height-item"></div>
// //////     </div>
//
// options:   el:   a jQuery element object
//            opts: {cutoff: integer}
// ///////////////////////////////////////////////

app.EqualHeights = (function($, _, app) {

	var def = function(el, opts) {
		var self = this;

		this.$els = {
			'item' : el,
			'children' : '.equal-height-item'
		};

		this.opts = opts;

		this.heights = [];

		this.waiter = _.debounce(function(e) {
			self.destroy();
			self.measure();
		}, 200);

		init.call(this);
	};

	var init = function() {
		this.bind();
		this.measure();
	};

	def.prototype = {

		bind: function() {
			var self = this;
			$(window).resize(function() {
				if(self.opts.cutoff && $(window).width() <= self.opts.cutoff) {
					self.destroy();
				} else {
					self.waiter();
				}
			});
		},

		measure: function() {
			var self = this;

			this.heights = [];

			$(this.$els.children, this.$els.item).each(function(){
				self.heights.push($(this).outerHeight(true));
			});

			this.set();
		},

		findLargest: function() {
			return Math.max.apply(Math, this.heights);
		},

		set: function() {
			var base = this.findLargest();
			this.applyStyles(base);
		},

		destroy: function() {
			this.applyStyles('');
		},

		applyStyles: function(h) {
			$(this.$els.children, this.$els.item).each(function(){
				$(this).css('height', h);
			});
		}

	}

	return def;

}).call(this, jQuery, _, app);