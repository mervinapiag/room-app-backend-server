'use strict';

/**
 * replay controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::replay.replay');
