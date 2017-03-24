// javascript for 4-function calculator

// three variables we need
var currentFunction = null;
var currentVal1 = null;
var currentVal2 = null;

// update currentFunction based on radioButton
function radioChange(){
	var radioButtons = document.getElementsByName("function");
	var which_function = null;
	for(var i=0; i<radioButtons.length; i++){
		if(radioButtons[i].checked){
			which_function = radioButtons[i].value;
			break;
		}
	}
	currentFunction = which_function;
	updateCalc();
}

// update currentVal1 or 2 based on input fields
function numberChange(){
	// firstnumber if first field
	which_field = event.target.id;
	if (which_field === "firstnumber" ) {
		currentVal1 = event.target.value;
	}
	else {
		currentVal2 = event.target.value;
	}
	updateCalc();
}

// function to update calculator
function updateCalc() {
	var output = document.getElementById('result')
	if (currentVal1 != null && currentVal2 != null && currentVal2 != 0) {
		val1 = parseFloat(currentVal1);
		val2 = parseFloat(currentVal2);
		switch(currentFunction) {
	    case "multiplication":
	        output.innerHTML = currentVal1 * currentVal2;
	        break;
	    case "division":
	        output.innerHTML = currentVal1 / currentVal2;
	        break;
	    case "addition":
	        output.innerHTML = parseFloat(currentVal1) + parseFloat(currentVal2);
	        break;
		case "subtraction":
	        output.innerHTML = currentVal1 - currentVal2;
	        break;
	    default:
	        break;

		}
	}
	else {
		output.innerHTML = "Cannot be calculated";
	}
}

// make sure we're loaded
document.addEventListener("DOMContentLoaded", function(){
	// get all radio buttons and put event listener on all of them
    var radioButtons = document.getElementsByName("function");
	for(var i = 0; i < radioButtons.length; i++) {
		radioButtons[i].addEventListener("click", radioChange, false);
	}

	// get all number inputs and put event listener on all of them
	var numberInputs = document.getElementsByName("number");
	for(var i = 0; i < numberInputs.length; i++) {
		numberInputs[i].addEventListener("keyup", numberChange, false);
	}

}, false);
