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
        createNewTransaction();
    } else {
        alert('Complete the form!')
    }
}

const clearInputs = () => {
    transactionNameInput.value = '';
    transactionAmountInput.value = '';
    transactionCategoryInput.value = 'none';
}

const createNewTransaction = () => {
    const newTransaction = document.createElement('div');
    newTransaction.classList.add('transaction');
    newTransaction.setAttribute('id', ID);

    checkCategory(selectedCategory);

    newTransaction.innerHTML = `
    <p class="transaction-name">${categoryIcon}${transactionNameInput.value}</p>
    <p class="transaction-amount">${transactionAmountInput.value}$<button class="delete" onclick="deleteTransaction(${ID})"><i class="fas fa-times"></i></button></p>
    `

    transactionAmountInput.value > 0 ? incomeSection.appendChild(newTransaction) && newTransaction.classList.add('income') : expensesSection.appendChild(newTransaction) && newTransaction.classList.add('expense')
    moneyArr.push(parseFloat(transactionAmountInput.value));

    hidePanel();
    ID++;
    clearInputs();
    changeAvailableMoney();
}

const selectCategory = () => {
    selectedCategory = transactionCategoryInput.options[transactionCategoryInput.selectedIndex].text;
} 

const checkCategory = transaction => {
    switch (transaction) {
        case `[ + ] Income`:
            categoryIcon = '<i class="fas fa-money-bill-wave"></i>';
            break;
        case `[ - ] Shopping`:
            categoryIcon = '<i class="fas fa-cart-arrow-down"></i>';
            break;
        case `[ - ] Food`:
            categoryIcon = '<i class="fas fa-hamburger"></i>';
            break;
        case `[ - ] Entertainment`:
            categoryIcon = '<i class="fas fa-film"></i>';
            break;
    }
}

const changeAvailableMoney = () => {
    let sum = 0;
    for (let i = 0; i < moneyArr.length; i++) {
        sum += moneyArr[i];
    }
    console.log(sum);
    availableMoney.textContent = `${sum}$`;
}

const deleteTransaction = id => {
    const transactionToDelete = document.getElementById(id);
    const transactionAmount = parseFloat(transactionToDelete.childNodes[3].textContent.slice(0, -1));
    
    moneyArr.splice(moneyArr.indexOf(transactionAmount), 1);
    changeAvailableMoney();

    transactionToDelete.remove();
}

const deleteAllTransactions = () => {
    incomeSection.innerHTML = '<h3>Income:</h3>';
    expensesSection.innerHTML = '<h3>Expenses:</h3>';
    moneyArr = [0];
    changeAvailableMoney();
}

const changeStyleToLight = () => {
    root.style.setProperty('--first-color', '#f9f9f9');
    root.style.setProperty('--second-color', '#14161f');
    root.style.setProperty('--border-color', 'rgba(0, 0, 0, .2)');
}

const changeStyleToDark = () => {
    root.style.setProperty('--first-color', '#14161f');
    root.style.setProperty('--second-color', '#f9f9f9');
    root.style.setProperty('--border-color', 'rgba(255, 255, 255, .4)');
}

addTransactionBtn.addEventListener('click', showPanel);
cancelTransactionBtn.addEventListener('click', hidePanel);
saveTransactionBtn.addEventListener('click', checkForm);
deleteAllTransactionBtn.addEventListener('click', deleteAllTransactions);
lightStyleButton.addEventListener('click', changeStyleToLight);
darkStyleButton.addEventListener('click', changeStyleToDark);