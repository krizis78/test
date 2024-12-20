import { toggleAddress } from './addAddress.js';

export function renderCNS(cnsNames, userAccount, contract) {
    const container = document.getElementById("cnsContainer");
    container.innerHTML = ""; // Clear previous content

    const blockchains = ["Ethereum", "BSC", "Polygon", "Solana", "Tron"];

    Object.entries(cnsNames).forEach(([name, data]) => {
        const div = document.createElement("div");
        div.style.border = "1px solid #ccc";
        div.style.padding = "10px";
        div.style.marginBottom = "10px";
        div.style.borderRadius = "5px";

        const addresses = data.addresses || {};

        let blockchainFields = blockchains.map((blockchain) => {
            const address = addresses[blockchain] || "";
            const buttonText = address ? "Remove" : "Add";

            return `
                <div id="address-field-${name}-${blockchain}" style="margin-bottom: 10px;">
                    ${
                        address
                            ? `<span id="address-display-${name}-${blockchain}">${address}</span>
                               <button id="toggle-btn-${name}-${blockchain}" 
                                       onclick="addAddressHandler('${name}', '${blockchain}')">
                                   Remove
                               </button>`
                            : `<input type="text" id="address-input-${name}-${blockchain}" 
                                       placeholder="Enter ${blockchain} address" 
                                       style="width: 60%; margin-right: 10px;">
                               <button id="toggle-btn-${name}-${blockchain}" 
                                       onclick="addAddressHandler('${name}', '${blockchain}')">
                                   Add
                               </button>`
                    }
                </div>
            `;
        });

        div.innerHTML = `
            <strong>CNS Name:</strong> ${name}
            <div style="margin-top: 10px;">
                ${blockchainFields.join("")}
            </div>
        `;
        container.appendChild(div);
    });
}
