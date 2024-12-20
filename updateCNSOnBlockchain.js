import { web3 } from './connectWallet.js';

export async function updateCNSOnBlockchain(cnsName, ipfsHash, fee, userAccount, contract) {
    if (!contract) throw new Error("Contract instance is not initialized.");
    if (!web3) throw new Error("Web3 is not initialized. Please connect your wallet.");

    try {
        const hashedName = web3.utils.keccak256(cnsName); // Use the proper Web3 instance
        console.log(`Registering CNS Name: ${cnsName}, IPFS Hash: ${ipfsHash}, Fee: ${fee}`);

        // Send transaction to the blockchain
        await contract.methods.registerName(hashedName, ipfsHash).send({
            from: userAccount,
            value: fee
        });

        console.log("CNS Name registered successfully on the blockchain!");
    } catch (error) {
        console.error("Error registering CNS on blockchain:", error);
        throw error;
    }
}
