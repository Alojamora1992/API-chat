const express = require('express');
const users = require('../../controllers/users-controller')
const messages = require('../../controllers/messages-controller')

const routes = (server) => {
    server.use('/users',users);
    server.use('/messages',messages);
}

module.exports = routes;