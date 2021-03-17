class Calculator {
    constructor(previousoperandtextelement, currentoperandtextelement) {
        this.previousoperandtextelement = previousoperandtextelement;
        this.currentoperandtextelement = currentoperandtextelement;
        this.clear();
    }
    clear() {
        this.currentoperand = "";
        this.previousoperand = "";
        this.operation = undefined;

    }
    delete() {
        this.currentoperand = this.currentoperand.toString().slice(0, -1);
    }
    appendnumber(number) {
        // console.log(number);

        if (number === '.' && this.currentoperand.includes('.')) return;
        this.currentoperand = this.currentoperand.toString() + number.toString();
        console.log(this.currentoperand);
    }
    chooseoperation(operation) {
        if (this.currentoperand === "") return;
        if (this.previousoperand !== "") {
            this.compute();
        }
        this.operation = operation;
        this.previousoperand = this.currentoperand;
        this.currentoperand = "";
    }
    updatedisplay() {
        this.currentoperandtextelement.innerText = this.currentoperand;
        if (this.operation != null)
            this.previousoperandtextelement.innerText = `${this.previousoperand} ${this.operation}`;
        else {
            this.previousoperandtextelement.innerText = '';
        }
    }
    compute() {
        let result;
        const prev = parseFloat(this.previousoperand);
        const curr = parseFloat(this.currentoperand);
        if (isNaN(prev) || isNaN(curr)) return;
        switch (this.operation) {
            case '+':
                result = prev + curr;
                break;
            case '/':
                result = prev / curr;
                break;
            case '-':
                result = prev - curr;
                break;
            case '*':
                result = prev * curr;
                break;
            default:
                return;
        }
        this.currentoperand = result;
        this.operation = undefined;
        this.previousoperand = '';

    }
}


const numberbutton = document.querySelectorAll('[data-number]');
const operationbutton = document.querySelectorAll('[data-operation]');
const equalbutton = document.querySelector('[data-equals]');
const allclearbutton = document.querySelector('[data-clear-all]');
const deletebutton = document.querySelector('[data-delete]');
const previousoperandtextelement = document.querySelector('[data-previous-operand]');
const currentoperandtextelement = document.querySelector('[data-current-operand]');
const calculator = new Calculator(previousoperandtextelement, currentoperandtextelement);
numberbutton.forEach(button => {
    button.addEventListener('click', () => {
        // console.log(button.innerText);
        calculator.appendnumber(button.innerText)
        calculator.updatedisplay();
    })
});
operationbutton.forEach(button => {
    button.addEventListener('click', () => {
        // console.log(button.innerText);
        calculator.chooseoperation(button.innerText)
        calculator.updatedisplay();
    })
});
equalbutton.addEventListener('click', button => {
    calculator.compute();
    calculator.updatedisplay();
});
allclearbutton.addEventListener('click', button => {
    calculator.clear();
    calculator.updatedisplay();
});
deletebutton.addEventListener('click', button => {
    calculator.delete();
    calculator.updatedisplay();
});