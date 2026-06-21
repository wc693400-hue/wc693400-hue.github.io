// Pomodoro Timer
let timerInterval;
let timeRemaining = 25 * 60;

function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    document.getElementById('timerDisplay').textContent = 
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
    if (timerInterval) return;
    timerInterval = setInterval(() => {
        if (timeRemaining > 0) {
            timeRemaining--;
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
            timerInterval = null;
            alert('Time\'s up! Take a break!');
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    timeRemaining = 25 * 60;
    updateTimerDisplay();
}

// Expense Tracker
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function addExpense() {
    const amount = parseFloat(document.getElementById('expenseAmount').value);
    const category = document.getElementById('expenseCategory').value;
    
    if (amount && category) {
        expenses.push({ amount, category, date: new Date().toLocaleDateString() });
        localStorage.setItem('expenses', JSON.stringify(expenses));
        document.getElementById('expenseAmount').value = '';
        document.getElementById('expenseCategory').value = '';
        displayExpenses();
    }
}

function displayExpenses() {
    const list = document.getElementById('expenseList');
    list.innerHTML = '';
    let total = 0;
    
    expenses.forEach((expense, index) => {
        total += expense.amount;
        const item = document.createElement('div');
        item.className = 'list-item';
        item.innerHTML = `
            <span>${expense.category}: $${expense.amount.toFixed(2)} (${expense.date})</span>
            <button class="delete-btn" onclick="deleteExpense(${index})">Delete</button>
        `;
        list.appendChild(item);
    });
    
    document.getElementById('expenseTotal').textContent = `Total: $${total.toFixed(2)}`;
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    displayExpenses();
}

// Habit Tracker
let habits = JSON.parse(localStorage.getItem('habits')) || [];

function addHabit() {
    const habitName = document.getElementById('habitName').value;
    
    if (habitName) {
        habits.push({ name: habitName, streakDays: 0, lastCompleted: null });
        localStorage.setItem('habits', JSON.stringify(habits));
        document.getElementById('habitName').value = '';
        displayHabits();
    }
}

function displayHabits() {
    const list = document.getElementById('habitList');
    list.innerHTML = '';
    
    habits.forEach((habit, index) => {
        const item = document.createElement('div');
        item.className = 'list-item';
        item.innerHTML = `
            <span>✓ ${habit.name} (${habit.streakDays} day streak)</span>
            <button class="delete-btn" onclick="deleteHabit(${index})">Delete</button>
        `;
        list.appendChild(item);
    });
}

function deleteHabit(index) {
    habits.splice(index, 1);
    localStorage.setItem('habits', JSON.stringify(habits));
    displayHabits();
}

// Quick Notes
let notes = JSON.parse(localStorage.getItem('notes')) || [];

function saveNote() {
    const noteContent = document.getElementById('noteContent').value;
    
    if (noteContent) {
        notes.push({ content: noteContent, date: new Date().toLocaleDateString() });
        localStorage.setItem('notes', JSON.stringify(notes));
        document.getElementById('noteContent').value = '';
        displayNotes();
    }
}

function displayNotes() {
    const list = document.getElementById('notesList');
    list.innerHTML = '';
    
    notes.forEach((note, index) => {
        const item = document.createElement('div');
        item.className = 'list-item';
        item.innerHTML = `
            <div>
                <div>${note.content}</div>
                <small style="color: #9ca3af;">${note.date}</small>
            </div>
            <button class="delete-btn" onclick="deleteNote(${index})">Delete</button>
        `;
        list.appendChild(item);
    });
}

function deleteNote(index) {
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
}

// Goal Setter
let goals = JSON.parse(localStorage.getItem('goals')) || [];

function addGoal() {
    const goalTitle = document.getElementById('goalTitle').value;
    const goalCategory = document.getElementById('goalCategory').value;
    
    if (goalTitle) {
        goals.push({ title: goalTitle, category: goalCategory, completed: false });
        localStorage.setItem('goals', JSON.stringify(goals));
        document.getElementById('goalTitle').value = '';
        displayGoals();
    }
}

function displayGoals() {
    const list = document.getElementById('goalsList');
    list.innerHTML = '';
    
    goals.forEach((goal, index) => {
        const item = document.createElement('div');
        item.className = 'list-item';
        item.innerHTML = `
            <span>${goal.completed ? '✓' : '○'} ${goal.title} (${goal.category})</span>
            <button class="delete-btn" onclick="deleteGoal(${index})">Delete</button>
        `;
        list.appendChild(item);
    });
}

function deleteGoal(index) {
    goals.splice(index, 1);
    localStorage.setItem('goals', JSON.stringify(goals));
    displayGoals();
}

// Mood Tracker
let moods = JSON.parse(localStorage.getItem('moods')) || [];

function recordMood(emoji, mood) {
    moods.push({ emoji, mood, date: new Date().toLocaleDateString() });
    localStorage.setItem('moods', JSON.stringify(moods));
    displayMoodHistory();
}

function displayMoodHistory() {
    const history = document.getElementById('moodHistory');
    history.innerHTML = '';
    
    moods.slice().reverse().forEach((mood, index) => {
        const entry = document.createElement('div');
        entry.className = 'mood-entry';
        entry.innerHTML = `${mood.emoji} ${mood.mood} (${mood.date})`;
        history.appendChild(entry);
    });
}

// Payment Processing
function processPayment(event) {
    event.preventDefault();
    
    const name = document.getElementById('paymentName').value;
    const email = document.getElementById('paymentEmail').value;
    const amount = document.getElementById('paymentAmount').value;
    const description = document.getElementById('paymentDescription').value;
    
    if (name && email && amount) {
        // Store payment information
        const payment = {
            name,
            email,
            amount,
            description,
            date: new Date().toLocaleString(),
            status: 'Pending Bank Transfer'
        };
        
        let payments = JSON.parse(localStorage.getItem('payments')) || [];
        payments.push(payment);
        localStorage.setItem('payments', JSON.stringify(payments));
        
        // Show success message
        alert(`Payment Initiated!\\n\\nAmount: $${amount}\\n\\nPlease contact Williams for bank transfer details.\\nA confirmation email will be sent to ${email}\\n\\nContact: wc693400@gmail.com or +234 907 1165492`);
        
        // Clear form
        event.target.reset();
    }
}

// Contact Form Handler
function handleSubmit(event) {
    event.preventDefault();
    
    const name = event.target.elements[0].value;
    const email = event.target.elements[1].value;
    const message = event.target.elements[2].value;
    
    if (name && email && message) {
        // Store contact submission
        const submission = {
            name,
            email,
            message,
            date: new Date().toLocaleString()
        };
        
        let submissions = JSON.parse(localStorage.getItem('contactSubmissions')) || [];
        submissions.push(submission);
        localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
        
        alert('Thank you for your message!\\n\\nWilliams will get back to you soon at ' + email);
        event.target.reset();
    }
}

// Initialize all displays on page load
window.addEventListener('DOMContentLoaded', () => {
    updateTimerDisplay();
    displayExpenses();
    displayHabits();
    displayNotes();
    displayGoals();
    displayMoodHistory();
});