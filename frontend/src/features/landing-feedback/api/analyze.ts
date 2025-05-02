import { apiClient } from "@/lib/api-client";

export const analyzeContent = async(url: string): Promise<string> => {
    try {
        const response = await apiClient.get("/feedback/analyze", {
            url,
        });

        return response.data.feedback;
    } catch (error) {
        console.error("Error analyzing url", error);
        throw new Error("Failed to analyze url");
    }
}