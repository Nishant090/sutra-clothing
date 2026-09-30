export const verificationEmail = async (name, verificationUrl) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Verify Your Email</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f4f5f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; width: 100% !important;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f4f5f7; padding: 40px 10px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" max-width="570" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); overflow: hidden; max-width: 570px; width: 100%;">
                
                <!-- Header/Branding Area -->
                <tr>
                  <td align="center" style="padding: 32px 40px 16px 40px; border-bottom: 1px solid #eaeaea;">
                    <div style="font-size: 24px; font-weight: 700; color: #1e293b; letter-spacing: -0.5px;">
                      LeapFrog
                    </div>
                  </td>
                </tr>

                <!-- Main Content Area -->
                <tr>
                  <td style="padding: 40px 40px 32px 40px;">
                    <h1 style="margin: 0 0 16px 0; font-size: 22px; font-weight: 600; color: #0f172a; line-height: 1.3;">
                      Welcome, ${name}!
                    </h1>
                    <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.6; color: #475569;">
                      Thanks for creating an account with us. Before we get started, we just need to confirm that this email address belongs to you.
                    </p>
                    
                    <!-- Call to Action Button -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 30px auto;">
                      <tr>
                        <td align="center" style="background-color: #2563eb; border-radius: 6px;">
                          <a href="${verificationUrl}" target="_blank" style="display: inline-block; padding: 14px 32px; font-size: 15px; font-weight: 600; color: #ffffff; text-decoration: none; border-radius: 6px;">
                            Verify Email Address
                          </a>
                        </td>
                      </tr>
                    </table>

                    <p style="margin: 24px 0 0 0; font-size: 14px; line-height: 1.6; color: #64748b; font-style: italic; text-align: center;">
                      This verification link will expire in 24 hours.
                    </p>
                  </td>
                </tr>

                <!-- Troubleshooting Fallback -->
                <tr>
                  <td style="padding: 0 40px 40px 40px; border-top: 1px solid #eaeaea;">
                    <p style="margin: 24px 0 0 0; font-size: 12px; line-height: 1.5; color: #94a3b8;">
                      If you’re having trouble clicking the button, copy and paste the URL below into your web browser:
                    </p>
                    <p style="margin: 8px 0 0 0; font-size: 12px; line-height: 1.5; color: #2563eb; word-break: break-all;">
                      <a href="${verificationUrl}" style="color: #2563eb; text-decoration: underline;">${verificationUrl}</a>
                    </p>
                  </td>
                </tr>

              </table>

              <!-- Footer -->
              <table role="presentation" width="100%" max-width="570" cellspacing="0" cellpadding="0" border="0" style="max-width: 570px; width: 100%;">
                <tr>
                  <td align="center" style="padding: 24px 0 0 0; font-size: 12px; color: #94a3b8; line-height: 1.5;">
                    <p style="margin: 0 0 4px 0;">&copy; ${new Date().getFullYear()} YourApp. All rights reserved.</p>
                    <p style="margin: 0;">If you did not create an account, no further action is required.</p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
};
