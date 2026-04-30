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
    const resultDialogue = document.getElementById('result-dialogue');

    const primaryRouter = {
        id: 'q1', text: "What offering do you seek, traveler?", attribute: "_primary",
        options: [
            { label: "A sacred drink", value: "drink" },
            { label: "Nourishment from the feast", value: "food" }
        ]
    };
    const foodRouter = {
        id: 'q1b', text: "What manner of sustenance calls to you?", attribute: "_food",
        options: [
            { label: "A worthy feast", value: "meal" },
            { label: "A sweet offering", value: "dessert" }
        ]
    };

    const drinkQuestions = [
        { text: "Shall it be hot from Ra's flame, or cold as the desert night?", attribute: "temp", weight: 4, options: [{ label: "From the sacred flame", value: "hot" }, { label: "Chilled by the moon", value: "cold" }, { label: "As the temple air", value: "room" }, { label: "The choice is yours, god of fate", value: "flexible" }] },
        { text: "Which essence calls to your spirit?", attribute: "flavor", weight: 5, options: [{ label: "Sweet nectar of the gods", value: "sweet" }, { label: "The tang of citrus orchards", value: "tangy" }, { label: "Earth and ancient herbs", value: "earthy" }, { label: "Petals of sacred flowers", value: "floral" }, { label: "Spices from distant lands", value: "rich" }] },
        { text: "What purpose does this elixir serve, traveler?", attribute: "purpose", weight: 4, options: [{ label: "Awaken my mortal body", value: "energize" }, { label: "Bring peace to my soul", value: "calm" }, { label: "Quench the desert thirst", value: "refresh" }, { label: "Delight my senses as tribute", value: "indulge" }, { label: "Settle my feast within", value: "digestion" }] },
        { text: "How shall it flow upon your tongue?", attribute: "thickness", weight: 3, options: [{ label: "Thin as the Nile waters", value: "light" }, { label: "Smooth as temple oil", value: "medium" }, { label: "Thick as honeyed cream", value: "thick" }, { label: "I leave it to fate", value: "flexible" }] },
        { text: "How daring is your soul today?", attribute: "adventure", weight: 2, options: [{ label: "A time-honored classic", value: "classic" }, { label: "A balanced path", value: "balanced" }, { label: "A bold venture into the unknown", value: "bold" }] }
    ];
    const mealQuestions = [
        { text: "How great is the void in your belly, mortal?", attribute: "hunger", weight: 3, options: [{ label: "A modest offering suffices", value: "light" }, { label: "A worthy portion", value: "normal" }, { label: "A banquet fit for pharaohs", value: "feast" }] },
        { text: "Which flavor shall please your tongue?", attribute: "flavor", weight: 5, options: [{ label: "Rich and savory like the harvest", value: "savory" }, { label: "Fire and spice like the sun", value: "spicy" }, { label: "Sharp and bright like citrus groves", value: "tangy" }, { label: "Gentle and soothing", value: "mild" }, { label: "Green and verdant like the Nile", value: "herbaceous" }] },
        { text: "What gift of the earth shall feed you?", attribute: "protein", weight: 4, options: [{ label: "The flesh of cattle", value: "beef" }, { label: "The fowl of the sky", value: "chicken" }, { label: "The bounty of soil and seed", value: "vegetarian" }, { label: "The grains that built pyramids", value: "carb-heavy" }, { label: "I accept what the gods provide", value: "flexible" }] },
        { text: "What texture pleases your senses?", attribute: "texture", weight: 4, options: [{ label: "Shattered and crisp", value: "crispy" }, { label: "Dense and substantial", value: "hearty" }, { label: "Yielding and gentle", value: "soft" }, { label: "Many textures woven as one", value: "layered" }] },
        { text: "For what occasion do you partake in this offering?", attribute: "occasion", weight: 3, options: [{ label: "The midday ritual", value: "lunch" }, { label: "An evening by the hearth", value: "dinner" }, { label: "The meal of ancestors", value: "traditional" }, { label: "A sacred celebration", value: "celebration" }] }
    ];
    const dessertQuestions = [
        { text: "How sweet shall the gods make your reward?", attribute: "sweetness", weight: 4, options: [{ label: "A whisper of honey", value: "lightly" }, { label: "A balanced blessing", value: "moderately" }, { label: "Sweeter than dates and figs", value: "very" }] },
        { text: "Warm from the hearth, or cool from the temple stone?", attribute: "temp", weight: 3, options: [{ label: "Hot as the desert sun", value: "hot" }, { label: "Cool as the evening breeze", value: "cold" }, { label: "Either pleases me", value: "flexible" }] },
        { text: "What texture shall delight your senses?", attribute: "texture", weight: 5, options: [{ label: "Smooth as polished marble", value: "creamy" }, { label: "Shattered like papyrus", value: "crunchy" }, { label: "Soft as linen cloth", value: "soft" }, { label: "Drenched in sacred syrup", value: "syrupy" }] },
        { text: "Which sacred lineage of sweets calls to you?", attribute: "family", weight: 4, options: [{ label: "Born of milk and cream", value: "milk" }, { label: "Crafted from golden dough", value: "pastry" }, { label: "Forged in bubbling oil", value: "fried" }, { label: "Built from seeds and nuts", value: "nut" }] },
        { text: "How heavily shall this blessing rest upon you?", attribute: "weight", weight: 3, options: [{ label: "Gentle as a feather", value: "light" }, { label: "Satisfying and complete", value: "balanced" }, { label: "Heavy with indulgence", value: "rich" }] }
    ];

    let currentPath = null;
    let currentStep = 0;
    let userAnswers = {};
    let stateHistory = [];
    let questionSequence = [];

    startBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', startGame);
    backBtn.addEventListener('click', goBack);

    function startGame() {
        currentPath = null;
        currentStep = 0;
        userAnswers = {};
        stateHistory = [];
        questionSequence = [primaryRouter];
        startBtn.classList.add('hidden');
        resultArea.classList.add('hidden');
        gameUiHeader.classList.remove('hidden');
        questionArea.classList.remove('hidden');
        showQuestion();
    }

    function getTotalQuestions() {
        if (currentPath === 'drink') return 6;
        if (currentPath === 'meal' || currentPath === 'dessert') return 7;
        return 6;
    }

    function showQuestion() {
        var q = questionSequence[currentStep];
        var total = getTotalQuestions();
        backBtn.style.visibility = currentStep === 0 ? 'hidden' : 'visible';
        progressText.textContent = 'Question ' + (currentStep + 1) + ' of ' + total;
        progressFill.style.width = (currentStep / (total - 1)) * 100 + '%';
        questionArea.classList.remove('fade-in-anubis');
        void questionArea.offsetWidth;
        questionArea.classList.add('fade-in-anubis');
        optionsArea.innerHTML = '';
        questionText.classList.remove('typing-text');
        void questionText.offsetWidth;
        questionText.classList.add('typing-text');
        questionText.textContent = q.text;
        var isRouter = q.id === 'q1' || q.id === 'q1b';
        optionsArea.classList.toggle('router-options', isRouter);
        q.options.forEach(function(opt) {
            var btn = document.createElement('button');
            btn.className = 'option-btn ripple';
            if (isRouter) btn.classList.add('router-btn');
            if (userAnswers[q.attribute] === opt.value) btn.classList.add('selected');
            btn.textContent = opt.label;
            btn.onclick = function() { handleAnswer(q, opt.value, btn); };
            optionsArea.appendChild(btn);
        });
    }

    function handleAnswer(question, value, btnElement) {
        document.querySelectorAll('.option-btn').forEach(function(b) { b.classList.remove('selected'); });
        btnElement.classList.add('selected');
        setTimeout(function() {
            stateHistory.push({ step: currentStep, path: currentPath, answers: Object.assign({}, userAnswers), sequence: questionSequence.slice() });
            userAnswers[question.attribute] = value;
            if (question.id === 'q1') {
                if (value === 'drink') {
                    currentPath = 'drink';
                    questionSequence = [primaryRouter].concat(drinkQuestions);
                } else {
                    questionSequence = [primaryRouter, foodRouter];
                }
            } else if (question.id === 'q1b') {
                currentPath = value;
                if (value === 'meal') {
                    questionSequence = [primaryRouter, foodRouter].concat(mealQuestions);
                } else {
                    questionSequence = [primaryRouter, foodRouter].concat(dessertQuestions);
                }
            }
            currentStep++;
            if (currentStep < questionSequence.length) { showQuestion(); }
            else { showResult(); }
        }, 400);
    }

    function goBack() {
        if (stateHistory.length === 0) return;
        var prev = stateHistory.pop();
        currentStep = prev.step;
        currentPath = prev.path;
        userAnswers = prev.answers;
        questionSequence = prev.sequence;
        showQuestion();
    }

    function createGoldDust() {
        var rect = resultArea.getBoundingClientRect();
        var x = rect.left + rect.width / 2;
        var y = rect.top + 50;
        for (var i = 0; i < 40; i++) {
            var p = document.createElement('div');
            document.body.appendChild(p);
            var s = Math.random() * 4 + 2;
            var tx = (Math.random() - 0.5) * 400;
            var ty = (Math.random() - 0.5) * 400;
            p.style.cssText = 'background:#d4af37;box-shadow:0 0 5px #d4af37;border-radius:50%;position:absolute;z-index:9999;pointer-events:none;width:' + s + 'px;height:' + s + 'px;left:' + x + 'px;top:' + y + 'px;';
            p.animate([
                { transform: 'translate(0,0)', opacity: 1 },
                { transform: 'translate(' + tx + 'px,' + ty + 'px)', opacity: 0 }
            ], { duration: Math.random()*1500+1000, easing: 'ease-out' }).onfinish = (function(el){ return function(){ el.remove(); }; })(p);
        }
    }

    function showResult() {
        questionArea.classList.add('hidden');
        gameUiHeader.classList.add('hidden');
        resultArea.classList.remove('hidden');
        resultArea.classList.remove('fade-in-anubis');
        void resultArea.offsetWidth;
        resultArea.classList.add('fade-in-anubis');
        var result = calculateMatches();
        var best = result.matches[0];
        var accuracy = Math.round((best.score / result.maxPossible) * 100);
        matchAccuracy.textContent = accuracy + '% Match';
        matchAccuracy.classList.remove('hidden');
        resultDialogue.textContent = 'The Oracle has spoken. Your destiny is... ' + best.item.name + '.';
        recommendedItemContainer.innerHTML = '<a href="#item-' + best.item.id + '" style="text-decoration:none;color:inherit;display:block;cursor:pointer;border-radius:inherit;">' +
            '<img src="' + best.item.image + '" alt="' + best.item.name + '" class="menu-image">' +
            '<div class="menu-content"><div class="menu-header"><h4 class="menu-title">' + best.item.name + '</h4>' +
            '<span class="menu-price">' + best.item.price + ' EGP</span></div>' +
            '<p class="menu-desc">' + best.item.description + '</p></div></a>';
        if (result.matches.length > 1) {
            runnerUpsSection.classList.remove('hidden');
            runnerUpsGrid.innerHTML = '';
            for (var i = 1; i < Math.min(3, result.matches.length); i++) {
                var ru = result.matches[i];
                var acc = Math.round((ru.score / result.maxPossible) * 100);
                runnerUpsGrid.innerHTML += '<a href="#item-' + ru.item.id + '" class="runner-up-card" style="text-decoration:none;color:inherit;display:block;cursor:pointer;border:1px solid var(--gold);border-radius:8px;padding:10px;text-align:center;">' +
                    '<img src="' + ru.item.image + '" alt="' + ru.item.name + '" style="width:100%;height:100px;object-fit:cover;border-radius:4px;margin-bottom:8px;">' +
                    '<div class="runner-up-info"><h5 style="color:var(--gold);margin:0 0 5px 0;">' + ru.item.name + '</h5>' +
                    '<span class="small-badge" style="font-size:0.8rem;opacity:0.8;">' + acc + '% Match</span></div></a>';
            }
        } else { runnerUpsSection.classList.add('hidden'); }
        setTimeout(createGoldDust, 300);
    }

    function calculateMatches() {
        var pool = [], questions = [];
        if (currentPath === 'drink') { pool = menuData.drinks; questions = drinkQuestions; }
        else if (currentPath === 'meal') { pool = menuData.food; questions = mealQuestions; }
        else if (currentPath === 'dessert') { pool = menuData.desserts; questions = dessertQuestions; }
        var maxPossible = questions.reduce(function(s, q) { return s + q.weight; }, 0);
        var scored = pool.map(function(item) {
            var score = 0, hwm = 0;
            questions.forEach(function(q) {
                var uv = userAnswers[q.attribute], iv = item[q.attribute];
                if (uv === 'flexible') { score += 1; }
                else if (Array.isArray(iv)) { if (iv.includes(uv)) { score += q.weight; hwm = Math.max(hwm, q.weight); } }
                else { if (iv === uv) { score += q.weight; hwm = Math.max(hwm, q.weight); } }
            });
            return { item: item, score: score, highestWeightMatched: hwm, rand: Math.random() };
        });
        scored.sort(function(a, b) {
            if (b.score !== a.score) return b.score - a.score;
            if (b.highestWeightMatched !== a.highestWeightMatched) return b.highestWeightMatched - a.highestWeightMatched;
            return b.rand - a.rand;
        });
        return { matches: scored, maxPossible: maxPossible };
    }
});
