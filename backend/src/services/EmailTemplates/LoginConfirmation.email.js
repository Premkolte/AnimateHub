export const LoginConfirmationEmail = (fullName, loginTime) => ({
    subject: "Login Confirmation - AnimateHub",
    html: `
    <div style="width: 100%; background-color: #f5f5f5; padding: 20px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
        <h1 style="text-align: center; color: #333; font-size: 24px; margin-bottom: 20px;">Login Confirmation</h1>
        <p style="color: #666; font-size: 16px; line-height: 24px; margin-bottom: 20px;">Hi ${fullName},</p>
        <p style="color: #666; font-size: 16px; line-height: 24px; margin-bottom: 20px;">
            This email is to confirm that you have successfully logged into your AnimateHub account.
        </p>
        <div style="background-color: #fff; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #4CAF50;">
            <p style="color: #666; font-size: 14px; line-height: 20px; margin: 0;">
                <strong>Login Time:</strong> ${loginTime}
            </p>
        </div>
        <p style="color: #666; font-size: 16px; line-height: 24px; margin-top: 20px;">
            If this was you, no further action is required. Your account is secure.
        </p>
        <p style="color: #666; font-size: 16px; line-height: 24px; margin-top: 20px;">
            If you did not log into your account, please contact us immediately at <a style="color: #4CAF50; text-decoration: none;" href="mailto:${process.env.SUPPORT_EMAIL}">${process.env.SUPPORT_EMAIL}</a>.
        </p>
        <p style="color: #666; font-size: 16px; line-height: 24px; margin-top: 20px;">Best regards,</p>
        <p style="color: #666; font-size: 16px; line-height: 24px; margin-top: 20px;">The AnimateHub Team</p>
        <p style="color: #999; font-size: 12px; line-height: 18px; margin-top: 30px; border-top: 1px solid #eee; padding-top: 15px;">
            This is an automated message. Please do not reply to this email.
        </p>
    </div>
    `,
})
