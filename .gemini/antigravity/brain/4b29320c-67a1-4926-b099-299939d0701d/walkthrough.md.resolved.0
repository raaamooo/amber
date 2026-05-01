# Recommendation Game Refactor Walkthrough

The "Play With Us" / "Consult the Oracle" game has been completely overhauled in both the `bites-and-sips` (modern) and `anubis-table` (ancient) versions. The new game introduces branching logic, weighted scoring, and an improved UI/UX.

## Changes Completed

### 1. Unified Data Schema (`menu-data.js`)
All items in the menu have been enriched with category-specific tags:
*   **Meals:** Tagged with `hunger`, `flavor`, `protein`, `texture`, and `occasion`.
*   **Drinks:** Tagged with `temp`, `flavor`, `purpose`, `thickness`, and `adventure`.
*   **Desserts:** Tagged with `sweetness`, `temp`, `texture`, `family`, and `weight`.

These tags are used by the new scoring engine to match user preferences precisely.

### 2. Intelligent Branching Game Logic (`game.js`)
*   **Initial Router:** The very first question asks what the user is craving (a meal, a drink, or a dessert). This acts as a hard filter, immediately restricting the item pool and determining which set of follow-up questions the user will see.
*   **Weighted Scoring:** Each question carries a specific weight (ranging from 2 to 5 points). Selecting a flexible/no preference option grants points across all valid candidates.
*   **Tiebreaker System:** If items score identically, the engine breaks ties by checking which item matched the highest-weight attribute, falling back to a random pick if still tied.
*   **Accuracy Badge:** The engine calculates a match accuracy percentage (`(winner_score / max_possible_score) * 100`) to show how closely the top item aligned with the user's choices.

### 3. UI/UX Enhancements
*   **Progress Tracking:** Added an animated progress bar to the top of the quiz container that shows the current question number (1 of 6).
*   **Back Navigation:** Added a "Back" button allowing users to revisit previous questions and change their answers without starting over. Selected answers remain highlighted when moving backward.
*   **Top 3 Reveal Display:** The result screen now prominently features the "Perfect Match" in a large card, followed by two "Runner Ups" displayed in smaller side-by-side cards.
*   **Custom Particle Effects:** 
    *   *Modern Version:* Displays a colorful confetti burst effect when revealing the match.
    *   *Ancient Version:* Displays a mystical floating gold dust effect when the Oracle reveals your destiny.

> [!TIP]
> Try clicking the "Back" button at any point to see how the game state is perfectly preserved, allowing you to seamlessly change paths midway!
