import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  // Set CORS headers for cross-origin or local dev setups
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS requests (preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    try {
      const dbUrl = process.env.DATABASE_URL;
      if (!dbUrl) {
        return res.status(500).json({ error: 'DATABASE_URL environment variable is missing' });
      }
      const sql = neon(dbUrl);

      // Create table if it doesn't exist
      await sql`
        CREATE TABLE IF NOT EXISTS rsvps (
          id SERIAL PRIMARY KEY,
          member_id VARCHAR(100) NOT NULL,
          member_name VARCHAR(100) NOT NULL,
          attending VARCHAR(10) NOT NULL,
          message TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `;

      const rows = await sql`
        SELECT member_id, attending FROM rsvps
      `;
      return res.status(200).json(rows);
    } catch (error) {
      console.error('Database connection or execution error on GET:', error);
      return res.status(500).json({ error: error.message || 'Failed to fetch RSVPs' });
    }
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { memberId, memberName, attending, message } = req.body;

    if (!memberId || !memberName || !attending) {
      return res.status(400).json({ error: 'Missing required fields (memberId, memberName, attending)' });
    }

    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      return res.status(500).json({ error: 'DATABASE_URL environment variable is missing' });
    }

    const sql = neon(dbUrl);

    // Create table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS rsvps (
        id SERIAL PRIMARY KEY,
        member_id VARCHAR(100) NOT NULL,
        member_name VARCHAR(100) NOT NULL,
        attending VARCHAR(10) NOT NULL,
        message TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Check if the member has already RSVP'd
    const existing = await sql`
      SELECT id FROM rsvps WHERE member_id = ${memberId} ORDER BY id ASC
    `;

    if (existing.length > 0) {
      // Update the RSVP
      await sql`
        UPDATE rsvps 
        SET attending = ${attending}, 
            message = ${message || ''}, 
            created_at = CURRENT_TIMESTAMP
        WHERE member_id = ${memberId}
      `;

      // If there are duplicate rows, clean them up by keeping only the first one
      if (existing.length > 1) {
        const keepId = existing[0].id;
        await sql`
          DELETE FROM rsvps 
          WHERE member_id = ${memberId} AND id != ${keepId}
        `;
      }
    } else {
      // Insert new RSVP
      await sql`
        INSERT INTO rsvps (member_id, member_name, attending, message)
        VALUES (${memberId}, ${memberName}, ${attending}, ${message || ''})
      `;
    }

    return res.status(200).json({ success: true, message: 'RSVP saved successfully!' });
  } catch (error) {
    console.error('Database connection or execution error:', error);
    return res.status(500).json({ error: error.message || 'Failed to save RSVP to the database' });
  }
}
