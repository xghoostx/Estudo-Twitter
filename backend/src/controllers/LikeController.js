const Tweet = require('../models/Tweet');

module.exports = {
    async create (req, res) {
        const tweet = await Tweet.findById(req.params.id) // nome da variavel nos parametros

        tweet.set({ likes: tweet.likes + 1 });
        await tweet.save();

        req.io.emit('like', tweet); // quando chegar nessa parte da aplicacao, sera enviado o tweet atualizado com os likes etc para todos conectados na aplicacao

        return res.json(tweet);
    },
}