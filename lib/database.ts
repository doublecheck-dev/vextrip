import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  lastLogin?: Date;
  provider?: 'email' | 'google' | 'facebook' | 'tiktok' | 'instagram';
}

interface vextripDB extends DBSchema {
  users: {
    key: number;
    value: User;
    indexes: { 'by-email': string };
  };
  sessions: {
    key: string;
    value: {
      userId: number;
      createdAt: Date;
      expiresAt: Date;
    };
  };
}

let dbPromise: Promise<IDBPDatabase<vextripDB>>;

export const initDB = () => {
  if (!dbPromise) {
    dbPromise = openDB<vextripDB>('vextripDB', 1, {
      upgrade(db) {
        // Users table
        const userStore = db.createObjectStore('users', {
          keyPath: 'id',
          autoIncrement: true,
        });
        userStore.createIndex('by-email', 'email', { unique: true });

        // Sessions table - create without keyPath to allow custom keys
        const sessionStore = db.createObjectStore('sessions');
        console.log('Database initialized with users and sessions stores');
      },
    });
  }
  return dbPromise;
};

export const getDB = async () => {
  try {
    const db = await initDB();
    console.log('Database connection successful');
    return db;
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
};

export type { User };
