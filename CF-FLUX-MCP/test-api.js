// Simple API test script
console.log('Starting Flux API test...');

// API constants
const FLUX_TOKEN = 'Hsue8p20snchw734ambncMD';
const WORKER_URL = 'https://flux.aipeipei.net';

// Test function
async function testFluxAPI() {
  console.log(`Testing API call to ${WORKER_URL}`);
  
  try {
    // Prepare request data
    const requestData = {
      prompt: 'mountain river forest', // 使用英文测试
      steps: 5
    };
    
    console.log('Request data:', JSON.stringify(requestData, null, 2));
    
    // Make API call
    const response = await fetch(WORKER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${FLUX_TOKEN}`
      },
      body: JSON.stringify(requestData)
    });
    
    console.log(`Response status: ${response.status} ${response.statusText}`);
    
    // Get response text for debugging
    const responseText = await response.text();
    console.log('Response text:', responseText);
    
    if (!response.ok) {
      console.log(`API error: ${response.status} - ${responseText}`);
      return;
    }
    
    // Try to parse JSON
    try {
      const data = JSON.parse(responseText);
      console.log('Successfully parsed response as JSON');
      console.log('Response data:', data);
    } catch (err) {
      console.log('Failed to parse response as JSON:', err.message);
    }
    
  } catch (error) {
    console.log('Error calling API:', error.message);
  }
}

// Run test
testFluxAPI().then(() => {
  console.log('API test complete');
}); 