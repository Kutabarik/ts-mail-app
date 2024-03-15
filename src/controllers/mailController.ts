import { Request, Response } from "express";
import pool from '../database/db';
import { io } from '../app';

const createMail = async (req: Request, res: Response) => {
    try {
        const { recipientId, subject, body } = req.body;

        const user = await pool.query("SELECT * FROM users WHERE id = $1", [recipientId]);

        if (user.rows.length > 0) {
            await pool.query("INSERT INTO emails (user_id, subject, body) VALUES ($1, $2, $3)", [recipientId, subject, body]);

            io.emit(`user-mail-${recipientId}`, { message: "У вас новое письмо!" });

            res.status(200).json({ message: "Mail was sent successfully" });
        } else {
            return res.status(400).json({ error: "User not found" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error' });
    }
};


const getAll = async (req: Request, res: Response) => {
    try {
        const emails = await pool.query("SELECT * FROM emails");

        res.status(200).json(emails.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error' });
    }
};

const editMail = async (req: Request, res: Response) => {
    try {
        const { mailId, subject, body } = req.body;

        const existingMail = await pool.query("SELECT * FROM emails WHERE id = $1", [mailId]);

        if (existingMail.rows.length === 0) {
            return res.status(404).json({ error: "Mail not found" });
        }

        await pool.query("UPDATE emails SET subject = $1, body = $2 WHERE id = $3", [subject, body, mailId]);

        res.status(200).json({ message: "Mail was succssfully edited" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Editing mail error' });
    }
};

const deleteMail = async (req: Request, res: Response) => {
    try {
        const { mailId } = req.body;

        const existingMail = await pool.query("SELECT * FROM emails WHERE id = $1", [mailId]);

        if (existingMail.rows.length === 0) {
            return res.status(404).json({ error: "Mail not found" });
        }

        await pool.query("DELETE FROM emails WHERE id = $1", [mailId]);

        res.status(200).json({ message: "Mail was succssfully deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Deleting mail error' });
    }
};

export { createMail, getAll, editMail, deleteMail };