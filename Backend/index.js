const express = require("express");
const axios = require("axios");
require("dotenv").config();
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const { GoogleGenerativeAI } = require("@google/generative-ai");

app.use(express.json());
const corsOptions = {
  origin: 'https://6651c4f59bc1773eee88773c--shayari-genr.netlify.app',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

const genAI = new GoogleGenerativeAI(process.env.OPENAI_API_KEY);

app.options('*', cors(corsOptions));

app.get("/",(req,res)=>{
  res.json("server is healthy")
})
app.post("/content", async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log(prompt);

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(
      [prompt],
      SafetySetting = [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_ONLY_HIGH",
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_ONLY_HIGH",
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_ONLY_HIGH",
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_ONLY_HIGH",
        },
      ]
    );
    console.log("jkk", result.response.candidates[0].finishReason);
    if (result.response.candidates[0].finishReason == "SAFETY") {
      return res.status(400).json({
        error:
          "content is blocked due safety, be specific in your command or please try another command",
        content: [],
      });
    }

    res.json({ content: result.response.candidates[0].content.parts[0].text, error: "" });
    // res.json({ content: result.response.text() });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
