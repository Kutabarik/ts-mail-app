import { Request, Response } from "express";
import pool from '../database/db';
import { io } from '../app';

/**
 * Creates a new email and sends it to the specified recipient.
 * 
 * @param req - The request object containing the recipientId, subject, and body of the email.
 * @param res - The response object used to send the HTTP response.
 * @returns A JSON response indicating the status of the email creation and sending process.
 */
const createMail = async (req: Request, res: Response) => {
    try {
        const { recipientId, subject, body } = req.body;

        const user = await pool.query("SELECT * FROM users WHERE id = $1", [recipientId]);

        if (user.rows.length > 0) {
            await pool.query("INSERT INTO emails (user_id, subject, body) VALUES ($1, $2, $3)", [recipientId, subject, body]);

            io.emit(`user-mail-${recipientId}`, { message: "У вас новое письмо!" });

            return res.status(200).json({ message: "Mail was sent successfully" });
        } else {
            return res.status(400).json({ error: "User not found" });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error' });
    }
};


/**
 * Retrieves all emails from the database.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<Response>} The response containing the retrieved emails.
 */
const getAll = async (req: Request, res: Response) => {
    try {
        const emails = await pool.query("SELECT * FROM emails");

        return res.status(200).json(emails.rows);
    } catch (error) {
        return res.status(500).json({ error: 'Error' });
    }
};

/**
 * Edit a mail by updating its subject and body.
 * @param req - The request object containing the mailId, subject, and body.
 * @param res - The response object to send the result.
 * @returns A JSON response indicating the success or failure of the operation.
 */
const editMail = async (req: Request, res: Response) => {
    try {
        const { mailId, subject, body } = req.body;

        const existingMail = await pool.query("SELECT * FROM emails WHERE id = $1", [mailId]);

        if (existingMail.rows.length === 0) {
            return res.status(404).json({ error: "Mail not found" });
        }

        await pool.query("UPDATE emails SET subject = $1, body = $2 WHERE id = $3", [subject, body, mailId]);

        return res.status(200).json({ message: "Mail was succssfully edited" });
    } catch (error) {
        return res.status(500).json({ error: 'Editing mail error' });
    }
};

/**
 * Deletes a mail from the database.
 * 
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<Response>} The response containing the result of the deletion.
 */
const deleteMail = async (req: Request, res: Response) => {
    try {
        const { mailId } = req.body;

        const existingMail = await pool.query("SELECT * FROM emails WHERE id = $1", [mailId]);

        if (existingMail.rows.length === 0) {
            return res.status(404).json({ error: "Mail not found" });
        }

        await pool.query("DELETE FROM emails WHERE id = $1", [mailId]);

        return res.status(200).json({ message: "Mail was succssfully deleted" });
    } catch (error) {
        return res.status(500).json({ error: 'Deleting mail error' });
    }
};

export { createMail, getAll, editMail, deleteMail };