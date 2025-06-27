// DOM Elements
const balanceAmount = document.getElementById('balance-amount');
const incomeAmount = document.getElementById('income-amount');
const expenseAmount = document.getElementById('expense-amount');
const addTransactionBtn = document.getElementById('add-transaction-btn');
const emptyAddBtn = document.getElementById('empty-add-btn');
const resetDataBtn = document.getElementById('reset-data-btn');
const transactionFormContainer = document.getElementById('transaction-form-container');
const closeFormBtn = document.getElementById('close-form-btn');
const transactionForm = document.getElementById('transaction-form');
const incomeTypeBtn = document.getElementById('income-type-btn');
const expenseTypeBtn = document.getElementById('expense-type-btn');
const amountInput = document.getElementById('amount');
const descriptionInput = document.getElementById('description');
const categorySelect = document.getElementById('category');
const dateInput = document.getElementById('date');
const transactionsList = document.getElementById('transactions-list');
const noTransactions = document.getElementById('no-transactions');
const categoryFilter = document.getElementById('category-filter');
const typeFilter = document.getElementById('type-filter');
const currentYearSpan = document.getElementById('current-year');

// Error message elements
const amountError = document.getElementById('amount-error');
const descriptionError = document.getElementById('description-error');
const categoryError = document.getElementById('category-error');
const dateError = document.getElementById('date-error');

// Categories
const incomeCategories = [
  { value: 'salary', label: 'Salary' },
  { value: 'investment', label: 'Investment' },
  { value: 'gift', label: 'Gift' },
  { value: 'other', label: 'Other' }
];

const expenseCategories = [
  { value: 'food', label: 'Food & Drinks' },
  { value: 'transport', label: 'Transportation' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'utilities', label: 'Utilities' },
  { value: 'shopping', label: 'Shopping' },
  { value: 'health', label: 'Health' },
  { value: 'other', label: 'Other' }
];

// Application State
let transactions = [];
let filters = {
  category: 'all',
  type: 'all'
};
let currentTransactionType = 'expense';

// Initialize the application
function initApp() {
  // Set current year in footer
  currentYearSpan.textContent = new Date().getFullYear();
  
  // Load saved transactions
  loadTransactions();
  
  // Set default date to today
  dateInput.value = getTodayDate();
  
  // Initialize form with expense categories (default)
  populateCategories(expenseCategories);
  
  // Populate category filter with all categories
  populateCategoryFilter();
  
  // Add event listeners
  addEventListeners();
  
  // Update UI
  updateUI();
}

// Event Listeners
function addEventListeners() {
  // Toggle add transaction form
  addTransactionBtn.addEventListener('click', toggleAddForm);
  emptyAddBtn.addEventListener('click', toggleAddForm);
  closeFormBtn.addEventListener('click', toggleAddForm);
  
  // Toggle transaction type
  incomeTypeBtn.addEventListener('click', () => setTransactionType('income'));
  expenseTypeBtn.addEventListener('click', () => setTransactionType('expense'));
  
  // Form submission
  transactionForm.addEventListener('submit', handleFormSubmit);
  
  // Filter changes
  categoryFilter.addEventListener('change', handleFilterChange);
  typeFilter.addEventListener('change', handleFilterChange);
  
  // Reset data
  resetDataBtn.addEventListener('click', confirmResetData);
}

// Toggle add transaction form
function toggleAddForm() {
  transactionFormContainer.classList.toggle('hidden');
  if (!transactionFormContainer.classList.contains('hidden')) {
    // Reset form when opening
    transactionForm.reset();
    dateInput.value = getTodayDate();
    clearErrors();
    
    // Set default transaction type
    setTransactionType('expense');
  }
}

// Set transaction type (income or expense)
function setTransactionType(type) {
  currentTransactionType = type;
  
  // Update UI
  if (type === 'income') {
    incomeTypeBtn.classList.add('active');
    expenseTypeBtn.classList.remove('active');
    populateCategories(incomeCategories);
  } else {
    expenseTypeBtn.classList.add('active');
    incomeTypeBtn.classList.remove('active');
    populateCategories(expenseCategories);
  }
}

// Populate category select with options
function populateCategories(categories) {
  categorySelect.innerHTML = '<option value="">Select a category</option>';
  
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category.value;
    option.textContent = category.label;
    categorySelect.appendChild(option);
  });
}

// Populate category filter with all categories
function populateCategoryFilter() {
  // Start with default option
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  
  // Add all categories
  incomeCategories.concat(expenseCategories).forEach(category => {
    if (!categoryFilter.querySelector(`option[value="${category.value}"]`)) {
      const option = document.createElement('option');
      option.value = category.value;
      option.textContent = category.label;
      categoryFilter.appendChild(option);
    }
  });
}

// Handle form submission
function handleFormSubmit(e) {
  e.preventDefault();
  
  // Validate form
  if (!validateForm()) {
    return;
  }
  
  // Create transaction object
  const transaction = {
    id: generateId(),
    type: currentTransactionType,
    amount: parseFloat(amountInput.value),
    description: descriptionInput.value.trim(),
    category: categorySelect.value,
    date: dateInput.value
  };
  
  // Add transaction
  addTransaction(transaction);
  
  // Reset form and hide it
  transactionForm.reset();
  toggleAddForm();
  
  // Update UI
  updateUI();
}

