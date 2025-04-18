export function shouldDoubleConsonant(verb) {

    // Check if the word ends with a vowel + consonant pattern
    const endsWithVowelConsonant = /[aeiou][bcdfghjklmnpqrstvxz]$/.test(verb);
    // Check if the word already has a doubled consonant
    const alreadyDoubled = /([bcdfghjklmnpqrstvwxyz])\1$/.test(verb);

    // Apply consonant doubling only if:
    return verb.length > 2 &&
        endsWithVowelConsonant &&  // Ends with vowel + consonant
        !alreadyDoubled &&         // Does not already have a doubled consonant
        isSingleSyllable(verb) &&  // Only for single-syllable words
        !hasLongVowelSound(verb);  // Exclude words with long vowel sounds
        !exceptions.includes(verb.toLowerCase()); // Exclude exceptions
}

// Helper function to check if a word is a single syllable
export function isSingleSyllable(word) {
    // Count the number of vowels in the word
    const vowels = word.match(/[aeiou]/gi);
    return vowels && vowels.length === 1; // Single syllable if only one vowel
}

// Helper function to check if the last syllable is stressed
export function isLastSyllableStressed(word) {
    // For simplicity, assume multi-syllable words are not stressed on the last syllable
    // unless explicitly defined (you can expand this logic if needed)
    const unstressedWords = ["budget", "target", "visit", "happen", "monitor", "follow"];
    return !unstressedWords.includes(word.toLowerCase());
}

export function hasLongVowelSound(verb) {
    // Define a list of long vowel sounds
    const longVowelPatterns = [
        /ee/,  // e.g., "feel"
        /ea/,  // e.g., "read" (present tense)
        /oo/,  // e.g., "shoot"
        /ai/,  // e.g., "wait"
        /oa/,  // e.g., "boat"
        /ie/,  // e.g., "tie"
    ];

    // Check if the verb matches any of the long vowel patterns
    return longVowelPatterns.some(pattern => pattern.test(verb));
}