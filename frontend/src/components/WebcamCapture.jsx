import { useRef, useState } from "react";
import { FiCamera, FiRefreshCw, FiUploadCloud } from "react-icons/fi";

function WebcamCapture({ onCapture, initialPhoto = "" }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(initialPhoto);

  const startCamera = async () => {
    try {
      setIsCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      alert("Camera access failed or permission denied. You can upload a photo instead.");
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  const takeSnapshot = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = 300;
      canvas.height = 300;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, 300, 300);
      const dataUrl = canvas.toDataURL("image/png");
      setCapturedPhoto(dataUrl);
      onCapture(dataUrl);
      stopCamera();
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCapturedPhoto(reader.result);
        onCapture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetPhoto = () => {
    setCapturedPhoto("");
    onCapture("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
      {capturedPhoto ? (
        <div style={{ position: "relative", textAlign: "center" }}>
          <img
            src={capturedPhoto}
            alt="Visitor Selfie"
            style={{
              width: "130px",
              height: "130px",
              borderRadius: "16px",
              objectFit: "cover",
              border: "3px solid var(--primary)",
              boxShadow: "0 0 15px var(--primary-glow)",
            }}
          />
          <button
            type="button"
            className="btn btn-secondary"
            onClick={resetPhoto}
            style={{ marginTop: "0.5rem", padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}
          >
            <FiRefreshCw /> Retake Photo
          </button>
        </div>
      ) : isCameraActive ? (
        <div style={{ textAlign: "center" }}>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{
              width: "220px",
              height: "220px",
              borderRadius: "16px",
              objectFit: "cover",
              border: "2px solid var(--accent-emerald)",
            }}
          />
          <canvas ref={canvasRef} style={{ display: "none" }} />
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem", justifyContent: "center" }}>
            <button type="button" className="btn btn-success" onClick={takeSnapshot}>
              <FiCamera /> Snap Photo
            </button>
            <button type="button" className="btn btn-secondary" onClick={stopCamera}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button type="button" className="btn btn-primary" onClick={startCamera}>
            <FiCamera /> Open Camera
          </button>
          <label className="btn btn-secondary" style={{ cursor: "pointer" }}>
            <FiUploadCloud /> Upload
            <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: "none" }} />
          </label>
        </div>
      )}
    </div>
  );
}

export default WebcamCapture;
