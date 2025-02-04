function appendValue(value) {
    let display = document.getElementById("result");

    if (value === 'sqrt') {
        let num = parseFloat(display.value);
        let result = Math.sqrt(num);
        display.value = result;
        addToHistory(`√${num}`, result);
    } else if (value === 'cbrt') {
        let num = parseFloat(display.value);
        let result = Math.cbrt(num);
        display.value = result;
        addToHistory(`∛${num}`, result);
    } else if (value === 'reciprocal') {
        let num = parseFloat(display.value);
        if (num === 0) {
            display.value = "Error";
            return;
        }
        let result = 1 / num;
        display.value = result;
        addToHistory(`1/${num}`, result);
    } else if (value === 'factorial') {
        calculateFactorial();
    } else if (value === 'Math.PI') {
        display.value += Math.PI.toFixed(6); 
    } else if (value === '^') {
        display.value += '**'; 
    } else {
        display.value += value;
    }
}


function clearDisplay() {
    document.getElementById("result").value = "";
}

function deleteLast() {
    let display = document.getElementById("result");
    display.value = display.value.slice(0, -1);
}


function calculate() {
    try {
        let expression = document.getElementById("result").value;

        expression = expression.replace(/(\d+)\*\*(\d+)/g, 'Math.pow($1,$2)');

        let result = Function('return ' + expression)();
        document.getElementById("result").value = result;
        addToHistory(expression, result);
    } catch (error) {
        document.getElementById("result").value = "Error";
    }
}

function addToHistory(expression, result) {
    let historyList = document.getElementById("history-list");
    let listItem = document.createElement("li");
    listItem.textContent = `${expression} = ${result}`;
    historyList.appendChild(listItem);
}

function calculateFactorial() {
    let num = parseInt(document.getElementById("result").value);
    if (isNaN(num) || num < 0) {
        document.getElementById("result").value = "Error";
        return;
    }
    let fact = 1;
    for (let i = 2; i <= num; i++) {
        fact *= i;
    }
    document.getElementById("result").value = fact;
    addToHistory(`${num}!`, fact);
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    let button = document.querySelector(".toggle-btn");
    if (document.body.classList.contains("dark-mode")) {
        button.textContent = "🌞";
    } else {
        button.textContent = "🌙";
    }
}

function validateInput() {
    let display = document.getElementById("result");
    display.value = display.value.replace(/[^0-9+\-*/().^π]/g, '');
}

document.getElementById("result").addEventListener("keydown", function (event) {
    let allowedKeys = /^[0-9+\-*/().^π]$/;
    
    if (!event.key.match(allowedKeys) && event.key !== "Backspace" && event.key !== "Enter") {
        event.preventDefault();
    }

    if (event.key === "Enter") {
        calculate();
    }
});
