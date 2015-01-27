;(function(ns, color, undefined){
    var picker = color.picker = {};
    var Model = picker.Model = function(red, green, blue, alpha, bits) {
        ns.Observable.call(this);

        var maxColor = Math.pow(2, bits || 8);
        this.red = (red<maxColor)?red:maxColor-1;
        this.green = (green<maxColor)?green:maxColor-1;
        this.blue = (blue<maxColor)?blue:maxColor-1;
        this.alpha = (alpha<1)?alpha:1;
    };


    Model.prototype = Object.create(ns.Observable.prototype);
    Model.prototype.constructor = Model;
    Model.prototype.getRGBAString = function(red, green, blue, alpha) {
        return ['rgba(',
            [
                (typeof red !== 'undefined')?red:this.red,
                (typeof green !== 'undefined')?green:this.green,
                (typeof blue !== 'undefined')?blue:this.blue,
                (typeof alpha !== 'undefined')?alpha:this.alpha
            ].join(','), ')'].join('');
    }

    Model.prototype.addWatch = function(HTMLElement, attribute) {
        var _self = this;

        HTMLElement.value = _self[attribute];

        HTMLElement.addEventListener('drag', function(e){
            _self[attribute] = parseFloat(this.value);
            _self.colorPicked(this);
        });

        HTMLElement.addEventListener('change', function(e){
            _self[attribute] = parseFloat(this.value);
            _self.colorPicked(this);
        });

        HTMLElement.addEventListener('input', function(e){
            _self[attribute] = parseFloat(this.value);
            _self.colorPicked(this);
        });
    }

    Model.prototype.colorPicked = function() {
        var _self = this;
        this.signal('colorPicked', _self.getRGBAString());
    }

    Model.prototype.getColorRangeFor = function(attr) {
        var _self = this;
        var selectRangeOrColor = function(color, high) {
            var maxColor = Math.pow(2, this.bits || 8);
            if(attr == color) {
                if(color == 'alpha') {
                    return high?1:0;
                } else {
                    return high?maxColor-1:0;
                }

            } else {
                return _self[color];
            }
        }

        return {
            low:  this.getRGBAString(selectRangeOrColor('red'), selectRangeOrColor('green'), selectRangeOrColor('blue'), selectRangeOrColor('alpha')),
            high: this.getRGBAString(selectRangeOrColor('red', true), selectRangeOrColor('green', true), selectRangeOrColor('blue', true), selectRangeOrColor('alpha', true))
        }
    }

})(ns, window.color = window.color || {});
