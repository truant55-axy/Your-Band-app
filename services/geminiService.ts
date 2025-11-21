import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getChatResponse = async (history, newMessage) => {
  try {
    const chatHistory = history.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    const model = 'gemini-2.5-flash';
    const response = await ai.models.generateContent({
        model,
        contents: [
            ...chatHistory,
            { role: 'user', parts: [{ text: newMessage }] }
        ],
        config: {
            systemInstruction: "You are a friendly, empathetic AI mental health companion. Your goal is to provide supportive, gentle, and constructive advice. Keep your responses concise and caring, suitable for a mobile chat interface. Use emojis to convey warmth and friendliness. You are talking to a user about their mental well-being.",
        }
    });
    
    return response.text;
  } catch (error) {
    console.error("Error getting chat response:", error);
    return "I'm having a little trouble connecting right now. Let's try again in a moment. 🙏";
  }
};


export const getWeeklyReport = async () => {
    // In a real app, this data would come from sensors.
    const mockData = {
        avgHeartRate: 72,
        hrvFluctuation: 'moderate',
        gsrPeaks: 15, // Galvanic Skin Response
        sleepQuality: '78%',
        deStressGameMinutes: 45,
    };
    
    const prompt = `
      Based on the following weekly mental health data, generate a warm, encouraging, and insightful weekly emotional summary for the user.
      - Keep it under 150 words.
      - Start with a friendly greeting.
      - Highlight one positive trend.
      - Offer one gentle suggestion for improvement.
      - End on a positive and motivating note.
      - Use emojis.
      Data: ${JSON.stringify(mockData)}
    `;
    
    try {
        const model = 'gemini-2.5-flash';
        const response = await ai.models.generateContent({
            model,
            contents: prompt
        });
        return response.text;
    } catch (error) {
        console.error("Error generating weekly report:", error);
        return "Sorry, I couldn't generate your weekly report at this time. Please try again later.";
    }
};

export const getDeepAnalysis = async (emotionData) => {
    const prompt = `
        Analyze the following daily emotional data for a user of a mental wellness app. Provide a short, insightful, and supportive analysis.
        - The analysis should be around 100-120 words.
        - Identify any patterns (e.g., stress on certain days, improvements over the week).
        - Offer one concrete, gentle piece of advice based on the data.
        - Maintain a caring and encouraging tone. Use emojis to add warmth.
        - Format the output with clear paragraphs.
        
        Daily Emotions Data: ${JSON.stringify(emotionData)}
    `;

    try {
        const model = 'gemini-2.5-flash';
        const response = await ai.models.generateContent({
            model,
            contents: prompt
        });
        return response.text;
    } catch (error) {
        console.error("Error generating deep analysis:", error);
        return "I'm having trouble analyzing your data right now. Let's try again in a bit.";
    }
};