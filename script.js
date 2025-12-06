let number='0'
let operator=null;
let firstOperand=null;
let secondOperand=null;
let repeatingOperand = null; // Saves secondOperand for repetition.
let repeatingOperator = null; // Saves used Operator for repetition.
let repeatedOperation = false; // Flag for Repeated Operations within equal-btn
let waitingforNewNumber=false;

let result = null;
let isError = false;

function calculate(num1, num2, operator){

    const n1 = parseFloat(num1) /* Avoid conflicts converting it to float numbers*/
    const n2 = parseFloat(num2)

    switch(operator){
        case '+':
            return n1 + n2;
        case '-':
            return n1-n2;
        case '*':
            return n1*n2;
        case '/':
            return n2===0 ? 'Error: Can not divide by zero': n1/n2;
    }
}

function clearScreen(){

    // Removes Error alert state on Clear button.
    const clearBtn = document.getElementById('C');
    if (clearBtn){
        clearBtn.classList.remove('error-active');
    }

    showScreen();
    number = '0';
    operator=null;
    firstOperand= null;
    secondOperand= null;
    waitingforNewNumber=false;
    result = null;
    isError = false;
    repeatingOperand = null;
    repeatingOperator = null;
    repeatedOperation = false;
}

function showScreen(newValue='0',operation='0'){
    const screenTop=document.getElementById('screen-top');
    const screenBottom=document.getElementById('screen-bottom');
    screenTop.textContent = operation;
    screenBottom.textContent = newValue;
}

function checkPoint(number){
    if (number.includes('.')){
        console.log('It has already a point.')
        return true;
}
}

function listOperation(){
    if(firstOperand===null){
        console.log('Codigo 1')
        return '0';
    }
    else if(result !== null){
        if(repeatedOperation){ // If there is a repeted operation.
        console.log('Código repetición');
        return firstOperand+repeatingOperator+repeatingOperand+'=';
        }else{        
        console.log('Codigo 4')
        return firstOperand+operator+secondOperand+'=';}
    }
    else if(operator!==null && waitingforNewNumber===true){
        console.log('Codigo 2')
        return firstOperand+operator;
    }
    else if(result === null){
        console.log('Codigo 3')
        return firstOperand+operator;
    }
}

let buttons = document.querySelector('.calculator-body');

