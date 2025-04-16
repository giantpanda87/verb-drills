import verbs from "./src/verbs.js";
import { conjugateVerb } from "./src/conjugationrules.js";

const subjects = ["I", "You", "He", "She", "It", "We", "They"];
        const tenses = ["Present Simple", "Present Continuous", "Imperative", "Conditional", "Future Simple", "Past Simple"];

        let selectedTenses = [...tenses]; // Default to all tenses
        let currentVerb, currentSubject, currentTense;
        let correctAnswers = 0;
        let streak = 0;
        let highScore = localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore')) : 0;

        document.addEventListener("DOMContentLoaded", () => {
            const fontToggleButton = document.getElementById("font-toggle");
            let isDyslexicFont = localStorage.getItem("isDyslexicFont") === "true";

            // Apply the saved font on page load
            document.body.style.fontFamily = isDyslexicFont
                ? "'OpenDyslexic', Arial, sans-serif"
                : "'Roboto', Arial, sans-serif";

            fontToggleButton.querySelector(".font-icon").innerText = isDyslexicFont ? "D" : "R";

            fontToggleButton.addEventListener("click", () => {
                isDyslexicFont = !isDyslexicFont;

                // Apply the correct font-family to the body
                document.body.style.fontFamily = isDyslexicFont
                    ? "'OpenDyslexic', Arial, sans-serif"
                    : "'Roboto', Arial, sans-serif";

                // Save the font choice to localStorage
                localStorage.setItem("isDyslexicFont", isDyslexicFont);

                // Update the button text or icon
                fontToggleButton.querySelector(".font-icon").innerText = isDyslexicFont ? "D" : "R";
            });
            document.getElementById('highScoreValue').innerText = highScore;

            function getRandomElement(arr) {
                return arr[Math.floor(Math.random() * arr.length)];
            }

            function newQuestion() {
                try {
                    currentSubject = getRandomElement(subjects);
                    currentTense = getRandomElement(selectedTenses);
            
                    // Ensure the imperative tense is only used with valid subjects
                    let attempts = 0; // Counter to track the number of attempts
                    while (currentTense === "Imperative" && ["I", "He", "She", "It", "They"].includes(currentSubject)) {
                        currentTense = getRandomElement(selectedTenses);
                        attempts++;
                        if (attempts > 10) { // Safeguard to prevent infinite loop
                            console.error("Failed to find a valid tense after 10 attempts");
                            break;
                        }
                    }
            
                    currentVerb = getRandomElement(verbs);
                    document.getElementById("verb").innerText = currentVerb;
                    document.getElementById("subject").innerText = currentSubject === "I" ? "I" : currentSubject.toLowerCase(); // Ensure "I" is uppercase
                    document.getElementById("tense").innerText = currentTense.toLowerCase();
                    document.getElementById("answer").value = "";
                    document.getElementById("feedback").innerText = "";
                } catch (error) {
                    console.error("Error in newQuestion:", error);
                }
            }  

            function checkAnswer() {
                try {
                    const userAnswer = document.getElementById("answer").value.trim().toLowerCase();
                    const correctAnswer = conjugateVerb(currentSubject, currentVerb, currentTense).toLowerCase();
            
                    console.log("User Answer:", userAnswer);
                    console.log("Correct Answer:", correctAnswer);
            
                    const feedbackElement = document.getElementById("feedback");
                    const submitButton = document.getElementById("submit");
            
                    // Check if the user entered an answer
                    if (!userAnswer) {
                        feedbackElement.innerText = "❌ Incorrect. You must enter an answer.";
                        feedbackElement.classList.add("shake");
                        setTimeout(() => {
                            feedbackElement.classList.remove("shake");
                        }, 500);
                        streak = 0; // Reset streak on incorrect answer
                        document.getElementById("streakCount").innerText = streak;
                        return; // Exit the function early
                    }
            
                    if (userAnswer === correctAnswer) {
                        feedbackElement.innerText = "✅ Correct!";
                        correctAnswers++;
                        streak++;
                        document.getElementById("correctAnswers").innerText = correctAnswers;
                        document.getElementById("streakCount").innerText = streak;
            
                        if (correctAnswers > highScore) {
                            highScore = correctAnswers;
                            localStorage.setItem('highScore', highScore);
                            document.getElementById('highScoreValue').innerText = highScore;
                        }
                    } else {
                        // Show the correct answer and keep it on the screen
                        feedbackElement.innerText = `❌ Incorrect. Correct answer: "${correctAnswer}"`;
                        feedbackElement.classList.add("shake");
                        setTimeout(() => {
                            feedbackElement.classList.remove("shake");
                        }, 500);
                        streak = 0; // Reset streak on incorrect answer
                        document.getElementById("streakCount").innerText = streak;
                    }
            
                    // Transform the "Submit" button into "Next Question"
                    submitButton.innerText = "Next Question";
            
                    // Define a named function for the "Next Question" behavior
                    function handleNextQuestion() {
                        submitButton.innerText = "Submit"; // Change the button text back to "Submit"
                        submitButton.removeEventListener("click", handleNextQuestion); // Remove this "Next Question" listener
                        submitButton.addEventListener("click", checkAnswer); // Reattach the original "Submit" listener
                        newQuestion(); // Load the next question
                    }
            
                    // Remove the current event listener and attach the "Next Question" listener
                    submitButton.removeEventListener("click", checkAnswer);
                    submitButton.addEventListener("click", handleNextQuestion);
                } catch (error) {
                    console.error("Error in checkAnswer:", error);
                }
            }

            function handleKeyPress(event) {
                const submitButton = document.getElementById("submit");
            
                if (event.key === "Enter") {
                    if (submitButton.innerText === "Submit") {
                        checkAnswer(); // Trigger the checkAnswer function
                    } else if (submitButton.innerText === "Next Question") {
                        submitButton.click(); // Simulate a click on the "Next Question" button
                    }
                }
            }

            // Burger Menu Logic
            const burgerMenu = document.getElementById("burger-menu");
            const burgerIcon = burgerMenu.querySelector(".burger-icon");

            burgerIcon.addEventListener("click", () => {
                burgerMenu.classList.toggle("active");
            });

            const tenseCheckboxes = document.querySelectorAll(".tense-checkbox");
            const randomSelectionCheckbox = document.getElementById("random-selection");
            const applyTensesButton = document.getElementById("apply-tenses");

            // Handle tense selection
            applyTensesButton.addEventListener("click", () => {
                selectedTenses = [];
                tenseCheckboxes.forEach((checkbox) => {
                    if (checkbox.checked) {
                        selectedTenses.push(checkbox.value);
                    }
                });

            // Handle "Random Selection" checkbox behavior
            randomSelectionCheckbox.addEventListener("change", () => {
                if (randomSelectionCheckbox.checked) {
                    // Disable all other checkboxes when "Random Selection" is checked
                    tenseCheckboxes.forEach((checkbox) => {
                        checkbox.disabled = true;
                        checkbox.checked = false; // Uncheck all other checkboxes
                    });
                } else {
                    // Enable all other checkboxes when "Random Selection" is unchecked
                    tenseCheckboxes.forEach((checkbox) => {
                        checkbox.disabled = false;
                    });
                }
            });

                // If "Random Selection" is checked or no tenses are selected, use all tenses
                if (randomSelectionCheckbox.checked || selectedTenses.length === 0) {
                    selectedTenses = [...tenses];
                }

                // Close the menu
                burgerMenu.classList.remove("active");

                console.log("Selected Tenses:", selectedTenses); // Debugging

                // Generate a new question immediately
                newQuestion();
            });

            document.getElementById("submit").addEventListener("click", checkAnswer);
            document.getElementById("answer").addEventListener("keydown", handleKeyPress);

            newQuestion();  // Start with the first question

        });
    
    let timeoutId; // Declare globally