import nodemailer from 'nodemailer';


// Verify environment variables
console.log('Environment variables:', {
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD ? 'Password is set' : 'Password is not set',
});

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use other services like 'outlook', 'yahoo', etc.
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASSWORD // Your email password or app-specific password
    }
});

// Verify transporter configuration
transporter.verify((error, success) => {
    if (error) {
        console.error('Email configuration error:', error);
        console.error('Error details:', {
            code: error.code,
            command: error.command,
            stack: error.stack
        });
    } else {
        console.log('Email server is ready to send messages');
    }
});

export default transporter;