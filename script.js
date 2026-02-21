const questions = [
    {
        question: "Which language runs inside the browser?",
        options: ["Java", "Python", "JavaScript", "C++"],
        answer: "JavaScript"
    },
    {
        question: "What does CSS control?",
        options: ["Structure", "Styling", "Database", "Logic"],
        answer: "Styling"
    },
    {
        question: "HTML stands for?",
        options: ["Hyper Text Markup Language", "High Transfer Machine Language", "Home Tool Markup Language", "None"],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "Which symbol is used for comments in JS?",
        options: ["//", "#", "<!-- -->", "**"],
        answer: "//"
    }
];

let shuffled = [];
let current = 0;
let score = 0;
let selected = null;

function shuffleQuestions() {
    shuffled = [...questions].sort(() => Math.random() - 0.5);
}

function loadQuestion() {
    const q = shuffled[current];
    document.getElementById("question").innerText = q.question;

    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    q.options.forEach(option => {
        const btn = document.createElement("button");
        btn.innerText = option;
        btn.onclick = () => selectOption(btn, option);
        optionsDiv.appendChild(btn);
    });
}

function selectOption(button, option) {
    selected = option;
    document.querySelectorAll("#options button").forEach(b => b.style.background="#e6e9ef");
    button.style.background = "#a5d6a7";
}

document.getElementById("nextBtn").onclick = () => {
    if(!selected) return;

    if(selected === shuffled[current].answer) score++;

    selected = null;
    current++;

    if(current < shuffled.length) loadQuestion();
    else showResult();
};

function showResult() {
    document.getElementById("quiz-box").classList.add("hidden");
    document.getElementById("result-box").classList.remove("hidden");
    document.getElementById("score").innerText = score + " / " + shuffled.length;
}

function restartQuiz() {
    current = 0;
    score = 0;
    selected = null;
    shuffleQuestions();
    document.getElementById("quiz-box").classList.remove("hidden");
    document.getElementById("result-box").classList.add("hidden");
    loadQuestion();
}

document.getElementById("restartBtn").onclick = restartQuiz;

shuffleQuestions();
loadQuestion();