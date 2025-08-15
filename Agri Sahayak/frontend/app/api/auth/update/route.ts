import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/database';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  try {
    const { username, password, state, district } = await req.json();
    const db = await getDb();
    const user = await db.get('SELECT * FROM users WHERE username = ?', username);

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    if (password) {
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);
      await db.run('UPDATE users SET passwordHash = ?, state = ?, district = ? WHERE username = ?', passwordHash, state, district, username);
    } else {
      await db.run('UPDATE users SET state = ?, district = ? WHERE username = ?', state, district, username);
    }

    return NextResponse.json({ message: 'Profile updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Update Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}