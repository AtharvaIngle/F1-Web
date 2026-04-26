// --- 2026 Data ---
const drivers = [
    { pos: 1, name: "George RUSSELL", team: "Mercedes", color: "var(--team-mercedes)", pts: 25 },
    { pos: 2, name: "Kimi ANTONELLI", team: "Mercedes", color: "var(--team-mercedes)", pts: 18 },
    { pos: 3, name: "Charles LECLERC", team: "Ferrari", color: "var(--team-ferrari)", pts: 15 },
    { pos: 4, name: "Lewis HAMILTON", team: "Ferrari", color: "var(--team-ferrari)", pts: 12 },
    { pos: 5, name: "Lando NORRIS", team: "McLaren", color: "var(--team-mclaren)", pts: 10 },
    { pos: 6, name: "Max VERSTAPPEN", team: "Red Bull", color: "var(--team-redbull)", pts: 8 },
    { pos: 7, name: "Oliver BEARMAN", team: "Haas", color: "var(--team-haas)", pts: 6 },
    { pos: 8, name: "Arvid LINDBLAD", team: "Racing Bulls", color: "var(--team-racingbulls)", pts: 4 },
    { pos: 9, name: "Gabriel BORTOLETO", team: "Audi", color: "var(--team-audi)", pts: 2 },
    { pos: 10, name: "Pierre GASLY", team: "Alpine", color: "var(--team-alpine)", pts: 1 },
    { pos: 11, name: "Oscar PIASTRI", team: "McLaren", color: "var(--team-mclaren)", pts: 0 },
    { pos: 12, name: "Fernando ALONSO", team: "Aston Martin", color: "var(--team-aston)", pts: 0 },
    { pos: 13, name: "Lance STROLL", team: "Aston Martin", color: "var(--team-aston)", pts: 0 },
    { pos: 14, name: "Isack HADJAR", team: "Red Bull", color: "var(--team-redbull)", pts: 0 },
    { pos: 15, name: "Franco COLAPINTO", team: "Alpine", color: "var(--team-alpine)", pts: 0 },
    { pos: 16, name: "Carlos SAINZ", team: "Williams", color: "var(--team-williams)", pts: 0 },
    { pos: 17, name: "Alexander ALBON", team: "Williams", color: "var(--team-williams)", pts: 0 },
    { pos: 18, name: "Esteban OCON", team: "Haas", color: "var(--team-haas)", pts: 0 },
    { pos: 19, name: "Liam LAWSON", team: "Racing Bulls", color: "var(--team-racingbulls)", pts: 0 },
    { pos: 20, name: "Nico HÜLKENBERG", team: "Audi", color: "var(--team-audi)", pts: 0 },
    { pos: 21, name: "Sergio PÉREZ", team: "Cadillac", color: "var(--team-cadillac)", pts: 0 },
    { pos: 22, name: "Valtteri BOTTAS", team: "Cadillac", color: "var(--team-cadillac)", pts: 0 }
];

