;(function(ns, color, undefined){
	var picker = color.picker = {};
	var Model = picker.Model = function(red, green, blue, alpha, bits) {
		ns.Observable.call(this);
		
		var maxColor = Math.pow(2, bits || 8);
		this.red = (red<maxColor)?red:maxColor-1;
		this.green = (green<maxColor)?green:maxColor-1;
		this.blue = (blue<maxColor)?blue:maxColor-1;
		this.alpha = (alpha<maxColor)?alpha:maxColor-1;
	};


	Model.prototype = Object.create(ns.Observable.prototype);
	Model.prototype.constructor = Model;
	Model.prototype.getRGBAString = function(red, green, blue, alpha) {
		return ['rgba(', [red||this.red, green||this.green, blue||this.blue, alpha||this.alpha].join(','), ')'].join('');
	}

	Model.prototype.addWatch = function(HTMLElement, attribute) {
		var _self = this;

		HTMLElement.value = _self[attribute];

		HTMLElement.addEventListener('drag', function(e){
			_self[attribute] = parseInt(this.value);
			_self.colorPicked(this);
		});

		HTMLElement.addEventListener('change', function(e){
			_self[attribute] = parseInt(this.value);
			_self.colorPicked(this);
		});

		HTMLElement.addEventListener('input', function(e){
			_self[attribute] = parseInt(this.value);
			_self.colorPicked(this);
		});
	}

	Model.prototype.colorPicked = function() {
		var _self = this;
		this.signal('colorPicked', _self.getRGBAString());
	}


})(ns, window.color = window.color || {});