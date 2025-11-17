let number='0'
let operator=null;
let firstOperand=null;
let secondOperand=null;
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
    else if(operator!==null && waitingforNewNumber===true){
        console.log('Codigo 2')
        return firstOperand+operator;
    }
    else if(result === null){
        console.log('Codigo 3')
        return firstOperand+operator;
    }
    else if(result !== null){
        console.log('Codigo 4')
        return firstOperand+operator+secondOperand+'=';
    }
}

let buttons = document.querySelector('.calculator-body');

buttons.addEventListener('click', (event)=>{
        const element = event.target;

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
                number+=element.innerHTML;
            }
            showScreen(number,listOperation());
        }
        else if (element.classList.contains('operator')){
            console.log('Hola presionaste un operador');
            const nextOperator=element.innerHTML;
            const numberValue=parseFloat(number);

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
    else if(element.id==='equal-btn'){
        if(firstOperand!==null && operator !== null && waitingforNewNumber===false){
            const numberValue=parseFloat(number);
            secondOperand=numberValue

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
            showScreen(result,listOperation())

            //showScreen(result,(`${firstOperand} ${operator} ${numberValue} =`));

            /* Reset all operations */
            firstOperand=null;
            secondOperand=null;
            operator=null;
            number=String(result);
            waitingforNewNumber=false;
            result=null;
        }
    }
        // else if (element.classList.contains('operator')){
        //     console.log('Hola presionaste un operador');
        //     operator=element.innerHTML;
        //     firstOperand=parseFloat(number);

        //     waitingOperator=false;
        //     showScreen(firstOperand,firstOperand+operator)
        //     console.log('El número del primer operando es: '+firstOperand+'El operador es: '+operator)
        //     number='0'
        //     }
        // if (waitingOperator===false){
        //         if (firstOperand && element.classList.contains('btn-number')){
        //         console.log('Perro')
        //         secondOperand=parseFloat(number);
        //         console.log('El valor del segundo operando es: '+secondOperand)
        //             showScreen(secondOperand,firstOperand+operator)
        //         }
        //         else if(firstOperand && operator){
        //             operator=element.innerHTML;
        //             console.log('cambiaste el operador por: '+operator)
        //             return
        //         }
        //         else if(((secondOperand) && (element.classList.contains('operator') || element.id ==='equal-btn'))){
        //         resultOperation=calculate(firstOperand,secondOperand,operator);
        //         console.log('El resultado de la operación es: '+resultOperation);
        //         showScreen(resultOperation,firstOperand+operator+secondOperand+'=');
        //         number=firstOperand=resultOperation;
        //         secondOperand=null;
        //         }
        //     }
            

})




/* Code below was meant for what I had several sections likely having the same class name, therefore itinerating along the results was the idea to avoid skipping anything*/

// let buttons = document.querySelectorAll('.calculator-body')
// buttons.forEach(button =>{
//     button.addEventListener('click', (event)=>{
//         const element = event.target

//         /* This if checks if the button is a number and assign it to the variable number */
//         if (element.classList.contains('btn-number')){
//             console.log('Obtuviste un número, el cuál es'+ ' ' + element.innerHTML)
//             number=element.innerHTML;
//             return number
//         }
//         if (element.IDList.contains())
//     })
// })