const raceSchedule = [
    { rnd: 1, name: "Australian Grand Prix", date: "Mar 08", timeUTC: "04:00" }, // Done
    { rnd: 2, name: "Chinese Grand Prix", date: "Mar 15", timeUTC: "07:00" },
    { rnd: 3, name: "Japanese Grand Prix", date: "Mar 29", timeUTC: "05:00" },
    { rnd: 4, name: "Bahrain Grand Prix", date: "Apr 12", timeUTC: "15:00" }, // Estimated
    { rnd: 5, name: "Saudi Arabian Grand Prix", date: "Apr 19", timeUTC: "17:00" },
    { rnd: 6, name: "Miami Grand Prix", date: "May 03", timeUTC: "20:00" },
    { rnd: 7, name: "Canadian Grand Prix", date: "May 24", timeUTC: "18:00" },
    { rnd: 8, name: "Monaco Grand Prix", date: "Jun 07", timeUTC: "13:00" },
    { rnd: 9, name: "Spanish Grand Prix (Barcelona)", date: "Jun 14", timeUTC: "13:00" },
    { rnd: 10, name: "Austrian Grand Prix", date: "Jun 28", timeUTC: "13:00" },
    { rnd: 11, name: "British Grand Prix", date: "Jul 05", timeUTC: "14:00" },
    { rnd: 12, name: "Belgian Grand Prix", date: "Jul 19", timeUTC: "13:00" },
    { rnd: 13, name: "Hungarian Grand Prix", date: "Jul 26", timeUTC: "13:00" },
    { rnd: 14, name: "Dutch Grand Prix", date: "Aug 23", timeUTC: "13:00" },
    { rnd: 15, name: "Italian Grand Prix", date: "Sep 06", timeUTC: "13:00" },
    { rnd: 16, name: "Spanish Grand Prix (Madrid)", date: "Sep 13", timeUTC: "13:00" },
    { rnd: 17, name: "Azerbaijan Grand Prix", date: "Sep 26", timeUTC: "11:00" },
    { rnd: 18, name: "Singapore Grand Prix", date: "Oct 11", timeUTC: "12:00" },
    { rnd: 19, name: "United States Grand Prix", date: "Oct 25", timeUTC: "19:00" },
    { rnd: 20, name: "Mexico City Grand Prix", date: "Nov 01", timeUTC: "20:00" },
    { rnd: 21, name: "São Paulo Grand Prix", date: "Nov 08", timeUTC: "17:00" },
    { rnd: 22, name: "Las Vegas Grand Prix", date: "Nov 22", timeUTC: "06:00" },
    { rnd: 23, name: "Qatar Grand Prix", date: "Nov 29", timeUTC: "17:00" },
    { rnd: 24, name: "Abu Dhabi Grand Prix", date: "Dec 06", timeUTC: "13:00" }
];

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initSchedule();
    initDriverCards();
});

// --- Tab Navigation ---
function initTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            tab.classList.add('active');
            const targetId = tab.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });
}

// --- Schedule Logic ---
function convertToIST(timeUTC) {
    if (!timeUTC) return "TBD";
    const [hours, minutes] = timeUTC.split(':');
    let utcDate = new Date();
    utcDate.setUTCHours(parseInt(hours), parseInt(minutes), 0, 0);
    
    // Convert to IST (+5:30)
    return utcDate.toLocaleTimeString('en-IN', { 
        timeZone: 'Asia/Kolkata', 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true 
    });
}

function initSchedule() {
    const list = document.getElementById('schedule-list');
    list.innerHTML = '';

    raceSchedule.forEach((race, index) => {
        const li = document.createElement('li');
        li.className = 'leaderboard-item';
        
        let istTime = convertToIST(race.timeUTC);
        
        // Highlight if it's the next upcoming race (rough static check based on rnd)
        if (race.rnd === 2) { // Assuming Australia is done, China is next
            li.style.background = "rgba(225, 6, 0, 0.1)";
            li.style.borderLeft = "4px solid var(--f1-red)";
        }

        li.innerHTML = `
            <div class="pos">${race.rnd}</div>
            <div class="race-name">
                <span>${race.name}</span>
            </div>
            <div class="race-date">${race.date}</div>
            <div class="race-time">${istTime} IST</div>
        `;
        list.appendChild(li);
    });
}

