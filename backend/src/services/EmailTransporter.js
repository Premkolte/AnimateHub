import nodemailer from 'nodemailer';

// Check if email credentials are configured
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const emailConfigured = EMAIL_USER && EMAIL_PASSWORD;

// Log environment variable status for debugging
console.log('Email configuration status:', emailConfigured ? 'Configured' : 'Not configured (email features disabled)');

let transporter = null;

if (emailConfigured) {
    // Create a transporter object using SMTP transport
    transporter = nodemailer.createTransport({
        service: 'gmail', // You can use other services like 'outlook', 'yahoo', etc.
        auth: {
            user: EMAIL_USER, // Your email address
            pass: EMAIL_PASSWORD // Your email password or app-specific password
        }
    });

    // Verify transporter configuration
    transporter.verify((error, success) => {
        if (error) {
            console.error('Email configuration error:', error.message);
        } else {
            console.log('Email server is ready to send messages');
        }
    });
} else {
    console.log('⚠️ Email is disabled. Set EMAIL_USER and EMAIL_PASSWORD in .env to enable.');
}

export default transporter;