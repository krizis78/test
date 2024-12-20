export async function getDynamicFee(contract) {
    if (!contract) {
        throw new Error("Contract instance is undefined.");
    }

    try {
        const fee = await contract.methods.fee().call();
        console.log("Raw Fee Fetched from Contract:", fee);

        // Convert the fee to Ether for debugging purposes
        const feeInEther = Web3.utils.fromWei(fee, "ether");
        console.log("Fee in ETH:", feeInEther);

        return fee; // Return the raw fee for the transaction
    } catch (error) {
        console.error("Error fetching dynamic fee:", error);
        throw error;
    }
}
