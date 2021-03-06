var util = {};
util.dispatch = function(target, type) {
	if ("createEvent" in document) {
	    var evt = document.createEvent("HTMLEvents");
	    evt.initEvent(type, false, true);
	    target.dispatchEvent(evt);
	}
	else {
	    element.fireEvent('on' + type);
	}
}


describe('color', function() {
	it('should exist', function() {
		expect(color).toBeDefined();
	});

	it('should have a \'picker\'', function() {
		expect(color.picker).toBeDefined();
	});

	describe('model', function() {
		it('should have a \'Model\'', function() {
			expect(color.picker.Model).toBeDefined();
			
		});

		it('should be initialized a combination of red, green and blue', function() {
			var model = new color.picker.Model(0,0,0);
			expect([model.red, model.green, model.blue]).toEqual([0,0,0]);
		});

		it('or another combination of red, green and blue', function() {
			var model = new color.picker.Model(2,12,222);
			expect([model.red, model.green, model.blue]).toEqual([2,12,222]);
		});
		describe('cap to color bits', function() {
			it('should cap values higher than 255 though', function() {
				var model = new color.picker.Model(256,12,666);
				expect([model.red, model.green, model.blue]).toEqual([255,12,255]);
			});

			it('should cap values higher than given bits...', function() {
				var model = new color.picker.Model(256,12,666, 255, 2);
				expect([model.red, model.green, model.blue]).toEqual([3,3,3]);
			});
		});
		
		it('should have a string representation of a color', function() {
			var model = new color.picker.Model(128,12,212);
			expect(model.getRGBAString()).toEqual('rgba(128,12,212,1)');
		})
	});

	describe('sliders', function() {
		it('should be able to bind to a slider and set its value', function() {
			
			var model = new color.picker.Model(121,0,0);
			
			var element = document.createElement("input");
			element.value = 222;
			
			model.addWatch(element, 'red');
			util.dispatch(element, 'change')
			expect(element.value).toEqual('121');
		});
		it('should update model when a slider changes', function() {
			
			var model = new color.picker.Model(0,0,0);
			
			var element = document.createElement("input");
			
			model.addWatch(element, 'red');
			element.value = 222;
		
			util.dispatch(element, 'change')
			expect(model.red).toEqual(222);
		});
	});

	describe('listeners', function(){
		it('should notify observers', function(){
			var notified = false;
			var pickedColor;
			var model = new color.picker.Model(121,0,0);
			model.on('colorPicked', function(color){
				notified = true;
				actualColor = color;
			});
			model.colorPicked(model);

			expect(notified).toBeTruthy();
			expect(actualColor).toBe('rgba(121,0,0,1)');
		});
		
	});

	describe('color ranges', function() {
		it('should give me an object with a lower range and an upper range', function(){
			var model = new color.picker.Model(1,2,3,0.1);
			expect(model.getRGBAString()).toBe('rgba(1,2,3,0.1)');

			expect(model.getColorRangeFor('red')).toEqual({low: 'rgba(0,2,3,0.1)', high: 'rgba(255,2,3,0.1)'});
			expect(model.getColorRangeFor('green')).toEqual({low: 'rgba(1,0,3,0.1)', high: 'rgba(1,255,3,0.1)'});
			expect(model.getColorRangeFor('blue')).toEqual({low: 'rgba(1,2,0,0.1)', high: 'rgba(1,2,255,0.1)'});
			expect(model.getColorRangeFor('alpha')).toEqual({low: 'rgba(1,2,3,0)', high: 'rgba(1,2,3,1)'});
		});
	});
	
});