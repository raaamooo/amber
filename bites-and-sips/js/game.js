document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-game');
    const restartBtn = document.getElementById('restart-game');
    const questionArea = document.getElementById('question-area');
    const resultArea = document.getElementById('result-area');
    const optionsArea = document.getElementById('options-area');
    const questionText = document.getElementById('question-text');
    const recommendedItemContainer = document.getElementById('recommended-item');
    const gameUiHeader = document.getElementById('game-ui-header');
    const backBtn = document.getElementById('back-btn');
    const progressText = document.getElementById('progress-text');
    const progressFill = document.getElementById('progress-fill');
    const matchAccuracy = document.getElementById('match-accuracy');
    const runnerUpsSection = document.getElementById('runner-ups-section');
    const runnerUpsGrid = document.getElementById('runner-ups-grid');

    const routerQuestion = {
        text: "What are you craving right now?",
        attribute: "category",
        options: [
            { label: "A full meal", value: "meal" },
            { label: "A drink", value: "drink" },
            { label: "Something sweet (dessert)", value: "dessert" }
        ]
    };

    const drinkQuestions = [
        {
            text: "How do you want it served?", attribute: "temp", weight: 4,
            options: [ { label: "Hot and steaming", value: "hot" }, { label: "Iced and cold", value: "cold" }, { label: "Room temperature", value: "room" }, { label: "I am flexible", value: "flexible" } ]
        },
        {
            text: "What flavor profile are you in the mood for?", attribute: "flavor", weight: 5,
            options: [ { label: "Sweet and creamy", value: "sweet" }, { label: "Tangy and fruity", value: "tangy" }, { label: "Earthy and herbal", value: "earthy" }, { label: "Floral and aromatic", value: "floral" }, { label: "Rich and spiced", value: "rich" } ]
        },
        {
            text: "What is the purpose of this drink right now?", attribute: "purpose", weight: 4,
            options: [ { label: "Wake me up and energize me", value: "energize" }, { label: "Calm me down and relax me", value: "calm" }, { label: "Refresh me from the heat", value: "refresh" }, { label: "Indulge me like a treat", value: "indulge" }, { label: "Aid my digestion after a meal", value: "digestion" } ]
        },
        {
            text: "How thick do you like your drink?", attribute: "thickness", weight: 3,
            options: [ { label: "Light and watery", value: "light" }, { label: "Medium and smooth", value: "medium" }, { label: "Thick and creamy", value: "thick" }, { label: "Whatever, I do not mind", value: "flexible" } ]
        },
        {
            text: "How adventurous is your taste today?", attribute: "adventure", weight: 2,
            options: [ { label: "A familiar classic", value: "classic" }, { label: "A balanced safe pick", value: "balanced" }, { label: "Something bold and unusual", value: "bold" } ]
        }
    ];

    const mealQuestions = [
        {
            text: "How hungry are you?", attribute: "hunger", weight: 3,
            options: [ { label: "A light bite", value: "light" }, { label: "A normal portion", value: "normal" }, { label: "A pharaoh-sized feast", value: "feast" } ]
        },
        {
            text: "What flavor profile do you want?", attribute: "flavor", weight: 5,
            options: [ { label: "Savory and rich", value: "savory" }, { label: "Spicy and bold", value: "spicy" }, { label: "Tangy and zesty", value: "tangy" }, { label: "Mild and comforting", value: "mild" }, { label: "Herbaceous and fresh", value: "herbaceous" } ]
        },
        {
            text: "What protein or base do you prefer?", attribute: "protein", weight: 4,
            options: [ { label: "Beef or red meat", value: "beef" }, { label: "Chicken or poultry", value: "chicken" }, { label: "Vegetarian or plant-based", value: "vegetarian" }, { label: "Carb-heavy and filling", value: "carb-heavy" }, { label: "I do not have a preference", value: "flexible" } ]
        },
        {
            text: "What texture wins your heart?", attribute: "texture", weight: 4,
            options: [ { label: "Crispy and crunchy", value: "crispy" }, { label: "Hearty and chewy", value: "hearty" }, { label: "Soft and tender", value: "soft" }, { label: "Layered and complex", value: "layered" } ]
        },
        {
            text: "What is the occasion?", attribute: "occasion", weight: 3,
            options: [ { label: "Quick everyday lunch", value: "lunch" }, { label: "Cozy dinner at home", value: "dinner" }, { label: "A traditional comfort meal", value: "traditional" }, { label: "A special celebration", value: "celebration" } ]
        }
    ];

    const dessertQuestions = [
        {
            text: "How sweet do you want it?", attribute: "sweetness", weight: 4,
            options: [ { label: "Lightly sweet", value: "lightly" }, { label: "Moderately sweet", value: "moderately" }, { label: "Very sweet and indulgent", value: "very" } ]
        },
        {
            text: "Hot or cold dessert?", attribute: "temp", weight: 3,
            options: [ { label: "Warm and freshly served", value: "hot" }, { label: "Chilled and cool", value: "cold" }, { label: "Either works", value: "flexible" } ]
        },
        {
            text: "What texture are you craving?", attribute: "texture", weight: 5,
            options: [ { label: "Creamy and smooth like pudding", value: "creamy" }, { label: "Crunchy and crispy", value: "crunchy" }, { label: "Soft and cake-like", value: "soft" }, { label: "Syrupy and sticky", value: "syrupy" } ]
        },
        {
            text: "Which dessert family appeals to you?", attribute: "family", weight: 4,
            options: [ { label: "Milk and dairy based", value: "milk" }, { label: "Pastry and dough based", value: "pastry" }, { label: "Fried and golden", value: "fried" }, { label: "Nut and grain based", value: "nut" } ]
        },
        {
            text: "How heavy do you want it to feel?", attribute: "weight", weight: 3,
            options: [ { label: "Light and airy", value: "light" }, { label: "Balanced and satisfying", value: "balanced" }, { label: "Rich and decadent", value: "rich" } ]
        }
    ];

    let currentPath = null;
    let currentQuestionIndex = 0; // 0 is always router
    let userAnswers = {};
    let answerHistory = [];

    startBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', startGame);
    backBtn.addEventListener('click', goBack);

    function startGame() {
        currentPath = null;
        currentQuestionIndex = 0;
        userAnswers = {};
        answerHistory = [];
        
        startBtn.classList.add('hidden');
        resultArea.classList.add('hidden');
        gameUiHeader.classList.remove('hidden');
        questionArea.classList.remove('hidden');
        
        showQuestion();
    }

    function getCurrentQuestionList() {
        if (currentQuestionIndex === 0) return [routerQuestion];
        if (currentPath === 'drink') return [routerQuestion, ...drinkQuestions];
        if (currentPath === 'meal') return [routerQuestion, ...mealQuestions];
        if (currentPath === 'dessert') return [routerQuestion, ...dessertQuestions];
        return [];
    }

    function showQuestion() {
        const questions = getCurrentQuestionList();
        const q = questions[currentQuestionIndex];
        
        // Update UI Header
        backBtn.style.visibility = currentQuestionIndex === 0 ? 'hidden' : 'visible';
        progressText.textContent = `Question ${currentQuestionIndex + 1} of 6`;
        progressFill.style.width = `${((currentQuestionIndex) / 5) * 100}%`;

        // Retrigger fade
        questionArea.classList.remove('fade-in');
        void questionArea.offsetWidth;
        questionArea.classList.add('fade-in');

        optionsArea.innerHTML = '';
        questionText.textContent = q.text;
        
        q.options.forEach((opt) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn ripple';
            // highlight if already selected (for history)
            if (userAnswers[q.attribute] === opt.value) {
                btn.classList.add('selected');
            }
            btn.textContent = opt.label;
            btn.onclick = () => handleAnswer(q.attribute, opt.value, btn);
            optionsArea.appendChild(btn);
        });
    }

    function handleAnswer(attribute, value, btnElement) {
        // Remove selected class from all, add to this one
        document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
        btnElement.classList.add('selected');

        setTimeout(() => {
            if (attribute === 'category') {
                currentPath = value;
            }
            
            answerHistory.push({ index: currentQuestionIndex, path: currentPath, answers: {...userAnswers} });
            userAnswers[attribute] = value;
            currentQuestionIndex++;

            if (currentQuestionIndex < 6) {
                showQuestion();
            } else {
                showResult();
            }
        }, 400); // Auto-advance delay
    }

    function goBack() {
        if (answerHistory.length === 0) return;
        
        const lastState = answerHistory.pop();
        currentQuestionIndex = lastState.index;
        currentPath = lastState.path;
        userAnswers = lastState.answers;
        
        showQuestion();
    }

    function createParticleBurst() {
        const colors = ['#3b82f6', '#f59e0b', '#10b981', '#ef4444'];
        const resultRect = resultArea.getBoundingClientRect();
        const x = resultRect.left + resultRect.width / 2;
        const y = resultRect.top + 50;

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'confetti-particle';
            document.body.appendChild(particle);
            
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 8 + 4;
            const tx = (Math.random() - 0.5) * 300;
            const ty = (Math.random() - 0.5) * 300;
            
            particle.style.background = color;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            
            particle.animate([
                { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
                { transform: `translate(${tx}px, ${ty}px) rotate(${Math.random()*360}deg)`, opacity: 0 }
            ], {
                duration: Math.random() * 1000 + 1000,
                easing: 'cubic-bezier(0, .9, .57, 1)'
            }).onfinish = () => particle.remove();
        }
    }

    function showResult() {
        questionArea.classList.add('hidden');
        gameUiHeader.classList.add('hidden');
        resultArea.classList.remove('hidden');
        
        resultArea.classList.remove('fade-in');
        void resultArea.offsetWidth;
        resultArea.classList.add('fade-in');

        const { matches, maxPossible } = calculateMatches();
        const bestMatch = matches[0];
        
        const accuracy = Math.round((bestMatch.score / maxPossible) * 100);
        matchAccuracy.textContent = `${accuracy}% Match`;
        matchAccuracy.classList.remove('hidden');

        recommendedItemContainer.innerHTML = `
            <img src="${bestMatch.item.image}" alt="${bestMatch.item.name}" class="menu-image">
            <div class="menu-content">
                <div class="menu-header">
                    <h4 class="menu-title">${bestMatch.item.name}</h4>
                    <span class="menu-price">${bestMatch.item.price} EGP</span>
                </div>
                <p class="menu-desc">${bestMatch.item.description}</p>
            </div>
        `;

        const viewInMenuBtn = document.querySelector('.result-actions a');
        if (viewInMenuBtn) {
            viewInMenuBtn.href = `#item-${bestMatch.item.id}`;
        }

        if (matches.length > 1) {
            runnerUpsSection.classList.remove('hidden');
            runnerUpsGrid.innerHTML = '';
            for (let i = 1; i < Math.min(3, matches.length); i++) {
                const runnerUp = matches[i];
                const acc = Math.round((runnerUp.score / maxPossible) * 100);
                runnerUpsGrid.innerHTML += `
                    <div class="runner-up-card">
                        <img src="${runnerUp.item.image}" alt="${runnerUp.item.name}">
                        <div class="runner-up-info">
                            <h5>${runnerUp.item.name}</h5>
                            <span class="small-badge">${acc}% Match</span>
                        </div>
                    </div>
                `;
            }
        } else {
            runnerUpsSection.classList.add('hidden');
        }

        setTimeout(createParticleBurst, 300);
    }

    function calculateMatches() {
        let pool = [];
        let questions = [];
        let maxPossible = 0;
        
        if (currentPath === 'drink') {
            pool = menuData.drinks;
            questions = drinkQuestions;
        } else if (currentPath === 'meal') {
            pool = menuData.food;
            questions = mealQuestions;
        } else if (currentPath === 'dessert') {
            pool = menuData.desserts;
            questions = dessertQuestions;
        }
        
        maxPossible = questions.reduce((sum, q) => sum + q.weight, 0);

        let scoredItems = pool.map(item => {
            let score = 0;
            let highestWeightMatched = 0;
            
            questions.forEach(q => {
                const userVal = userAnswers[q.attribute];
                const itemVal = item[q.attribute];
                
                if (userVal === 'flexible') {
                    score += q.weight;
                    highestWeightMatched = Math.max(highestWeightMatched, q.weight);
                } else if (Array.isArray(itemVal)) {
                    if (itemVal.includes(userVal) || itemVal.includes('either') || itemVal.includes('flexible')) {
                        score += q.weight;
                        highestWeightMatched = Math.max(highestWeightMatched, q.weight);
                    }
                } else {
                    if (itemVal === userVal || itemVal === 'either') {
                        score += q.weight;
                        highestWeightMatched = Math.max(highestWeightMatched, q.weight);
                    }
                }
            });
            
            return { item, score, highestWeightMatched, rand: Math.random() };
        });

        scoredItems.sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            if (b.highestWeightMatched !== a.highestWeightMatched) return b.highestWeightMatched - a.highestWeightMatched;
            return b.rand - a.rand;
        });

        return { matches: scoredItems, maxPossible };
    }
});
