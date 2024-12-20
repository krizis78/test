/****************************************
 * config.js - Centralized Configurations
 ****************************************/

/* ========== SMART CONTRACT CONFIGURATION ========== */
export const CONTRACT_ADDRESS = "0xe374c1ec9e469031bf960cf56fb19db418983ad6";

export const CONTRACT_ABI = [{"inputs":[{"internalType":"address","name":"_feeRecipient","type":"address"},{"internalType":"uint256","name":"_fee","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"newRecipient","type":"address"}],"name":"FeeRecipientUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newFee","type":"uint256"}],"name":"FeeUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"nameHash","type":"bytes32"},{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"string","name":"metadataHash","type":"string"}],"name":"NameRegistered","type":"event"},{"inputs":[],"name":"fee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feeRecipient","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"nameToIPFSHash","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"hashedName","type":"bytes32"},{"internalType":"string","name":"metadataHash","type":"string"}],"name":"registerName","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"hashedName","type":"bytes32"}],"name":"resolveIPFS","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"newFee","type":"uint256"}],"name":"setFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newRecipient","type":"address"}],"name":"setFeeRecipient","outputs":[],"stateMutability":"nonpayable","type":"function"}];

/* ========== IPFS (PINATA) API CONFIGURATION ========== */
export const PINATA_API_KEY = "9da92bc1be1ffc23ecd2";
export const PINATA_SECRET_API_KEY = "17f44a3270b139b6143d0638b021712ec4654cbaf7d93035ba24d6df904f3e8e";

/****************************************
 * Exported Configurations
 * - CONTRACT_ADDRESS: Smart contract address.
 * - CONTRACT_ABI: ABI for the smart contract.
 * - PINATA_API_KEY, PINATA_SECRET_API_KEY: Pinata IPFS API keys.
 ****************************************/
