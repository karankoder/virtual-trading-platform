export const backendUrl =
    process.env.NODE_ENV === "development"
        ? process.env.LOCAL_BACKEND_URL
        : process.env.BACKEND_URL;

export const frontendUrl =
    process.env.NODE_ENV === "development"
        ? process.env.LOCAL_FRONTEND_URL
        : process.env.FRONTEND_URL;

export const mongoUri =
    process.env.NODE_ENV === "development"
        ? process.env.LOCAL_MONGO_URI
        : process.env.MONGO_URI;

export const dbName =
    process.env.NODE_ENV === "development"
        ? process.env.LOCAL_DB_NAME
        : process.env.DB_NAME;

export const mailContent = (
    username,
    verification_link,
    expiry_hours,
) => `<html lang="en">
<head>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', Helvetica, Arial, sans-serif; background-color: #0a101f;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #1e293b; border-collapse: collapse; border-radius: 8px; overflow: hidden;">
        <tr>
            <td align="center" style="padding: 40px 0 30px 0; background-color: #0a101f; color: #e2e8f0; border-bottom: 1px solid #334155;">
                <h1 style="margin: 0; font-size: 32px; font-weight: bold;">AlgoArena</h1>
                <p style="margin: 5px 0 0 0; font-size: 16px; color: #94a3b8;">Virtual Trading Platform</p>
            </td>
        </tr>
        <tr>
            <td style="padding: 40px 30px;">
                <h2 style="font-size: 24px; margin: 0 0 20px 0; color: #e2e8f0; font-weight: bold;">Welcome to the Trading Floor!</h2>
                <p style="font-size: 16px; line-height: 1.6; margin: 0 0 25px 0; color: #94a3b8;">
                    Hi ${username},<br><br>
                    Welcome to AlgoArena! To complete your registration and unlock your ₹1 Crore virtual portfolio, please click the button below to verify your email address.
                </p>
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td align="center">
                            <table border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td align="center" bgcolor="#ea580c" style="border-radius: 8px;">
                                        <a href="${verification_link}" target="_blank" style="font-size: 18px; font-weight: bold; color: #ffffff; text-decoration: none; padding: 15px 35px; border-radius: 8px; display: inline-block;">Verify Your Account</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
                <p style="font-size: 16px; line-height: 1.6; margin: 25px 0; color: #94a3b8;">
                    This verification link will expire in ${expiry_hours} hours. If you're having trouble, copy and paste the following link into your browser:
                </p>
                <p style="font-size: 14px; line-height: 1.5; word-break: break-all; margin: 0 0 25px 0;">
                    <a href="${verification_link}" target="_blank" style="color: #f97316;">${verification_link}</a>
                </p>
                <p style="font-size: 16px; line-height: 1.6; margin: 0; color: #94a3b8;">
                    Happy Trading,<br>
                    The AlgoArena Team
                </p>
            </td>
        </tr>
        <tr>
            <td style="padding: 30px; background-color: #0a101f; text-align: center;">
                <p style="margin: 0; font-size: 12px; color: #94a3b8;">
                    If you did not sign up for a AlgoArena account, you can safely ignore this email.
                </p>
                <p style="margin: 10px 0 0 0; font-size: 12px; color: #94a3b8;">
                    &copy; ${new Date().getFullYear()} AlgoArena. All rights reserved.
                </p>
            </td>
        </tr>
    </table>
</body>
</html>`;
