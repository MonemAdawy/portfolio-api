import nodemailer from "nodemailer";

const sendEmails = async ({ from, subject, html }: { from: string; subject: string; html: string }) => {
    console.log(`Sending email from: ${from}`);
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_RECEIVER,
            pass: process.env.PASS,
        },
    });

    const info = await transporter.sendMail({
        from: `"Portfolio" <${process.env.EMAIL_RECEIVER}>`,
        to: process.env.EMAIL_RECEIVER,
        subject,
        html,
    });

    if (info.rejected.length == 0) return true;
    else return false;
};

export const subjects = {
    sendMessage: "New Contact Message"
};

export default sendEmails;