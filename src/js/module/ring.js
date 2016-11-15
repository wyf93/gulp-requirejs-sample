define(['jquery', 'raphael'], function ($, Raphael) {
	var Ring = function (config) {
		var defaultConfig = {
			//parent: null,
			selector: '.ring',
			w: 100,
			R: 40,
			sW: 8,
			sColor: '#ffbb00',
			fColor: '#fff',
			bgColor: '#e5e5e5',
			percent: 100,
			speed: 0,
			delay: 1000
		} 
		this.config = $.extend({}, defaultConfig, config);
		this.ele = $(this.config.selector);
		this.init();
	}
	Ring.prototype = {
		init: function () {
			var self = this;
			var w = self.config.w;
			var sW = self.config.sW;
			var R = self.config.R;
			this.ele.each(function () {
				var paper = Raphael(this, w, w);
				paper.customAttributes.arc = function (percent, R) {
					
					var d = 360*percent/100;//角度
					var a =Math.PI/2 - Math.PI*2*percent/100;//弧度
					var x = w/2 + R*Math.cos(a);
					var y = w/2 - R*Math.sin(a);
					var path;
					if(percent === 100) {
						path = [
							["M", w / 2, w / 2 - R],
							["A", R, R, 0, 1, 1, w / 2 - 0.01, w / 2 - R]
						]
					}
					else {
						path = [
							["M", w / 2, w / 2 - R],
							["A", R, R, 0, +(d > 180), 1, x, y]
						]
					}
					return {
						path: path
					}
				}
				var f = paper.path().attr({
					'stroke': self.config.bgColor,
					"stroke-width": sW,
					'fill': self.config.fColor,
					arc: [100, R]
				});
				var g = paper.path().attr({
					'stroke': self.config.sColor,
					"stroke-width": sW
				})
				.attr({
					arc: [0.01, R]
				});
				if (self.config.percent > 0) {
					setTimeout(function() {
						g.animate({
							arc: [self.config.percent, R]
						}, 900, ">")
					}, 1000);
				} else {
					g.hide();
				}
			});
		}
	}

	return Ring;
});