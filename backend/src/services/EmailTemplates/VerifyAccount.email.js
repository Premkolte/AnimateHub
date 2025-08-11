export const VerifyAccountEmail = (verificationLink) => ({
    subject: "Verify Your Email - Welcome to AnimateHub",
    html: `
    <div style="width: 100%; background-color: #f5f5f5; padding: 20px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
        <h1 style="text-align: center; color: #333; font-size: 24px; margin-bottom: 20px;">Verify Your Email</h1>
        <p style="color: #666; font-size: 16px; line-height: 24px; margin-bottom: 20px;">Welcome to AnimateHub!</p>
        <p style="color: #666; font-size: 16px; line-height: 24px; margin-bottom: 20px;">
            Please verify your email by clicking the link below:
        </p>
        <a style="background-color: #4CAF50; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none;" href="${verificationLink}">
            Verify Email
        </a>
        <p style="color: #666; font-size: 16px; line-height: 24px; margin-top: 20px;">This will help us to ensure that your email is valid and that you're able to receive important updates from us.</p>
        <p style="color: #666; font-size: 16px; line-height: 24px; margin-top: 20px;">If you have any questions or concerns, feel free to reply to this email or contact us at <a style="color: #4CAF50; text-decoration: none;" href="mailto:${process.env.SUPPORT_EMAIL}">${process.env.SUPPORT_EMAIL}</a>.</p>
        <p style="color: #666; font-size: 16px; line-height: 24px; margin-top: 20px;">Best regards,</p>
        <p style="color: #666; font-size: 16px; line-height: 24px; margin-top: 20px;">The AnimateHub Team</p>
        <p style="color: #999; font-size: 12px; line-height: 18px; margin-top: 30px; border-top: 1px solid #eee; padding-top: 15px;">
            This is an automated message. Please do not reply to this email.
        </p>
    </div>
    `,
})
