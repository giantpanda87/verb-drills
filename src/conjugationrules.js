import { irregularVerbs } from './irregularverbs.js';
import { shouldDoubleConsonant, isSingleSyllable, isLastSyllableStressed, hasLongVowelSound } from './helpers.js';

export function conjugateVerb(subject, verb, tense) {
    try {
        switch (tense) {
            case "Present Simple":
                if (verb === "be") return subject === "I" ? "am" : (["He", "She", "It"].includes(subject) ? "is" : "are");
                if (verb === "have") return ["He", "She", "It"].includes(subject) ? "has" : "have";
                if (["go", "do"].includes(verb) && ["He", "She", "It"].includes(subject)) return verb === "go" ? "goes" : "does";
                return ["He", "She", "It"].includes(subject) ? `${verb}s` : verb;
            case "Present Continuous":
                let ingForm = verb;
            
                // Handle verbs ending in "e" (except "be")
                if (verb.endsWith("e") && verb !== "be" && verb !== "see") {
                    ingForm = verb.slice(0, -1) + "ing";  // e.g., "make" → "making"
                }
                // Handle consonant doubling for single-syllable words ending in vowel + consonant
                else if (shouldDoubleConsonant(verb)) {
                    ingForm = verb + verb[verb.length - 1] + "ing";  // e.g., "run" → "running"
                }
                // Handle verbs with long vowel sounds (no consonant doubling)
                else if (hasLongVowelSound(verb)) {
                    ingForm = verb + "ing";  // e.g., "feel" → "feeling"
                }
                // Default case: Simply add "ing"
                else {
                    ingForm = verb + "ing";  // e.g., "jump" → "jumping"
                }
            
                console.log("Generated ingForm:", ingForm); // Debugging

                // Conjugate "to be" based on the subject
                const toBeConjugation = subject === "I" ? "am" : (["He", "She", "It"].includes(subject) ? "is" : "are");
            
                console.log("Generated toBeConjugation:", toBeConjugation); // Debugging

                // Return the full conjugation
                return `${toBeConjugation} ${ingForm}`;
            case "Imperative":
                return verb === "be" ? "be" : verb;
            case "Conditional":
                return subject === "I" || subject === "We" ? `would ${verb}` : `would ${verb}`;
            case "Future Simple":
                return `will ${verb}`;
                case "Past Simple":
                    if (irregularVerbs[verb]) {
                        return irregularVerbs[verb];  // Handle irregular verbs
                    }
                    let pastForm = verb;
                    if (verb.endsWith("e")) {
                        pastForm += "d";  // e.g., "love" → "loved"
                    } else if (verb.endsWith("y") && !/[aeiou]/.test(verb[verb.length - 2])) {
                        pastForm = verb.slice(0, -1) + "ied";  // e.g., "try" → "tried"
                    } else if (shouldDoubleConsonant(verb)) {
                        pastForm += verb[verb.length - 1] + "ed";  // e.g., "plan" → "planned"
                    } else {
                        pastForm += "ed";  // Default case for regular verbs
                    }
                    return pastForm;
                
            default:
                console.warn("Unhandled tense:", tense, { subject, verb });
                return `Unable to conjugate "${verb}" in "${tense}" tense.`;
        }
    } catch (error) {
        console.error("Error in conjugateVerb:", error, { subject, verb, tense });
        return "";
    }
}