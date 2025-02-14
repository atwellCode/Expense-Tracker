// script.js
let transactions = [];

document.getElementById('transactionForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const type = document.getElementById('type').value;

  const transaction = {
    id: generateId(),
    title,
    amount,
    type,
  };

  transactions.push(transaction);
  addTransactionToDOM(transaction);
  updateBalance();
  this.reset();
});

function generateId() {
  return Math.floor(Math.random() * 1000000);
}

function addTransactionToDOM(transaction) {
  const list = document.getElementById('transactionList');
  const item = document.createElement('li');
  item.className = `list-group-item ${transaction.type}`;
  item.innerHTML = `
    ${transaction.title} <span>${transaction.type === 'income' ? '+' : '-'}$${Math.abs(transaction.amount).toFixed(2)}</span>
    <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">X</button>
  `;
  list.appendChild(item);
}

function deleteTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  updateBalance();
  renderTransactions();
}

function renderTransactions() {
  const list = document.getElementById('transactionList');
  list.innerHTML = '';
  transactions.forEach(addTransactionToDOM);
}

function updateBalance() {
  const balance = transactions.reduce((total, transaction) => {
    return transaction.type === 'income' ? total + transaction.amount : total - transaction.amount;
  }, 0);
  document.getElementById('balance').textContent = `PKR${balance.toFixed(2)}`;
}