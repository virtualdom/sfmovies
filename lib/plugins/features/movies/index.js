'use strict';

const Controller           = require('./controller');
const MovieCreateValidator = require('../../../validators/movieCreate');
const MovieListValidator   = require('../../../validators/movieList');

exports.register = (server, options, next) => {

  server.route([{
    method: 'GET',
    path: '/movies',
    config: {
      handler: function (request, reply) {
        return Controller.list(request.query)
        .then((movieList) => {
          return reply({
            count: movieList.length,
            data: movieList
          });
        });
      },
      validate: {
        query: MovieListValidator
      }
    }
  }]);

  server.route([{
    method: 'POST',
    path: '/movies',
    config: {
      handler: function (request, reply) {
        reply(Controller.create(request.payload));
      },
      validate: {
        payload: MovieCreateValidator
      }
    }
  }]);

  next();

};

exports.register.attributes = {
  name: 'movies'
};
