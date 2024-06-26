const SHA256 = require("crypto-js/sha256");
class Block {
  constructor(index, timestamp, data, precedingHash = " ") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.precedingHash = precedingHash;
    this.hash = this.computeHash();
    this.nonce = 0;
  }

  computeHash() {
    return SHA256(
      this.index +
        this.precedingHash +
        this.timestamp +
        JSON.stringify(this.data) +
        this.nonce
    ).toString();
  }

  proofOfWork(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.computeHash();
    }
  }
}

class Blockchain {
  constructor() {
    this.blockchain = [this.startGenesisBlock()]; //Array of blocks
    this.difficulty = 4;
  }
  startGenesisBlock() {
    return new Block(0, "01/01/2020", "Initial Block in the Chain", "0"); //First block
  }

  obtainLatestBlock() {
    return this.blockchain[this.blockchain.length - 1];
  }
  addNewBlock(newBlock) {
    newBlock.precedingHash = this.obtainLatestBlock().hash;
    //newBlock.hash = newBlock.computeHash();
    newBlock.proofOfWork(this.difficulty);
    this.blockchain.push(newBlock);
  }

  checkChainValidity() {
    for (let i = 1; i < this.blockchain.length; i++) {
      const currentBlock = this.blockchain[i];
      const precedingBlock = this.blockchain[i - 1];

      if (currentBlock.hash !== currentBlock.computeHash()) {
        return false;
      }
      if (currentBlock.precedingHash !== precedingBlock.hash) return false;
    }
    return true;
  }
}

let Asterite = new Blockchain();
console.log("Asterite mining in progress....");
Asterite.addNewBlock(
  new Block(1, "23/06/24", {
    sender: "Chixia",
    recipient: "Rover",
    quantity: 1000,
  })
);
Asterite.addNewBlock(
  new Block(2, "23/06/24", {
    sender: "Yang Yang",
    recipient: "Rover",
    quantity: 10000,
  })
);
console.log(JSON.stringify(Asterite, null, 4));
