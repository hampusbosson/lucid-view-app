import * as cheerio from "cheerio";
import axios from "axios";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
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

    //Remove comments
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
}

export const givePageFeedback = async (content: string): Promise<string> => {
    if (!content) {
        throw new Error("Content is required");
    }
    
    try {
        const response = await openai.chat.completions.create({
            model: "o3-mini-2025-01-31",
            messages: [
                {
                    role: "system",
                    content:`
                            You are an expert web designer, UX consultant, and conversion rate optimization specialist.
                            Your task is to critically but constructively analyze landing page content.
                            
                            Focus on:
                            - Clarity of the main value proposition
                            - Visibility and effectiveness of the primary call-to-action (CTA)
                            - Visual trust signals (testimonials, trust badges, case studies)
                            - Overall first impression and emotional impact
                            
                            Be specific, actionable, and professional in tone.
                            Assume the user wants to improve conversions and user trust.
                            
                            Respond with a short, bullet-pointed report.
                            Start each point with ✅ for strengths or ❌ for problems.
                            `
                  },
                  {
                    role: "user",
                    content:`
                            The following is the cleaned HTML content of a landing page.
                            Please analyze it according to your instructions above and provide actionable UX and conversion optimization feedback.
                            
                            HTML Content: ${content}
                            `
                  },
            ],
        });

        const feedback = response.choices[0].message?.content;
        if (!feedback) {
            throw new Error("No feedback received from OpenAI");
        }

        return feedback;
    } catch (error) {
        console.error("Error giving feedback:", error);
        throw new Error("Failed to give feedback");
    }
    
}


