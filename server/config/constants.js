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
        <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f4f4;">
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-collapse: collapse;">
            <tr>
              <td align="center" style="padding: 40px 0 30px 0; background-color: #2a6cdf; color: #ffffff;">
                <h1 style="margin: 0; font-size: 32px; font-weight: bold;">Taskify</h1>
                <p style="margin: 5px 0 0 0; font-size: 16px;">Your Personal Task Manager</p>
              </td>
            </tr>
            <tr>
              <td style="padding: 40px 30px;">
                <h2 style="font-size: 24px; margin: 0 0 20px 0; color: #333333;">Just one more step...</h2>
                <p style="font-size: 16px; line-height: 1.5; margin: 0 0 25px 0; color: #555555;">
                  Hi ${username},<br><br>
                  Welcome to Taskify! To complete your registration and start organizing your tasks, please click the button below to verify your email address.
                </p>
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td align="center">
                      <table border="0" cellpadding="0" cellspacing="0">
                        <tr>
                          <td align="center" bgcolor="#2a6cdf" style="border-radius: 5px;">
                            <a href="${verification_link}" target="_blank" style="font-size: 18px; font-weight: bold; color: #ffffff; text-decoration: none; padding: 15px 35px; border-radius: 5px; display: inline-block;">Verify Email Address</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                <p style="font-size: 16px; line-height: 1.5; margin: 25px 0; color: #555555;">
                  This verification link will expire in ${expiry_hours} hours. If you're having trouble with the button, you can also copy and paste the following link into your browser:
                </p>
                <p style="font-size: 14px; line-height: 1.5; word-break: break-all; margin: 0 0 25px 0;">
                  <a href="${verification_link}" target="_blank" style="color: #2a6cdf;">${verification_link}</a>
                </p>
                <p style="font-size: 16px; line-height: 1.5; margin: 0; color: #555555;">
                  Thanks,<br>
                  The Taskify Team
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding: 30px; background-color: #f4f4f4; text-align: center;">
                <p style="margin: 0; font-size: 12px; color: #888888;">
                  If you did not sign up for a Taskify account, you can safely ignore this email.
                </p>
                <p style="margin: 10px 0 0 0; font-size: 12px; color: #888888;">
                  &copy; 2025 Taskify. All rights reserved.
                </p>
              </td>
            </tr>
          </table>
        </body>
        </html>`;
