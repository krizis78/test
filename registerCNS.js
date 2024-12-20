import { getDynamicFee } from './getDynamicFee.js';

export async function registerCNSName(contract, userAccount, name, ipfsHash) {
    const hashedName = web3.utils.keccak256(name);
    try {
        const fee = await getDynamicFee(contract); // Fetch the dynamic fee
        await contract.methods.registerName(hashedName, ipfsHash).send({
            from: userAccount,
            value: fee
        });
        console.log("CNS registered successfully!");
    } catch (error) {
        console.error("Error registering CNS:", error);
        throw error;
    }
}