// Validate form inputs
function validateForm() {
  let isValid = true;
  clearErrors();
  
  // Validate amount
  if (!amountInput.value) {
    showError(amountError, 'Please enter an amount');
    isValid = false;
  } else if (parseFloat(amountInput.value) <= 0) {
    showError(amountError, 'Amount must be greater than zero');
    isValid = false;
  }
  
  // Validate description
  if (!descriptionInput.value.trim()) {
    showError(descriptionError, 'Please enter a description');
    isValid = false;
  } else if (descriptionInput.value.trim().length < 3) {
    showError(descriptionError, 'Description must be at least 3 characters');
    isValid = false;
  }
  
  // Validate category
  if (!categorySelect.value) {
    showError(categoryError, 'Please select a category');
    isValid = false;
  }
  
  // Validate date
  if (!dateInput.value) {
    showError(dateError, 'Please select a date');
    isValid = false;
  }
  
  return isValid;
}

// Show error message
function showError(element, message) {
  element.textContent = message;
}

// Clear all error messages
function clearErrors() {
  amountError.textContent = '';
  descriptionError.textContent = '';
  categoryError.textContent = '';
  dateError.textContent = '';
}

// Add a transaction
function addTransaction(transaction) {
  transactions.push(transaction);
  saveTransactions();
}

// Delete a transaction
function deleteTransaction(id) {
  if (confirm('Are you sure you want to delete this transaction?')) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    saveTransactions();
    updateUI();
  }
}

// Save transactions to localStorage
function saveTransactions() {
  localStorage.setItem('expense-tracker-transactions', JSON.stringify(transactions));
}

// Load transactions from localStorage
function loadTransactions() {
  const savedTransactions = localStorage.getItem('expense-tracker-transactions');
  if (savedTransactions) {
    try {
      transactions = JSON.parse(savedTransactions);
    } catch (error) {
      console.error('Failed to parse transactions', error);
      transactions = [];
      localStorage.removeItem('expense-tracker-transactions');
    }
  }
}

// Reset all data
function confirmResetData() {
  if (confirm('Are you sure you want to delete all transactions? This cannot be undone.')) {
    transactions = [];
    localStorage.removeItem('expense-tracker-transactions');
    updateUI();
  }
}

// Handle filter change
function handleFilterChange() {
  filters.category = categoryFilter.value;
  filters.type = typeFilter.value;
  updateUI();
}

// Update UI
function updateUI() {
  const filteredTransactions = filterTransactions();
  updateSummaryAmounts();
  renderTransactions(filteredTransactions);
}

// Filter transactions based on current filters
function filterTransactions() {
  return transactions.filter(transaction => {
    if (filters.type !== 'all' && transaction.type !== filters.type) {
      return false;
    }
    if (filters.category !== 'all' && transaction.category !== filters.category) {
      return false;
    }
    return true;
  }).sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Update summary amounts (balance, income, expenses)
function updateSummaryAmounts() {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  const netIncome = totalIncome - totalExpenses;

  incomeAmount.textContent = formatCurrency(totalIncome);
  expenseAmount.textContent = formatCurrency(totalExpenses);
  balanceAmount.textContent = formatCurrency(netIncome);

  balanceAmount.className = 'summary-value';
  if (netIncome > 0) {
    balanceAmount.classList.add('positive');
  } else if (netIncome < 0) {
    balanceAmount.classList.add('negative');
  }
}

// Render transactions list
function renderTransactions(filteredTransactions) {
  transactionsList.innerHTML = '';

  if (filteredTransactions.length === 0) {
    transactionsList.classList.add('hidden');
    noTransactions.classList.remove('hidden');
  } else {
    transactionsList.classList.remove('hidden');
    noTransactions.classList.add('hidden');

    filteredTransactions.forEach(transaction => {
      const listItem = createTransactionListItem(transaction);
      transactionsList.appendChild(listItem);
    });
  }
}

// Create a transaction list item
function createTransactionListItem(transaction) {
  const listItem = document.createElement('li');
  listItem.className = 'transaction-item';

  listItem.innerHTML = `
    <div class="transaction-details">
      <div class="transaction-icon ${transaction.type}">
        <i class="ri-arrow-${transaction.type === 'income' ? 'up' : 'down'}-line"></i>
      </div>
      <div class="transaction-content">
        <span class="transaction-description">${transaction.description}</span>
        <div class="transaction-meta">
          <span class="transaction-date">${formatDate(transaction.date)}</span>
          <span class="transaction-category category-${transaction.category}">${formatCategory(transaction.category)}</span>
        </div>
      </div>
    </div>
    <div class="transaction-right">
      <span class="transaction-amount ${transaction.type}">${formatCurrency(transaction.amount)}</span>
      <button class="delete-btn" data-id="${transaction.id}">
        <i class="ri-delete-bin-line"></i>
      </button>
    </div>
  `;

  // Add event listener to delete button
  const deleteBtn = listItem.querySelector('.delete-btn');
  deleteBtn.addEventListener('click', () => deleteTransaction(transaction.id));

  return listItem;
}

// Utility Functions

// Generate a unique ID
function generateId() {
  return Date.now().toString();
}

// Format currency for Indian Rupees
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2
  }).format(amount);
}

// Format date (e.g., 1 Jan 2023)
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-IN', options);
}

// Format category name
function formatCategory(category) {
  return category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Get today's date in YYYY-MM-DD format
function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);