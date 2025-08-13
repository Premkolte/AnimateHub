export const PasswordChangedEmail = () => ({
    subject: "Your Password Has Been Changed - AnimateHub",
    html: `
    <div style="width: 100%; background-color: #f5f5f5; padding: 20px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
        <h1 style="text-align: center; color: #333; font-size: 24px; margin-bottom: 20px;">Password Successfully Changed</h1>
        <p style="color: #666; font-size: 16px; line-height: 24px; margin-bottom: 20px;">
            Your AnimateHub account password was recently changed. If you made this change, you can safely ignore this email.
        </p>
        
        <div style="background-color: #e8f5e9; border-left: 4px solid #4CAF50; padding: 12px 20px; margin: 20px 0; border-radius: 0 4px 4px 0;">
            <p style="color: #2e7d32; margin: 0; font-size: 14px; line-height: 20px;">
                <strong>Security Tip:</strong> If you didn't make this change, please secure your account by resetting your password immediately.
            </p>
        </div>

        <p style="color: #666; font-size: 16px; line-height: 24px; margin-top: 20px;">
            For security reasons, this is a notification about changes made to your account. If this wasn't you, please contact our support team immediately at 
            <a href="mailto:${process.env.SUPPORT_EMAIL}" style="color: #4CAF50; text-decoration: none;">${process.env.SUPPORT_EMAIL}</a>.
        </p>

        <p style="color: #666; font-size: 16px; line-height: 24px; margin-top: 20px;">
            <strong>Date & Time:</strong> ${new Date().toLocaleString()}
        </p>

        <p style="color: #666; font-size: 16px; line-height: 24px; margin-top: 20px;">Best regards,</p>
        <p style="color: #666; font-size: 16px; line-height: 24px;">The AnimateHub Security Team</p>
        <p style="color: #999; font-size: 12px; line-height: 18px; margin-top: 30px; border-top: 1px solid #eee; padding-top: 15px;">
            This is an automated message. Please do not reply to this email.
        </p>
    </div>
    `,
})