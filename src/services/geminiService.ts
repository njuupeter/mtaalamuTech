import { GoogleGenAI } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

const SYSTEM_INSTRUCTION = `You are the MtaalamuTech Assistant, a professional customer support representative for MtaalamuTech.
MtaalamuTech is a premium IT and investment firm in Tanzania.
Services:
- Investment services: Strategic capital management and advisory.
- FX trading / forex education: Professional trading courses and insights.
- Web development: High-performance websites and web apps.
- Graphic design: Brand identity and visual assets.
- Programming: Custom software solutions.
- Teacher / training services: IT and technical training.
- LED screen operation: Digital signage management.

Contact: 0716040796 (Mobile/WhatsApp)
Location: Tanzania

Voice: Professional, helpful, trustworthy, and tech-savvy.
Goal: Answer questions about services, pricing (request specific quotes), booking, and company info.
If users ask to book, guide them to the booking page.
Keep responses concise and formatted with markdown.`;

export async function chatWithAI(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[] = []) {
  try {
    const ai = getAI();
    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history,
    });

    const response = await chat.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm sorry, I'm having trouble connecting right now. Please try again or reach out to us at 0716040796.";
  }
}
