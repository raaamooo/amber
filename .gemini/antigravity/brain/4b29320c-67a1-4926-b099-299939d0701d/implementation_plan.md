# Implementation Plan: Refactoring the Recommendation Game

This plan outlines the steps to overhaul the "Play With Us" / "Consult the Oracle" game in both the `/bites-and-sips/` (modern) and `/anubis-table/` (ancient) versions. The new game features a branching question flow, weighted scoring, progress tracking, and an enriched 3-item result display.

## Proposed Changes

### 1. Data Schema Enrichment
Update `js/menu-data.js` in both versions. Every item will receive category-specific tags corresponding to the new questions.

*   **Drinks:** Tags for `temp`, `flavor` (array), `purpose` (array), `thickness`, and `adventure`.
*   **Meals:** Tags for `hunger`, `flavor` (array), `protein` (array), `texture` (array), and `occasion` (array).
*   **Desserts:** Tags for `sweetness`, `temp` (array), `texture` (array), `family` (array), and `weight`.

> [!IMPORTANT]
> Since we use multi-tag arrays, matching *any* tag in the array will award full points for that attribute.

### 2. Game Logic Rewrite (`js/game.js` for both versions)
We will completely rewrite `js/game.js` for both versions:

*   **State Management:** Track `currentPath`, `currentQuestionIndex`, and `userAnswers` (for Back button functionality).
*   **Question Definitions:** 
    *   Modern Version: Standard conversational phrasing.
    *   Ancient Version: "Anubis" phrasing (mystical tone).
*   **Flow:** 
    *   Q1 routes to `drink`, `meal`, or `dessert`.
    *   Subsequent questions (Q2-Q6) are drawn from the selected category path.
    *   Auto-advance with a 400ms delay after selection.
*   **Scoring Engine:**
    *   Filters items based on Q1 selection.
    *   Applies weighted points for each attribute match. "Flexible/Either" grants +1 to all items.
    *   Tie-breaking logic checks the highest weight question match first, then randomized if still tied.
    *   Calculates accuracy: `(winner_score / max_possible_score) * 100`.
*   **UI Controls:** Render "Question X of 6", handle Back button clicks, and process "Play Again" / "View in Menu" clicks.

### 3. UI and Structural Updates (`index.html`)
Update the game section container in both versions:
*   Add a progress bar element at the top.
*   Add a "Back" button (hidden on Q1).
*   Structure the results container to show a primary "Perfect Match" card, and a sub-grid for the two runner-ups.
*   Add a match accuracy badge element.

### 4. Styling & Animations (`css/style.css` / `css/animations.css`)
*   **Shared:** Styles for the progress bar, back button, selected answer highlights, and top 3 results grid.
*   **Modern Version (`bites-and-sips`):** Fade and slide transitions. Implement a lightweight JS confetti burst on the reveal screen.
*   **Ancient Version (`anubis-table`):** Papyrus unrolling transition, typing animation for Anubis text, and a golden particle burst effect on reveal.

## Verification Plan

### Automated/Manual Tests
-   Verify Q1 routes to the correct 5 follow-up questions.
-   Click through all 3 paths in both versions.
-   Test the Back button at various stages (e.g., go back to Q1, change category, verify new path is loaded).
-   Verify scoring math (Top match should logically align with selections).
-   Ensure no console errors or undefined tags during the sorting/filtering process.
-   Test the Play Again loop.

## User Review Required

> [!NOTE]
> Are you okay with me building a lightweight custom JS particle generator for the confetti/gold dust effects to keep the project dependency-free, rather than importing an external library?
