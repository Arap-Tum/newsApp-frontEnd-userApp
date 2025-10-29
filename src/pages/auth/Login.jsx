import React, { useState } from "react";
import "../../styles/auth.css";
import { useAuth } from "../../context/AuthConttext";
import { useMutation } from "@tanstack/react-query";
import { login as loginUser } from "../../api/auth";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

export const Login = () => {
  const [form, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const { login } = useAuth();

  const loginMutation = useMutation({
    mutationFn: (form) => loginUser(form),
    onSuccess: (data) => {
      console.log("Login succesfull: ", data);
      login(data.user, data.token);
      toast.success(`Welcome back ${data.user.name}`);

      if (data.user.role === "ADMIN") {
        navigate("/admin");
      } else if (data.user.role === "AUTHOR") {
        navigate("/author");
      } else {
        navigate("/");
      }
    },
    onError: (error) => {
      let message = "Login failed";

      if (error?.response?.data?.message) {
        message = error.response.data.message;
      } else if (error?.response?.data?.error) {
        message = error.response.data.error;
      } else if (error?.message) {
        message = error.message;
      }

      toast.error(message);
      console.log("Error logging in:", error);
    },
  });

  const handleChange = (e) => {
    setFormData({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    loginMutation.mutate(form);
  };
  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-form__title">Login</h2>

        <div className="login-form__field">
          <label className="login-form__label">Email</label>
          <input
            type="email"
            name="email"
            className="login-form__input"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="login-form__field">
          <label className="login-form__label">Password</label>
          <input
            type="password"
            name="password"
            className="login-form__input"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="login-form__button">
          <span>Login</span>
        </button>

        <p className="login-form__redirect">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};
