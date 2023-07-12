'use strict';

/**
 * replay service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::replay.replay');
