import { useState } from "react";
import { FiCamera, FiCheckCircle, FiXCircle, FiX } from "react-icons/fi";

function QRScannerModal({ isOpen, onClose, onScanSuccess }) {
  const [passInput, setPassInput] = useState("");
  const [scannedResult, setScannedResult] = useState(null);
  const [scanning, setScanning] = useState(false);

  if (!isOpen) return null;

  const handleSimulateScan = (passId) => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setScannedResult({
        passId: passId || "VP-882194",
        status: "valid",
        timestamp: new Date().toLocaleTimeString(),
      });
    }, 1000);
  };

  const handleConfirm = () => {
    if (scannedResult) {
      onScanSuccess(scannedResult.passId);
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ textAlign: "center" }}>
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: "none",
            border: "none",
            color: "var(--text-muted)",
            fontSize: "1.2rem",
            cursor: "pointer",
          }}
        >
          <FiX />
        </button>

        <h3 style={{ fontSize: "1.3rem", fontWeight: "700", marginBottom: "0.5rem" }}>
          🔍 Security QR Scanner
        </h3>
        <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
          Scan the QR Code on visitor pass or enter Pass ID manually for quick check-in / check-out.
        </p>

        {/* Viewfinder simulation */}
        <div
          style={{
            width: "240px",
            height: "240px",
            margin: "0 auto 1.5rem auto",
            border: "2px dashed var(--primary)",
            borderRadius: "16px",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(15, 23, 42, 0.7)",
            boxShadow: scanning ? "0 0 20px var(--primary-glow)" : "none",
          }}
        >
          <FiCamera style={{ fontSize: "3rem", color: scanning ? "var(--primary)" : "var(--text-muted)" }} />
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
            {scanning ? "Scanning QR Code..." : "Align QR Code inside frame"}
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
          <input
            type="text"
            className="input-field"
            placeholder="Type Pass ID (e.g. VP-882194)"
            value={passInput}
            onChange={(e) => setPassInput(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleSimulateScan(passInput)}
          >
            Verify
          </button>
        </div>

        {scannedResult && (
          <div
            style={{
              padding: "1rem",
              borderRadius: "12px",
              background: "rgba(16, 185, 129, 0.1)",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              marginBottom: "1rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
              <FiCheckCircle style={{ color: "#34d399", fontSize: "1.3rem" }} />
              <span style={{ fontWeight: "700", color: "#34d399" }}>
                Valid Pass Found: {scannedResult.passId}
              </span>
            </div>
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
              Verified at {scannedResult.timestamp}
            </p>

            <button
              className="btn btn-success"
              style={{ width: "100%", marginTop: "1rem" }}
              onClick={handleConfirm}
            >
              Confirm Gate Log Entry
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default QRScannerModal;
