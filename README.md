# GA_Project1-Game - Mille Bornes Solitaire

## Date: 07/03/2022

### By: Leon Glaser

[LinkedIn](https://www.linkedin.com/in/leon-glaser-02645322/) |
[Twitter](https://twitter.com/sirescapist) |
[GitHub](https://github.com/lnglaser)

---

### **_Description_**

#### **The aim of this project is to produce a simplified, one-player version of the game Mille Bornes.**

#### **The game simulates an extended car trip, with the goal being to travel exactly 1,000 miles. Along the way, the player is beset by various hazards in the form of cards played against them by other players. When face with a hazard, a player must play the appropriate remedy card and then a green light card to resume traveling (adding to their score.)**

#### **In this one-player version, I am proposing to simplify this game to more basic mechanics (with further features being added where possible.) Instead of the opponent AI having full access to its own score cards and remedies/safeties, the initial version will simply deal out hazard cards to the player. The player will need to respond with the appropriate remedy card to continue adding to their score. Instead of competing against an opposing score, the player must attempt to complete a trip of 1,000 miles within a specifically allotted amount of turns (the specific amount to be determined through playtesting.) The initial build will be a luck-based game with a few elements of strategy (e.g. saving/discarding remedy cards in favor of more score cards, or vice versa). The nature of the game may evolve as features are added.**

#### **The first additional feature beyond the MVP would be the incorporation of the original game's safety cards - cards that, when played, render a player immune to a specific hazard card.**

---

### **_Technologies_**

- JavaScript
- HTML 5
- CSS

---

### **_Getting Started_**

1. Step 1 - determine basic game parameters
   - Scaling back full game to simple single-player variant. (described above.)
   - Mapping out rough idea of basic functions. (dealing cards, storing a hand, playing/discarding, adding to score.)
2. Step 2 - Creating play area via HTML
   - Player hand
   - Score pile
   - Battle pile (where hazards/remedies are played.)
   - Speed pile (used for a specific hazard, the Speed Limit card (which limits playable score cards to 50 and 25-mile cards), and its corresponing remedy, the End of Limit card. This may not make it to the MVP.)
3. Step 3 - Identifying game functions
   - Create and shuffle decks
   - Deal cards
   - Choosing a card
   - Playing a card
   - Discarding
   - Computer action
   - Ending the game

---

### **_Screenshots_**

**To be updated.**

#### **New game**

## ![Imgur](https://i.imgur.com/MMkcmko.png)

### **_Future Updates_**

- [x] Basic game functions completed
- [x] Game documentation
- [ ] Original game feature - speed pile (including speed limit and end-of-limit cards)
- [ ] Original game feature - safety cards and coup fourre gameplay
- [ ] Original game feature - Original scoring system + score bonuses
- [ ] Adjustable difficulty
- [ ] Multiplayer

---

### **_Credits_**

#### **_Image sources_**:

#### **_Markdown reference_**: [GitHub Markdown Guide](https://gist.github.com/cuonggt/9b7d08a597b167299f0d)
