const Tweet = require('../models/Tweet');

module.exports = {
    async index(req, res){
        const tweets = await Tweet.find({}).sort('-createdAt'); // o caracter '-' e para ordenar de forma contraria ao padrao
    
        return res.json(tweets);
    },
    async create(req, res){
        const tweet = await Tweet.create(req.body);

        req.io.emit('tweet', tweet); // quando chegar nessa parte da aplicacao, sera enviado para todos que estao conectados o tweet criado

        return res.json(tweet);
    }
}