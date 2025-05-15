// controllers/playonlinegame.controller.js
export const getGameURL = (req, res) => {
  try {
    // Just for mock purpose — could be dynamic based on query, user, etc.
    const gameURL = "https://www.htmlgames.com";
    res.status(200).json({ gameURL });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch game URL" });
  }
};
