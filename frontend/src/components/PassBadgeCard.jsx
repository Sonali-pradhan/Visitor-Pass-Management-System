import { QRCodeCanvas } from "qrcode.react";
import jsPDF from "jspdf";
import { FiDownload, FiPrinter, FiShield, FiUser, FiCalendar, FiClock } from "react-icons/fi";

function PassBadgeCard({ visitorPass }) {
  if (!visitorPass) return null;

  const {
    passId = "VP-000000",
    name = visitorPass.visitorName || "Guest Visitor",
    company = "Independent",
    department = "General Access",
    hostName = "Campus Security",
    purpose = "Official Visit",
    photo,
    validTo = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    status = "Active",
  } = visitorPass;

  const downloadPDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [85, 125], // Badge size dimensions
    });

    // Badge Header
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, 85, 25, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("UNIVERSITY VISITOR PASS", 42.5, 10, { align: "center" });

    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.text("OFFICIAL ACCESS BADGE", 42.5, 16, { align: "center" });

    // Pass ID Box
    doc.setFillColor(99, 102, 241);
    doc.rect(15, 27, 55, 7, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text(`PASS ID: ${passId}`, 42.5, 31.5, { align: "center" });

    // Details
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(11);
    doc.text(name, 42.5, 43, { align: "center" });

    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text(`Company: ${company}`, 42.5, 49, { align: "center" });
    doc.text(`Host: ${hostName}`, 42.5, 55, { align: "center" });
    doc.text(`Dept: ${department}`, 42.5, 61, { align: "center" });
    doc.text(`Purpose: ${purpose}`, 42.5, 67, { align: "center" });

    // Footer Validity
    doc.setFontSize(7);
    doc.setTextColor(100, 116, 139);
    doc.text(`Valid Till: ${new Date(validTo).toLocaleDateString()}`, 42.5, 74, { align: "center" });

    doc.save(`Visitor_Pass_${passId}.pdf`);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.25rem",
      }}
    >
      {/* Badge Frame */}
      <div
        className="printable-pass"
        style={{
          width: "320px",
          background: "linear-gradient(145deg, rgba(17, 24, 39, 0.95), rgba(15, 23, 42, 0.98))",
          border: "2px solid var(--primary-glow)",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(99, 102, 241, 0.2)",
          padding: "1.5rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top Accent Strip */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "linear-gradient(90deg, #6366f1, #06b6d4, #10b981)",
          }}
        />

        {/* Lanyard Hole Mockup */}
        <div
          style={{
            width: "36px",
            height: "10px",
            background: "rgba(255, 255, 255, 0.1)",
            border: "1px solid var(--glass-border)",
            borderRadius: "10px",
            margin: "0 auto 1rem auto",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", marginBottom: "0.75rem" }}>
          <FiShield style={{ color: "var(--accent-cyan)", fontSize: "1.2rem" }} />
          <span style={{ fontSize: "0.8rem", fontWeight: "700", letterSpacing: "0.1em", color: "var(--accent-cyan)" }}>
            VISITOR IDENTIFICATION PASS
          </span>
        </div>

        {/* Visitor Photo & Details */}
        <div style={{ marginBottom: "1rem" }}>
          {photo ? (
            <img
              src={photo}
              alt={name}
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "3px solid var(--primary)",
                boxShadow: "0 0 15px rgba(99, 102, 241, 0.3)",
                marginBottom: "0.75rem",
              }}
            />
          ) : (
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "rgba(99, 102, 241, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 0.75rem auto",
                border: "2px solid var(--primary-glow)",
              }}
            >
              <FiUser style={{ fontSize: "2.5rem", color: "var(--primary)" }} />
            </div>
          )}

          <h3 style={{ fontSize: "1.3rem", fontWeight: "800", color: "#ffffff", margin: "0.25rem 0" }}>
            {name}
          </h3>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: "500" }}>
            {company}
          </p>
        </div>

        {/* Pass ID Pill */}
        <div
          style={{
            background: "rgba(99, 102, 241, 0.15)",
            border: "1px solid var(--primary-glow)",
            borderRadius: "8px",
            padding: "0.4rem 0.8rem",
            fontSize: "0.9rem",
            fontWeight: "700",
            fontFamily: "var(--font-mono)",
            color: "#818cf8",
            display: "inline-block",
            marginBottom: "1.25rem",
          }}
        >
          {passId}
        </div>

        {/* Info Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.75rem",
            fontSize: "0.8rem",
            textAlign: "left",
            background: "rgba(15, 23, 42, 0.6)",
            padding: "0.85rem",
            borderRadius: "12px",
            border: "1px solid var(--glass-border)",
            marginBottom: "1.25rem",
          }}
        >
          <div>
            <span style={{ color: "var(--text-dim)", display: "block", fontSize: "0.7rem" }}>HOST EMPLOYEE</span>
            <strong style={{ color: "var(--text-main)" }}>{hostName}</strong>
          </div>
          <div>
            <span style={{ color: "var(--text-dim)", display: "block", fontSize: "0.7rem" }}>DEPARTMENT</span>
            <strong style={{ color: "var(--text-main)" }}>{department}</strong>
          </div>
          <div style={{ gridColumn: "span 2" }}>
            <span style={{ color: "var(--text-dim)", display: "block", fontSize: "0.7rem" }}>PURPOSE OF VISIT</span>
            <strong style={{ color: "var(--text-main)" }}>{purpose}</strong>
          </div>
        </div>

        {/* QR Code Canvas */}
        <div
          style={{
            background: "#ffffff",
            padding: "0.75rem",
            borderRadius: "12px",
            display: "inline-block",
            marginBottom: "1rem",
          }}
        >
          <QRCodeCanvas value={JSON.stringify({ passId, name, hostName })} size={140} />
        </div>

        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem" }}>
          <FiCalendar /> Valid: {new Date(validTo).toLocaleDateString()}
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: "flex", gap: "0.75rem" }}>
        <button className="btn btn-primary" onClick={downloadPDF}>
          <FiDownload /> Download Badge PDF
        </button>
        <button className="btn btn-secondary" onClick={handlePrint}>
          <FiPrinter /> Print Badge
        </button>
      </div>
    </div>
  );
}

export default PassBadgeCard;
