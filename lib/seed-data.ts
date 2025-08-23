import { AuthService } from './auth';
import { initDB } from './database';

export const seedTestUsers = async () => {
  try {
    // Initialize database first
    await initDB();
    
    const testUsers = [
      {
        name: "María González",
        email: "maria.gonzalez@email.com",
        password: "password123",
        provider: "email" as const
      },
      {
        name: "Juan Pérez",
        email: "juan.perez@email.com",
        password: "password123",
        provider: "email" as const
      },
      {
        name: "Ana Rodríguez",
        email: "ana.rodriguez@email.com",
        password: "password123",
        provider: "google" as const
      },
      {
        name: "Carlos López",
        email: "carlos.lopez@email.com",
        password: "password123",
        provider: "facebook" as const
      },
      {
        name: "Sofia Martín",
        email: "sofia.martin@email.com",
        password: "password123",
        provider: "instagram" as const
      }
    ];

    console.log('🌱 Starting to seed test users...');
    
    let createdCount = 0;
    let existingCount = 0;

    for (const userData of testUsers) {
      try {
        const existingUser = await AuthService.getUserByEmail(userData.email);
        
        if (!existingUser) {
          const result = await AuthService.registerUser(userData);
          if (result.success) {
            console.log(`✅ Created user: ${userData.name} (${userData.email}) - Provider: ${userData.provider}`);
            createdCount++;
          } else {
            console.log(`❌ Failed to create user: ${userData.name} - ${result.error}`);
          }
        } else {
          console.log(`ℹ️ User already exists: ${userData.name} (${userData.email})`);
          existingCount++;
        }
      } catch (error) {
        console.error(`❌ Error processing user ${userData.name}:`, error);
      }
    }

    console.log(`\n📊 Seeding Summary:`);
    console.log(`   ✅ Created: ${createdCount} users`);
    console.log(`   ℹ️ Already existed: ${existingCount} users`);
    console.log(`   📝 Total processed: ${testUsers.length} users\n`);

    // Log all users after seeding
    await logAllUsers();
    
    return { success: true, created: createdCount, existing: existingCount };
    
  } catch (error) {
    console.error('❌ Error seeding test users:', error);
    return { success: false, error };
  }
};

export const logAllUsers = async () => {
  try {
    const allUsers = await AuthService.getAllUsers();
    
    console.log('\n🗄️ ALL REGISTERED USERS IN DATABASE:');
    console.log('==========================================');
    
    if (allUsers.length === 0) {
      console.log('📭 No users found in database');
    } else {
      allUsers.forEach((user, index) => {
        console.log(`\n👤 User ${index + 1}:`);
        console.log(`   🆔 ID: ${user.id}`);
        console.log(`   👤 Name: ${user.name}`);
        console.log(`   📧 Email: ${user.email}`);
        console.log(`   🔐 Provider: ${user.provider}`);
        console.log(`   📅 Created: ${new Date(user.createdAt).toLocaleDateString()}`);
        console.log(`   🕐 Last Login: ${user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}`);
        console.log('   ─────────────────────────');
      });
      
      console.log(`\n📊 Total users registered: ${allUsers.length}`);
      
      // Group by provider
      const byProvider = allUsers.reduce((acc, user) => {
        acc[user.provider || 'unknown'] = (acc[user.provider || 'unknown'] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      console.log('\n📈 Users by Provider:');
      Object.entries(byProvider).forEach(([provider, count]) => {
        const emoji = {
          email: '📧',
          google: '🔍',
          facebook: '📘',
          instagram: '📸',
          tiktok: '🎵'
        }[provider] || '❓';
        console.log(`   ${emoji} ${provider}: ${count} user(s)`);
      });
    }
    
    console.log('==========================================\n');
    return allUsers;
  } catch (error) {
    console.error('❌ Error fetching users:', error);
    return [];
  }
};

// Export function to be accessible from window object for manual testing
export const exposeToWindow = () => {
  if (typeof window !== 'undefined') {
    (window as any).seedTestUsers = seedTestUsers;
    (window as any).logvextripUsers = logAllUsers;
  }
};
