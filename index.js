console.log("JS loaded!");

const allButtons = Array.from(document.querySelectorAll("button"));
const display = document.querySelector("input");

allButtons.forEach(function (e) {
    if (e.className === "") {
        e.addEventListener("click", () => {
            display.value += e.innerText;
        })
    }
    if (e.className === "Remove") {
        e.addEventListener("click", () => {
            display.value = display.value.slice(0, display.value.length - 1);
        })
    }
    if (e.className === "Submit") {
        e.addEventListener("click", () => {
            display.value = calcInput(display.value);
        })
    }
})

function calcInput(rawInput) {
    let values = [];
    let counter = 0;
    let output = "";

    for (let i = 0; i < rawInput.length; i++) {
        if (values[counter] === undefined) {values[counter] = ""}
        if (!/\d/i.test(rawInput[i])) {
            counter++;
            values[counter] = "";
        }
        values[counter] += rawInput[i];
        if (!/\d/i.test(rawInput[i])) counter++;
    }

    for (let i = 0; i < values.length; i++) {
        let n1 = Number(values[0]);
        let n2 = Number(values[2]);
        let symbol = values[1];

        switch (symbol) {
            case "+":
                output = n1 + n2;
                break;
            case "-":
                output = n1 - n2;
                break;
            case "*":
                output = n1 * n2;
                break;
            case "/":
                output = n1 / n2;
                break;
        }
        values.shift();
        values.shift();
        values[0] = output;
    }

    return output;
}