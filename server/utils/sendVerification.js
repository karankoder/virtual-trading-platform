import sgMail from "@sendgrid/mail";
import { Verification } from "../models/verification.js";
import crypto from "crypto";
import { frontendUrl, mailContent } from "../config/constants.js";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendVerification = async (to, username, password, res) => {
    try {
        const from = `AlgoArena <${process.env.SMTP_EMAIL_ID}>`;
        const token = crypto.randomBytes(32).toString("hex");
        const expiry_hours = 1;

        const verification_link = `${frontendUrl}/verify-email?email=${encodeURIComponent(
            to,
        )}&token=${token}`;

        const msg = {
            to,
            from,
            subject: "Verify Your Email for AlgoArena",
            html: mailContent(username, verification_link, expiry_hours),
        };

        await sgMail.send(msg);

        await Verification.findOneAndUpdate(
            { email: to },
            {
                username,
                email: to,
                password,
                expiry: new Date(Date.now() + expiry_hours * 60 * 60 * 1000),
                token,
            },
            { upsert: true, new: true },
        );

        res.status(200).json({
            status: "success",
            message: "Email sent for verification. Please check your inbox.",
        });
    } catch (error) {
        console.error(
            "Error in sendVerification function:",
            error.response?.body || error,
        );

        if (!res.headersSent) {
            res.status(500).json({
                status: "error",
                message: "Failed to send verification email.",
            });
        }
    }
};
