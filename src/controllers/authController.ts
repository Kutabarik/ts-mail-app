import { Request, Response } from "express";
import pool from '../database/db';
import bcrypt from "bcrypt";

const registerUser = async (req: Request, res: Response) => {
	const { username, email, password } = req.body;

	try {
		const emailExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
		if (emailExists.rows.length > 0) {
			return res.status(400).json({ error: "Email is already registered" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		await pool.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3)", [username, email, hashedPassword]);

		res.status(201).json({ message: "User registered successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Error" });
	}
};

const authenticateUser = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	try {
		const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

		if (result.rows.length === 0) {
			return res.status(401).json({ error: 'Authentication failed' });
		}

		const user = result.rows[0];

		const passwordMatch = await bcrypt.compare(password, user.password);

		if (passwordMatch) {
			return res.status(200).json({ message: 'Authentication successful' });
		} else {
			return res.status(401).json({ error: 'Authentication failed' });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

export { registerUser, authenticateUser };