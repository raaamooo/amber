document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-game');
    const restartBtn = document.getElementById('restart-game');
    const questionArea = document.getElementById('question-area');
    const resultArea = document.getElementById('result-area');
    const optionsArea = document.getElementById('options-area');
    const questionText = document.getElementById('question-text');
    const recommendedItemContainer = document.getElementById('recommended-item');

    const questions = [
        {
            text: "What's your mood right now?",
            attribute: "mood",
            options: [
                { label: "Energetic", value: "energetic" },
                { label: "Cozy", value: "cozy" },
                { label: "Adventurous", value: "adventurous" },
                { label: "Relaxed", value: "relaxed" }
            ]
        },
        {
            text: "Pick a flavor profile:",
            attribute: "flavor",
            options: [
                { label: "Sweet", value: "sweet" },
                { label: "Savory", value: "savory" },
                { label: "Spicy", value: "spicy" },
                { label: "Refreshing", value: "refreshing" }
            ]
        },
        {
            text: "Hot or cold?",
            attribute: "temp",
            options: [
                { label: "Hot", value: "hot" },
                { label: "Cold", value: "cold" },
                { label: "Surprise me (Either)", value: "either" }
            ]
        },
        {
            text: "How hungry are you?",
            attribute: "hunger",
            options: [
                { label: "Snack", value: "snack" },
                { label: "Light", value: "light" },
                { label: "Full Meal", value: "full meal" },
                { label: "Dessert craving", value: "dessert craving" }
            ]
        },
        {
            text: "Pick a vibe:",
            attribute: "vibe",
            options: [
                { label: "Traditional", value: "traditional" },
                { label: "Modern", value: "modern" },
                { label: "Street food", value: "street food" },
                { label: "Fancy", value: "fancy" }
            ]
        }
    ];

    let currentQuestionIndex = 0;
    let userPreferences = {};

    startBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', startGame);

    function startGame() {
        currentQuestionIndex = 0;
        userPreferences = {};
        startBtn.classList.add('hidden');
        resultArea.classList.add('hidden');
        questionArea.classList.remove('hidden');
        questionArea.classList.add('fade-in');
        showQuestion();
    }

    function showQuestion() {
        const q = questions[currentQuestionIndex];
        questionText.textContent = q.text;
        optionsArea.innerHTML = '';
        
        q.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'option-btn ripple';
            btn.textContent = opt.label;
            btn.onclick = () => handleAnswer(q.attribute, opt.value);
            optionsArea.appendChild(btn);
        });
    }

    function handleAnswer(attribute, value) {
        userPreferences[attribute] = value;
        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }

    function showResult() {
        questionArea.classList.add('hidden');
        resultArea.classList.remove('hidden');
        resultArea.classList.remove('animate-flip'); // reset animation

        const bestMatch = calculateBestMatch();
        
        recommendedItemContainer.innerHTML = `
            <img src="${bestMatch.image}" alt="${bestMatch.name}" class="menu-image">
            <div class="menu-content">
                <div class="menu-header">
                    <h4 class="menu-title">${bestMatch.name}</h4>
                    <span class="menu-price">${bestMatch.price} EGP</span>
                </div>
                <p class="menu-desc">${bestMatch.description}</p>
            </div>
        `;

        // Trigger reflow to restart animation
        void recommendedItemContainer.offsetWidth;
        recommendedItemContainer.classList.add('animate-flip');
    }

    function calculateBestMatch() {
        const allItems = [...menuData.food, ...menuData.drinks, ...menuData.desserts];
        let maxScore = -1;
        let bestItem = allItems[0];

        allItems.forEach(item => {
            let score = 0;
            const t = item.tags;
            
            if (t.mood === userPreferences.mood) score++;
            if (t.flavor === userPreferences.flavor) score++;
            if (t.temp === userPreferences.temp || t.temp === 'either' || userPreferences.temp === 'either') score++;
            if (t.hunger === userPreferences.hunger) score += 2; // Weight hunger more heavily
            if (t.vibe === userPreferences.vibe) score++;

            if (score > maxScore) {
                maxScore = score;
                bestItem = item;
            }
        });

        return bestItem;
    }
});
