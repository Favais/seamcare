import WelcomeEmail from "@/components/emails/WelcomeEmail";
import { Resend } from "resend";

export async function sendEmail({ to, subject, role, loginUrl, name }) {

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Implementation for sending email
    try {
        const email = await resend.emails.send({
            from: "SeamCare <test@resend.dev>",
            to,
            subject,
            react: WelcomeEmail({ name, role, loginUrl }),
        });
        console.log("Email sent successfully:", email);
    } catch (error) {
        console.error("Error sending email:", error);
    }

}
