// ADD BUDGET ITEMS
const budgetForm = document.querySelector('.budget');
const budgetError = document.querySelector('.budgetError');
const budgetInput = document.querySelector('.budgetInput');
const budgetOutput = document.querySelector('.budgetValue');
const budgetButton = document.querySelector('.calc');

// EXPENSES ITEMS
const expensesForm = document.querySelector('.expenses');
const expenseOutput = document.querySelector('.expenseValue');
const expenseAmount = document.querySelector('#myExpenseAmount');
const expenseError = document.querySelector('.expenseError');
const expensesOutput = document.querySelector('.expensesOutput');
const expenseInput = document.querySelector('#myExpense');

// BALANCE ITEM
const balanceOutput = document.querySelector('.balanceValue');

// BUDGET CLASS
class Budget {
    constructor(budget) {
        this.budget = budget;
    }
}

// UI CLASS
class UI {
    static showBudget (e) {
        e.preventDefault();
        if(budgetInput.value != false) // FILLED THE FIELD
        {
            const newBudget = new Budget(budgetInput.value); // CREATE A NEW BUDGET OBJECT
            balanceOutput.innerHTML = newBudget.budget; // AND CALCULATE BALANCE
            budgetOutput.innerHTML = newBudget.budget; // AND BUDGET

            UI.clearBudgetField(); // AND CLEAR BUDGET INPUT FIELD

            UI.changeBalanceColor(); // CHANGE BALANCE VALUE COLOR
            
        } else // IF YOU DIDNT FILL THE FIELD
        {
            // GIVE ERROR
            budgetError.style.display = 'block';
            budgetError.innerHTML = 'Value Cannot Be Empty Or Negative';

            setTimeout(() => {
                budgetError.style.display = 'none'; // AND MAKE IT DISAPPEAR AFTER 3 SECONDS
            }, 3000)
        }
    } // END OF SHOWBUDGET

    // ADD EXPENSES METHOD
    static addExpenses = (e) => {
        e.preventDefault();
        
        // IF A VALUE ENTERED AND THERE IS A BUDGET
        if(expenseAmount.value !== '' && budgetOutput.innerHTML !== '0' && expenseInput.value !== '') {
        expenseOutput.innerHTML = new Number(expenseOutput.innerHTML) + new Number(expenseAmount.value); // DISPLAY EXPENSES VALUE

        balanceOutput.innerHTML = new Number(balanceOutput.innerHTML) - new Number(expenseAmount.value); // DISPLAY BALANCE WITH EXPENSES

        UI.changeBalanceColor(); // CHANGE BALANCE VALUE COLOR

        // DISPLAY EXPENSES VALUE IN TABLE
        expensesOutput.style.display = 'grid';
        expensesOutput.innerHTML += `<div class="expenseTab">
        <h2 class="expenseTitle">${expenseInput.value}</h2>
        <span>$<span class="expenseValue">${expenseAmount.value}</span></span>
        <div class="buttons">
                    <a href="#" class="modify"><i class="fa-solid fa-pen-to-square"></i></a>
                    <a href="#" class="delete"><i class="fa-solid fa-trash-can"></i></a>
        </div></div>`;

        // ADD MODIFY EVENT
        const modifyButtons = document.querySelectorAll('.modify'); // TAKING MODIFY BUTTONS INTO LIST

        // AND GOING THROUGH EACH WHILE ADDING EVENT TO EACH MODIFY BUTTONS
        modifyButtons.forEach((modify) => {
            modify.addEventListener('click', UI.modifyItem)
        })

        // ADD DELETE EXPENSE EVENT
        const deleteButtons = document.querySelectorAll('.delete'); // TAKING DELETE BUTTONS INTO LIST

        // AND GOING THROUGH EACH WHILE ADDING EVENT TO EACH DELETE BUTTON
        deleteButtons.forEach((deleteButton) => {
            deleteButton.addEventListener('click', UI.deleteItem);
        })

        

        } // BUT IF NO VALUE PASSED 
        if(expenseAmount.value === '' || expenseInput.value === '') {
            // GIVE ERROR MESSAGE
            expenseError.style.display = 'block';
            expenseError.innerHTML = 'Please Fill all Fields';
            // AND MAKE IT DISAPPEAR AFTER 3 SECOND
            setTimeout(() => {
                expenseError.style.display = 'none';
            }, 3000)
        } // OR IF THERE IS NO BUDGET 
        if(budgetOutput.innerHTML === '0') {
            // GIVE ERROR MESSAGE
            expenseError.style.display = 'block';
            expenseError.innerHTML = 'Please add budget first';
            // AND MAKE IT DISAPPEAR AFTER 3 SECONDS
            setTimeout(() => {
                expenseError.style.display = 'none';
            }, 3000)
        }

        UI.clearExpenseInput(); // CLEAR FIELD
    } // END OF ADDEXPENSES

