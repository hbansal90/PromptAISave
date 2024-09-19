import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export const POST =  async (req, res) => {
    try{
        // access the API key by creating an instance of GoogleGenerativeAI
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        // initialise a generative model
        const model = genAI.getGenerativeModel({model: "gemini-pro"});

        // retrieve the data we receive as the part of the responsse body
        const data = await req.json();
        const prompt = data.body;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const output = await response.text();
         // Send the llm output as a server reponse object
        return NextResponse.json({output: output});

    }
    catch(error){
        console.log(error);
    }
}