export const ForgotPasswordEmail = (fullName, resetLink) => ({
    subject: "Reset Your Password - AnimateHub",
    html: `
    <div style="width: 100%; background-color: #f5f5f5; padding: 20px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
        <h1 style="text-align: center; color: #333; font-size: 24px; margin-bottom: 20px;">Reset Your Password</h1>
        <p style="color: #666; font-size: 16px; line-height: 24px; margin-bottom: 20px;">Hi ${fullName},</p>
        <p style="color: #666; font-size: 16px; line-height: 24px; margin-bottom: 20px;">We received a request to reset your AnimateHub account password.</p>
        <p style="color: #666; font-size: 16px; line-height: 24px; margin-bottom: 20px;">
            Click the button below to create a new password:
        </p>
        <a style="background-color: #4CAF50; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none;" href="${resetLink}">
            Reset Password
        </a>
        <p style="color: #666; font-size: 16px; line-height: 24px; margin-top: 20px;">This link will expire in 1 hour for security reasons.</p>
        <p style="color: #666; font-size: 14px; line-height: 20px; margin-top: 20px;">
            <em>If you didn't request this password reset, please ignore this email or contact support if you have any concerns about your account's security.</em>
        </p>
        <p style="color: #666; font-size: 16px; line-height: 24px; margin-top: 20px;">Best regards,</p>
        <p style="color: #666; font-size: 16px; line-height: 24px;">The AnimateHub Team</p>
        <p style="color: #999; font-size: 12px; line-height: 18px; margin-top: 30px; border-top: 1px solid #eee; padding-top: 15px;">
            This is an automated message. Please do not reply to this email.
        </p>
    </div>
    `,
})