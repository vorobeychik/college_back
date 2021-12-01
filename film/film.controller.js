const { Router } = require('express');
const FilmService = require('./film.service')
const router = Router();


router.post('/create',async (req, res) => {
    const requestBody = req.body;
    const film = await FilmService.createFilm(requestBody);

    res.json({message:'created'})

})

router.get('/',async (req, res) => {
    const requestBody = req.body;
    const films = await FilmService.getFilms();

    res.json( films )

})

module.exports = router;