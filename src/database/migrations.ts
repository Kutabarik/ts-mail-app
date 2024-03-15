import {migrate} from "postgres-migrations"
import pool from './db';

async function applyMigrations() {
    try {
        await migrate({ client: pool }, "src/database/migrations");
    } catch (error) {
        console.error("Migration error:", error);
    }
}

export default applyMigrations;