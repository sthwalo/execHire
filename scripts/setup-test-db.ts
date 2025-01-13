import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function setupTestDatabase() {
  try {
    // Drop test database if it exists
    try {
      await execAsync('PGPASSWORD=Exec10Luxury dropdb -U sthwalonyoni execuhire_test --if-exists');
    } catch (error) {
      console.log('Database does not exist, proceeding with creation');
    }

    // Create test database
    await execAsync('PGPASSWORD=Exec10Luxury createdb -U sthwalonyoni execuhire_test');

    // Run migrations
    process.env.DATABASE_URL = 'postgresql://sthwalonyoni:Exec10Luxury@localhost:5432/execuhire_test';
    await execAsync('npx prisma migrate deploy');

    console.log('Test database setup completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error setting up test database:', error);
    process.exit(1);
  }
}

setupTestDatabase();
