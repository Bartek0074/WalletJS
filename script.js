const incomeSection = document.querySelector('.income-area');
const expensesSection = document.querySelector('.expenses-area');
const deleteTransactionBtn = document.querySelectorAll('.delete');
const availableMoney = document.querySelector('.available-money');
const addTransactionBtn = document.querySelector('.add-transaction');
const deleteAllTransactionBtn = document.querySelector('.delete-all');
const lightStyleButton = document.querySelector('.light');
const darkStyleButton = document.querySelector('.dark');
const addTransactionPanel = document.querySelector('.add-transaction-panel');
const transactionNameInput = document.querySelector('#name');
const transactionAmountInput = document.querySelector('#amount');
const transactionCategoryInput = document.querySelector('#category');
const saveTransactionBtn = document.querySelector('.save');
const cancelTransactionBtn = document.querySelector('.close');

let root = document.querySelector(':root');
let ID = 0;
let categoryIcon;
let selectedCategory;
let moneyArr = [0];

const showPanel = () => {
    addTransactionPanel.style.display = 'flex';
}

const hidePanel = () => {
    addTransactionPanel.style.display = 'none';
    clearInputs();
}

const checkForm = () => {
    if (transactionNameInput.value !== '' && transactionAmountInput.value !== '' && transactionCategoryInput.value !== 'none') {
        console.log('formularz git')
    } else {
        alert('Complete the form!')
    }
}

const clearInputs = () => {
    transactionNameInput.value = '';
    transactionAmountInput.value = '';
    transactionCategoryInput.value = 'none';
}

addTransactionBtn.addEventListener('click', showPanel);
cancelTransactionBtn.addEventListener('click', hidePanel);
saveTransactionBtn.addEventListener('click', checkForm);