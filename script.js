let currentInput = '';
let operation = '';
let previousInput = '';
let isResult = false; // Flag para identificar se o último resultado foi exibido

function updateDisplay() {
  if (operation) {
    // Exibe a expressão completa atual ou o resultado final
    document.getElementById('display').innerText = `${previousInput} ${operation} ${currentInput}`;
  } else {
    document.getElementById('display').innerText = previousInput || currentInput || '0';
  }
}

function updateHistory(expression, result) {
  const history = document.getElementById('history');
  const historyItem = document.createElement('div');
  historyItem.className = 'history-item';
  historyItem.innerText = `${expression} = ${result}`;
  history.prepend(historyItem); // Adiciona no início da lista
}

function clearDisplay() {
  currentInput = '';
  operation = '';
  previousInput = '';
  isResult = false;
  updateDisplay();
}

function appendNumber(number) {
  if (isResult) {
    currentInput = number; // Começa uma nova expressão após o resultado
    isResult = false;
  } else {
    if (currentInput === '0' && number !== '.') {
      currentInput = number; // Evita zeros à esquerda
    } else {
      currentInput += number;
    }
  }
  updateDisplay();
}

function setOperation(op) {
  if (currentInput === '' && previousInput === '') return; // Evita configurar a operação se não houver entrada
  if (currentInput !== '') {
    if (previousInput !== '') {
      calculate();
    } else {
      previousInput = currentInput;
    }
  }
  operation = op;
  currentInput = '';
  updateDisplay();
}

function calculate() {
  if (currentInput === '' || previousInput === '' || operation === '') return;

  let result;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);
  const expression = `${previousInput} ${operation} ${currentInput}`;

  switch (operation) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      result = prev / current;
      break;
    default:
      return;
  }

  // Atualiza display com a expressão atualizada e o resultado
  previousInput = result.toString();
  currentInput = '';
  operation = ''; // Limpa a operação após calcular
  isResult = true; // Marca que o resultado foi exibido
  updateDisplay();

  // Atualiza o histórico com a expressão e o resultado
  updateHistory(expression, result);
}
