; window.fvnl = (function(self){

	var buttons = {};
	var fvready = false;
	var lastTickCount = null;
	var view;

	function loadingComplete() {
		window.parent.postMessage({type: "fvready"},"*");
		if(!fvready) return;
		window.parent.postMessage({type: "fvrunning"},"*");
	}

	function onFVNMessage(event) {
		if(event.data.type === "fvloadscript") loadScript(event.data.script);
		else if(event.data.type === "fv-button-click") onFVButtonClick(event.data.buttons);
		else if(event.data.type === "fv-recompile") recompileScript(event.data.script);
		else if(event.data.type === "fv-resize") resizeCanvas(event.data.width);
		else if(event.data.type === "fv-speed") setSimulationSpeed(event.data.speed);
		else if(event.data.type === "fv-slider") onFVSliderUpdate(event.data.buttons);
		else if(event.data.type === "fv-checkbox") onFVCheckboxUpdate(event.data.buttons);
		else if(event.data.type === "fv-patch-size") onFVPatchSize(event.data.patchSize);
        else if(event.data.type === "fv-set-error-message") setShowError(event.data.visible);
	}

	function onFVPatchSize(patchSize) {
		trace(view);
		view.dimensions.patchSize = patchSize;
		self.widgetController.updateWidgets();
	}

	function onFVButtonClick(buttonArray) {
		for(var i = 0, count = buttonArray.length; i < count; i++) {
			var info = buttonArray[i];
			var button = buttons[info.name];
			if(!button) continue;
			var forever = info.forever === true;
			if(forever === true) button.forever = button.running = true;
			else if(forever === false) button.forever = button.running = false;
			button.run();
		}
	}

	function onFVSliderUpdate(buttonArray) {
		for(var i = 0, count = buttonArray.length; i < count; i++) {
			var info = buttonArray[i];
			var button = buttons[info.name];
			if(!button) continue;
			var lastValue = button.currentValue;
			button.currentValue = info.value;
			self.onWidgetValueChange(parseInt(button.currentValue), lastValue, "widgetObj." + button.id + ".currentValue", button.id );
		}
	}

	function onFVCheckboxUpdate(buttonArray) {
		for(var i = 0, count = buttonArray.length; i < count; i++) {
			var info = buttonArray[i];
			var button = buttons[info.name];
			var lastValue = button.currentValue;
			button.currentValue = info.value;
			self.onWidgetValueChange(button.currentValue, lastValue, "widgetObj." + button.id + ".currentValue", button.id );
		}
	}

	function registerActionInput(destination) {
		var label = destination.source || destination.display;
		buttons[label] = destination;

		if(destination.type === "view") {
			view = destination;
		}
	}

	function loadScript(script) {
		fvready = true;
		buttons = {};
		window.openNlogo(script);
	}

	function recompileScript(script) {
		self.session.widgetController.setCode(script);
		self.session.recompile(function() {
			window.parent.postMessage({type: "fv-recompile-complete"},"*");
		})
	}

	function resizeCanvas(width) {
		var $canvas = $(self.viewController.view.visibleCanvas);
		var canvasWidth = $canvas.width();
		var ratio = width / canvasWidth;
		var $parent = $canvas.parent();
		var $style = $parent.siblings("#fv-styles");
		var minHeight = $("html").height();

		if(!$style.length) {
			$parent.after($("<style id='fv-styles'></style>"));
			$style = $parent.siblings("#fv-styles");
		}

		//$style.text("html { overflow-x: hidden; } #netlogo-view-0 { transform: scale("+ratio+"); transform-origin: top left;  } .netlogo-widget-container { min-height: " + minHeight + "px;}");
		//self.viewController.drawingLayer.resizeCanvas();
		//self.viewController.repaint();
		//trace(self,width,height)
	}

	function setSimulationSpeed(speed) {
		self.session.widgetController.ractive.set('speed', speed)
	}

	function updateTickCount(count) {
		if(count !== lastTickCount) {
			lastTickCount = count;
			window.parent.postMessage({type: "fv-tick-count", count: count },"*");
		}
	}

    function updateMonitor(value, display) {
        if(value != "undefined") {
          window.parent.postMessage({ type: "fv-monitor", value: value, displayName: display }, "*");
        }
    }

	function onCanvasClick(event) {
		let obj = {};
		for(var prop in event) {
			if(typeof event[prop] !== "number") continue;
			obj[prop] = event[prop];
		}
		window.parent.postMessage({type: "fv-canvas-click", event: obj },"*");
	}

    function getShowError(visible){
        window.parent.postMessage({ type: "fv-get-error-message", visible: visible }, "*");
    }

    function setShowError(visible){
        const dismiss = self.widgetController.ractive.el.parentElement.querySelector('#alert-dismiss');
        dismiss.click();
    }

	function trace () {
		for(var i = 0, count = arguments.length; i < count; i++) {
			console.log(arguments[i]);
		}
	}

	window.addEventListener("message", onFVNMessage);
	self.loadingComplete = loadingComplete.bind(this);
	self.registerActionInput = registerActionInput.bind(this);
	self.session = null;
	self.viewController = null;
	self.widgetController = null;
	self.updateTickCount = updateTickCount.bind(this);
    self.updateMonitor = updateMonitor.bind(this);
	self.onCanvasClick = onCanvasClick.bind(this);
    self.showError = getShowError.bind(this);

	return self;
}(window.fvnl || {}));