import * as React from "react";
import {
    Html,
    Head,
    Preview,
    Body,
    Container,
    Section,
    Heading,
    Text,
    Button,
    Hr,
} from "@react-email/components";



const main = {
    backgroundColor: "#f6f9fc",
    fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Liberation Sans', sans-serif",
    color: "#0f172a",
};

const container = {
    backgroundColor: "#ffffff",
    margin: "40px auto",
    padding: "32px",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "560px",
    boxShadow: "0 6px 18px rgba(12, 24, 48, 0.08)",
};

const header = {
    marginBottom: "24px",
};

const heading = {
    fontSize: "20px",
    margin: 0,
};

const text = {
    fontSize: "15px",
    lineHeight: "1.6",
    margin: "12px 0",
};

const cta = {
    display: "inline-block",
    textDecoration: "none",
    borderRadius: "8px",
    padding: "12px 18px",
    fontWeight: 600,
};

const footer = {
    fontSize: "13px",
    color: "#6b7280",
    marginTop: "22px",
};

export default function WelcomeEmail({
    name = 'Joshua',
    role,
    loginUrl,
    supportEmail = "support@seamcare.com",
    appName = "SeamCare",
}) {
    return (
        <Html style={main}>
            <Head />
            <Preview>{`Welcome to ${appName} — let's get you started`}</Preview>
            <Body style={{ margin: 0, padding: 0, backgroundColor: main.backgroundColor }}>
                <Container style={container}>
                    <Section style={header}>
                        <Heading style={heading}>{`Welcome to ${appName}, ${name}!`}</Heading>
                        <Text style={{ ...text, color: "#374151", marginTop: "8px" }}>
                            {`You're now registered as a ${role.toLowerCase()} on ${appName}. We're excited to have you on board — here's a quick guide to get started.`}
                        </Text>
                    </Section>

                    <Section>
                        <Text style={text}>What you can do next:</Text>
                        <Text style={text}>• Patients: Complete your profile, add medical history, and book appointments easily.</Text>
                        <Text style={text}>• Doctors: Finish your professional profile, set availability, and manage patients.
                        </Text>

                        <Section style={{ marginTop: 18 }}>
                            <Button
                                style={{ ...cta, backgroundColor: "#0ea5a4", color: "#ffffff", padding: "12px 18px" }}
                                href={loginUrl}
                            >
                                Get started
                            </Button>

                        </Section>

                        <Text style={{ ...text, marginTop: 14 }}>
                            If the button doesn't work, copy and paste this URL into your browser:
                        </Text>
                        <Text style={{ fontSize: 13, wordBreak: "break-all" }}>{loginUrl}</Text>

                        <Hr style={{ borderColor: "#e6eef6", margin: "20px 0" }} />

                        <Text style={footer}>
                            Need help? Reply to this email or contact our support at {supportEmail}.
                        </Text>

                        <Text style={{ ...footer, marginTop: 8 }}>
                            Thanks,
                            <br />
                            The {appName} Team
                        </Text>

                        <Text style={{ ...footer, marginTop: 14 }}>
                            {`You're receiving this email because you signed up for ${appName}. If you didn't create an account, please contact support at ${supportEmail}.`}
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
}
