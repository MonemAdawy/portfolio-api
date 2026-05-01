import { EventEmitter } from "events";
import sendEmails, { subjects } from "./sendEmails.js";
import { message } from "./generateHTML.js";
export const emailEvent = new EventEmitter();

emailEvent.on("sendMessage", async ({ email, name, phone, description }) => {
    const isSent = await sendEmails({
        from: email,
        subject: subjects.sendMessage,
        html: message(name, email, phone, description)
    });

    console.log("Email sent:", isSent);
});