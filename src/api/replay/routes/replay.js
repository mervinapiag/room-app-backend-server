'use strict';

/**
 * replay router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::replay.replay');
