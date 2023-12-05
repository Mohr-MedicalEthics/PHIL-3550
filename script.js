// Define the philosopher data
var philosophers = {
    "Aristotle": [4, 2, 2, 2, 2, 4, 2, 4, 2, 1], // Valued the middle ground (Golden Mean), practical wisdom
    "Friedrich Nietzsche": [3, 5, 3, 5, 4, 5, 5, 1, 5, 1], // Rejected conventional morality, valued individualism
    "Immanuel Kant": [3, 1, 1, 1, 1, 1, 1, 1, 1, 1], // Strict deontological ethics, duty and universal laws
    "John Stuart Mill": [5, 4, 3, 3, 3, 4, 3, 5, 4, 2], // Utilitarianism, greatest happiness principle
    "John Rawls": [5, 3, 3, 3, 2, 4, 4, 5, 3, 2], // Theory of justice, fairness, and equality
    "Philippa Foot": [4, 3, 2, 3, 3, 4, 3, 4, 3, 2], // Virtue ethics, critic of non-cognitivism
    "Karl Marx": [3, 5, 4, 5, 5, 5, 5, 1, 5, 1], // Historical materialism, conflict theory
    "Socrates": [4, 3, 3, 2, 2, 4, 2, 4, 2, 1], // Socratic method, ethical questions, virtue
    "John Locke": [4, 2, 2, 1, 1, 3, 2, 5, 2, 1], // Social contract, natural rights, consent of the governed
    "Bertrand Russell": [5, 3, 3, 4, 3, 4, 4, 5, 4, 2], // Analytic philosophy, liberal, anti-war
    "Thomas Hobbes": [3, 2, 2, 1, 2, 1, 1, 1, 1, 1], // Social contract, authoritarianism for peace
    "G.E. Moore": [4, 3, 3, 3, 3, 4, 3, 4, 3, 2] // Common sense realism, ethical non-naturalism
};


// Function to calculate the matched philosopher
function calculateMatch(answers) {
    var bestMatch = null;
    var bestScore = Infinity; // Changed from -1 to Infinity for proper comparison

    for (var philosopher in philosophers) {
        var score = 0;
        for (var i = 0; i < 6; i++) {
            score += Math.abs(philosophers[philosopher][i] - answers['statement' + (i + 1)]);
        }
        if (bestMatch === null || score < bestScore) {
            bestMatch = philosopher;
            bestScore = score;
        }
    }

    return bestMatch;
}

// Function to display the matched philosopher on the page
function displayMatchedPhilosopher(matchedPhilosopher) {
    var resultDiv = document.getElementById('result');
    var matchedPhilosopherElement = document.getElementById('matchedPhilosopher');
    var philosopherImageElement = document.getElementById('philosopherImage');

    matchedPhilosopherElement.textContent = matchedPhilosopher;

    // Image paths based on the philosopher's name
    var imagePaths = {
        "Aristotle": 'MedEthicsAristotle.jpeg',
        "Friedrich Nietzsche": 'MedEthicsNietzsche.jpeg',
        "Immanuel Kant": 'MedEthicsKant.jpeg',
        "John Stuart Mill": 'MedEthicsJSMill.jpeg',
        "John Rawls": 'MedEthicsRawls.jpeg',
        "Philippa Foot": 'MedEthicsFoot.webp',
        "Karl Marx": 'MedEthicsMarx.jpeg',
        "Socrates": 'MedEthicsSocrates.png',
        "John Locke": 'MedEthicsLocke.jpeg',
        "Bertrand Russell": 'MedEthicsRussell.jpg', // Note: .avi is a video format, not an image
        "Thomas Hobbes": 'MedEthicsHobbes.jpeg',
        "G.E. Moore": 'MedEthicsMoore.jpeg'
        // Add more philosophers and their corresponding images if needed
    };

    // Set the image source to the corresponding philosopher's image or a placeholder if not found
    philosopherImageElement.src = 'images/' + (imagePaths[matchedPhilosopher] || 'placeholder.png');

    resultDiv.classList.remove('hidden');
}

// Event listener for form submission
document.getElementById('surveyForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var formData = new FormData(this);
    var answers = {};

    for (var pair of formData.entries()) {
        answers[pair[0]] = parseInt(pair[1], 10); // Ensure values are integers
    }

    var matchedPhilosopher = calculateMatch(answers);
    displayMatchedPhilosopher(matchedPhilosopher);
});
