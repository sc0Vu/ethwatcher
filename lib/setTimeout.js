'use strict'

const setTimeoutLib = (typeof window === 'object' && window.setTimeout !== undefined) ? window.setTimeout : setTimeout;

module.exports = setTimeoutLib;