import { PINATA_API_KEY, PINATA_SECRET_API_KEY } from './config.js';

export async function uploadToIPFS(userAccount, newCnsName) {
    console.log("Updating CNS metadata for wallet:", userAccount);

    let existingMetadata = { cnsNames: {} };

    try {
        // Fetch existing metadata file
        const fileName = `${userAccount}.json`;
        const response = await axios.get("https://api.pinata.cloud/data/pinList", {
            headers: {
                "pinata_api_key": PINATA_API_KEY,
                "pinata_secret_api_key": PINATA_SECRET_API_KEY,
            },
            params: { metadata: { name: fileName } }
        });

        if (response.data.rows.length > 0) {
            const ipfsHash = response.data.rows[0].ipfs_pin_hash;
            console.log("Existing file found on Pinata:", ipfsHash);

            const metadataResponse = await axios.get(`https://gateway.pinata.cloud/ipfs/${ipfsHash}`);
            existingMetadata = metadataResponse.data;
        } else {
            console.log("No existing CNS metadata found. Creating a new file.");
        }
    } catch (error) {
        console.warn("Failed to fetch existing metadata. Assuming new file.");
    }

    // Merge new CNS name into existing metadata
    existingMetadata.cnsNames = {
        ...existingMetadata.cnsNames,
        [newCnsName]: { addresses: {} }
    };

    console.log("Updated CNS Metadata:", existingMetadata);
	console.log("userAccount value:", userAccount);
    console.log("Type of userAccount:", typeof userAccount);

    try {
        // Upload updated metadata to Pinata
        const formData = new FormData();
        const fileName = `${userAccount}.json`;

        formData.append("file", new Blob([JSON.stringify(existingMetadata)], { type: "application/json" }), fileName);
        formData.append("pinataMetadata", JSON.stringify({ name: fileName }));

        const response = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "pinata_api_key": PINATA_API_KEY,
                "pinata_secret_api_key": PINATA_SECRET_API_KEY
            }
        });

        console.log("IPFS Upload Successful:", response.data.IpfsHash);
        return response.data.IpfsHash;
    } catch (error) {
        console.error("Error uploading to IPFS:", error.response?.data || error.message);
        throw new Error("Failed to upload metadata to IPFS.");
    }
}
