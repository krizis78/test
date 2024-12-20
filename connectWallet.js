import { CONTRACT_ADDRESS, CONTRACT_ABI } from './config.js';

let web3, contract, userAccount;

export async function connectWallet() {
    if (!window.ethereum) {
        alert("MetaMask is required. Please install it.");
        console.error("MetaMask provider not detected.");
        return null;
    }

    try {
        console.log("Requesting wallet connection...");
        web3 = new Web3(window.ethereum); // Properly initialize Web3 using MetaMask's provider

        // Request wallet access
        await window.ethereum.request({ method: "eth_requestAccounts" });

        // Fetch connected accounts
        const accounts = await web3.eth.getAccounts();
        if (accounts.length === 0) throw new Error("No accounts connected.");

        userAccount = accounts[0];
        console.log("Wallet connected:", userAccount);

        // Initialize the smart contract
        contract = new web3.eth.Contract(CONTRACT_ABI,
