;(function(color, undefined){
	var picker = color.picker = {};
	var Model = picker.Model = function(red, green, blue, bits) {
		var maxColor = Math.pow(2, bits || 8);
		this.red = (red<maxColor)?red:maxColor-1;
		this.green = (green<maxColor)?green:maxColor-1;
		this.blue = (blue<maxColor)?blue:maxColor-1;
	};

	Model.prototype.getRGBString = function() {
		return ['rgb(', [this.red, this.green, this.blue].join(','), ');'].join('');
	}

	Model.prototype.getHEXString = function() {
		return ['#', [this.red.toString(16), this.green.toString(16), this.blue.toString(16)].join('')].join('');
	}



	Model.prototype.addWatch = function(HTMLElement, attribute) {
		var _self = this;

		HTMLElement.value = _self[attribute];

		HTMLElement.addEventListener('drag', function(e){
			_self[attribute] = parseInt(this.value);
		});

		HTMLElement.addEventListener('change', function(e){
			_self[attribute] = parseInt(this.value);
		});
	}



})(window.color = window.color || {});