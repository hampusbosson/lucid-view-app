import * as cheerio from "cheerio";
import axios from "axios";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const fetchContentFromURL = async (url: string): Promise<string> => {
  if (!url) {
    throw new Error("URL is required");
  }

  if (!validateLandingPageURL(url)) {
    throw new Error("Invalid landing page URL");
  }

  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    const html = response.data.toString("utf-8");

    const $ = cheerio.load(html);

    // Remove unwanted tags
    $("script, style, noscript, iframe, object").remove();

    // Remove comments
    $("*")
      .contents()
      .each(function () {
        if (this.type === "comment") $(this).remove();
      });

    // Get the cleaned-up HTML
    const cleanedHtml = $.html();

    return cleanedHtml;
  } catch (error) {
    console.error("Error fetching content from URL:", error);
    throw new Error("Failed to fetch content from URL");
  }
};

const validateLandingPageURL = (urlString: string): boolean => {
  const url = new URL(urlString);
  const segments = url.pathname.split("/").filter(Boolean);

  return segments.length < 1;
};

export const givePageFeedback = async (content: string): Promise<string> => {
  if (!content) {
    throw new Error("Content is required");
  }

  try {
    const response = await groq.chat.completions.create({
      model: "compound-beta",
      messages: [
        {
          role: "system",
          content: `
                    You are a senior UX and web conversion expert. Your task is to analyze a landing page and return a tightly structured checklist with no filler or summary.

                    Your response MUST be split into **three separate sections**, with very specific formatting.

                    ---
                    SECTION 1: Strengths (3–5 lines)
                    Each line must begin with ✅

                    ✅ Example strength 1  
                    ✅ Example strength 2

                    ---
                    SECTION 2: Problems (3–5 lines)
                    Each line must begin with ❌

                    ❌ Example issue 1  
                    ❌ Example issue 2

                    ---
                    SECTION 3: Actionable Recommendations (3–5 lines)
                    Each line must begin with a bullet point (•)  
                    DO NOT use ✅, ❌, or any emojis in this section

                    • Example recommendation 1  
                    • Example recommendation 2

                    ---
                    Do NOT include:
                    - Any section headers
                    - Any introductions (like “Here’s what I found”)
                    - Any conclusions or summaries
                    - Any markdown or formatting beyond the bullets above

                    Respond ONLY with the checklist items as shown above.
                    If no recommendation is found, write:
                    • No recommendations available
          `,
        },
        {
          role: "user",
          content: `
                  The following is the cleaned HTML content of a landing page.
                  Please analyze it according to your instructions above and provide actionable UX and conversion optimization feedback.

                  HTML Content: ${content}
          `,
        },
      ],
    });

    const feedback = response.choices[0].message?.content;
    if (!feedback) {
      throw new Error("No feedback received from Groq");
    }

    return feedback;
  } catch (error) {
    console.error("Error giving feedback:", error);
    throw new Error("Failed to give feedback");
  }
};