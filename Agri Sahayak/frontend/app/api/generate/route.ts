// This file should be saved as `app/api/generate/route.ts` in your Next.js project.

// We import the new request and response objects from Next.js server.
import { NextRequest, NextResponse } from 'next/server';

/**
 * Handles incoming POST requests to the `/api/generate` endpoint.
 * This is the handler function for the Next.js App Router.
 * @param {NextRequest} req The incoming request object.
 */
export async function POST(req: NextRequest) {
    // A try/catch block is used to gracefully handle any errors during the process.
    try {
        // We use `req.json()` to get the request body. It's an async operation.
        const { query, imageData, mimeType } = await req.json();

        // Basic validation: ensure either a query or image is present.
        if (!query && !imageData) {
            return NextResponse.json({ error: 'Please provide a text query or an image.' }, { status: 400 });
        }

        // Initialize the array of parts for the Gemini API payload.
        const parts = [];

        // If a text query was provided, add it to the parts array.
        if (query) {
            parts.push({ text: query });
        }

        // If image data was provided, add it to the parts array.
        if (imageData && mimeType) {
            parts.push({
                inlineData: {
                    mimeType: mimeType,
                    data: imageData,
                },
            });
        }

        // Construct the final payload object for the Gemini API.
        const payload = {
            contents: [{
                role: 'user',
                parts: parts,
            }],
            generationConfig: {},
        };

        // Retrieve the API key from environment variables for security.
        const apiKey = process.env.GEMINI_API_KEY;

        // If the API key is not set, we cannot proceed.
        if (!apiKey) {
            return NextResponse.json({ error: 'API key is not configured.' }, { status: 500 });
        }

        // Define the Gemini API endpoint URL.
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

        // Make the POST request to the Gemini API.
        const geminiResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        // Check if the Gemini API request was successful.
        if (!geminiResponse.ok) {
            const errorData = await geminiResponse.json();
            console.error('Gemini API Error:', errorData);
            return NextResponse.json({
                error: errorData.error?.message || 'Gemini API call failed.',
            }, { status: geminiResponse.status });
        }

        // Parse the successful response from the Gemini API.
        const result = await geminiResponse.json();
        const textResponse = result.candidates?.[0]?.content?.parts?.[0]?.text;

        // Return the generated text from the model as a JSON response.
        return NextResponse.json({ response: textResponse }, { status: 200 });

    } catch (error) {
        // Catch any unexpected errors and log them.
        console.error('Internal Server Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
