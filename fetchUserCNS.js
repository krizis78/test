import { PINATA_API_KEY, PINATA_SECRET_API_KEY } from './config.js';

export async function fetchUserCNS(userAccount) {
    const fileName = `${userAccount}.json`;
    try {
        const response = await axios.get("https://api.pinata.cloud/data/pinList", {
            headers: {
                "pinata_api_key": PINATA_API_KEY,
                "pinata_secret_api_key": PINATA_SECRET_API_KEY
            },
            params: { metadata: { name: fileName } }
        });

        if (response.data.rows.length === 0) return null;
        const ipfsHash = response.data.rows[0].ipfs_pin_hash;

        const metadataResponse = await axios.get(`https://gateway.pinata.cloud/ipfs/${ipfsHash}`);
        return metadataResponse.data;
    } catch (error) {
        console.error("Error fetching CNS data:", error);
        throw error;
    }
}
