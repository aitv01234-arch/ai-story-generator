// ---------- ChatGPT Prompt Generator ----------
async function generatePrompt() {
  let topic = document.getElementById("userInput").value.trim();

  if (!topic) {
    alert("Please enter a topic!");
    return;
  }

  document.getElementById("promptOutput").innerHTML = "Generating prompt...";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_OPENAI_API_KEY"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You generate creative prompts." },
          { role: "user", content: `Make a story prompt about: ${topic}` }
        ]
      })
    });

    const data = await response.json();
    document.getElementById("promptOutput").innerHTML =
      data.choices?.[0]?.message?.content || "Error generating prompt";
  } catch (err) {
    document.getElementById("promptOutput").innerHTML =
      "API Error: Check your API key.";
  }
}

// ---------- Google AI Studio Audio Generation ----------
async function generateAudio() {
  let text = document.getElementById("promptOutput").innerText.trim();

  if (!text) {
    alert("Generate a prompt first!");
    return;
  }

  document.getElementById("audioOutput").innerHTML = "Generating audio...";

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=YOUR_GOOGLE_API_KEY",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: text }] }]
        })
      }
    );

    const ai = await response.json();
    const base64Audio = ai?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    if (!base64Audio) {
      document.getElementById("audioOutput").innerHTML = "Audio generation failed.";
      return;
    }

    const audio = document.createElement("audio");
    audio.controls = true;
    audio.src = "data:audio/mp3;base64," + base64Audio;

    document.getElementById("audioOutput").innerHTML = "";
    document.getElementById("audioOutput").appendChild(audio);
  } catch (err) {
    document.getElementById("audioOutput").innerHTML = "Audio Error: Check API key.";
  }
}

// ---------- Scene Generator (Grok-style text generator) ----------
async function generateScene() {
  let topic = document.getElementById("userInput").value.trim();

  if (!topic) {
    alert("Please enter a topic!");
    return;
  }

  document.getElementById("sceneOutput").innerHTML = "Generating scene...";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_OPENAI_API_KEY"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You generate cinematic scene descriptions." },
          { role: "user", content: `Write a cinematic scene about: ${topic}` }
        ]
      })
    });

    const data = await response.json();
    document.getElementById("sceneOutput").innerHTML =
      data.choices?.[0]?.message?.content || "Error generating scene";
  } catch (err) {
    document.getElementById("sceneOutput").innerHTML =
      "Scene Error: Check your API key.";
  }
                                     }
