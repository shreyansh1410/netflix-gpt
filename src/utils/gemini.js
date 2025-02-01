import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY } from './constants';

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Create a reusable model instance
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export default model;