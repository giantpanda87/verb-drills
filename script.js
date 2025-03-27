import verbs from "./src/verbs.js";
import { conjugateVerb } from "./src/conjugationrules.js";

const subjects = ["I", "You", "He", "She", "It", "We", "They"];
        const tenses = ["Present Simple", "Present Continuous", "Imperative", "Conditional", "Future Simple", "Past Simple"];

        let currentVerb, currentSubject, currentTense;
        let correctAnswers = 0;
        let streak = 0;
        let highScore = localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore')) : 0;

        document.addEventListener("DOMContentLoaded", () => {
            document.getElementById('highScoreValue').innerText = highScore;

            function getRandomElement(arr) {
                return arr[Math.floor(Math.random() * arr.length)];
            }

            function newQuestion() {
                try {
                    currentSubject = getRandomElement(subjects);
                    currentTense = getRandomElement(tenses);
            
                    // Ensure the imperative tense is only used with valid subjects
                    let attempts = 0; // Counter to track the number of attempts
                    while (currentTense === "Imperative" && ["I", "He", "She", "It", "They"].includes(currentSubject)) {
                        currentTense = getRandomElement(tenses);
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
            
                    // Log the user answer and correct answer for debugging
                    console.log("User Answer:", userAnswer);
                    console.log("Correct Answer:", correctAnswer);
                    
                    // Check if the user entered an answer
                    if (!userAnswer) {
                        document.getElementById("feedback").innerText = "❌ Incorrect. You must enter an answer.";
                        document.getElementById("feedback").classList.add("shake");
                        setTimeout(() => {
                            document.getElementById("feedback").classList.remove("shake");
                        }, 500);
                        streak = 0; // Reset streak on incorrect answer
                        document.getElementById("streakCount").innerText = streak;
            
                        // Clear any existing timeout before setting a new one
                        if (timeoutId) {
                            clearTimeout(timeoutId);
                        }
                        timeoutId = setTimeout(newQuestion, 2000);
                        return; // Exit the function early
                    }
            
                    if (userAnswer === correctAnswer) {
                        document.getElementById("feedback").innerText = "✅ Correct!";
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
                        document.getElementById("feedback").innerText = `❌ Incorrect. Correct answer: "${correctAnswer}"`;
                        document.getElementById("feedback").classList.add("shake");
                        setTimeout(() => {
                            document.getElementById("feedback").classList.remove("shake");
                        }, 500);
                        streak = 0; // Reset streak on incorrect answer
                        document.getElementById("streakCount").innerText = streak;
                    }
            
                    // Clear any existing timeout before setting a new one
                    if (timeoutId) {
                        clearTimeout(timeoutId);
                    }
                    timeoutId = setTimeout(newQuestion, 2000);
                } catch (error) {
                    console.error("Error in checkAnswer:", error);
                }
            }

            function handleKeyPress(event) {
                if (event.key === "Enter") {
                    checkAnswer();
                }
            }

            document.getElementById("submit").addEventListener("click", checkAnswer);
            document.getElementById("answer").addEventListener("keydown", handleKeyPress);

            newQuestion();  // Start with the first question

        });
    
    let timeoutId; // Declare globally