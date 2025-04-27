require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const mongoose = require("mongoose");

const Response = require("./models/Response");
const insertData = require("./insertData"); // 👈 Importa aqui

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ Conectado ao MongoDB Atlas");

    // Inserir dados depois de conectar
    await insertData();

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Erro ao conectar ao MongoDB:", err);
  });

const FURIA_PLAYERS = ["kscerato", "yuurih", "fallen", "molodoy", "YEKINDAR"];
const FURIA_KEYWORDS = [
  "furia",
  "csgo",
  "cs:go",
  "e-sports",
  "counter-strike",
  "elenco",
  "jogadores",
  "ranking",
  "calendario",
  "última",
  "próximo",
  "títulos",
  "valor",
  "mascote",
  "neymar",
  "fundação",
  "curiosidades",
];

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    const lowerMessage = message.toLowerCase();

    const isAboutFuria =
      FURIA_KEYWORDS.some((kw) => lowerMessage.includes(kw)) ||
      FURIA_PLAYERS.some((player) => lowerMessage.includes(player));

    if (!isAboutFuria) {
      return res.json({
        reply:
          "🔴 Respondo apenas sobre FURIA Esports (CS:GO/CS2). Tente perguntar sobre jogadores, resultados ou calendário.",
      });
    }

    const responseFromDb = await Response.aggregate([
      {
        $match: {
          $expr: {
            $regexMatch: {
              input: lowerMessage,
              regex: { $concat: ["\\b", "$keyword", "\\b"] },
              options: "i",
            },
          },
        },
      },
      { $limit: 1 },
    ]);

    if (responseFromDb.length > 0) {
      return res.json({ reply: responseFromDb[0].reply });
    }

    try {
      const hfResponse = await axios.post(
        "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1",
        {
          inputs: `Pergunta: ${message}\n\nResponda em português em no máximo 2 frases. Tema: FURIA Esports.`,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          },
          timeout: 10000,
        }
      );

      const aiReply = hfResponse.data?.[0]?.generated_text || null;

      if (aiReply) {
        return res.json({ reply: aiReply });
      }
    } catch (aiErr) {
      console.error("⚠️ Falha na IA Hugging Face:", aiErr.message);
    }

    return res.json({
      reply: `ℹ️ Para informações atualizadas em 2025, consulte:\n\n• HLTV: hltv.org/team/8297/FURIA\n• Site oficial: furia.gg\n\nOu pergunte sobre: jogadores, ranking ou calendário.`,
    });
  } catch (error) {
    console.error("Erro no servidor:", error);
    return res.json({
      reply:
        "🔧 Estamos com instabilidades técnicas. Por favor, consulte diretamente:\n\n• HLTV.org (resultados ao vivo)\n• FURIA.gg (notícias oficiais)",
    });
  }
});

app.get("/api/update", async (req, res) => {
  try {
    const response = await axios.get(
      "https://hltv-api.vercel.app/api/team/8297"
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Falha na atualização" });
  }
});
