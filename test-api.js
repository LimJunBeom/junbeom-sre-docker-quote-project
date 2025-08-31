const http = require('http');

// Test health endpoint
function testHealth() {
    const options = {
        hostname: 'localhost',
        port: 3001,
        path: '/health',
        method: 'GET'
    };

    const req = http.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            console.log('Health Test:', JSON.parse(data));
        });
    });

    req.on('error', (err) => {
        console.error('Health Test Error:', err.message);
    });

    req.end();
}

// Test quote endpoint
function testQuote() {
    const options = {
        hostname: 'localhost',
        port: 3001,
        path: '/quote',
        method: 'GET'
    };

    const req = http.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            console.log('Quote Test:', JSON.parse(data));
        });
    });

    req.on('error', (err) => {
        console.error('Quote Test Error:', err.message);
    });

    req.end();
}

// Run tests
console.log('Testing Quote Generator API...\n');
testHealth();
setTimeout(testQuote, 1000);
