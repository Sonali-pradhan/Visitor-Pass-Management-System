import "./Visitor.css";

function VisitorRegistration() {
  return (
    <div className="add-visitor-page">
      <form className="visitor-form">
        <h2>Visitor Registration</h2>

        <input
          type="text"
          placeholder="Full Name"
        />

        <input
          type="email"
          placeholder="Email"
        />

        <input
          type="text"
          placeholder="Phone Number"
        />

        <input
          type="text"
          placeholder="Purpose of Visit"
        />

        <input
          type="text"
          placeholder="Host Name"
        />

        <button type="submit">
          Submit Request
        </button>
      </form>
    </div>
  );
}

export default VisitorRegistration;