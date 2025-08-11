 export const AccountDeletedEmail = () => ({
    subject: "Your AnimateHub Account Has Been Deleted",
    html: `
    <div style="width: 100%; background-color: #f5f5f5; padding: 20px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
        <h1 style="text-align: center; color: #333; font-size: 24px; margin-bottom: 20px;">Account Successfully Deleted</h1>
        <p style="color: #666; font-size: 16px; line-height: 24px; margin-bottom: 20px;">
            We're sorry to see you go. Your AnimateHub account and all associated data have been permanently deleted as requested.
        </p>
        
        <div style="background-color: #fff3e0; border-left: 4px solid #ff9800; padding: 12px 20px; margin: 20px 0; border-radius: 0 4px 4px 0;">
            <p style="color: #e65100; margin: 0; font-size: 14px; line-height: 20px;">
                <strong>Important:</strong> This action cannot be undone. All your data, including animations, projects, and account information, has been permanently removed from our systems.
            </p>
        </div>

        <p style="color: #666; font-size: 16px; line-height: 24px; margin-top: 20px;">
            If you didn't request this change or have any questions, please contact our support team immediately at 
            <a href="mailto:${process.env.SUPPORT_EMAIL}" style="color: #4CAF50; text-decoration: none;">${process.env.SUPPORT_EMAIL}</a>.
        </p>

        <p style="color: #666; font-size: 14px; line-height: 20px; margin-top: 20px; font-style: italic;">
            Note: Some information may remain in our backup systems for a limited period as part of our data protection and security practices.
        </p>

        <p style="color: #666; font-size: 16px; line-height: 24px; margin-top: 20px;">
            <strong>Date of Deletion:</strong> ${new Date().toLocaleDateString()}
        </p>

        <p style="color: #666; font-size: 16px; line-height: 24px; margin-top: 20px;">Best regards,</p>
        <p style="color: #666; font-size: 16px; line-height: 24px;">The AnimateHub Team</p>
        
        <p style="color: #999; font-size: 12px; line-height: 18px; margin-top: 30px; border-top: 1px solid #eee; padding-top: 15px;">
            This is an automated message. Please do not reply to this email.
        </p>
    </div>
    `,
})