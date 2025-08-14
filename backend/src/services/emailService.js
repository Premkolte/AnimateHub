import { VerifyAccountEmail } from './EmailTemplates/VerifyAccount.email.js';
import { ForgotPasswordEmail } from './EmailTemplates/ForgotPassword.email.js';
import transporter from './emailTransporter.js';

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
