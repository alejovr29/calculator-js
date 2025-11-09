let operation = []
let number=0
let operator=0
let result_operation=0

function calculate(operation){
    
}

function clearScreen(){
    screenValue=document.getElementById('screen_text')
    screenValue.textContent = '0'
    number = 0
    result_operation=0

}

function showScreen(newValue){
    screenValue=document.getElementById('screen_text')
    screenValue.textContent = newValue;
}

let buttons = document.querySelector('.calculator_body')

buttons.addEventListener('click', (event)=>{
        const element = event.target

        /* This if checks if the button is a number and assign it to the variable number */
        if (element.classList.contains('btn_number')){
            const obtainedNumber= element.innerHTML;
            console.log('Obtuviste un número, el cuál es'+ ' ' + obtainedNumber)
            number==0 ? number=obtainedNumber : number=(number+obtainedNumber)
            showScreen(number)
            console.log('El valor de número actual es '+ number)
        }
        /* This if checks if the button is C and clear it to default */
        else if (element.id === 'C'){
            console.log('Borraste toda la pantalla porque le diste click a '+ ' ' + element.innerHTML)
            clearScreen()
        }

        else if (element.id==='point'){
            valuePoint=number+element.innerHTML
            showScreen(valuePoint)
        }
})



/* Code below was meant for what I had several sections likely having the same class name, therefore itinerating along the results was the idea to avoid skipping anything*/

// let buttons = document.querySelectorAll('.calculator_body')
// buttons.forEach(button =>{
//     button.addEventListener('click', (event)=>{
//         const element = event.target

//         /* This if checks if the button is a number and assign it to the variable number */
//         if (element.classList.contains('btn_number')){
//             console.log('Obtuviste un número, el cuál es'+ ' ' + element.innerHTML)
//             number=element.innerHTML;
//             return number
//         }
//         if (element.IDList.contains())
//     })
// })