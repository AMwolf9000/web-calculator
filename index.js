"use strict";
console.log("JS loaded!");

const allButtons = [...document.querySelectorAll("button")];
const display = document.querySelector("input");

allButtons.forEach(function (e) { // adds button functionality
    if (e.className === "") {
        e.addEventListener("click", () => {
                let inputCheck = [display.value[display.value.length - 1], display.value[display.value.length - 2]]; // last two inputs
                switch (e.innerText) { // check for iregular input
                    case "+":
                        if ( /-|\+|\*|\^|\/|\./.test(inputCheck[0]) || inputCheck[0] == undefined) return;
                        break;
                    case "*":
                        if ( /-|\+|\*|\^|\/|\./.test(inputCheck[0]) || inputCheck[0] == undefined) return;
                        break;
                    case "/":
                        if ( /-|\+|\*|\^|\/|\./.test(inputCheck[0]) || inputCheck[0] == undefined) return;
                        break;
                    case "^":
                        if ( /-|\+|\*|\^|\/|\./.test(inputCheck[0]) || inputCheck[0] == undefined) return;
                        break;
                    case "-":
                        if ( /-|\+|\*|\^|\/|\./.test(inputCheck[1]) && !/\d/.test(inputCheck[0]) || /-|\./.test(inputCheck[0]) && inputCheck[1] == undefined || inputCheck[0] == ".") return;
                        break;
                    case ".":
                        let currentIndex = 0;
                        display.value.matchAll(/-|\+|\*|\/|\^/ig).forEach((e) => {
                            if (e.index > currentIndex) currentIndex = e.index;
                        });
                        
                        let lastNum = display.value.slice(currentIndex);
                        
                        if (lastNum.includes(".")) return;
                        break;
                } 

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
    if (e.className === "CA") {
        e.addEventListener("click", () => {
            display.value = "";
        })
    }
})

function calcInput(rawInput) { // call for parse input and math calculations
    let values = [];
    let counter = 0;
    let output = "";

    for (let i = 0; i < rawInput.length; i++) { // seperates input into an array where numbers and symbols are seperate (expects string as input)
        if (values[counter] === undefined) values[counter] = ""; // prevents adding to undefined

        if (!/-|\d|\./i.test(rawInput[i])) { // tests for symbols (excluding "-" which gets tested in the next if statement)
            counter++;
            values[counter] = rawInput[i];
            counter++;
            continue;
        }

        if (rawInput[i] === "-" && /\d/.test(rawInput[i-1])) { // test for subtraction (exludes "-" if it is part of a negative number)
            counter++;
            values[counter] = rawInput[i];
            counter++;
            continue;
        }

        values[counter] += rawInput[i];
    }

    for (let i = 0; i < values.length; i++) { // performs math calculations on given input (expects array as input)
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
            case "^":
                output = n1 ** n2;
                break;
        }
        values.shift();
        values.shift();
        values[0] = output;
    }

    return output;
}