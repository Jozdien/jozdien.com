document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const loadingEl = document.getElementById('loading');
    const gameContainerEl = document.getElementById('game-container');
    const quoteEl = document.getElementById('quote');
    const chapterNumberInput = document.getElementById('chapter-number');
    const chapterTitleInput = document.getElementById('chapter-title');
    const submitGuessBtn = document.getElementById('submit-guess');
    const resultEl = document.getElementById('result');
    const chapterResultEl = document.getElementById('chapter-result');
    const titleResultEl = document.getElementById('title-result');
    const scoreEl = document.getElementById('score');
    const nextQuoteBtn = document.getElementById('next-quote');
    const totalScoreEl = document.getElementById('total-score');
    const attemptsEl = document.getElementById('attempts');

    // Game state
    let hpmorData = null;
    let currentChapter = null;
    let currentQuote = null;
    let totalScore = 0;
    let attempts = 0;

    // Initialize the game
    initGame();

    async function initGame() {
        try {
            // Fetch HPMOR data
            hpmorData = await fetchHPMORData();
            
            // Hide loading and show game
            loadingEl.classList.add('hidden');
            gameContainerEl.classList.remove('hidden');
            
            // Start the first round
            nextQuote();
        } catch (error) {
            console.error('Error initializing game:', error);
            loadingEl.innerHTML = `<p>Error loading HPMOR content: ${error.message}</p><p>Please try refreshing the page.</p>`;
        }
    }

    async function fetchHPMORData() {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error('Failed to fetch HPMOR data');
        }
        
        // Parse the JSON response
        const rawData = await response.json();
        
        // Transform the data into a more usable format for our game
        // We're expecting an array of chapter objects from data.json
        const chapters = rawData.map(chapter => ({
            number: chapter.chapter_number,
            title: chapter.chapter_title,
            paragraphs: chapter.paragraphs || []
        }));
        
        return { chapters };
    }

    function getRandomQuote(chapter) {
        // Make sure we have paragraphs to work with
        if (!chapter.paragraphs || chapter.paragraphs.length === 0) {
            return "No content available for this chapter.";
        }
        
        // Pick a random paragraph that's not too short
        let validParagraphs = chapter.paragraphs.filter(p => p && p.trim().length > 50);
        
        // If no valid paragraphs, use any non-empty paragraph
        if (validParagraphs.length === 0) {
            validParagraphs = chapter.paragraphs.filter(p => p && p.trim().length > 0);
            if (validParagraphs.length === 0) {
                return "No content available for this chapter.";
            }
        }
        
        // Select a random paragraph
        const paragraph = validParagraphs[Math.floor(Math.random() * validParagraphs.length)];
        
        // If paragraph is short enough, use the whole thing
        if (paragraph.length < 300) {
            return paragraph;
        }
        
        // For longer paragraphs, select a portion
        // Split into sentences
        const sentences = paragraph.split(/(?<=[.!?])\s+/);
        
        // We need at least 2 sentences
        if (sentences.length < 2) {
            return paragraph.substring(0, 300) + "..."; // Just take the first 300 chars
        }
        
        // Pick a random starting position (but not too close to the end)
        const startIdx = Math.floor(Math.random() * (sentences.length - 1));
        
        // Get 2-3 sentences depending on length
        const sentenceCount = Math.min(
            sentences.length - startIdx,
            sentences[startIdx].length > 100 ? 2 : 3
        );
        
        return sentences.slice(startIdx, startIdx + sentenceCount).join(' ');
    }

    function nextQuote() {
        // Reset UI
        resultEl.classList.add('hidden');
        chapterNumberInput.value = '';
        chapterTitleInput.value = '';
        
        // Pick a random chapter
        const randomIndex = Math.floor(Math.random() * hpmorData.chapters.length);
        currentChapter = hpmorData.chapters[randomIndex];
        
        // Get a random quote from the chapter
        currentQuote = getRandomQuote(currentChapter);
        
        // Display the quote
        quoteEl.textContent = currentQuote;
    }

    function calculateScore(guessedNumber, actualNumber, guessedTitle, actualTitle) {
        let score = 0;
        let numberResult = '';
        let titleResult = '';
        
        // Score for chapter number (max 50 points)
        const numberDifference = Math.abs(guessedNumber - actualNumber);
        if (numberDifference === 0) {
            score += 50;
            numberResult = `<span class="correct">Correct! Chapter ${actualNumber}.</span>`;
        } else if (numberDifference <= 5) {
            const numberPoints = Math.floor(50 * (1 - numberDifference / 10));
            score += numberPoints;
            numberResult = `<span class="close">Close! You guessed Chapter ${guessedNumber}, but it was Chapter ${actualNumber}. (+${numberPoints} points)</span>`;
        } else {
            numberResult = `<span class="incorrect">Incorrect. You guessed Chapter ${guessedNumber}, but it was Chapter ${actualNumber}. (+0 points)</span>`;
        }
        
        // Score for chapter title (max 50 points)
        // Simple string similarity check
        const normalizedGuessTitle = guessedTitle.toLowerCase().trim();
        const normalizedActualTitle = actualTitle.toLowerCase().trim();
        
        if (normalizedGuessTitle === normalizedActualTitle) {
            score += 50;
            titleResult = `<span class="correct">Correct! "${actualTitle}"</span>`;
        } else {
            // Calculate similarity - this is a simple implementation
            const words1 = new Set(normalizedGuessTitle.split(/\s+/));
            const words2 = new Set(normalizedActualTitle.split(/\s+/));
            
            const intersection = new Set([...words1].filter(x => words2.has(x)));
            const union = new Set([...words1, ...words2]);
            
            const similarity = intersection.size / union.size;
            const titlePoints = Math.floor(50 * similarity);
            
            score += titlePoints;
            
            if (titlePoints > 20) {
                titleResult = `<span class="close">Close! You guessed "${guessedTitle}", but it was "${actualTitle}". (+${titlePoints} points)</span>`;
            } else {
                titleResult = `<span class="incorrect">Incorrect. You guessed "${guessedTitle}", but it was "${actualTitle}". (+${titlePoints} points)</span>`;
            }
        }
        
        return { score, numberResult, titleResult };
    }

    // Event Listeners
    submitGuessBtn.addEventListener('click', () => {
        const guessedNumber = parseInt(chapterNumberInput.value, 10);
        const guessedTitle = chapterTitleInput.value;
        
        if (isNaN(guessedNumber) || guessedTitle.trim() === '') {
            alert('Please enter both a chapter number and title.');
            return;
        }
        
        // Calculate score
        const { score, numberResult, titleResult } = calculateScore(
            guessedNumber, 
            currentChapter.number, 
            guessedTitle, 
            currentChapter.title
        );
        
        // Update total score and attempts
        totalScore += score;
        attempts++;
        
        // Update display
        chapterResultEl.innerHTML = numberResult;
        titleResultEl.innerHTML = titleResult;
        scoreEl.textContent = `You scored ${score}/100 points for this quote.`;
        totalScoreEl.textContent = totalScore;
        attemptsEl.textContent = attempts;
        
        // Show results
        resultEl.classList.remove('hidden');
    });
    
    nextQuoteBtn.addEventListener('click', nextQuote);
});