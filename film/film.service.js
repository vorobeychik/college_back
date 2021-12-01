const filmModel = require('./film.model');

class FilmService {
    async createFilm(film) {
        return filmModel.create({...film})
    }

    async getFilms(film){
        return filmModel.find({})
    }
}


module.exports = new FilmService();