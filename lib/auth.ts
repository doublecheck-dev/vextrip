import { getDB, User } from './database';
import bcrypt from 'bcryptjs';

export class AuthService {
  static async hashPassword(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(10);
      return bcrypt.hash(password, salt);
    } catch (error) {
      console.error('Error hashing password:', error);
      // Fallback to simple encoding for demo purposes
      return btoa(password + 'salt');
    }
  }

  static async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    try {
      // Try bcrypt first
      return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
      console.log('Bcrypt verification failed, trying fallback method');
      // Fallback for demo purposes
      return btoa(password + 'salt') === hashedPassword;
    }
  }

  static async registerUser(userData: {
    name: string;
    email: string;
    password: string;
    provider?: 'email' | 'google' | 'facebook' | 'tiktok' | 'instagram';
  }): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      // Initialize database connection
      const db = await getDB();
      
      // Check if user already exists
      const existingUser = await this.getUserByEmail(userData.email);
      if (existingUser) {
        return { success: false, error: 'El usuario ya existe con este email' };
      }

      // Hash password with error handling
      let hashedPassword: string;
      try {
        hashedPassword = await this.hashPassword(userData.password);
      } catch (error) {
        console.error('Password hashing failed:', error);
        return { success: false, error: 'Error al procesar la contraseña' };
      }

      // Create user object
      const newUser: User = {
        name: userData.name.trim(),
        email: userData.email.toLowerCase().trim(),
        password: hashedPassword,
        createdAt: new Date(),
        provider: userData.provider || 'email',
      };

      // Save to database with retry logic
      try {
        const userId = await db.add('users', newUser);
        const savedUser = await db.get('users', userId);
        
        if (!savedUser) {
          throw new Error('Failed to retrieve saved user');
        }

        console.log('User successfully registered:', savedUser.email);
        return { success: true, user: savedUser };
      } catch (dbError) {
        console.error('Database operation failed:', dbError);
        return { success: false, error: 'Error al guardar en la base de datos' };
      }

    } catch (error) {
      console.error('Error registering user:', error);
      return { success: false, error: 'Error de conexión al registrar usuario' };
    }
  }

  static async loginUser(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      // Validate input
      if (!email || !password) {
        return { success: false, error: 'Email y contraseña son requeridos' };
      }

      const user = await this.getUserByEmail(email.trim());
      if (!user) {
        return { success: false, error: 'Usuario no encontrado' };
      }

      // Verify password with error handling
      let isValidPassword: boolean;
      try {
        isValidPassword = await this.verifyPassword(password, user.password);
      } catch (error) {
        console.error('Password verification failed:', error);
        return { success: false, error: 'Error al verificar la contraseña' };
      }

      if (!isValidPassword) {
        return { success: false, error: 'Contraseña incorrecta' };
      }

      // Update last login
      try {
        await this.updateLastLogin(user.id!);
      } catch (error) {
        console.warn('Failed to update last login:', error);
        // Don't fail login for this
      }

      console.log('User successfully logged in:', user.email);
      return { success: true, user };
    } catch (error) {
      console.error('Error logging in user:', error);
      return { success: false, error: 'Error de conexión al iniciar sesión' };
    }
  }

  static async getUserByEmail(email: string): Promise<User | undefined> {
    try {
      const db = await getDB();
      const result = await db.getFromIndex('users', 'by-email', email.toLowerCase().trim());
      return result;
    } catch (error) {
      console.error('Error getting user by email:', error);
      return undefined;
    }
  }

  static async updateLastLogin(userId: number): Promise<void> {
    try {
      const db = await getDB();
      const user = await db.get('users', userId);
      if (user) {
        user.lastLogin = new Date();
        await db.put('users', user);
      }
    } catch (error) {
      console.error('Error updating last login:', error);
    }
  }

  static async createSession(userId: number): Promise<string> {
    try {
      console.log('Creating session for user ID:', userId);
      const db = await getDB();
      const sessionId = this.generateSessionId();
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

      const sessionData = {
        userId,
        createdAt: new Date(),
        expiresAt,
      };

      console.log('Session data to store:', sessionData);

      // Fix: Use the correct IndexedDB put syntax
      await db.put('sessions', sessionData, sessionId);

      console.log('Session created successfully for user:', userId, 'with session ID:', sessionId);
      return sessionId;
    } catch (error) {
      console.error('Detailed error creating session:', error);
      
      // Try alternative approach if the first one fails
      try {
        console.log('Attempting alternative session creation...');
        const db = await getDB();
        const sessionId = this.generateSessionId();
        const sessionData = {
          sessionId,
          userId,
          createdAt: new Date(),
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        };
        
        // Use transaction for more reliable operation
        const tx = db.transaction(['sessions'], 'readwrite');
        await tx.objectStore('sessions').put(sessionData, sessionId);
        await tx.done;
        
        console.log('Alternative session creation successful:', sessionId);
        return sessionId;
      } catch (altError) {
        console.error('Alternative session creation also failed:', altError);
        throw new Error(`Failed to create session: ${error.message}`);
      }
    }
  }

  static async validateSession(sessionId: string): Promise<User | null> {
    try {
      if (!sessionId) {
        console.log('No session ID provided');
        return null;
      }

      console.log('Validating session:', sessionId);
      const db = await getDB();
      
      // Try to get session with error handling
      let session;
      try {
        session = await db.get('sessions', sessionId);
      } catch (getError) {
        console.error('Error getting session from database:', getError);
        return null;
      }
      
      if (!session) {
        console.log('Session not found:', sessionId);
        return null;
      }

      console.log('Session found:', session);

      // Check if session has expired
      const now = new Date();
      const expiresAt = new Date(session.expiresAt);
      
      if (expiresAt < now) {
        console.log('Session expired:', sessionId, 'Expired at:', expiresAt, 'Current time:', now);
        // Clean up expired session
        try {
          await db.delete('sessions', sessionId);
        } catch (deleteError) {
          console.warn('Failed to delete expired session:', deleteError);
        }
        return null;
      }

      const user = await db.get('users', session.userId);
      console.log('User found for session:', user ? user.email : 'null');
      return user || null;
    } catch (error) {
      console.error('Error validating session:', error);
      return null;
    }
  }

  static async logout(sessionId: string): Promise<void> {
    try {
      console.log('Logging out session:', sessionId);
      const db = await getDB();
      await db.delete('sessions', sessionId);
      console.log('Session deleted successfully');
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  }

  private static generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  static async getAllUsers(): Promise<User[]> {
    try {
      const db = await getDB();
      const users = await db.getAll('users');
      return users || [];
    } catch (error) {
      console.error('Error getting all users:', error);
      return [];
    }
  }
}
