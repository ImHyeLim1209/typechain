import * as CryptoJS from "crypto-js";

class Block {
  static calculateBlockHash = (   //static -> Block 인스턴스 생성 전에 호출 가능
    index: number,
    previousHash: string,
    timestamp: number,
    data: string): string =>
    CryptoJS.SHA256(index, + previousHash + timestamp + data).toString();

  static validateStructure = (aBlock: Block): boolean => {
    return typeof aBlock.index === "number" &&
      typeof aBlock.hash === "string" &&
      typeof aBlock.previousHash === "string" &&
      typeof aBlock.timestamp === "number" &&
      typeof aBlock.data === "string";
  }

  public index: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timestamp: number;

  constructor(
    index: number,
    hash: string,
    previousHash: string,
    data: string,
    timestamp: number
  ) {
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.data = data;
    this.timestamp = timestamp
  }
}

const genesisBlock: Block = new Block(0, "1121212", "", "Hello", 123456);
let blockchain: [Block] = [genesisBlock];

const getBlockChain = (): Block[] => blockchain;
const getLastestBlock = (): Block => blockchain[blockchain.length - 1];
const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string): Block => {
  const previousBlock: Block = getLastestBlock();
  const newIndex: number = previousBlock.index + 1;
  const newTimeStamp: number = getNewTimeStamp();
  const newHash: string = Block.calculateBlockHash(newIndex, previousBlock.hash, newTimeStamp, data);
  const newBlock: Block = new Block(newIndex, newHash, previousBlock.hash, data, newTimeStamp);
  addBlock(newBlock);
  return newBlock;
}

const getHashForBlock = (aBlock: Block): string => Block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data);

const isBlockValid = (candidateBlocK: Block, previousBlock: Block): boolean => {
  if (!Block.validateStructure(candidateBlocK)) {
    return false;
  } else if (previousBlock.index + 1 !== candidateBlocK.index) {
    return false;
  } else if (previousBlock.hash !== candidateBlocK.previousHash) {
    return false;
  } else if (getHashForBlock(candidateBlocK) !== candidateBlocK.hash) {
    return false;
  } else {
    return true;
  }
}

const addBlock = (candidateBlock: Block): void => {
  if (isBlockValid(candidateBlock, getLastestBlock())) {
    blockchain.push(candidateBlock);
  }
}

createNewBlock("Second");
createNewBlock("Third");
createNewBlock("Forth");

console.log(blockchain);

export { };






//interface는 JS로 컴파일되지 않는다. (넣고싶으면 class 써라)
//interface를 쓰는 것이 calss 보다 더 안전해(TS 측면에서)

//export {};
//이 파일이 모듈이 될 것이라는 의미
//없으면 내부에서 const name = "ihl"; 선언 불가능
