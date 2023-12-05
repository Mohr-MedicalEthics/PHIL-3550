// Define the philosopher data
var philosophers = {
    "Aristotle": [3, 3, 2, 4, 2, 3],
    "Friedrich Nietzsche": [2, 3, 3, 3, 4, 2],
    "Immanuel Kant": [1, 1, 1, 5, 1, 1],
    "John Stuart Mill": [5, 4, 4, 3, 2, 4],
    "John Rawls": [3, 3, 3, 3, 2, 4],
    "Philippa Foot": [4, 2, 2, 4, 3, 3],
    "Karl Marx": [2, 4, 3, 2, 1, 2],
    "Socrates": [3, 2, 2, 4, 3, 3],
    "John Locke": [4, 3, 3, 5, 1, 2],
    "Bertrand Russell": [4, 3, 3, 3, 3, 3],
    "Thomas Hobbes": [1, 1, 1, 1, 1, 1],
    "G.E. Moore": [1, 2, 3, 4, 5, 6]
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
