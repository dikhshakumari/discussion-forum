// Function to load questions and responses from localStorage
function loadQuestions() {
    const questions = JSON.parse(localStorage.getItem('questions')) || [];
    const questionsList = document.getElementById('questions-list');

    questionsList.innerHTML = '';

    questions.forEach((question, index) => {
        const li = document.createElement('li');
        li.innerHTML = (question.resolved ? `<span class="tick">✔</span>` : '') + question.subject;
        li.addEventListener('click', () => displayQuestion(question, index));
        if (question.resolved) li.classList.add('resolved');
        questionsList.appendChild(li);
    });
}

// Function to display a question and its responses
function displayQuestion(question, index) {
    document.getElementById('question-display').style.display = 'block';
    document.getElementById('display-question').textContent = question.question;
    document.getElementById('display-subject').textContent = question.subject;

    const responsesList = document.getElementById('responses-list');
    responsesList.innerHTML = '';
    question.responses.forEach(response => {
        const li = document.createElement('li');
        li.textContent = `${response.name}: ${response.comment}`;
        responsesList.appendChild(li);
    });

    // Add event listener for the Resolve button
    document.getElementById('resolve-btn').onclick = () => resolveQuestion(index);
}

// Function to handle form submission and add question
document.getElementById('question-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const subject = document.getElementById('subject').value;
    const question = document.getElementById('question').value;

    const questions = JSON.parse(localStorage.getItem('questions')) || [];

    questions.push({
        subject: subject,
        question: question,
        responses: [],
        resolved: false
    });

    localStorage.setItem('questions', JSON.stringify(questions));
    loadQuestions();

    // Clear form
    document.getElementById('subject').value = '';
    document.getElementById('question').value = '';
});

// Function to handle response form submission
document.getElementById('response-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;

    const questions = JSON.parse(localStorage.getItem('questions'));
    const index = questions.findIndex(q => q.question === document.getElementById('display-question').textContent);

    questions[index].responses.push({
        name: name,
        comment: comment
    });

    localStorage.setItem('questions', JSON.stringify(questions));
    displayQuestion(questions[index], index);

    // Clear form
    document.getElementById('name').value = '';
    document.getElementById('comment').value = '';
});

// Function to resolve a question
function resolveQuestion(index) {
    const questions = JSON.parse(localStorage.getItem('questions'));
    questions[index].resolved = true;

    localStorage.setItem('questions', JSON.stringify(questions));
    loadQuestions();
}

// Load questions on page load
window.onload = loadQuestions;
