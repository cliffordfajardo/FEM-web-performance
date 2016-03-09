// requestAnimationFrame polyfill by Erik Möller
// fixes from Paul Irish and Tino Zijdel
// (function __requestAnimationFrame__() {
// 	var lastTime = 0;
// 	var vendors = ['ms', 'moz', 'webkit', 'o'];
// 	for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
// 		window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
// 		window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
// 	}
//
// 	if (!window.requestAnimationFrame) {
// 		window.requestAnimationFrame = function rafPolyfill(callback, element) {
// 			var currTime = new Date().getTime();
// 			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
// 			var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
// 			lastTime = currTime + timeToCall;
// 			return id;
// 		};
// 	}
//
// 	if (!window.cancelAnimationFrame) {
// 		window.cancelAnimationFrame = function cafPolyfill(id) {
// 			clearTimeout(id);
// 		};
// 	}
// })();


(function(){

	// silly/naive fibonnaci
	function calcFib(n) {
		var n2 = 0;
		var n1 = 1;
		var calc = n2;
		if (n > 1) {
			return calcFib(n-1) + calcFib(n-2);
		}
		else {
			return n;
		}
		return calc;
	}

	function updateMover() {
		if ($mover.is(".moved")) {
			$mover.removeClass("moved");
		}
		else {
			$mover.addClass("moved");
		}
	}

	function updateFib() {
		/*tells the browser that you wish to perform an animation & requests that the browser
		call a specified function to update an animation before the next repaint. The method
		takes as an argument a callback to be invoked before the repaint.*/
		window.requestAnimationFrame(function(){
			// QUESTION: how could you use the Web Worker here to offload `calcFib()` to another thread?
			var res = calcFib(fib_n);
			$current.text("Fib(" + fib_n + "): " + res);
			fib_n = (fib_n + 1) % MAX_FIB;
			setTimeout(updateFib,300);
		});
	}

	var $mover = $("#mover");
	var $current = $("#current");
	var transitionend = false;
	var fib_n = 0;
	var MAX_FIB = 40;

	var fibWorker = new Worker("ex6.fib.js");

	fibWorker.onmessage = function(e){
		var answer = e.data;
		console.log('an answer')
	};

	// keep toggling the transition back & forth
	$mover.bind("transitionend webkitTransitionEnd oTransitionEnd",function(evt){
		if (!transitionend) { // hack to filter out duplicate transitionend events in Chrome
			transitionend = true;
			setTimeout(function(){
				transitionend = false;
			},0);

			updateMover();
		}
	});

	updateMover();

	updateFib();

})();