buttons.addEventListener('click', (event)=>{
        const element = event.target.closest('button');

        // Verify if there is an error and block the operation.
        if (isError){
            // Clears the error and restart the calculator.
            if (element.id === 'C'){
            clearScreen()
        }
        
        // If input is not 'C', the click is ignored and continue displaying error message.
        return
        }
        /* This if checks if the button is a number and assign it to the variable number */
        if (element.classList.contains('btn-number')){
            const obtainedNumber= element.innerHTML;
            console.log('You obtained a number, which is: '+ ' ' + obtainedNumber);
            repeatedOperation=false;
            
            /* This line is to assign to 'number' the value to be used as second operand */
            if (waitingforNewNumber===true){
                number = obtainedNumber;
                console.log('El valor del segundo operando es:'+number);
                waitingforNewNumber=false;
                //showScreen(number,listOperation());
            }
            else if (number=='0'){
                if(checkPoint(number)){
                    number=(number+obtainedNumber);
                }
                else{
                    number=obtainedNumber;
                }
            }
            else{
                number=(number+obtainedNumber);
            }
            showScreen(number,listOperation());
        }
        /* This if checks if the button is C and clear it to default */
        else if (element.id === 'C'){
            console.log('You just erased the screen because you clicked on '+ ' ' + element.innerHTML)
            clearScreen()
        }

        else if (element.id==='point'){
            if(waitingforNewNumber===true){
                number = '0.';
                waitingforNewNumber=false;
            }
            else if (!(checkPoint(number))){
                number+=element.dataset.point;
            }
            showScreen(number,listOperation());
        }

        else if(element.id==='percentage'){
        if(firstOperand!==null && operator !== null && waitingforNewNumber===false){ // Assure % sign is only applied to secondOperator.
            let  percentageValue;
            const numberValue=parseFloat(number);
            secondOperand=numberValue;

            if(operator==='+' || operator==='-'){
                percentageValue=firstOperand*(secondOperand/100); // Assign the private percentage calculation.
            }
            if(operator==='*' || operator==='/'){
                percentageValue=secondOperand/100; // Assign the private percentage calculation.
            }

 
            const resultValue = calculate(firstOperand,percentageValue,operator);
            result = resultValue;

           // Display numberValue instead of secondOperand  in order to display original value + % sign in top-screen section.
            showScreen(result,(firstOperand+operator+numberValue+'%'+'='))

            /* Reset all operations */
            firstOperand=null;
            secondOperand=null;
            operator=null;
            number=String(result);
            waitingforNewNumber=false;
            result=null;
        }
    }

        else if (element.classList.contains('operator')){
            console.log('Hola presionaste un operador');
            const nextOperator=element.dataset.operator;
            const numberValue=parseFloat(number);
            repeatedOperation=false;

        /* Replace operator value*/
        if(firstOperand!==null && waitingforNewNumber===true){
            operator=nextOperator;
            console.log('You changed the operator for:'+operator)
        }

        /* If ready for calculate */
        if(firstOperand!==null && operator!==null && waitingforNewNumber===false){
            secondOperand=numberValue;
            const resultValue = calculate(firstOperand,secondOperand,operator)
            
            // Verify if there is an error by zero division and return.
            if(String(resultValue).includes('Error')){
                showScreen(resultValue,listOperation()+'0=');
                isError=true;
                
                // Assign Error alert state on Clear button.
                const clearBtn = document.getElementById('C');
                if (clearBtn){
                    clearBtn.classList.add('error-active');
                }
                return
            }
            
            // Assigns calculate() value if there is no error.
            result = resultValue;
            showScreen(result,(listOperation()));

            firstOperand=result;
            number=String(result);
            result=null;

        } else if(firstOperand===null){
            firstOperand=numberValue;
        }

        operator=nextOperator;
        waitingforNewNumber=true;
        console.log(`First number is ${firstOperand} and operator is ${operator}`)
        showScreen(firstOperand,listOperation())
    }

     else if(element.id==='equal-btn'){ // aa //

        if(firstOperand===null && operator === null && !repeatedOperation){
            return; // Keeps the current number if there is no operand or previous operation.
        }

        let resultValue;
        
        if(repeatedOperation){ // Repeat the last operation using result as firstOperand
            firstOperand=parseFloat(number);

            resultValue = calculate(firstOperand,repeatingOperand,repeatingOperator);
        }

        else if(firstOperand!==null && operator !== null){

            if(waitingforNewNumber===false){ 
                const numberValue=parseFloat(number);
                secondOperand=numberValue;
            } else{ // If user does not provide a secondOperand and press = after operator, calculator uses firstOperand value for secondOperand.
                secondOperand=firstOperand;
            }

            resultValue = calculate(firstOperand,secondOperand,operator);
            // Assign values to repeatingOperator and repeatingOperand if needed */

            repeatingOperand=secondOperand; // Saves secondOperand value for repetition.
            repeatingOperator=operator; // Saves operator value for repetition.
            repeatedOperation=true; // Enables flag to proceed repetition if needed.
            
            }

            // Verify if there is an error by zero division and return.
            if(String(resultValue).includes('Error')){
                showScreen(resultValue,listOperation()+'0=');
                isError=true;

                // Assign Error alert state on Clear button.
                const clearBtn = document.getElementById('C');
                if (clearBtn){
                    clearBtn.classList.add('error-active');
                }
                return
            }
            
            // Assigns calculate() value if there is no error.
            result = resultValue;
            showScreen(result,listOperation())

            /* Reset all operations */
            
            firstOperand=null;
            secondOperand=null;
            operator=null;
            number=String(result);
            waitingforNewNumber=true;
            result=null;
    }    

    else if (element.id === 'backspace'){
        if(number.length>1 || (number.length === 1 && number !== '0')){

            // Avoid deleting if the last value entered was an operator.
            if(waitingforNewNumber===true){
                return
            }

            // Deletes the last character of the string number on the screen
            number=number.slice(0,-1);
            console.log(number)
            }
            // If number gets empty it is replaced by 0 to avoid errors.
            if(number === ''){
                number='0';
            }

        showScreen(number,listOperation());
        }
})
