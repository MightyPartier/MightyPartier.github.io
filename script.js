// Sample data for the heroes
const heroesData = [
    { name: "Celeste", rarity: "Common", faction: "Order", level: 1, type: "Melee", rarityConstant: 98 },
    { name: "Bonny", rarity: "Common", faction: "Order", level: 1, type: "Ranged", rarityConstant: 98 },
    { name: "Evelynn", rarity: "Common", faction: "Chaos", level: 1, type: "Ranged", rarityConstant: 98 },
    { name: "Zuul", rarity: "Common", faction: "Chaos", level: 1, type: "Melee", rarityConstant: 98 },
    { name: "Genbu", rarity: "Common", faction: "Nature", level: 1, type: "Ranged", rarityConstant: 98 },
    { name: "Surus", rarity: "Common", faction: "Nature", level: 1, type: "Melee", rarityConstant: 98 },
    { name: "Felicia", rarity: "Rare", faction: "Order", level: 1, type: "Melee", rarityConstant: 147 },
    { name: "Caleb", rarity: "Rare", faction: "Chaos", level: 1, type: "Melee", rarityConstant: 147 },
    { name: "Venomeus", rarity: "Rare", faction: "Nature", level: 1, type: "Ranged", rarityConstant: 147 },
    { name: "Richard", rarity: "Epic", faction: "Order", level: 1, type: "Melee", rarityConstant: 196 },
    { name: "Salma", rarity: "Epic", faction: "Chaos", level: 1, type: "Ranged", rarityConstant: 196 },
    { name: "Empyrion", rarity: "Epic", faction: "Nature", level: 1, type: "Melee", rarityConstant: 196 },
    { name: "Magnus", rarity: "Legendary", faction: "Order", level: 1, type: "Ranged", rarityConstant: 245 },
    { name: "Kilgarrah", rarity: "Legendary", faction: "Chaos", level: 1, type: "Melee", rarityConstant: 245 },
    { name: "Scryre", rarity: "Legendary", faction: "Nature", level: 1, type: "Melee", rarityConstant: 245 }
];

// Function to calculate the power of a hero based on its level and rarity
function calculatePower(hero) {
    const rarityFactorMap = {
        "Common": 2,
        "Rare": 3,
        "Epic": 4,
        "Legendary": 5
    };

    return Math.floor(rarityFactorMap[hero.rarity] * Math.pow(hero.level, 1.5) + hero.rarityConstant);
}

// Function to calculate the level up cost of a hero based on its level
function calculateLevelUpCost(hero) {
    return Math.floor(2 * Math.pow(hero.level, 1.5) + 8);
}

// Function to calculate the power up cost of a hero based on its next level power gain
function calculatePowerGained(hero) {
    const nextLevelPower = calculatePower({ ...hero, level: hero.level + 1 });
    return nextLevelPower - hero.power;
}

// Function to display hero information and level-up button
function displayHero(hero) {
    const heroContainer = document.getElementById("heroContainer");

    // Calculate hero stats
    hero.power = calculatePower(hero);
    hero.levelUpCost = calculateLevelUpCost(hero);
    hero.PowerGained = calculatePowerGained(hero);

    // Create elements to display hero information
    const heroInfo = document.createElement("div");
    heroInfo.innerHTML = `
        <h3>${hero.name}</h3>
        <p>Rarity: ${hero.rarity}</p>
        <p>Faction: ${hero.faction}</p>
        <p>Level: ${hero.level}</p>
        <p>Power: ${hero.power}</p>
        <p>Level Up Cost: ${hero.levelUpCost}</p>
        <p>Power Gained By Leveling: ${hero.PowerGained}</p>
        <button onclick="levelUp(${heroesData.indexOf(hero)})">Level Up</button>
    `;

    // Clear previous hero information and append the current hero's info
    heroContainer.innerHTML = "";
    heroContainer.appendChild(heroInfo);
}

// Function to level up a hero
function levelUp(heroIndex) {
    const hero = heroesData[heroIndex];

    // Implement your logic to level up the hero here
    // For example, you can increase the hero's level and update the display
    hero.level++;

    // After leveling up, update the hero information display
    displayHero(hero);
}

// On page load, display the first hero (Celeste) at level 1
// Function to display all heroes
// Sample data for the heroes
// ... (same as before)

// Function to display all heroes
function displayAllHeroes() {
    const heroContainer = document.getElementById("heroContainer");
    heroContainer.innerHTML = "";

    // Reverse the order of heroesData before displaying
    const reversedHeroesData = heroesData.slice().reverse();

    reversedHeroesData.forEach(hero => {
        // Calculate hero stats
        hero.power = calculatePower(hero);
        hero.levelUpCost = calculateLevelUpCost(hero);
        hero.PowerGained = calculatePowerGained(hero);

        // Create elements to display hero information
        const heroInfo = document.createElement("div");
        heroInfo.className = `hero-card ${hero.rarity.toLowerCase()} ${hero.faction.toLowerCase()}-faction ${hero.recommended ? 'recommended' : ''}`;
        heroInfo.innerHTML = `
            <h3>${hero.name}</h3>
            <p>Rarity: ${hero.rarity}</p>
            <p>Faction: ${hero.faction}</p>
            <p>Level: <span class="hero-level" data-hero-index="${heroesData.indexOf(hero)}">${hero.level}</span></p>
            <p>Power: ${hero.power}</p>
            <p>Level Up Cost: ${hero.levelUpCost}</p>
            <p>Power Gained By Leveling: ${hero.PowerGained}</p>
            <input type="number" min="1" value="${hero.level}" onchange="changeHeroLevel(${heroesData.indexOf(hero)}, this.value)">
        `;

        // Append the hero info to the container
        heroContainer.appendChild(heroInfo);
    });
}

// Function to change the level of a hero manually
function changeHeroLevel(heroIndex, newLevel) {
    const hero = heroesData[heroIndex];

    // Validate the new level (ensure it is a positive integer)
    const parsedLevel = parseInt(newLevel);
    if (isNaN(parsedLevel) || parsedLevel <= 0) {
        alert("Please enter a valid positive integer for the hero's level.");
        return;
    }

    // Update the hero's level and recalculate stats
    hero.level = parsedLevel;
    hero.power = calculatePower(hero);
    hero.levelUpCost = calculateLevelUpCost(hero);
    hero.PowerGained = calculatePowerGained(hero);

    // After changing the level, update the recommendation and redisplay all heroes
    updateRecommendation();
    displayAllHeroes();
}

// Function to level up a hero
function levelUp(heroIndex) {
    const hero = heroesData[heroIndex];

    // Implement your logic to level up the hero here
    // For example, you can increase the hero's level and update the display
    hero.level++;

    // After leveling up, update the recommendation and redisplay all heroes
    updateRecommendation();
    displayAllHeroes();
}

// Function to update the recommendation (highlighting the best hero to level up in each faction)
function updateRecommendation() {
    const factions = [...new Set(heroesData.map(hero => hero.faction))];

    factions.forEach(faction => {
        const factionHeroes = heroesData.filter(hero => hero.faction === faction);
        const maxPowerCostRatio = Math.max(...factionHeroes.map(hero => hero.PowerGained / hero.levelUpCost));
        factionHeroes.forEach(hero => {
            hero.recommended = (hero.PowerGained / hero.levelUpCost === maxPowerCostRatio);
        });
    });
}

// Calculate functions (same as before)

// On page load, display all heroes and highlight the recommended ones
updateRecommendation();
displayAllHeroes();
