import { useState, useContext } from "react";
import { VisitorContext } from "../../context/VisitorContext";
import "./Visitor.css";

function AddVisitor() {
  const { addVisitor } = useContext(VisitorContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    purpose: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addVisitor(formData);

    alert("Visitor Added Successfully");

    setFormData({
      name: "",
      email: "",
      phone: "",
      purpose: "",
    });
  };

  return (
    <div className="add-visitor-page">
      

      <form
        className="visitor-form"
        onSubmit={handleSubmit}
      >
        <h2>Add Visitor</h2>
        <input
          type="text"
          name="name"
          placeholder="Visitor Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />

        <input
          type="text"
          name="purpose"
          placeholder="Purpose"
          value={formData.purpose}
          onChange={handleChange}
        />

        <button type="submit">
          Register Visitor
        </button>
      </form>
    </div>
  );
}

export default AddVisitor;