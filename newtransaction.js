const Transaction = require("../src/transaction");

function newtransaction(app) {
    app.get("/newtransaction", function (request, response) {
        let tx = new Transaction();
        global.transactions.push(tx);
        response
            .status(200) // HTTP status code 200: OK
            .send(tx.prettify()); // Response message
    });
}

module.exports = newtransaction;