const subjects = ["I", "You", "He", "She", "It", "We", "They"];
        const verbs = ["be", "have", "go", "do", "say", "make", "take", "see", "come", "know", "get", "give", "think", "tell", "work", "call", "try", "ask", "need", "feel", "become", "leave", "put", "mean", "keep", "let", "begin", "seem", "help", "talk", "turn", "start", "show", "hear", "play", "run", "move", "like", "live", "believe", "hold", "bring", "happen", "write", "sit", "stand", "lose", "pay", "meet", "include", "continue", "set", "learn", "change", "lead", "understand", "watch", "follow", "analyze", "budget", "collaborate", "delegate", "negotiate", "optimize", "prioritize", "strategize", "facilitate", "implement", "monitor", "coordinate", "evaluate", "generate", "integrate", "review"];
        const tenses = ["Present Simple", "Present Continuous", "Imperative", "Conditional", "Future Simple", "Past Simple"];
        const irregularPast = {
            "be": "was/were", "have": "had", "go": "went", "do": "did", "say": "said", "make": "made", "take": "took", "see": "saw",
            "come": "came", "know": "knew", "get": "got", "give": "gave", "think": "thought", "tell": "told", "leave": "left", "put": "put",
            "mean": "meant", "keep": "kept", "let": "let", "begin": "began", "show": "showed", "hear": "heard", "run": "ran", "sit": "sat",
            "stand": "stood", "lose": "lost", "pay": "paid", "meet": "met", "set": "set", "lead": "led", "write": "wrote", "bring": "brought",
            "hold": "held", "read": "read"
        };

        let currentVerb, currentSubject, currentTense;
        let correctAnswers = 0;
        let streak = 0;
        let highScore = localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore')) : 0;

        document.getElementById('highScoreValue').innerText = highScore;

        function getRandomElement(arr) {
            return arr[Math.floor(Math.random() * arr.length)];
        }

        function newQuestion() {
            currentSubject = getRandomElement(subjects);
            currentVerb = getRandomElement(verbs);
            currentTense = getRandomElement(tenses);
            document.getElementById("verb").innerText = currentVerb;
            document.getElementById("subject").innerText = currentSubject === "I" ? "I" : currentSubject.toLowerCase(); // Ensure "I" is uppercase
            document.getElementById("tense").innerText = currentTense.toLowerCase();
            document.getElementById("answer").value = "";
            document.getElementById("feedback").innerText = "";
        }

        function conjugateVerb(subject, verb, tense) {
            switch (tense) {
                case "Present Simple":
                    if (verb === "be") return subject === "I" ? "am" : (["He", "She", "It"].includes(subject) ? "is" : "are");
                    if (verb === "have") return ["He", "She", "It"].includes(subject) ? "has" : "have";
                    if (["go", "do"].includes(verb) && ["He", "She", "It"].includes(subject)) return verb === "go" ? "goes" : "does";
                    return ["He", "She", "It"].includes(subject) ? `${verb}s` : verb;
                case "Present Continuous":
                    // Handle special verbs (no need to double consonants for these)
                    const specialVerbs = ["meet", "feel", "seal", "heat", "need", "seem", "sleep", "peel", "complete", "greet", "follow"];

                    let ingForm = verb;

                    // Remove "e" for verbs ending in "e" (except "be")
                    if (verb.endsWith("e") && verb !== "be") {
                        ingForm = verb.slice(0, -1) + "ing";  // e.g., "make" → "making"
                    }
                    // Only double the consonant for verbs ending in a single vowel + certain consonants
                    else if (verb.length > 2 && /[aeiou][bdfglmnprstz]$/.test(verb) && !specialVerbs.includes(verb) && !/([bcdfghjklmnpqrstvwxyz])\1$/.test(verb)) {
                        ingForm = verb + verb[verb.length - 1] + "ing";  // e.g., "run" → "running"
                    }
                    else {
                        ingForm = verb + "ing";  // default case (including special verbs like "meet")
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
                    const irregularVerbs = {
                        "become": "became",
                        "begin": "began",
                        "break": "broke",
                        "bring": "brought",
                        "build": "built",
                        "buy": "bought",
                        "catch": "caught",
                        "choose": "chose",
                        "come": "came",
                        "do": "did",
                        "drink": "drank",
                        "drive": "drove",
                        "eat": "ate",
                        "fall": "fell",
                        "feel": "felt",
                        "find": "found",
                        "get": "got",
                        "give": "gave",
                        "go": "went",
                        "have": "had",
                        "hear": "heard",
                        "hold": "held",
                        "keep": "kept",
                        "know": "knew",
                        "leave": "left",
                        "lose": "lost",
                        "make": "made",
                        "meet": "met",
                        "pay": "paid",
                        "read": "read",
                        "run": "ran",
                        "say": "said",
                        "see": "saw",
                        "sing": "sang",
                        "speak": "spoke",
                        "stand": "stood",
                        "take": "took",
                        "teach": "taught",
                        "tell": "told",
                        "think": "thought",
                        "understand": "understood",
                        "write": "wrote"
                    };
                
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
                        else if (verb.length > 2 && /[aeiou][bcdfghjklmnpqrstvwxyz]$/.test(verb) && !/([bcdfghjklmnpqrstvwxyz])\1$/.test(verb)) {
                            pastForm += verb[verb.length - 1] + "ed";  // e.g., "plan" → "planned"
                        } else {
                            pastForm += "ed";  // default case for regular verbs
                        }
                        return pastForm;
                    }
                    
                default:
                    return "";
            }
        }

        function checkAnswer() {
            const userAnswer = document.getElementById("answer").value.trim().toLowerCase();
            const correctAnswer = conjugateVerb(currentSubject, currentVerb, currentTense).toLowerCase();

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
                streak = 0;  // Reset streak on incorrect answer
                document.getElementById("streakCount").innerText = streak;
            }

            setTimeout(newQuestion, 2000);
        }

        function handleKeyPress(event) {
            if (event.key === "Enter") {
                checkAnswer();
            }
        }

        newQuestion();  // Start with the first question
