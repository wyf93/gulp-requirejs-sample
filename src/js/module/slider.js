/*
	<div class="slider">
		<a href="" class="slide" data-img="images/banner-1.jpg"></a>
		...
	</div>

	new Slider({
		autoPlay: 5000,
		controller: true
	})

*/
define(['jquery'], function ($) {
	var Slider = function (config) {
		var defaultConfig = {
			autoPlay: 5000,
			controller: true
		};
		this.config = $.extend({}, defaultConfig, config);
		this.container = $('.slider');
		this.slide = this.container.find('.slide');
		this.controller;
		this.indexNow = 0;
		this.timer;
		this.init();
	}
	Slider.prototype = {
		init: function () {
			this.slide.each(function (index) {
				$(this).css({
					'background': 'url('+$(this).attr('data-img')+') center center no-repeat'
				});
				if(index > 0) {
					$(this).hide();
				}
			});
			if(this.config.controller === true) {
				var controlStr = '<div class="controller">';
				this.slide.each(function (index) {
					if(index === 0) {
						controlStr += '<span class="dot active"></span>';
					}
					else {
						controlStr += '<span class="dot"></span>';	
					}
				});
				controlStr += '</div>';
				this.controller = this.container.append(controlStr);
				this.container.find('.controller');
				this.bindController();
			}	
			this.autoPlay();
		},
		bindController: function () {
			var self = this;
			self.controller.on('click', '.dot', function () {
				var index = $(this).index();
				if(index !== self.indexNow) {
					self.slide.eq(index).fadeIn();
					self.slide.eq(self.indexNow).fadeOut();
					$(this).addClass('active');
					self.controller.find('.dot').eq(self.indexNow).removeClass('active');
					self.indexNow = index;
				}
			})
		},
		autoPlay: function () {
			var self = this;
			setInterval(function () {
				var index = self.indexNow + 1 === self.slide.length?0:self.indexNow + 1;
				self.slide.eq(self.indexNow).fadeOut();
				self.slide.eq(index).fadeIn();
				if(self.config.controller === true) {
					self.controller.find('.dot').eq(self.indexNow).removeClass('active');
					self.controller.find('.dot').eq(index).addClass('active');
				}
				self.indexNow = index;
			}, self.config.autoPlay);
		}
	}
	return Slider;
});