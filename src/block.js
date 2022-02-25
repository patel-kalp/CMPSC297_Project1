const crypto = require("crypto");

function SHA256(message) {
    return crypto
        .createHash("sha256")
        .update(message)
        .digest("hex");
}

class Block {
    constructor(prevHash = "", transactions = []) {
        this.timestamp = Date.now(); // current timestamp
        this.transactions = transactions; // transaction list
        this.hash = this.getHash(); // current block's hash
        this.prevHash = prevHash; // previous block's hash
        this.nonce = 0; // random val for mining
        this.mine(); // mine the block
    }

    getHash() {
        // Combine all transactions into strings
        let txStr = "";
        for (let i = 0; i < this.transactions.length; i++) {
            txStr += JSON.stringify(this.transactions[i]);
        }

        // Hash together...
        return SHA256(
            this.prevHash + // previous hash
            this.timestamp + // timestamp of  block
            txStr + // all transactions
            this.nonce // let's toss in some random nonce for fun
        );
    }

    // Mine a new block (generate a hash that works)
    mine() {
        // Let's loop until our hash starts with a string 0...000
        //  The length of this string is set through difficulty (default: 1)
        let checkString = Array(global.difficulty + 1).join("0");
        let tries = 0;
        while (!this.hash.startsWith(checkString)) {
            // increase the nonce so we get a whole different hash
            this.nonce++;
            // recompute the entire hash
            this.hash = this.getHash();
            // count tries
            tries++;
        }
        // Out of curiosity, let's see how many tries we took!
        console.log(`Block mined with ${tries} attempts. Hash: ${this.hash}`);
    }

    // Pretty prints the block
    prettify() {
        // Add basic block parameters
        let blockStr = `<div><b>Block</b> #${this.hash}</div>`;
        blockStr += `<div><b>Timestamp:</b> ${this.timestamp}</div>`;
        blockStr += `<div><b>Previous Hash:</b> ${this.prevHash}</div>`;
        blockStr += "<div><b>Transactions:</b></div><div>";

        // Iterate through all transactions
        for (let i = 0; i < this.transactions.length; i++) {
            blockStr += "    " + this.transactions[i].prettify();
        }
        blockStr += "</div>";
        return blockStr;
    }
}

// Export this object
module.exports = Block;