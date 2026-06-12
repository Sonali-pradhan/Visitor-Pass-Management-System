import { useState, useContext } from "react";
import { PassContext } from "../../context/PassContext";
import { QRCodeCanvas } from "qrcode.react";
import jsPDF from "jspdf";
import "./Pass.css";

function GeneratePass() {
  const { addPass } = useContext(PassContext);

  const [formData, setFormData] = useState({
    visitorName: "",
    hostName: "",
  });

  const [generatedPass, setGeneratedPass] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const passData = {
      ...formData,
      passId: "PASS-" + Date.now(),
      status: "Active",
    };

    addPass(passData);

    setGeneratedPass(passData);

    alert("Pass Generated Successfully");

    setFormData({
      visitorName: "",
      hostName: "",
    });
  };

  const downloadPass = () => {
  if (!generatedPass) return;

  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text("Visitor Pass", 20, 20);

  doc.setFontSize(12);
  doc.text(`Pass ID: ${generatedPass.passId}`, 20, 40);
  doc.text(`Visitor: ${generatedPass.visitorName}`, 20, 50);
  doc.text(`Host: ${generatedPass.hostName}`, 20, 60);
  doc.text(`Status: ${generatedPass.status}`, 20, 70);

  doc.save(`${generatedPass.passId}.pdf`);
};

  return (
    <div className="pass-page">
      <div className="pass-container">
        <form
          className="pass-form"
          onSubmit={handleSubmit}
        >
          <h2>Generate Pass</h2>

          <input
            type="text"
            name="visitorName"
            placeholder="Visitor Name"
            value={formData.visitorName}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="hostName"
            placeholder="Host Name"
            value={formData.hostName}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Generate Pass
          </button>
        </form>

        {generatedPass && (
          <div className="qr-section">
            <h3>Visitor Pass</h3>

            <QRCodeCanvas
              value={JSON.stringify(generatedPass)}
              size={180}
            />

            <p>
              <strong>Pass ID:</strong>{" "}
              {generatedPass.passId}
            </p>

            <p>
              <strong>Visitor:</strong>{" "}
              {generatedPass.visitorName}
            </p>

            <p>
              <strong>Host:</strong>{" "}
              {generatedPass.hostName}
            </p>

            <p className="status">
              {generatedPass.status}
            </p>
            <button
  className="download-btn"
  onClick={downloadPass}
>
  Download Pass PDF
</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default GeneratePass;