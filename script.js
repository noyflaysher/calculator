const previousOutput=document.querySelector('[data-previous-operand]');
const currentOutput=document.querySelector('[data-current-operand]');

const numberButtons=document.querySelectorAll('[data-numbers]');
const operatorButtons=document.querySelectorAll('[data-operators]');
const equalButton=document.querySelector('[data-equal]');
const resetButton=document.querySelector('[data-reset]');
const deleteButton=document.querySelector('[data-delete]');

// let previousOperand = previousOutput.innerText;
// let currentOperand = currentOutput.innerText;
// let operation;

console.log('hi');

class Calculator{

    constructor(previousOutput,currentOutput){
        this.previousOutput=previousOutput;
        this.currentOutput=currentOutput;
        this.reset();
    }

    reset(){
        this.operation = '';
        this.previousOperand='';
        this.currentOperand='';
    }

    appendNumber(number){
        if(number ==='.' && this.currentOperand.includes('.')) return; //not 2 points in a number
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation){
        if(this.currentOperand === '') return;
        if(this.previousOperand !== '') {
            this.compute();                        //calculate the expression until there before the new operator
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute(){
        const prev=parseFloat(this.previousOperand);
        const current=parseFloat(this.currentOperand);
        let result;
        if(isNaN(prev) || isNaN(current)) return;
        switch(this.operation){
            case '+':
                result = prev+current;
                break;
    
            case '-':
                result = prev-current 
                break;
    
            case 'x':
                result = prev * current; 
                break; 
    
            case '/':
                result = prev/current;
                break;
            
             case '=':
                 result = prev;
                  break;
    
            default: 
                return;
        } 
        this.currentOperand = result;
        this.operation = '';
        this.prevOperand = '';
    }

    delete(){
       this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    getDisplayNumber(number){
        const stringNumber=number.toString();
        const integerDigits=parseFloat(stringNumber.split('.')[0]);    //before the period
        const decimalDigits=stringNumber.split('.')[1];
        let integerDisplay;
        if(isNaN(integerDigits)){
            integerDisplay='';
        }else{
            integerDisplay=integerDigits.toLocaleString('en',{
               maximumFractionDigits:0})
            }
            if(decimalDigits!=null){
                return `${integerDisplay}.${decimalDigits}`;
            }
            else{
                return integerDisplay;
            }
    }

    updateDisplay(){
        this.currentOutput.innerText=this.getDisplayNumber(this.currentOperand);
        if(this.operation !== null) {
            this.previousOutput.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOutput.innerText = '';
        }
    }
    
}


const calculator=new Calculator(previousOutput,currentOutput);

numberButtons.forEach(button => {
    button.addEventListener('click', ()=>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();       
    });
});

equalButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
  })

resetButton.addEventListener('click',() => {
    calculator.reset();
    calculator.updateDisplay();     
});

deleteButton.addEventListener('click',() => {
    calculator.delete();
    calculator.updateDisplay();   
});

var one=document.getElementById('one');
one.addEventListener('click', function(){
    var body=document.querySelector('body');
    var toggle=document.getElementById('circle');
    body.classList.remove('active1');
    body.classList.remove('active2');
    toggle.style.left='0%';
})
var two=document.getElementById('two');
two.addEventListener('click', function(){
    var body=document.querySelector('body');
    var toggle=document.getElementById('circle');
    body.classList.add('active1');
    body.classList.remove('active2');
    toggle.style.left='40%';
    

})
var three=document.getElementById('three');
three.addEventListener('click', function(){
    var body=document.querySelector('body');
    var toggle=document.getElementById('circle');
    body.classList.add('active2');
    body.classList.remove('active1');
    toggle.style.left='80%';
})