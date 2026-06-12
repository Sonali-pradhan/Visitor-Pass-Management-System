import { Link } from "react-router-dom";
import "./Register.css";

function Register() {
  return (
    <div className="register-container">

      <div className="register-card">

        <h1 className="title">
          Create Account
        </h1>

        <p className="subtitle">
          University Visitor Management System
        </p>

        <form>

          <input
            type="text"
            placeholder="Full Name"
          />

          <input
            type="email"
            placeholder="Email Address"
          />

          <input
            type="password"
            placeholder="Password"
          />

          <input
            type="password"
            placeholder="Confirm Password"
          />

          <button>
            Register
          </button>

        </form>

        <p className="login-text">
          Already have an account?

          <Link to="/">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register;