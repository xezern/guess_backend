const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "mail.ru",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendWelcomeEmail = async (email, name) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Welcome to David Service!',
        text: `Hello ${name},\n\nThank you for registering with us. We're excited to have you on board!\n\nBest regards,\nDavid Service Team`,
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2 style="color: #4CAF50;">Hello ${name},</h2>
                <p>Thank you for registering with us. We're excited to have you on board!</p>
                <p>Best regards,<br><strong>David Service Team</strong></p>
                <footer style="margin-top: 20px; color: #999;">
                    <p>If you didn't sign up for this account, please ignore this email or contact us.</p>
                </footer>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendWelcomeEmail;
