import useField from "../hooks/useField";
import useLogin from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {
  const  email = useField("email");
  const password = useField("password");
  const navigate = useNavigate();
  const { authenticate:login, isLoading, error } = useLogin("/api/users/login");

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.value, password: password.value }),
      });

      if (response.ok) {
        const user = await response.json();
        localStorage.setItem("user", JSON.stringify(user));
        setIsAuthenticated(true);
        navigate("/");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <label>
        Email:
        <input
          type="email"
          {...email}
          placeholder="Enter your email"
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          {...password}
          placeholder="Enter your password"
        />
      </label>
      <button className="login-button" onClick={handleLogin}>Log In</button>
    </div>
  );
};

export default Login;