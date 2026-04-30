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
            text: "Mortal… what stirs within your heart today?",
            attribute: "mood",
            options: [
                { label: "⚡ Energetic", value: "energetic" },
                { label: "🔥 Adventurous", value: "adventurous" },
                { label: "🌙 Cozy", value: "cozy" },
                { label: "🕊️ Peaceful", value: "peaceful" }
            ]
        },
        {
            text: "Which flavor shall please your tongue?",
            attribute: "flavor",
            options: [
                { label: "🍯 Sweet as honey", value: "sweet" },
                { label: "🌶️ Fierce as fire", value: "fierce" },
                { label: "🧂 Savory as the Nile", value: "savory" },
                { label: "🌿 Refreshing as an oasis", value: "refreshing" }
            ]
        },
        {
            text: "Do you seek warmth, or the chill of the desert night?",
            attribute: "temp",
            options: [
                { label: "🔥 Hot", value: "hot" },
                { label: "❄️ Cold", value: "cold" },
                { label: "🌗 Either pleases me", value: "either" }
            ]
        },
        {
            text: "How great is your hunger, traveler?",
            attribute: "hunger",
            options: [
                { label: "🥖 A small offering", value: "offering" },
                { label: "🍲 A modest meal", value: "modest" },
                { label: "🍖 A pharaoh's feast", value: "feast" },
                { label: "🍰 A sweet ending", value: "sweet" }
            ]
        },
        {
            text: "What vibe calls to your spirit?",
            attribute: "vibe",
            options: [
                { label: "🏛️ Ancient & traditional", value: "traditional" },
                { label: "🌃 Modern & bold", value: "modern" },
                { label: "🛺 Street markets of Cairo", value: "street" },
                { label: "👑 Royal & luxurious", value: "royal" }
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
        showQuestion();
    }

    function showQuestion() {
        const q = questions[currentQuestionIndex];
        
        // Retrigger fade animation
        questionArea.classList.remove('fade-in-anubis');
        void questionArea.offsetWidth; // Reflow
        questionArea.classList.add('fade-in-anubis');

        optionsArea.innerHTML = '';
        questionText.textContent = q.text;
        
        q.options.forEach((opt) => {
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
        
        // Fade in result text
        resultArea.classList.remove('fade-in-anubis');
        void resultArea.offsetWidth;
        resultArea.classList.add('fade-in-anubis');

        recommendedItemContainer.classList.remove('scroll-reveal');

        const bestMatch = calculateBestMatch();
        
        recommendedItemContainer.innerHTML = `
            <img src="${bestMatch.image}" alt="${bestMatch.name}" class="menu-image">
            <div class="menu-content">
                <div class="menu-header">
                    <h4 class="menu-title">${bestMatch.name}</h4>
                    <span class="menu-price">${bestMatch.price} EGP</span>
                </div>
                <p class="menu-desc">${bestMatch.description}</p>
                <a href="#menu" class="btn btn-gold ripple mt-3" style="width: 100%; text-align: center; margin-top: 1rem;">Claim Your Feast</a>
            </div>
        `;

        // Show result text instantly, then reveal card
        const resultText = document.getElementById('result-dialogue');
        resultText.textContent = `The scales have spoken. Your destiny is... ${bestMatch.name}.`;
        
        void recommendedItemContainer.offsetWidth; // trigger reflow
        recommendedItemContainer.classList.add('scroll-reveal');
    }

    function calculateBestMatch() {
        const allItems = [...menuData.food, ...menuData.drinks, ...menuData.desserts];
        let maxScore = -1;
        // Tie breaker randomizer via shuffle
        let bestItem = allItems[Math.floor(Math.random() * allItems.length)];

        // Shuffle array to ensure ties are broken randomly
        const shuffledItems = allItems.sort(() => 0.5 - Math.random());

        shuffledItems.forEach(item => {
            let score = 0;
            const t = item.tags;
            
            if (t.mood === userPreferences.mood) score++;
            if (t.flavor === userPreferences.flavor) score++;
            if (t.temp === userPreferences.temp || t.temp === 'either' || userPreferences.temp === 'either') score++;
            if (t.hunger === userPreferences.hunger) score += 2; // Weight hunger heavily
            if (t.vibe === userPreferences.vibe) score++;

            if (score > maxScore) {
                maxScore = score;
                bestItem = item;
            }
        });

        return bestItem;
    }
});
