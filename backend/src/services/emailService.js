import { VerifyAccountEmail } from './EmailTemplates/VerifyAccount.email.js';
import { ForgotPasswordEmail } from './EmailTemplates/ForgotPassword.email.js';
import { LoginConfirmationEmail } from './EmailTemplates/LoginConfirmation.email.js';
import transporter from './EmailTransporter.js';

/**
 * Sends a verification email to the user
 * @param {string} email - User's email address
 * @param {string} token - Verification token
 * @param {string} fullName - User's full name 
 */
export const sendVerificationEmail = async (email, token, fullName = 'User') => {
    try {
        const verificationLink = `${process.env.FRONTEND_URL}/verify-email/${token}`;
        const emailTemplate = VerifyAccountEmail(fullName, verificationLink);

        const mailOptions = {
            from: `"${process.env.EMAIL_FROM_NAME || 'AnimateHub'}" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: emailTemplate.subject,
            html: emailTemplate.html
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending verification email:', error);
        throw new Error('Failed to send verification email');
    }
};

/**
 * Sends a password reset email to the user
 * @param {string} email - User's email address
 * @param {string} token - Password reset token
 * @param {string} fullName - User's full name (optional)
 */
export const sendPasswordResetEmail = async (email, token, fullName = 'User') => {
    try {
        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;
        const emailTemplate = ForgotPasswordEmail(fullName, resetLink);

        const mailOptions = {
            from: `"${process.env.EMAIL_FROM_NAME || 'AnimateHub'}" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: emailTemplate.subject,
            html: emailTemplate.html
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending password reset email:', error);
        throw new Error('Failed to send password reset email');
    }
};

/**
 * Sends an OTP email for email verification
 * @param {string} email - User's email address
 * @param {string} otp - One-time password
 * @param {string} fullName - User's full name (optional)
 */
export const sendOTPEmail = async (email, otp, fullName = 'User') => {
    try {
        const emailTemplate = {
            subject: "Verify Your Email - AnimateHub OTP",
            html: `
    <div style="width: 100%; background-color: #f5f5f5; padding: 20px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
        <h1 style="text-align: center; color: #333; font-size: 24px; margin-bottom: 20px;">Verify Your Email</h1>
        <p style="color: #666; font-size: 16px; line-height: 24px; margin-bottom: 20px;">Hi ${fullName}, Welcome to AnimateHub!</p>
        <p style="color: #666; font-size: 16px; line-height: 24px; margin-bottom: 20px;">
            Please use the following One-Time Password (OTP) to verify your email:
        </p>
        <div style="background-color: #4CAF50; color: white; padding: 15px; border-radius: 5px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
            ${otp}
        </div>
        <p style="color: #666; font-size: 16px; line-height: 24px; margin-top: 20px;">
            This OTP will expire in 15 minutes for security reasons.
        </p>
        <p style="color: #666; font-size: 16px; line-height: 24px; margin-top: 20px;">
            If you didn't request this verification, please ignore this email.
        </p>
        <p style="color: #999; font-size: 12px; line-height: 18px; margin-top: 30px; border-top: 1px solid #eee; padding-top: 15px;">
            This is an automated message. Please do not reply to this email.
        </p>
    </div>
            `
        };

        const mailOptions = {
            from: `"${process.env.EMAIL_FROM_NAME || 'AnimateHub'}" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: emailTemplate.subject,
            html: emailTemplate.html
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending OTP email:', error);
        throw new Error('Failed to send OTP email');
    }
};

/**
 * Sends a login confirmation email to the user
 * @param {string} email - User's email address
 * @param {string} fullName - User's full name
 * @param {string} loginTime - Login timestamp
 */
export const sendLoginConfirmationEmail = async (email, fullName, loginTime) => {
    try {
        const emailTemplate = LoginConfirmationEmail(fullName, loginTime);

        const mailOptions = {
            from: `"${process.env.EMAIL_FROM_NAME || 'AnimateHub'}" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: emailTemplate.subject,
            html: emailTemplate.html
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending login confirmation email:', error);
        throw new Error('Failed to send login confirmation email');
    }
};
