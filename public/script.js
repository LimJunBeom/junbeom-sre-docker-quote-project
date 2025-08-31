// API base URL
const API_BASE_URL = 'http://localhost:3001';

// DOM elements
const statusIndicator = document.getElementById('statusIndicator');
const statusText = document.getElementById('statusText');
const quoteText = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');
const generateBtn = document.getElementById('generateBtn');
const responseSection = document.getElementById('responseSection');
const responseData = document.getElementById('responseData');

// Initialize the page
document.addEventListener('DOMContentLoaded', function () {
    checkApiStatus();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    generateBtn.addEventListener('click', generateQuote);
}

// Check API health status
async function checkApiStatus() {
    try {
        const response = await fetch(`${API_BASE_URL}/health`);
        const data = await response.json();

        if (response.ok && data.status === 'ok') {
            statusIndicator.classList.add('online');
            statusText.textContent = 'API Online';
        } else {
            throw new Error('API not responding correctly');
        }
    } catch (error) {
        console.error('API Status Check Error:', error);
        statusIndicator.classList.remove('online');
        statusText.textContent = 'API Offline';
    }
}

// Generate a random quote
async function generateQuote() {
    if (generateBtn.classList.contains('loading')) return;

    // Show loading state
    generateBtn.classList.add('loading');
    generateBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Loading...';

    try {
        const response = await fetch(`${API_BASE_URL}/quote`);
        const data = await response.json();

        if (response.ok && data.quote) {
            displayQuote(data.quote);
        } else {
            throw new Error('Failed to fetch quote');
        }
    } catch (error) {
        console.error('Quote Generation Error:', error);
        quoteText.textContent = 'Failed to load quote. Please try again.';
        quoteAuthor.textContent = '';
    } finally {
        // Reset button state
        generateBtn.classList.remove('loading');
        generateBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Generate Quote';
    }
}

// Display quote with author extraction
function displayQuote(quoteString) {
    // Split quote and author (format: "Quote text – Author Name")
    const parts = quoteString.split(' – ');

    if (parts.length === 2) {
        quoteText.textContent = parts[0];
        quoteAuthor.textContent = `— ${parts[1]}`;
    } else {
        quoteText.textContent = quoteString;
        quoteAuthor.textContent = '';
    }

    // Add animation effect
    const quoteCard = document.getElementById('quoteCard');
    quoteCard.style.transform = 'scale(1.02)';
    setTimeout(() => {
        quoteCard.style.transform = 'scale(1)';
    }, 200);
}

// Test API endpoints
async function testEndpoint(endpoint) {
    const button = event.target.closest('.test-btn');
    const originalText = button.innerHTML;

    // Show loading state
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Testing...';
    button.disabled = true;

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        const data = await response.json();

        // Display response
        showResponse(endpoint, response.status, data);

        // Show success feedback
        button.innerHTML = '<i class="fas fa-check"></i> Success!';
        button.style.background = '#51cf66';

    } catch (error) {
        console.error(`Error testing ${endpoint}:`, error);

        // Show error feedback
        button.innerHTML = '<i class="fas fa-times"></i> Error';
        button.style.background = '#ff6b6b';

        showResponse(endpoint, 'Error', { error: error.message });
    }

    // Reset button after 2 seconds
    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.background = '';
        button.disabled = false;
    }, 2000);
}

// Show API response
function showResponse(endpoint, status, data) {
    responseSection.style.display = 'block';

    const responseInfo = {
        endpoint: endpoint,
        status: status,
        timestamp: new Date().toISOString(),
        data: data
    };

    responseData.textContent = JSON.stringify(responseInfo, null, 2);

    // Scroll to response section
    responseSection.scrollIntoView({ behavior: 'smooth' });
}

// Auto-refresh API status every 30 seconds
setInterval(checkApiStatus, 30000);

// Add some interactive effects
document.addEventListener('mousemove', function (e) {
    const cards = document.querySelectorAll('.quote-card, .endpoint-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
});

// Reset card transforms when mouse leaves
document.addEventListener('mouseleave', function () {
    const cards = document.querySelectorAll('.quote-card, .endpoint-card');
    cards.forEach(card => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
});
