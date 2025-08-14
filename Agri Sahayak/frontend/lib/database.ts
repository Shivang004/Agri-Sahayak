// File: lib/database.ts

import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import bcrypt from 'bcrypt';

// This variable will hold our database connection.
let db: Database | null = null;

/**
 * This function connects to the SQLite database, creates the 'users' table 
 * if it doesn't exist, and adds a default admin user for the first run.
 */
export async function getDb() {
  // If the connection already exists, return it to avoid re-opening it.
  if (db) {
    return db;
  }

  // Open a connection to the database file.
  // The file will be created if it doesn't exist.
  const newDb = await open({
    filename: './agri-sahayak.sqlite', // This file will be created in your project's root folder.
    driver: sqlite3.Database,
  });

  // Create the 'users' table if it's not already there.
  // 'UNIQUE' ensures that no two users can have the same username.
  await newDb.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      passwordHash TEXT
    )
  `);

  // For convenience, let's add a default admin user if the table is empty.
  const userCount = await newDb.get('SELECT COUNT(*) as count FROM users');
  if (userCount.count === 0) {
    const saltRounds = 10;
    const adminPasswordHash = await bcrypt.hash('password', saltRounds);
    await newDb.run('INSERT INTO users (username, passwordHash) VALUES (?, ?)', 'admin', adminPasswordHash);
    console.log('Default admin user created with password "password"');
  }

  db = newDb;
  return db;
}