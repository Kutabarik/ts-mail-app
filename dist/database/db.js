"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var pool = new pg_1.Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || "5432")
});
exports.default = pool;
//  CREATE TABLE IF NOT EXISTS users (
//         id SERIAL PRIMARY KEY,
//         username VARCHAR(255) NOT NULL,
//         email VARCHAR(255) NOT NULL,
//         password VARCHAR(255) NOT NULL
//       );
//       CREATE TABLE IF NOT EXISTS emails (
//         id SERIAL PRIMARY KEY,
//         user_id INTEGER REFERENCES users(id),
//         subject VARCHAR(255) NOT NULL,
//         body TEXT NOT NULL,
//         sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//         read_at TIMESTAMP NULL 
//       );
//# sourceMappingURL=db.js.map