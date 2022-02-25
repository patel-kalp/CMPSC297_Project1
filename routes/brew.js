function brew(app) {
    app.get("/brew", function (request, response) {
        response
            .status(418)
            .send("I'm a teapot, so I cannot brew coffee!");
    });
}

module.exports = brew;