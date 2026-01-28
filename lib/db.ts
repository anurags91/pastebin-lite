/**
 * Database connection and schema management for Vercel Postgres
 */

import { sql } from '@vercel/postgres';

/**
 * Paste data structure
 */
export interface Paste {
  id: string;
  content: string;
  created_at: Date;
  expires_at: Date | null;
  max_views: number | null;
  remaining_views: number | null;
}

/**
 * Initialize database schema
 * This runs automatically on first connection
 */
export async function initDatabase(): Promise<void> {
  try {
    // Create pastes table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS pastes (
        id VARCHAR(12) PRIMARY KEY,
        content TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        expires_at TIMESTAMPTZ,
        max_views INTEGER,
        remaining_views INTEGER,
        CHECK (max_views IS NULL OR max_views >= 1),
        CHECK (remaining_views IS NULL OR remaining_views >= 0)
      )
    `;

    // Create index for faster expiry checks
    await sql`
      CREATE INDEX IF NOT EXISTS idx_expires_at ON pastes(expires_at)
      WHERE expires_at IS NOT NULL
    `;

    console.log('✅ Database schema initialized');
  } catch (error) {
    console.error('❌ Database initialization error:', error);
    throw error;
  }
}

/**
 * Create a new paste
 */
export async function createPaste(
  id: string,
  content: string,
  expiresAt: Date | null,
  maxViews: number | null
): Promise<Paste> {
  const remainingViews = maxViews;
  
  const result = await sql<Paste>`
    INSERT INTO pastes (id, content, expires_at, max_views, remaining_views)
    VALUES (${id}, ${content}, ${expiresAt}, ${maxViews}, ${remainingViews})
    RETURNING *
  `;

  return result.rows[0];
}

/**
 * Get a paste by ID
 * Returns null if not found
 */
export async function getPaste(id: string): Promise<Paste | null> {
  const result = await sql<Paste>`
    SELECT * FROM pastes
    WHERE id = ${id}
  `;

  return result.rows.length > 0 ? result.rows[0] : null;
}

/**
 * Decrement remaining views atomically
 * Returns the updated paste or null if operation failed
 */
export async function decrementViews(id: string): Promise<Paste | null> {
  const result = await sql<Paste>`
    UPDATE pastes
    SET remaining_views = remaining_views - 1
    WHERE id = ${id}
      AND remaining_views IS NOT NULL
      AND remaining_views > 0
    RETURNING *
  `;

  return result.rows.length > 0 ? result.rows[0] : null;
}

/**
 * Delete a paste (for cleanup)
 */
export async function deletePaste(id: string): Promise<void> {
  await sql`
    DELETE FROM pastes
    WHERE id = ${id}
  `;
}

/**
 * Check database health
 */
export async function checkDatabaseHealth(): Promise<boolean> {
  try {
    await sql`SELECT 1`;
    return true;
  } catch {
    return false;
  }
}
