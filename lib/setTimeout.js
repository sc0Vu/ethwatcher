'use strict'

const setTimeout = (window === undefined) ? setTimeout : window.setTimeout;

module.exports = setTimeout;