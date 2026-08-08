import { useState } from "react";

function Summary({ summary, setResume }) {
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setResume((prev) => ({
      ...prev,
      summary: e.target.value,
    }));
  };

  const improveWithAI = async () => {
    const currentSummary = summary.trim();

    if (!currentSummary) {
      alert("Please enter a professional summary first.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://127.0.0.1:8000/api/improve-summary",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description: currentSummary,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "AI summary improvement failed");
      }

      // Update resume summary with AI response
      setResume((prev) => ({
        ...prev,
        summary: data.improved,
      }));

    } catch (error) {
      console.error("AI Summary Error:", error);
      alert("Unable to improve the summary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Professional Summary</h2>

      <div className="input-group">
        <label>Tell us about yourself</label>

        <textarea
          name="summary"
          placeholder="Write a short professional summary about yourself..."
          value={summary}
          onChange={handleChange}
          rows="6"
        />
      </div>

      <button
        type="button"
        className="ai-small-button"
        onClick={improveWithAI}
        disabled={loading}
      >
        {loading
          ? "✨ Improving..."
          : "✨ Improve Summary with AI"}
      </button>
    </div>
  );
}

export default Summary;