function add(a, b) {
    return +a + +b;
}

function subtract (a, b) {
    return a - b;
}

function multiply(a,b) {
    return a * b;
}

function divide (a,b) {
    return a / b;
}

function operate (operator = "", a, b) {

    switch (operator) {
        case '+' : 
            return add(a,b);
        case '-' :
            return subtract(a,b);
        case "/" : 
            return divide(a,b);
        case "x" :
            return multiply(a,b);
    }

}

const question = document.querySelector("#userInput");
const answer =  document.querySelector("#answer");
const keyPad = document.querySelectorAll("button");
let operatorEntd = false;
let txtEntered = false;
let numEntered = false;

keyPad.forEach(btn => btn.addEventListener("click", display));

function display(e) {

    if (txtEntered && e.target.value !== "clr") {return;}
    if (e.target.value == "=" && numEntered) {
        let userInput = question.textContent;
        question.textContent += e.target.value;
        txtEntered = true;
        return processText(userInput);
    }

     switch (e.srcElement.className) {

        case "num":
            question.textContent += e.target.value;
            operatorEntd = false;
            numEntered = true;
            break;

        case "specialBtn diff":   
            if (e.target.value === "=") {return;}

            if (e.target.value === "backspace") {
                let input = question.textContent;
                input = input.trim();
                input = input.substring(0, input.length-1);
                question.textContent = input;
            }

            else if (e.target.value === "clr") {
                question.textContent = "";
                userInput = "";
                answer.textContent = "";
                txtEntered = false;
                numEntered = false;
                operatorEntd = false;
            }

            else if (e.target.value === "plusMinus") {

            }
            operatorEntd = false;
            break;

        case "specialBtn operator":
            if (!operatorEntd && numEntered) {
                question.textContent += e.target.value;
                operatorEntd = true;
                numEntered = false;
            }
            break;

     }

}

function processText(txt = "") {

    txt = txt.trim();
    let firstOpDetected = false; let scndOpDetected =  false; let thrdOpDetected = false; let fourthOpDetected = false; let fifthOpDetected = false;
    let firstNum, secondNum, thirdNum, fourthNum, fifthNum;
    let firstOp; let scndOp; let thrdOp; let fourthOp; let fifthOp;
    firstNum = ""; secondNum = ""; thirdNum = ""; fourthNum = ""; fifthNum = "";
    let index;
    let pass = false; let scndPass = false;

    for (let i = 0; i < txt.length; i++) {

        char = txt[i];

        if ( (char == "+" || char == "-" || char == "x" || char == "/") && !firstOpDetected ) {
            firstOpDetected = true;
            firstOp = char;
            index = i;
            console.log("working: " + firstOp);

        } else if (!isNaN(char)) {
            if (!firstOpDetected) {
                firstNum += char.toString();
                console.log(firstNum);
            }
        }

    }

    for (let m = index + 1; m < txt.length; m++) { // 2nd stage

        char = txt[m];
        console.log("index: " + m);
        
        if ((char == "+" || char == "-" || char == "x" || char == "/") && !scndOpDetected) {
            scndOpDetected = true;
            pass = true;
            scndOp = char;
            index = m;
            console.log("working22: " + scndOp);

        } else if (!isNaN(char)) {
            if (!scndOpDetected) {
                secondNum += char.toString();
                console.log(secondNum);
                if (isNaN(txt[m+1])) {scndOpDtected = true; continue;}
            }
        }

    }

    for (let m = index + 1; m < txt.length; m++) { // 2nd stage

        char = txt[m];
        console.log("index223: " + m);
        
        if ((char == "+" || char == "-" || char == "x" || char == "/") && !scndOpDetected) {
            thrdOpDetected = true;
            scndPass = true;
            thrdOp = char;
            index = m;
            console.log("working2233: " + thrdOp);

        } else if (!isNaN(char)) {
            if (!thrdOpDetected) {
                thirdNum += char.toString();
                console.log(thirdNum);
                if (isNaN(txt[m+1])) {thrdOpDetected = true; continue;}
            }
        }

    }

    let ans = operate(firstOp, firstNum, secondNum);
    if (pass) { //2nd operator found
        ans = operate(scndOp, ans, thirdNum); // need to read 3rd num
    }

    console.log(ans);
    ans = ans.toFixed(1);
    answer.textContent = ans;
}