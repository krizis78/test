import { fetchUserCNS } from './fetchUserCNS.js';
import { uploadToIPFS } from './uploadToIPFS.js';
import { updateCNSOnBlockchain } from './updateCNSOnBlockchain.js';
import { getDynamicFee } from './getDynamicFee.js';

export async function removeCNSName(cnsName, userAccount) {
    try {
        const metadata = await fetchUserCNS(userAccount);
        if (!metadata || !metadata.cnsNames[cnsName]) {
            alert("CNS name not found.");
            return;
        }

        delete metadata.cnsNames[cnsName];
        const ipfsHash = await uploadToIPFS(metadata, userAccount);
        const fee = await getDynamicFee();

        await updateCNSOnBlockchain(cnsName, ipfsHash, fee, userAccount);
        alert(`CNS name "${cnsName}" removed successfully.`);
    } catch (error) {
        console.error("Error removing CNS name:", error);
        alert("Failed to remove CNS name.");
    }
}
