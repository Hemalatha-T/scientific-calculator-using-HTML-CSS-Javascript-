document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById('calDisplay');
    const buttons = document.getElementsByClassName('btn');
  
    let currentValue = "";

    function addToDisplay(value) {
        currentValue += value;
        display.value = currentValue;
    }
  
    function evaluateResult() {
      console.log('currentValue:', currentValue);
      let convertedValue = currentValue
        .replace("×", "*")
        .replace("÷", "/")
        .replace('%', '*0.01')
        .replace('sin', 'Math.sin')
        .replace('cos', 'Math.cos')
        .replace('ln', 'Math.log')
        .replace('π', 'Math.PI')
        .replace('log', 'Math.log10')
        .replace('e', 'Math.E')
        .replace('tan', 'Math.tan')
        .replace('√', 'Math.sqrt');
      
      // Handle exponentiation (^) using a regular expression
      convertedValue = convertedValue.replace(/(\d+)\^(\d+)/g, 'Math.pow($1,$2)');
      
      console.log('convertedValue:', convertedValue);
      try {
        const result = eval(convertedValue);
        currentValue = result.toString();
      } catch (error) {
        currentValue = "ERROR";
        console.error(error);
      }
      display.value = currentValue;
    }
  
    for (let i = 0; i < buttons.length; i++) {
      const button = buttons[i];
      button.addEventListener('click', function() {
        const value = button.innerText;
        try {
          if (value == "AC") {
            currentValue = "";
            display.value = currentValue;
          } else if(value == "=") {
            evaluateResult();
          } else {
            addToDisplay(value);
          }
        } catch (error) {
          console.error(error);
          currentValue = "ERROR";
          display.value = currentValue;
        }
      });
    }
});
