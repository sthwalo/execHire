const axios = require('axios').default;

interface Vehicle {
  pricePerDay: number;
  id?: string;
  name: string;
  image: string;
  price: string;
  specs: string[];
  available?: boolean;
}

interface User {
  id?: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
}

interface Booking {
  id?: string;
  userId: string;
  vehicleId: string;
  startDate: string;
  endDate: string;
  status?: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  vehicle?: Vehicle;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

const BASE_URL = 'http://localhost:3002/api';

async function testVehiclesAPI() {
  console.log('\n--- Testing Vehicles API ---');
  
  // Test GET /vehicles
  try {
    console.log('\nTesting GET /vehicles');
    const response = await axios.get(`${BASE_URL}/vehicles`);
    console.log('Success! Found', response.data.length, 'vehicles');
    console.log('First vehicle:', response.data[0]);
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching vehicles:', error.response?.data || error.message);
    } else {
      console.error('Error fetching vehicles:', error);
    }
  }

  // Test POST /vehicles
  try {
    console.log('\nTesting POST /vehicles');
    const newVehicle = {
      name: "Test Vehicle",
      image: "/images/fleet/test.jpg",
      price: "R5,000/half-day",
      specs: ["Test Spec 1", "Test Spec 2"],
    };
    
    const response = await axios.post(`${BASE_URL}/vehicles`, newVehicle);
    console.log('Success! Created vehicle:', response.data);
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('Error creating vehicle:', error.response?.data || error.message);
    } else {
      console.error('Error creating vehicle:', error);
    }
  }
}

async function testUsersAPI() {
  console.log('\n--- Testing Users API ---');

  // Test POST /users
  try {
    console.log('\nTesting POST /users');
    const newUser = {
      name: "Test User",
      email: "test@example.com",
      role: "USER",
    };
    
    const response = await axios.post(`${BASE_URL}/users`, newUser);
    console.log('Success! Created user:', response.data);
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('Error creating user:', error.response?.data || error.message);
    } else {
      console.error('Error creating user:', error);
    }
    return null;
  }
}

async function testBookingsAPI(testUser: User | null) {
  console.log('\n--- Testing Bookings API ---');

  if (!testUser) {
    console.error('Cannot test bookings without a test user');
    return;
  }

  // Test GET /bookings
  try {
    console.log('\nTesting GET /bookings');
    const response = await axios.get(`${BASE_URL}/bookings`);
    console.log('Success! Found', response.data.length, 'bookings');
    if (response.data.length > 0) {
      console.log('First booking:', response.data[0]);
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching bookings:', error.response?.data || error.message);
    } else {
      console.error('Error fetching bookings:', error);
    }
  }

  // Test POST /bookings
  try {
    console.log('\nTesting POST /bookings');
    // First, get a vehicle ID
    const vehiclesResponse = await axios.get(`${BASE_URL}/vehicles`);
    
    if (vehiclesResponse.data.length > 0) {
      const booking = {
        userId: testUser.id,
        vehicleId: vehiclesResponse.data[0].id,
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 86400000).toISOString(), // 24 hours later
      };

      const response = await axios.post(`${BASE_URL}/bookings`, booking);
      console.log('Success! Created booking:', response.data);

      // Test PATCH /bookings (update status)
      if (response.data.id) {
        console.log('\nTesting PATCH /bookings');
        const updateResponse = await axios.patch(`${BASE_URL}/bookings`, {
          bookingId: response.data.id,
          status: 'CONFIRMED',
        });

        console.log('Success! Updated booking status:', updateResponse.data);
      }
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('Error testing bookings:', error.response?.data || error.message);
    } else {
      console.error('Error testing bookings:', error);
    }
  }
}

async function runTests() {
  try {
    await testVehiclesAPI();
    const testUser = await testUsersAPI();
    await testBookingsAPI(testUser);
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('Error running tests:', error.response?.data || error.message);
    } else {
      console.error('Error running tests:', error);
    }
  }
}

// Run the tests
runTests();
