import express from 'express';
import Game from '../schemas/Game.js';
const router = express.Router();

router.post('/create', async (req, res) => {
  try {
    const { title, description, type, picture, author } = req.body;
    const game = await Game.create({
      title,
      description,
      type,
      picture,
      author,
    });
    res.status(201).json(game);
  } catch (err) {
    if (err.code === 11000) {
      res.json({ error: 'duplicate entry', detail: err.keyValue });
      return;
    }
    res.json({ error: err.message || err.toString() });
  }
});

router.get('/all', async (req, res) => {
  try {
    const games = await Game.find();
    res.status(200).json(games);
  } catch {
    res.json({ error: err.message || err.toString() });
  }
});

router.get('/id/:gameId', async (req, res) => {
  try {
    const { gameId } = req.params;
    if (!gameId.match(/^[0-9a-fA-F]{24}$/)) {
      throw Error('please provide a valid game id');
    }
    const game = await Game.findById(gameId).exec();
    if (!game) {
      throw Error('Game not found');
    }
    res.status(200).json(game);
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
});

export default router;
