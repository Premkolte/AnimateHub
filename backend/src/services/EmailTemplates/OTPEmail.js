export const OTPEmail = (fullName, otp) => ({
    subject: "Verify Your Email - OTP Code - AnimateHub",
    html: `
    <div style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #333; font-size: 28px; margin: 0 0 10px 0; font-weight: bold;">Verify Your Email</h1>
            <p style="color: #666; font-size: 16px; margin: 0;">Welcome to AnimateHub!</p>
        </div>

        <p style="color: #666; font-size: 16px; line-height: 24px; margin-bottom: 20px;">
            Hi ${fullName},
        </p>

        <p style="color: #666; font-size: 16px; line-height: 24px; margin-bottom: 20px;">
            Thank you for signing up! To complete your registration, please verify your email address by entering the following 6-digit verification code:
        </p>

        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 30px 0; text-align: center; border: 2px dashed #4CAF50;">
            <p style="color: #333; font-size: 14px; margin: 0 0 10px 0; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                Your Verification Code
            </p>
            <p style="color: #4CAF50; font-size: 36px; margin: 0; font-weight: bold; letter-spacing: 8px; font-family: 'Courier New', monospace;">
                ${otp}
            </p>
        </div>

        <div style="background-color: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #ffc107;">
            <p style="color: #856404; font-size: 14px; line-height: 20px; margin: 0;">
                <strong>Important:</strong> This code will expire in 15 minutes for your security.
            </p>
        </div>

        <p style="color: #666; font-size: 16px; line-height: 24px; margin-bottom: 20px;">
            If you didn't request this code, please ignore this email or contact us if you have concerns.
        </p>

        <div style="border-top: 1px solid #eee; margin-top: 30px; padding-top: 20px;">
            <p style="color: #666; font-size: 14px; line-height: 20px; margin: 0 0 10px 0;">Best regards,</p>
            <p style="color: #333; font-size: 16px; line-height: 20px; margin: 0; font-weight: bold;">The AnimateHub Team</p>
        </div>

        <p style="color: #999; font-size: 12px; line-height: 18px; margin-top: 20px; border-top: 1px solid #eee; padding-top: 15px;">
            This is an automated message. Please do not reply to this email.<br>
            If you have any questions, contact us at <a href="mailto:${process.env.SUPPORT_EMAIL}" style="color: #4CAF50; text-decoration: none;">${process.env.SUPPORT_EMAIL}</a>
        </p>
    </div>
    `,
})
