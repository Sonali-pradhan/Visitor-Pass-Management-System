import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  return (
    <div className="login-container">

      <div className="login-card">

        <h1 className="title">
          Visitor Pass
        </h1>

        <p className="subtitle">
          University Visitor Management System
        </p>

        <form>

          <input
            type="email"
            placeholder="Email Address"
          />

          <input
            type="password"
            placeholder="Password"
          />

          <button>
            Login
          </button>

        </form>

        <p className="register-text">
          Don't have an account?

          <Link to="/register">
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;