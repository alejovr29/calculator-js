let operation = []
let number='0'
let operator=null;
let resultOperation='0'
let firstOperand= null;
let secondOperand=null;
let waitingOperator=true;

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
    screenValue=document.getElementById('screen-text')
    screenValue.textContent = '0'
    number = '0'
    resultOperation='0'

}

function showScreen(operation='0',newValue='0'){
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

let buttons = document.querySelector('.calculator-body');

buttons.addEventListener('click', (event)=>{
        const element = event.target;

        /* This if checks if the button is a number and assign it to the variable number */
        if (element.classList.contains('btn-number')){
            const obtainedNumber= element.innerHTML;
            console.log('You obtained a number, which is: '+ ' ' + obtainedNumber);
            if (number=='0'){
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
            showScreen(number);
            console.log('The new value is: '+ number);
        }
        /* This if checks if the button is C and clear it to default */
        else if (element.id === 'C'){
            console.log('You just erased the screen because you clicked on '+ ' ' + element.innerHTML)
            clearScreen()
        }

        else if (element.id==='point'){
            if (!(checkPoint(number))){
                number+=element.innerHTML;
                showScreen(number);
            }
        }

        else if (element.classList.contains('operator')){
            console.log('Hola presionaste un operador');
            operator=element.innerHTML;
            firstOperand=parseFloat(number);

            waitingOperator=false;
            showScreen(firstOperand+operator)
            console.log('El número del primer operando es: '+firstOperand+'El operador es: '+operator)
            number='0'
            }
        if (waitingOperator===false){
                if (firstOperand && element.classList.contains('btn-number')){
                console.log('Perro')
                secondOperand=parseFloat(number);
                console.log('El valor del segundo operando es: '+secondOperand)
                    showScreen(secondOperand)
                }
                else if(firstOperand && operator){
                    operator=element.innerHTML;
                    console.log('cambiaste el operador por: '+operator)
                    return
                }
                else if(((secondOperand) && (element.classList.contains('operator') || element.id ==='equal-btn'))){
                resultOperation=calculate(firstOperand,secondOperand,operator);
                console.log('El resultado de la operación es: '+resultOperation);
                showScreen(resultOperation);
                number=firstOperand=resultOperation;
                secondOperand=null;
                }
            }
            

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