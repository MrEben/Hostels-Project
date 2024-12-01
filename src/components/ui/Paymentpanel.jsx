import React, { useState } from "react";

const PaymentInterface = () => {
  const [activeTab, setActiveTab] = useState("card");
  const [amount, setAmount] = useState("");
  const balance = 5.28;

  const tabs = [
    { id: "mobile", label: "Mobile Money" },
    { id: "paybill", label: "Paybill" },
    { id: "card", label: "Card" },
  ];

  const styles = {
    container: {
      maxWidth: "500px",
      margin: "0 auto",
      padding: "20px",
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    tabContainer: {
      display: "flex",
      borderBottom: "1px solid #e0e0e0",
      marginBottom: "24px",
    },
    tab: {
      padding: "12px 16px",
      marginRight: "8px",
      borderWidth: "0",
      borderStyle: "none",
      borderColor: "transparent",
      borderBottomWidth: "2px",
      borderBottomStyle: "solid",
      borderBottomColor: "transparent",
      background: "none",
      cursor: "pointer",
      position: "relative",
      color: "#666",
    },
    activeTab: {
      color: "#22c55e",
      borderBottomColor: "#22c55e",
    },
    newBadge: {
      marginLeft: "8px",
      backgroundColor: "#22c55e",
      color: "white",
      padding: "2px 8px",
      borderRadius: "4px",
      fontSize: "12px",
    },
    warningBox: {
      backgroundColor: "#fefce8",
      padding: "16px",
      borderRadius: "8px",
      marginBottom: "24px",
    },
    warningText: {
      fontSize: "14px",
      color: "#333",
    },
    warningIcon: {
      color: "#eab308",
      marginRight: "8px",
    },
    inputGroup: {
      marginBottom: "16px",
    },
    inputWrapper: {
      position: "relative",
    },
    input: {
      width: "100%",
      padding: "12px",
      paddingLeft: "40px",
      border: "1px solid #e0e0e0",
      borderRadius: "8px",
      fontSize: "14px",
      boxSizing: "border-box",
    },
    icon: {
      position: "absolute",
      left: "12px",
      top: "50%",
      transform: "translateY(-50%)",
      color: "#9ca3af",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "16px",
      marginBottom: "16px",
    },
    checkbox: {
      display: "flex",
      alignItems: "center",
      marginBottom: "16px",
    },
    checkboxInput: {
      width: "16px",
      height: "16px",
      marginRight: "8px",
    },
    balance: {
      textAlign: "right",
      fontSize: "14px",
      color: "#666",
      marginBottom: "8px",
    },
    minAmount: {
      textAlign: "right",
      fontSize: "12px",
      color: "#9ca3af",
      marginTop: "4px",
    },
    button: {
      width: "100%",
      padding: "16px",
      backgroundColor: "#f3f4f6",
      border: "none",
      borderRadius: "8px",
      color: "#4b5563",
      cursor: "pointer",
      fontSize: "14px",
      transition: "background-color 0.2s",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.tabContainer}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              ...styles.tab,
              ...(activeTab === tab.id ? styles.activeTab : {}),
            }}
          >
            {tab.label}
            {tab.id === "card" && <span style={styles.newBadge}>NEW</span>}
          </button>
        ))}
      </div>

      {/* <div style={styles.warningBox}>
        <p style={styles.warningText}>
          <span style={styles.warningIcon}>!</span>
          The name associated with your deposit will be used as your Sporty
          account name. You will only be able to withdraw back to this name.
        </p>
      </div> */}

      <div style={styles.inputGroup}>
        <div style={styles.inputWrapper}>
          <input type="text" placeholder="Card Number" style={styles.input} />
          <span style={styles.icon}>💳</span>
        </div>
      </div>

      <div style={styles.grid}>
        <div style={styles.inputWrapper}>
          <input type="text" placeholder="Expiry" style={styles.input} />
          <span style={styles.icon}>📅</span>
        </div>
        <div style={styles.inputWrapper}>
          <input type="text" placeholder="CVV" style={styles.input} />
          <span style={styles.icon}>🔒</span>
        </div>
      </div>

      <div style={styles.checkbox}>
        <input type="checkbox" id="savedCard" style={styles.checkboxInput} />
        <label htmlFor="savedCard">Saved Card</label>
      </div>

      <div style={styles.balance}>Balance (GHS) {balance.toFixed(2)}</div>

      <div style={styles.inputGroup}>
        <div style={styles.inputWrapper}>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount (GHS)"
            style={styles.input}
          />
        </div>
        <div style={styles.minAmount}>min. 1.00</div>
      </div>

      <button
        style={styles.button}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#e5e7eb")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#f3f4f6")}
      >
        Top Up Now
      </button>
    </div>
  );
};

export default PaymentInterface;
