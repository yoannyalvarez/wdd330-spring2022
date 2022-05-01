function firstReq() {
    const input = document.getElementById('first-input').value;
    const output = document.getElementById('first-output');
    output.innerHTML = 'You entered: ' + input;
  }
  
  function intergerSum(n) {
    let total = 0;
    for (let i = 1; i <= n; i++) {
      total += i;
    }
    return total;
  }
  
  function secondReq() {
    const input = document.getElementById('second-input').value;
    const output = document.getElementById('second-output');
    output.innerHTML = 'Total: ' + intergerSum(input);
  }
  
  function Sum(a, b) {
    let anum = parseFloat(a);
    let bnum = parseFloat(b);
    let total = anum + bnum;
    return total;
  }
  
  function thirdReq() {
    const input1 = document.getElementById('third-input').value;
    const input2 = document.getElementById('fourth-input').value;
    const output = document.getElementById('third-output');
    output.innerHTML = 'Total: ' + Sum(input1, input2).toFixed(2);
  }
  
  function getNum(numId) {
    const number = document.getElementById(numId).value;
    const numberFloat = parseFloat(number);
    if (numberFloat !== NaN) {
      return numberFloat;
    } else return 0;
  }
  function updateTotal(value) {
    const outputElement = document.getElementById('stretch-output');
    outputElement.innerHTML = 'Total: ' + value;
  }
  // function declaration
  function add2(num1, num2) {
    return num1 + num2;
  }
  // function expression
  const sub2 = function(num1, num2) {
    return num1 - num2;
  }
  // arrow function
  const mult2 = (num1, num2) => num1 * num2;
  
  // using a callback to put it all together
  function performOperation(operation) {
    const total = operation(
      getNum('stretch-number1'),
      getNum('stretch-number2')
    );
    updateTotal(total);
  }