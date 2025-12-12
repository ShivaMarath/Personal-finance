"use server";

import { Resend } from "resend";
import { ReactElement } from "react";

interface SendEmailParams {
  to: string | string[];
  subject: string;
  react: ReactElement;
}

interface SendEmailResponse {
  success: boolean;
  data?: any;
  error?: any;
}

export async function sendEmail({ to, subject, react }: SendEmailParams): Promise<SendEmailResponse> {
  const apiKey = process.env.RESEND_API_KEY || "";
  
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return { 
      success: false, 
      error: new Error("RESEND_API_KEY environment variable is not configured") 
    };
  }

  const resend = new Resend(apiKey);

  try {
    const data = await resend.emails.send({
      from: "Finance App <onboarding@resend.dev>",
      to,
      subject,
      react,
    });

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error : new Error("Unknown error occurred") 
    };
  }
}