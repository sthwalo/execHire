import fetch from 'node-fetch';

async function testVehicleAPI() {
  const baseUrl = 'http://localhost:3000/api';
  const vehicleId = 'your-test-vehicle-id'; // Replace with a valid vehicle ID

  try {
    // Test GET endpoint
    console.log('Testing GET /api/vehicles/[id]...');
    const getResponse = await fetch(`${baseUrl}/vehicles/${vehicleId}`);
    const getData = await getResponse.json();
    console.log('GET Response:', getData);

    // Test PUT endpoint
    console.log('\nTesting PUT /api/vehicles/[id]...');
    const updateData = {
      name: 'Updated Test Vehicle',
      price: 150000,
      pricePerDay: 500,
      category: 'LUXURY',
      available: true,
    };

    const putResponse = await fetch(`${baseUrl}/vehicles/${vehicleId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });
    const putData = await putResponse.json();
    console.log('PUT Response:', putData);

    // Test DELETE endpoint
    console.log('\nTesting DELETE /api/vehicles/[id]...');
    const deleteResponse = await fetch(`${baseUrl}/vehicles/${vehicleId}`, {
      method: 'DELETE',
    });
    const deleteData = await deleteResponse.json();
    console.log('DELETE Response:', deleteData);

  } catch (error) {
    console.error('Error testing vehicle API:', error);
  }
}

testVehicleAPI();