    // CLEAR EXPENSE AMOUNT FIELD
    static clearExpenseInput = () => {
        expenseAmount.value = '';
        expenseInput.value = '';
    }

    // CLEAR BUDGET FIELD
    static clearBudgetField = () => {
        budgetInput.value = '';
    } // END OF CLEARBUDGETFIELD

    // CHANGE COLOR OF BALANCE BASED ON ITS VALUE
    static changeBalanceColor = () => {
        if(new Number(balanceOutput.innerHTML) > 0) { // IF BALANCE IS POSITIVE
            balanceOutput.style.color = 'green';    // MAKE IT GREEN
            balanceOutput.parentElement.style.color = 'green'; 
        } else if(new Number(balanceOutput.innerHTML) < 0) {    // IF BALANCE IS NEGATIVE
            balanceOutput.style.color = 'red';  // MAKE IT RED
            balanceOutput.parentElement.style.color = 'red';
        } else if (new Number(balanceOutput.innerHTML) == 0) { // IF BALANCE IS 0
            balanceOutput.style.color = 'white';    // MAKE IT WHITE
            balanceOutput.parentElement.style.color = 'white';
        }
    } // END OF CHANGEBALANCECOLOR

    // MODIFY EXPENSE VALUE OR NAME
    static modifyItem = (e) => {
        const parent = e.target.parentElement.parentElement.parentElement; // GET THE RIGHT EXPENSETAB DIV
        expenseInput.value = parent.querySelector('.expenseTitle').innerHTML; // CHANGE NAME IN INPUT

        expenseAmount.value = parent.querySelector('.expenseValue').innerHTML; // CHANGE VALUE IN INPUT

        document.querySelector('.expensesOutput').removeChild(parent); // DELETE THE ELEMENT YOU WANT TO MODIFY
        expenseOutput.innerHTML = new Number(expenseOutput.innerHTML) - new Number(parent.querySelector('.expenseValue').innerHTML); // GETTING THE RIGHT EXPENSES OUTPUT VALUE
        balanceOutput.innerHTML = new Number(balanceOutput.innerHTML) + new Number(parent.querySelector('.expenseValue').innerHTML); // AND BALANCE OUTPUT VALUE TOO 

        UI.changeBalanceColor(); // AND MAKEING SURE BALANCE COLOR IS RIGHT
    } // END OF MODIFYEXPENSE

    static deleteItem = (e) => {
        const parent = e.target.parentElement.parentElement.parentElement; // GET THE RIGHT EXPENSETAB DIV

        document.querySelector('.expensesOutput').removeChild(parent); // DELETE THE ELEMENT YOU WANT TO MODIFY

        expenseOutput.innerHTML = new Number(expenseOutput.innerHTML) - new Number(parent.querySelector('.expenseValue').innerHTML); // GETTING THE RIGHT EXPENSES OUTPUT VALUE
        balanceOutput.innerHTML = new Number(balanceOutput.innerHTML) + new Number(parent.querySelector('.expenseValue').innerHTML); // AND BALANCE OUTPUT VALUE TOO

        UI.changeBalanceColor(); // AND MAKEING SURE BALANCE COLOR IS RIGHT
    } // END OF DELETEEXPENSE
}

// ADD BUDGET EVENT
budgetForm.addEventListener('submit', UI.showBudget);

// ADD EXPENSES EVENT
expensesForm.addEventListener('submit', UI.addExpenses);

