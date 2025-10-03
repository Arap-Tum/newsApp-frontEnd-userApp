import React, { useState } from "react";
import { useAuth } from "../../context/AuthConttext";
import { useMutation } from "@tanstack/react-query";
import { register as registerUser } from "../../api/auth";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

export const Register = () => {
  const [form, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const { register } = useAuth();

  const registerMutation = useMutation({
    mutationFn: (form) => registerUser(form),
    onSuccess: (data) => {
      console.log("registered succesfull: ", data);
      register(data.user, data.token);
      toast.success(`Welcome  ${data.user.name}`);

      if (data.user.role === "ADMIN") {
        navigate("/admin");
      } else if (data.user.role === "AUTHOR") {
        navigate("/author");
      } else {
        navigate("/");
      }
    },
    onError: (error) => {
      let message = "registration failed failed";

      if (error?.response?.data?.message) {
        message = error.response.data.message;
      } else if (error?.response?.data?.error) {
        message = error.response.data.error;
      } else if (error?.message) {
        message = error.message;
      }

      toast.error(message);
      console.log("(MUTATION) Error Error  in:", error);
    },
  });

  const handleChange = (e) => {
    setFormData({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    registerMutation.mutate(form);
  };
  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-title">Register</h2>
        <div className="form-group">
          <label className="form-label">Username:</label>
          <input
            type="text"
            name="username"
            className="form-input"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email:</label>
          <input
            type="email"
            name="email"
            className="form-input"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password:</label>
          <input
            type="password"
            name="password"
            className="form-input"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="auth-button">
          <span>Register</span>
        </button>

        <p className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};
