import { fetchUserCNS } from './fetchUserCNS.js';
import { uploadToIPFS } from './uploadToIPFS.js';
import { updateCNSOnBlockchain } from './updateCNSOnBlockchain.js';

export async function toggleAddress(cnsName, blockchain, userAccount, contract, loadCNSNames) {
    try {
        // Step 1: Fetch the current metadata
        const metadata = await fetchUserCNS(userAccount);
        console.log("Fetched CNS metadata:", metadata);

        // Validate CNS name
        if (!metadata || !metadata.cnsNames || !metadata.cnsNames[cnsName]) {
            alert("CNS name does not exist. Please register it first.");
            return;
        }

        // Step 2: Add or Remove the address
        const addresses = metadata.cnsNames[cnsName].addresses || {};
        const blockchainKey = blockchain.toUpperCase();
        const inputField = document.getElementById(`address-input-${cnsName}-${blockchain}`);
        const newAddress = inputField?.value.trim();

        if (addresses[blockchainKey]) {
            // Remove the address
            delete addresses[blockchainKey];
            console.log(`Removed address for ${blockchainKey}`);
        } else if (newAddress) {
            // Add the address
            addresses[blockchainKey] = newAddress;
            console.log(`Added address for ${blockchainKey}:`, newAddress);
        } else {
            alert("Please enter a valid address.");
            return;
        }

        // Step 3: Update the metadata
        metadata.cnsNames[cnsName].addresses = addresses;
        console.log("Updated metadata:", metadata);

        // Step 4: Upload updated metadata to IPFS
        const newIpfsHash = await uploadToIPFS(metadata, userAccount);
        console.log("New IPFS hash:", newIpfsHash);

        // Step 5: Update the blockchain with the new IPFS hash
        const fee = await contract.methods.fee().call();
        console.log(`Dynamic fee fetched: ${fee}`);

        await updateCNSOnBlockchain(newIpfsHash, userAccount, contract, fee);

        alert("Address updated successfully!");

        // Step 6: Refresh the CNS list
        await loadCNSNames();
    } catch (error) {
        console.error("Error updating address:", error);
        alert("Failed to update address. Check the console for details.");
    }
}
