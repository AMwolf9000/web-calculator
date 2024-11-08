"use strict";

const allButtons = [...document.querySelectorAll("button")];
const display = document.querySelector("input");

// adds event listeners to buttons
allButtons.forEach((e) => { 

    // input for numbers and characters
    if (!/CA|Remove|Submit/.test(e.className)) {
        e.addEventListener("click", () => {
            
            // last two inputs
            let inputCheck = [display.value[display.value.length - 1], display.value[display.value.length - 2]]; 
            
            // the following is for error protection when inputing (e.g. no double symbols like "++")
            // tests for symbols +,*,^,/ to see if they are preceded by -,+,*,^,/,"."
            if (/[+*^/]/.test(e.innerText)) {
                if ( /[\-+*^/.]/.test(inputCheck[0]) || inputCheck[0] == undefined) return;
            }
            
            // tests if no more than 2 "-" precede each other
            // one and only one of the following symbols/charcters (+,*,/,^,".") can precede "-"
            // this is due to the fact that "-" also can mean a negative number and not just subtraction
            if (e.innerText === "-") {
                if ( /[\-+*^/.]/.test(inputCheck[1]) && !/\d/.test(inputCheck[0]) || /-|\./.test(inputCheck[0]) && inputCheck[1] == undefined || inputCheck[0] == ".") return;
            }

            // tests if last number (seperated by a symbol) contains a "."
            if (e.innerText === ".") {
                let lastNum, currentIndex = 0;

                display.value.matchAll(/[\-+*/^]/g).forEach((e) => {
                    if (e.index > currentIndex) currentIndex = e.index;
                });
                
                lastNum = display.value.slice(currentIndex);
                
                if (lastNum.includes(".")) return;
            }

            // append character to display if above criteria do not return early
            display.value += e.innerText;
        });
    }

    // Remove most recent character from display
    if (e.className === "Remove") {
        e.addEventListener("click", () => {
            display.value = display.value.slice(0, display.value.length - 1);
        });
    }

    // Take string from display and run it through calcInput(), then display result
    if (e.className === "Submit") {
        e.addEventListener("click", () => {
            display.value = calcInput(display.value);
        });
    }

    // clears display
    if (e.className === "CA") {
        e.addEventListener("click", () => {
            display.value = "";
        });
    }
});


function calcInput(rawInput) {
    let values = [];
    let counter = 0;
    let output = "";

    // seperates input into an array where numbers and symbols are seperate
    for (let i = 0; i < rawInput.length; i++) { 
        
        // prevents adding to undefined
        if (values[counter] === undefined) values[counter] = ""; 

        // tests for symbols (excluding "-" which gets tested in the next if statement)
        if (!/-|\d|\./i.test(rawInput[i])) { 
            counter++;
            values[counter] = rawInput[i];
            counter++;
            continue;
        }

        // test for subtraction (exludes "-" if it is part of a negative number)
        if (rawInput[i] === "-" && /\d/.test(rawInput[i-1])) { 
            counter++;
            values[counter] = rawInput[i];
            counter++;
            continue;
        }

        values[counter] += rawInput[i];
    }

    // set variables needed for math calculation and
    // set number of times to do calculations
    let index, n1, n2, symbol, loopTimes = rawInput.match(/-(?!-)|[+*/^]/g).length;

    for (let i = 0; i < loopTimes; ++i) {
        
        // run for exponentiation
        if (values.includes("^")) {
            index = values.indexOf("^");
            n1 = Number(values[index - 1]);
            n2 = Number(values[index + 1]);
            symbol = values[index];

            output = n1 ** n2;
            values[index] = output;
            values.splice(index - 1, 1);
            values.splice(index, 1);
            
            continue;
        }

        // run for multiplication and division
        if (values.includes("*") || values.includes("/")) {
            index = (values.indexOf("*") != -1) ? values.indexOf("*") : values.indexOf("/");
            n1 = Number(values[index - 1]);
            n2 = Number(values[index + 1]);
            symbol = values[index];
            
            if (symbol === "*") {
                output = n1 * n2;
            } else {output = n1 / n2}

            values[index] = output;
            values.splice(index - 1, 1);
            values.splice(index, 1);
            
            continue;
        }

        // run for addition and subtraction
        if (values.includes("+") || values.includes("-")) {
            index = (values.indexOf("+") != -1) ? values.indexOf("+") : values.indexOf("-");
            n1 = Number(values[index - 1]);
            n2 = Number(values[index + 1]);
            symbol = values[index];
            
            if (symbol === "+") {
                output = n1 + n2;
            } else {output = n1 - n2}

            values[index] = output;
            values.splice(index - 1, 1);
            values.splice(index, 1);
            
            continue;
        }
    }

    return output;
}