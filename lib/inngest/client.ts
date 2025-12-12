import { Inngest } from "inngest";

interface InngestConfig {
  id: string;
  name: string;
  retryFunction: (attempt: number) => Promise<{
    delay: number;
    maxAttempts: number;
  }>;
}

export const inngest = new Inngest({
  id: "finance-platform", // Unique app ID
  name: "Finance Platform",
  retryFunction: async (attempt: number) => ({
    delay: Math.pow(2, attempt) * 1000, 
    maxAttempts: 2,
  }),
});