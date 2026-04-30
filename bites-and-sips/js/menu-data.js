const menuData = {
    food: [
        {
            id: 'f1',
            name: 'Koshari',
            price: 55,
            description: 'Rice, lentils, pasta, chickpeas, crispy onions & spicy tomato sauce',
            image: 'assets/images/koshari.jpg',
            tags: { mood: 'energetic', flavor: 'savory', temp: 'hot', hunger: 'full meal', vibe: 'street food' }
        },
        {
            id: 'f2',
            name: 'Molokhia with Chicken',
            price: 120,
            description: 'Jute leaves stew with garlic, coriander & tender chicken',
            image: 'assets/images/molokhia.jpg',
            tags: { mood: 'cozy', flavor: 'savory', temp: 'hot', hunger: 'full meal', vibe: 'traditional' }
        },
        {
            id: 'f3',
            name: 'Ful Medames',
            price: 35,
            description: 'Slow-cooked fava beans with olive oil, lemon & cumin',
            image: 'assets/images/ful.jpg',
            tags: { mood: 'relaxed', flavor: 'savory', temp: 'hot', hunger: 'light', vibe: 'street food' }
        },
        {
            id: 'f4',
            name: 'Hawawshi',
            price: 70,
            description: 'Egyptian spiced minced meat baked in pita bread',
            image: 'assets/images/hawawshi.jpg',
            tags: { mood: 'adventurous', flavor: 'spicy', temp: 'hot', hunger: 'full meal', vibe: 'street food' }
        },
        {
            id: 'f5',
            name: 'Mahshi Warak Enab',
            price: 90,
            description: 'Stuffed grape leaves with rice, herbs & spices',
            image: 'assets/images/mahshi.jpg',
            tags: { mood: 'relaxed', flavor: 'savory', temp: 'hot', hunger: 'light', vibe: 'traditional' }
        },
        {
            id: 'f6',
            name: 'Fatta',
            price: 110,
            description: 'Layers of rice, crispy bread, garlic vinegar sauce & beef',
            image: 'assets/images/fatta.jpg',
            tags: { mood: 'energetic', flavor: 'savory', temp: 'hot', hunger: 'full meal', vibe: 'fancy' }
        }
    ],
    drinks: [
        {
            id: 'd1',
            name: 'Sahlab',
            price: 40,
            description: 'Hot milk, orchid root, cinnamon, coconut & nuts',
            image: 'assets/images/sahlab.jpg',
            tags: { mood: 'cozy', flavor: 'sweet', temp: 'hot', hunger: 'snack', vibe: 'traditional' }
        },
        {
            id: 'd2',
            name: 'Karkadeh (Hibiscus Tea)',
            price: 25,
            description: 'Dried hibiscus petals, sugar, lemon — served hot or cold',
            image: 'assets/images/karkadeh.jpg',
            tags: { mood: 'relaxed', flavor: 'refreshing', temp: 'either', hunger: 'light', vibe: 'traditional' }
        },
        {
            id: 'd3',
            name: 'Sobia',
            price: 30,
            description: 'Coconut milk, rice, sugar, vanilla — chilled',
            image: 'assets/images/sobia.jpg',
            tags: { mood: 'energetic', flavor: 'sweet', temp: 'cold', hunger: 'snack', vibe: 'street food' }
        },
        {
            id: 'd4',
            name: 'Mango Asab',
            price: 35,
            description: 'Fresh sugarcane juice blended with mango pulp',
            image: 'assets/images/mango-asab.jpg',
            tags: { mood: 'adventurous', flavor: 'sweet', temp: 'cold', hunger: 'snack', vibe: 'modern' }
        },
        {
            id: 'd5',
            name: 'Yansoon (Anise Tea)',
            price: 20,
            description: 'Anise seeds, honey, lemon zest',
            image: 'assets/images/yansoon.jpg',
            tags: { mood: 'cozy', flavor: 'sweet', temp: 'hot', hunger: 'light', vibe: 'traditional' }
        },
        {
            id: 'd6',
            name: 'Tamr Hindi',
            price: 28,
            description: 'Tamarind pulp, sugar, rose water, ice',
            image: 'assets/images/tamr-hindi.jpg',
            tags: { mood: 'relaxed', flavor: 'refreshing', temp: 'cold', hunger: 'light', vibe: 'street food' }
        }
    ],
    desserts: [
        {
            id: 'ds1',
            name: 'Om Ali',
            price: 60,
            description: 'Puff pastry, milk, nuts, raisins, coconut, cinnamon',
            image: 'assets/images/om-ali.jpg',
            tags: { mood: 'cozy', flavor: 'sweet', temp: 'hot', hunger: 'dessert craving', vibe: 'traditional' }
        },
        {
            id: 'ds2',
            name: 'Basbousa',
            price: 40,
            description: 'Semolina cake, syrup, coconut, almonds',
            image: 'assets/images/basbousa.jpg',
            tags: { mood: 'relaxed', flavor: 'sweet', temp: 'either', hunger: 'dessert craving', vibe: 'traditional' }
        },
        {
            id: 'ds3',
            name: 'Konafa with Cream',
            price: 75,
            description: 'Shredded phyllo, cream, pistachios, syrup',
            image: 'assets/images/konafa.jpg',
            tags: { mood: 'energetic', flavor: 'sweet', temp: 'hot', hunger: 'dessert craving', vibe: 'fancy' }
        },
        {
            id: 'ds4',
            name: 'Mahalabia',
            price: 35,
            description: 'Milk pudding with rose water, pistachios',
            image: 'assets/images/mahalabia.jpg',
            tags: { mood: 'relaxed', flavor: 'sweet', temp: 'cold', hunger: 'dessert craving', vibe: 'traditional' }
        },
        {
            id: 'ds5',
            name: 'Zalabia',
            price: 30,
            description: 'Fried dough balls in honey syrup',
            image: 'assets/images/zalabia.jpg',
            tags: { mood: 'adventurous', flavor: 'sweet', temp: 'hot', hunger: 'snack', vibe: 'street food' }
        },
        {
            id: 'ds6',
            name: 'Roz bel Laban',
            price: 45,
            description: 'Egyptian rice pudding with cinnamon',
            image: 'assets/images/roz-bel-laban.jpg',
            tags: { mood: 'cozy', flavor: 'sweet', temp: 'cold', hunger: 'dessert craving', vibe: 'traditional' }
        }
    ]
};
