import express from 'express';
import mongoose from 'mongoose';
import Score from '../schemas/Score.js';
import Game from '../schemas/Game.js';
import User from '../schemas/User.js';
const router = express.Router();

router.post('/add', async (req, res) => {
  const session = await mongoose.startSession();
  try {
    const { gameId, sessionId, score } = req.body;

    if (!gameId || !sessionId || !score?.length) {
      throw Error('invalid data');
    }

    const transactionResults = await session.withTransaction(async () => {
      const documents = [];
      for (const currentScore of score) {
        const user = await User.findById(currentScore.userId).exec();
        const game = await Game.findById(gameId).exec();
        documents.push({
          game: game._id,
          sessionId,
          user: user._id,
          score: currentScore?.score || 0,
          win: currentScore?.win || false,
          lose: currentScore?.lose || false,
          draw: currentScore?.draw || false,
        });
      }
      await Score.create(documents, { session });
    });
    if (!transactionResults) {
      throw Error('failed to insert');
    }
    res.status(200).send('Successfully inserted');
  } catch (err) {
    session.end;
    res.status(400).json({ error: err.message || err.toString() });
  } finally {
    session.endSession();
  }
});

router.get('/all', async (req, res) => {
  try {
    const scores = await Score.find()
      .populate('user', ['firstName', 'lastName', 'picture'])
      .populate('game', ['title', 'type'])
      .exec();
    res.status(200).json(scores);
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
});

router.get('/leaderboard/weekly', async (req, res) => {
  try {
    let weeklyCutoffDate = new Date();
    weeklyCutoffDate.setDate(weeklyCutoffDate.getDate() - 7);

    const scores = await Score.find({ createdDate: { $gt: weeklyCutoffDate } })
      .populate('user', ['firstName', 'lastName', 'picture'])
      .populate('game', ['title', 'type'])
      .exec();

    const userScoreMap = scores.reduce((map, score) => {
      if (!map[score.user._id]) {
        map[score.user._id] = {
          name: `${score.user.firstName} ${score.user.lastName}`,
          picture: score.user.picture,
          plays: 1,
          id: score.user._id,
          score: score.score,
          win: score.win ? 1 : 0,
          lose: score.lose ? 1 : 0,
          draw: score.draw ? 1 : 0,
        };
        return map;
      }
      map[score.user._id].plays++;
      map[score.user._id].score += score.score;
      map[score.user._id].win += score.win ? 1 : 0;
      map[score.user._id].lose += score.lose ? 1 : 0;
      map[score.user._id].draw += score.draw ? 1 : 0;
      return map;
    }, {});
    res.status(200).json(Object.values(userScoreMap));
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
});

export default router;
