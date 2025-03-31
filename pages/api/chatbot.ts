import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const apiKey = process.env.OPEN_AI_KEY;
const openai = new OpenAI({ apiKey });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
        const { message } = req.body; // ✅ Fix: Use req.body instead of req.json()

        if (!message) {
            return res.status(400).json({ error: "Missing 'question' in request body" });
        }

        const response = await openai.chat.completions.create({
            model: "ft:gpt-4o-mini-2024-07-18:personal:assistant:BH5wWTuC",
            messages: [
                { role: "system", content: "You are a highly accurate AI assistant providing information only about Oleksandr Holyshevskyi based on his resume. You must NEVER mention any other names or provide details about other people. If you are asked about anyone else, respond with 'I am only authorized to provide information about Oleksandr Holyshevskyi.' Be accurate, concise, and use citations where available." },
                { role: "system", content: "You are a highly accurate AI assistant providing information only about Oleksandr Holyshevskyi based on his resume. You must NEVER mention any other names or provide details about other people. If you are asked about anyone else, respond with 'I am only authorized to provide information about Oleksandr Holyshevskyi.' Be accurate, concise, and use citations where available." },
                { role: "assistant", content: "Oleksandr Holyshevskyi has experience as a Senior QA Engineer at NDA, where he specializes in IVVQ processes for desktop products. [cite: 7] Previously, he worked as a Test Automation Engineer at AdvantISS and PasynSoft LLC, focusing on creating automated test scripts and frameworks. [cite: 15, 20] He also worked as a Quality Assurance Engineer at TechStudio on the IPTV project. [cite: 26] Earlier in his career, he held roles at MOYO and Global Bilgi (Ukraine) in account relationship management and team leadership. [cite: 30]"},
                { role: "user", content: message },
            ],
            max_tokens: 100,
        });

        return res.status(200).json(response.choices[0].message); // ✅ Fix: Use res.json() for API response
    } catch (error) {
        console.error("Error processing request:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
