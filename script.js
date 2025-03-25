const subjects = ["I", "You", "He", "She", "It", "We", "They"];
        const verbs = ["be", "have", "go", "do", "say", "make", "take", "see", "come",
            "know", "get", "give", "think", "tell", "work", "call", "try", "ask", "need",
            "feel", "become", "leave", "put", "mean", "keep", "let", "begin", "seem", "help",
            "talk", "turn", "start", "show", "hear", "play", "run", "move", "like", "live",
            "believe", "hold", "bring", "happen", "write", "sit", "stand", "lose", "pay",
            "meet", "include", "continue", "set", "learn", "change", "lead", "understand",
            "watch", "follow", "analyze", "budget", "collaborate", "delegate", "negotiate",
            "optimize", "prioritize", "strategize", "facilitate", "implement", "monitor",
            "coordinate", "evaluate", "generate", "integrate", "review", "play", "run",
            "jump", "write", "read", "monitor", "happen", "budget", 
            "accept", "allow", "answer", "arrive", "bake", "believe", "borrow", "call", 
            "clean", "climb", "close", "compare", "cook", "dance", "deliver", "describe", 
            "develop", "discover", "divide", "dress", "drop", "enjoy", "enter", "explain", 
            "finish", "follow", "happen", "help", "hope", "imagine", "improve", "include", 
            "invent", "invite", "join", "jump", "laugh", "learn", "listen", "love", "move", 
            "need", "open", "paint", "play", "pull", "push", "rain", "remember", "repeat",];
        const tenses = ["Present Simple", "Present Continuous", "Imperative", "Conditional", "Future Simple", "Past Simple"];

        let currentVerb, currentSubject, currentTense;
        let correctAnswers = 0;
        let streak = 0;
        let highScore = localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore')) : 0;

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
        
        // Helper function to check if a word is a single syllable
        function isSingleSyllable(word) {
            // Count the number of vowels in the word
            const vowels = word.match(/[aeiou]/gi);
            return vowels && vowels.length === 1; // Single syllable if only one vowel
        }

        // Helper function to check if the last syllable is stressed
        function isLastSyllableStressed(word) {
            // For simplicity, assume multi-syllable words are not stressed on the last syllable
            // unless explicitly defined (you can expand this logic if needed)
            const unstressedWords = ["budget", "target", "visit", "happen"];
            return !unstressedWords.includes(word.toLowerCase());
        }

        const irregularVerbs = {
            "arise": "arose",
            "awake": "awoke",
            "become": "became",
            "begin": "began",
            "bet": "bet",
            "bind": "bound",
            "bleed": "bled",
            "blow": "blew",
            "break": "broke",
            "bring": "brought",
            "broadcast": "broadcast",
            "build": "built",
            "buy": "bought",
            "catch": "caught",
            "choose": "chose",
            "cling": "clung",
            "come": "came",
            "creep": "crept",
            "deal": "dealt",
            "dig": "dug",
            "dive": "dove",
            "do": "did",
            "drink": "drank",
            "drive": "drove",
            "eat": "ate",
            "fall": "fell",
            "feed": "fed",
            "feel": "felt",
            "find": "found",
            "forbid": "forbade",
            "forgive": "forgave",
            "freeze": "froze",
            "get": "got",
            "give": "gave",
            "go": "went",
            "grind": "ground",
            "grow": "grew",
            "hang": "hung",
            "have": "had",
            "hear": "heard",
            "hide": "hid",
            "hold": "held",
            "keep": "kept",
            "kneel": "knelt",
            "know": "knew",
            "lay": "laid",
            "lead": "led",
            "leave": "left",
            "let": "let",
            "light": "lit",
            "lose": "lost",
            "make": "made",
            "mean": "meant",
            "meet": "met",
            "pay": "paid",
            "prove": "proved",
            "put": "put",
            "quit": "quit",
            "read": "read",
            "ride": "rode",
            "ring": "rang",
            "rise": "rose",
            "run": "ran",
            "say": "said",
            "see": "saw",
            "seek": "sought",
            "sell": "sold",
            "send": "sent",
            "set": "set",
            "shake": "shook",
            "shine": "shone",
            "shoot": "shot",
            "show": "showed",
            "shrink": "shrank",
            "sing": "sang",
            "sink": "sank",
            "sit": "sat",
            "sleep": "slept",
            "slide": "slid",
            "sow": "sowed",
            "speak": "spoke",
            "spend": "spent",
            "spin": "spun",
            "split": "split",
            "spread": "spread",
            "spring": "sprang",
            "stand": "stood",
            "stick": "stuck",
            "sting": "stung",
            "strike": "struck",
            "swear": "swore",
            "sweep": "swept",
            "swim": "swam",
            "swing": "swung",
            "take": "took",
            "teach": "taught",
            "tear": "tore",
            "tell": "told",
            "think": "thought",
            "throw": "threw",
            "understand": "understood",
            "wake": "woke",
            "wear": "wore",
            "weep": "wept",
            "win": "won",
            "wind": "wound",
            "write": "wrote"
        };

        function conjugateVerb(subject, verb, tense) {
            try {
                switch (tense) {
                    case "Present Simple":
                        if (verb === "be") return subject === "I" ? "am" : (["He", "She", "It"].includes(subject) ? "is" : "are");
                        if (verb === "have") return ["He", "She", "It"].includes(subject) ? "has" : "have";
                        if (["go", "do"].includes(verb) && ["He", "She", "It"].includes(subject)) return verb === "go" ? "goes" : "does";
                        return ["He", "She", "It"].includes(subject) ? `${verb}s` : verb;
                    case "Present Continuous":        
                        let ingForm = verb;

                        // Remove "e" for verbs ending in "e" (except "be")
                        if (verb.endsWith("e") && verb !== "be") {
                            ingForm = verb.slice(0, -1) + "ing";  // e.g., "make" → "making"
                        }
                        else if (verb.length > 2 && /[aeiou][bdfglmnprstz]$/.test(verb) && !/([bcdfghjklmnpqrstvwxyz])\1$/.test(verb)) {
                            // Check if the word is a single syllable or the stress is on the last syllable
                            if (isSingleSyllable(verb) || isLastSyllableStressed(verb)) {
                                // Do not double consonants for words ending in a long vowel sound
                                if (!verb.match(/[aeiou]{2}[bcdfghjklmnpqrstvwxyz]$/)) {
                                    ingForm = verb + verb[verb.length - 1] + "ing";  // e.g., "run" → "running"
                                } else {
                                    ingForm = verb + "ing";  // e.g., "feel" → "feeling"
                                }
                            } else {
                                ingForm = verb + "ing";  // e.g., "happen" → "happening"
                            }
                        }

                        // Define the conjugation of "to be" based on the subject
                        const toBeConjugation = subject === "I" ? "am" : (["He", "She", "It"].includes(subject) ? "is" : "are");

                        // Return the correct conjugation of the verb with the subject
                        return `${toBeConjugation} ${ingForm}`;

                    case "Imperative":
                        return verb === "be" ? "be" : verb;
                    case "Conditional":
                        return subject === "I" || subject === "We" ? `would ${verb}` : `would ${verb}`;
                    case "Future Simple":
                        return `will ${verb}`;
                    case "Past Simple":
                        // Check if the verb is irregular and return the correct past form
                        if (verb === "be") {
                            return subject === "I" || subject === "He" || subject === "She" || subject === "It" ? "was" : "were";
                        }
                        if (irregularVerbs[verb]) {
                            return irregularVerbs[verb];  // e.g., "become" → "became"
                        }
                        // For regular verbs, add "ed"
                        else {
                            let pastForm = verb;
                            if (verb.endsWith("e")) {
                                pastForm += "d";  // e.g., "love" → "loved"
                            }
                            else if (verb.endsWith("y")) {
                                // Check if the "y" is preceded by a consonant
                                if (!/[aeiou]/.test(verb[verb.length - 2])) {
                                    pastForm = verb.slice(0, -1) + "ied";  // e.g., "try" → "tried"
                                } else {
                                    pastForm += "ed";  // e.g., "play" → "played"
                                }
                            }
                            else if (verb.length > 2 && /[aeiou][bcdfghjklmnpqrstvwxyz]$/.test(verb) && !/([bcdfghjklmnpqrstvwxyz])\1$/.test(verb)) {
                                // Check if the word is a single syllable or the stress is on the last syllable
                                if (isSingleSyllable(verb) || isLastSyllableStressed(verb)) {
                                    pastForm += verb[verb.length - 1] + "ed";  // e.g., "plan" → "planned"
                                } else {
                                    pastForm += "ed";  // e.g., "budget" → "budgeted"
                                }
                            } else {
                                pastForm += "ed";  // default case for regular verbs
                            }
                            return pastForm;
                        }
                        
                    default:
                        console.warn("Unhandled tense:", tense, { subject, verb });
                        return `Unable to conjugate "${verb}" in "${tense}" tense.`;
                }
            } catch (error) {
                console.error("Error in conjugateVerb:", error, { subject, verb, tense });
                return "";
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

        newQuestion();  // Start with the first question

        let timeoutId; // Declare globally