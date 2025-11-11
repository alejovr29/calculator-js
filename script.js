let operation = []
let number='0'
let operator=0
let newOperator=0
let resultOperation='0'
let firstOperand= null;
let secondOperand=null;
let waitingOperator=true;

function calculate(num1, num2, operator){

    switch(operator){
        case '+':
            return num1 + num2;
        case '-':
            return num1-num2;
        case 'x':
            return num1*num2;
        case 'operator.id==="divide"':
            return num1/num2;
    }
}

// function add(firstNumber,secondNumber){
//     resultOperation=(firstNumber+secondNumber);
//     return resultOperation;
// }

function clearScreen(){
    screenValue=document.getElementById('screen-text')
    screenValue.textContent = '0'
    number = '0'
    resultOperation='0'

}

function showScreen(newValue){
    screenValue=document.getElementById('screen-text')
    screenValue.textContent = newValue;
}

function checkPoint(number){
    if (number.includes('.')){
        console.log('It has already a point.')
        return true;
}
}

let buttons = document.querySelector('.calculator-body')

buttons.addEventListener('click', (event)=>{
        const element = event.target

        /* This if checks if the button is a number and assign it to the variable number */
        if (element.classList.contains('btn-number')){
            const obtainedNumber= element.innerHTML;
            console.log('You obtained a number, which is: '+ ' ' + obtainedNumber)
            //number==0 ? number=obtainedNumber : number=(number+obtainedNumber)
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


            showScreen(number)
            console.log('The new value is: '+ number)
        }
        /* This if checks if the button is C and clear it to default */
        else if (element.id === 'C'){
            console.log('You just erased the screen because you clicked on '+ ' ' + element.innerHTML)
            clearScreen()
        }

        else if (element.id==='point'){
            if (!(checkPoint(number))){
                number=number+element.innerHTML;
                showScreen(number);
            }
        }

        else if (element.classList.contains('operators')){
            console.log('Hola presionaste un operador');
        }

        // else if(element.id==='addition'){
        //     newOperator=+
        //     operation.push(Number(number),newOperator)
        //     showScreen((operation[0]+operation[1]))
        //     operation.push(Number(number))
        //     resultOperation=(operation[0]+operation[2])
        //     showScreen(resultOperation)
        // }
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