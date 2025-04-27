// Waste types data
const wasteTypes = {
    'Household': {
        description: 'Household waste includes everyday items like paper, plastic, and general trash.',
        points: 10,
        items: [
            'Paper and cardboard',
            'Plastic containers',
            'Glass bottles',
            'Metal cans',
            'Mixed waste',
            'Textiles',
            'Small electronics'
        ]
    },
    'Factory Waste': {
        description: 'Industrial waste from manufacturing processes.',
        points: 15,
        items: [
            'Industrial packaging',
            'Production scraps',
            'Chemical containers',
            'Metal waste',
            'Plastic waste',
            'Wood waste',
            'Construction materials'
        ]
    },
    'Food Waste': {
        description: 'Organic waste from food preparation and consumption.',
        points: 5,
        items: [
            'Fruit and vegetable scraps',
            'Leftover food',
            'Coffee grounds',
            'Tea bags',
            'Eggshells',
            'Bread and grains',
            'Dairy products'
        ]
    },
    'Medic Waste': {
        description: 'Medical and pharmaceutical waste that requires special handling.',
        points: 20,
        items: [
            'Expired medicines',
            'Used bandages',
            'Medical gloves',
            'Syringes (in proper containers)',
            'Medical packaging',
            'First aid waste',
            'Medical equipment waste'
        ]
    },
    'Recyclable': {
        description: 'Materials that can be recycled like paper, plastic, glass, and metal.',
        points: 12,
        items: [
            'Clean paper',
            'Cardboard boxes',
            'Plastic bottles',
            'Glass bottles',
            'Aluminum cans',
            'Steel cans',
            'Clean plastic packaging'
        ]
    },
    'Electronic': {
        description: 'Electronic waste including old devices and components.',
        points: 25,
        items: [
            'Old phones',
            'Computers and laptops',
            'TVs and monitors',
            'Batteries',
            'Chargers and cables',
            'Small appliances',
            'Electronic components'
        ]
    }
};

// Dummy drop-off points data
const dropOffPoints = [
    { id: 1, name: 'WasteGO Center 1', lat: -6.2088, lng: 106.8456, status: 'Available' },
    { id: 2, name: 'WasteGO Center 2', lat: -6.2089, lng: 106.8457, status: 'Full' },
    { id: 3, name: 'WasteGO Center 3', lat: -6.2090, lng: 106.8458, status: 'Available' }
];

// Dummy history data
let depositHistory = [
    { date: '2024-03-15', type: 'Recyclable', weight: 2.5, points: 30 },
    { date: '2024-03-14', type: 'Food Waste', weight: 1.8, points: 9 },
    { date: '2024-03-13', type: 'Electronic', weight: 0.5, points: 12 }
];

// Dummy achievements data
const achievements = [
    { id: 1, name: 'First Deposit', description: 'Make your first waste deposit', progress: 100, completed: true },
    { id: 2, name: 'Recycling Master', description: 'Deposit 100kg of recyclable waste', progress: 45, completed: false },
    { id: 3, name: 'Eco Warrior', description: 'Earn 1000 points', progress: 75, completed: false }
];

// Initialize map
function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -6.2088, lng: 106.8456 },
        zoom: 13
    });

    // Add markers for drop-off points
    dropOffPoints.forEach(point => {
        const marker = new google.maps.Marker({
            position: { lat: point.lat, lng: point.lng },
            map: map,
            title: point.name
        });

        const infoWindow = new google.maps.InfoWindow({
            content: `<div><h3>${point.name}</h3><p>Status: ${point.status}</p></div>`
        });

        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });
    });
}

// Show waste type modal
function showWasteTypeModal(type) {
    const modal = document.getElementById('wasteTypeModal');
    const modalContent = document.getElementById('wasteTypeContent');
    const wasteInfo = wasteTypes[type];

    modalContent.innerHTML = `
        <h2>${type}</h2>
        <p>${wasteInfo.description}</p>
        <p>Points per kg: ${wasteInfo.points}</p>
        <h3>Accepted Items:</h3>
        <ul>
            ${wasteInfo.items.map(item => `<li>${item}</li>`).join('')}
        </ul>
    `;

    modal.style.display = 'block';
}

// Show deposit history
function showHistory() {
    const historyContainer = document.getElementById('historyContainer');
    historyContainer.innerHTML = '';

    depositHistory.forEach(deposit => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <div class="history-date">${deposit.date}</div>
            <div class="history-details">
                <span>${deposit.type} - ${deposit.weight}kg</span>
                <span>${deposit.points} points</span>
            </div>
        `;
        historyContainer.appendChild(historyItem);
    });
}

// Show achievements
function showAchievements() {
    const achievementsContainer = document.getElementById('achievementsContainer');
    achievementsContainer.innerHTML = '';

    achievements.forEach(achievement => {
        const achievementItem = document.createElement('div');
        achievementItem.className = 'achievement-item';
        achievementItem.innerHTML = `
            <h3>${achievement.name}</h3>
            <p>${achievement.description}</p>
            <div class="achievement-progress">
                <div class="achievement-progress-bar" style="width: ${achievement.progress}%"></div>
            </div>
            <p>Progress: ${achievement.progress}%</p>
        `;
        achievementsContainer.appendChild(achievementItem);
    });
}

// Handle QR code scanning
function handleQRScan() {
    // This would typically use a QR code scanning library
    // For demo purposes, we'll simulate a scan
    const scannedData = {
        locationId: 1,
        wasteType: 'Recyclable',
        weight: 2.5
    };

    // Add to history
    const newDeposit = {
        date: new Date().toISOString().split('T')[0],
        type: scannedData.wasteType,
        weight: scannedData.weight,
        points: scannedData.weight * wasteTypes[scannedData.wasteType].points
    };

    depositHistory.unshift(newDeposit);
    showHistory();
}

// Handle report submission
function submitReport() {
    const locationId = document.getElementById('reportLocation').value;
    const issue = document.getElementById('reportIssue').value;

    // In a real app, this would send the report to a server
    alert(`Report submitted for location ${locationId}: ${issue}`);
}

// Close modal function
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    // Add event listeners
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', () => {
            const wasteType = item.querySelector('.menu-text').textContent;
            showWasteTypeModal(wasteType);
        });
    });

    // Initialize map when the page loads
    if (document.getElementById('map')) {
        initMap();
    }

    // Show initial history
    if (document.getElementById('historyContainer')) {
        showHistory();
    }

    // Show initial achievements
    if (document.getElementById('achievementsContainer')) {
        showAchievements();
    }
}); 