// --- Driver Details Logic ---
function initDriverCards() {
    const grid = document.getElementById('driver-grid');
    grid.innerHTML = '';

    drivers.forEach(driver => {
        const card = document.createElement('div');
        card.className = 'driver-card';
        
        card.innerHTML = `
            <div class="driver-card-header" style="background-color: ${driver.color}"></div>
            <div class="driver-card-content">
                <div style="position: relative;">
                    <div class="driver-number">${driver.pos}</div>
                    <div class="driver-info">
                        <h3>${driver.name}</h3>
                        <span class="team">${driver.team}</span>
                    </div>
                </div>
                
                <div class="driver-stats">
                    <div class="stat-box">
                        <span class="label">Points</span>
                        <span class="value">${driver.pts}</span>
                    </div>
                    <div class="stat-box">
                        <span class="label">Championship</span>
                        <span class="value">P${driver.pos}</span>
                    </div>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// --- Lights Out Game Logic ---
const startBtn = document.getElementById('startGameBtn');
const resultText = document.getElementById('resultText');
const resultTime = document.getElementById('resultTime');
const timeValue = document.querySelector('.time-value');
const bestTimeSpan = document.querySelector('#bestTime span');
const clickArea = document.getElementById('clickArea');

let lights = [];
for (let i = 1; i <= 5; i++) {
    lights.push(document.querySelector(`#group-${i} .light.red`));
}

let gameTimeout;
let startTime = 0;
let gameState = 'IDLE'; // IDLE, SEQUENCE, WAITING, FINISHED
let bestTime = Infinity;

startBtn.addEventListener('click', startSequence);
clickArea.addEventListener('pointerdown', handleUserClick); // Use pointerdown for faster response than click

function resetLights() {
    lights.forEach(light => light.classList.remove('on'));
}

function startSequence() {
    gameState = 'SEQUENCE';
    startBtn.disabled = true;
    startBtn.textContent = "Focus...";
    resultText.textContent = "Wait for lights out...";
    resultTime.classList.add('hidden');
    clickArea.classList.remove('hidden'); // Enable clickable area
    resetLights();

    let currentLight = 0;
    
    function turnOnNextLight() {
        if (gameState !== 'SEQUENCE') return; // User jumped start

        if (currentLight < 5) {
            lights[currentLight].classList.add('on');
            currentLight++;
            gameTimeout = setTimeout(turnOnNextLight, 1000); // 1 sec between lights
        } else {
            // All lights are on, wait a random time (0.2s to 3s) before turning off
            gameState = 'WAITING';
            const randomDelay = Math.random() * 2800 + 200;
            gameTimeout = setTimeout(lightsOut, randomDelay);
        }
    }

    gameTimeout = setTimeout(turnOnNextLight, 1000);
}

function lightsOut() {
    if (gameState !== 'WAITING') return;
    resetLights();
    startTime = performance.now(); // High precision timestamp
    gameState = 'ACTIVE';
}

function handleUserClick(e) {
    if (gameState === 'IDLE' || gameState === 'FINISHED') return;
    
    // Prevent zoom/scroll on mobile tap
    e.preventDefault();

    if (gameState === 'SEQUENCE' || gameState === 'WAITING') {
        // Jump start (False start)
        clearTimeout(gameTimeout);
        gameState = 'FINISHED';
        resetLights();
        
        resultText.textContent = "JUMP START!";
        resultText.style.color = "var(--f1-red)";
        
        endGame();
        return;
    }

    if (gameState === 'ACTIVE') {
        // Valid reaction
        const endTime = performance.now();
        const reactionTimeMs = endTime - startTime;
        const reactionTimeSec = (reactionTimeMs / 1000).toFixed(3);
        
        gameState = 'FINISHED';
        
        resultText.textContent = getReactionMessage(reactionTimeMs);
        resultText.style.color = "var(--text-primary)";
        
        timeValue.textContent = reactionTimeSec;
        resultTime.classList.remove('hidden');

        // Update best time
        if (reactionTimeSec < bestTime) {
            bestTime = reactionTimeSec;
            bestTimeSpan.textContent = bestTime;
            bestTimeSpan.style.color = "#00ff00"; // Green for new best
            setTimeout(() => bestTimeSpan.style.color = "", 1000);
        }

        endGame();
    }
}

function getReactionMessage(ms) {
    if (ms < 150) return "UNBELIEVABLE! 🏎️💨";
    if (ms < 250) return "Great Start! 🟢";
    if (ms < 350) return "Solid Reaction! 👍";
    return "A bit slow off the line... 🐢";
}

function endGame() {
    startBtn.disabled = false;
    startBtn.textContent = "Try Again";
    clickArea.classList.add('hidden'); // Disable full-screen click
}
