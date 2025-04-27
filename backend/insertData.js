const Response = require("./models/Response");

const LOCAL_KNOWLEDGE = {
  kscerato:
    "Kaike 'KSCERATO' Cerato - Entry Fragger da FURIA, Top 20 mundial HLTV 2023-2024",
  yuurih:
    "Yuri 'yuurih' Santos - Clutcher principal, conhecido por jogadas agressivas",
  fallen: "Gabriel 'FalleN' Toledo - Lenda do CS:GO, AWPer e líder tático",
  jogadores:
    "Elenco 2025: KSCERATO, yuurih, FalleN, molodoy, YEKINDAR (última atualização)",
  elenco:
    "Elenco 2025: KSCERATO, yuurih, FalleN, molodoy, YEKINDAR (última atualização)",
  ranking:
    "Ranking HLTV 2025: Top 20 mundial (verifique em hltv.org/ranking/teams)",
  calendário: "Próximos jogos: hltv.org/team/8297/FURIA (atualizado ao vivo)",
  última: "Consulte resultados em tempo real: hltv.org/matches",
  próximo: "Calendário oficial: furia.gg/agenda",
  títulos:
    "Principais conquistas da FURIA:\n- ESL Pro League Season 12 NA (2020)\n- cs_summit 6 (2020)\n- IEM Dallas 2022 (2º lugar)\n- Major Rio 2022 (Top 4)\n- BetBoom Dacha 2023\nVeja a lista completa: hltv.org/team/8297/FURIA#tab-achievements",
  valor:
    "Não temos um valor exato, porém, a organização Furia é avaliada em mais de U$100.000.000 atualmente.",
  mascote:
    "A pantera representa agressividade, estratégia e velocidade - características do estilo de jogo da FURIA! 🐾",
  neymar:
    "Sim! Neymar Jr. é um dos investidores da FURIA desde 2020 e frequentemente aparece nos eventos.",
  fundação:
    "A FURIA foi fundada em 2017 por Jaime Pádua e Cris Guedes, começando no CS:GO e expandindo para outros e-sports.",
  curiosidades:
    "Você sabia?\n- A FURIA já teve um time de Stand-in chamado 'FURIA Academy'\n- O mapa preferido da equipe é Mirage\n- arT é conhecido por estratégias agressivas inovadoras\n- KSCERATO tem um dos melhores ratings HLTV da equipe",
};

async function insertData() {
  try {
    const count = await Response.countDocuments();
    if (count > 0) {
      console.log("✅ Banco já populado, ignorando inserção.");
      return;
    }

    for (const [keyword, reply] of Object.entries(LOCAL_KNOWLEDGE)) {
      const newResponse = new Response({ keyword, reply });
      await newResponse.save();
      console.log(`✅ Dados de '${keyword}' inseridos com sucesso.`);
    }
  } catch (err) {
    console.error("❌ Erro ao inserir dados:", err);
  }
}

module.exports = insertData;
