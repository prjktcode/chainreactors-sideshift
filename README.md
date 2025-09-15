# **Integrating SideShift API into Our Portfolio Manager**

## **Key API Steps**

### **Create an Account**
- Generate and store the **x-sideshift-secret** (private key) and **affiliateId** for API authentication.

### **Request a Quote**
- Use **/v2/quotes** endpoint (**POST**) to get a quote for converting assets across chains.
- You provide parameters like **depositCoin**, **depositNetwork**, **settleCoin**, **settleNetwork**, and **depositAmount** or **settleAmount**.

### **Create a Shift (Fixed or Variable)**
- **Fixed Rate:** Use **/v2/shifts/fixed** with **quoteId**, **settleAddress**, and IDs to lock in the rate for up to 15 minutes.
- **Variable Rate:** Use **/v2/shifts/variable** for flexible amounts, valid up to 7 days.

### **Monitor Shift Status**
- Poll **/v2/shifts/{shiftId}** to follow the lifecycle (e.g., **waiting**, **pending**, **processing**, **settled**).

### **Handle Edge Cases**
- Incorporate logic for deposit memos, refunds, and multiple deposits.

---

## **Prototype Architecture**

Here’s how to layer the SideShift API into our AI-driven portfolio manager:

### **Backend (Python + FastAPI)**

**Endpoints to build:**

- **POST /api/quote**
    - **Inputs:** source coin, target coin, amount, target chain, goals
    - **Actions:** calls **/v2/quotes**, returns **quoteId**
- **POST /api/shift**
    - **Inputs:** **quoteId**, wallet **settleAddress**
    - **Actions:** calls **/v2/shifts/fixed**, returns **shiftId** + deposit address
- **GET /api/status/{shiftId}**
    - **Actions:** returns shift lifecycle status by polling **/v2/shifts/{shiftId}**
- **POST /api/suggest-swap**
    - **Inputs:** current holdings, target allocation
    - **Outputs:** recommended swaps (can be heuristic or LLM-powered)

**Flow Example:**
1. User’s strategy triggers need to rebalance (e.g. too much ETH).
2. **/suggest-swap** suggests: “Swap 0.5 ETH → 0.3 BTC, 0.2 USDT.”
3. For each swap:
    - Call **/api/quote**, receive **quoteId**
    - Call **/api/shift** to get deposit address
4. Backend monitors until settled, then updates the dashboard.

### **Frontend (React + Ethers.js or WalletConnect)**

**Dashboard View:**
- Connect wallet
- Display current holdings and target allocations
- Button: “**Rebalance Portfolio**”
- Show recommended swap plan and accept/confirm before executing
- After execution, show deposit address and status updates

**User Experience:**
- **Minimal interface**—focus on clarity and trust
- Show swap reasoning (e.g., “Reducing ETH exposure to lower volatility risk”)
- Provide easy support access (e.g., link to SideShift with shift ID)
