import React, { useState } from "react";
import { Mail, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Input } from "../ui/Input";
import { validateLogin } from "../../utils/loginValidation";
import { Button } from "../ui/Button";

import { users } from "../../data/userdata/Users";

export function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (e) => {
    const value = e.target.value;

    setEmail(value);

    if (value.trim() === "") {
      setEmailError("");
    } else {
      const errors = validateLogin(value, password);
      setEmailError(errors.email);
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;

    setPassword(value);

    if (value.trim() === "") {
      setPasswordError("");
    } else {
      const errors = validateLogin(email, value);
      setPasswordError(errors.password);
    }
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  const errors = validateLogin(email, password);

  setEmailError(errors.email);
  setPasswordError(errors.password);

  if (!errors.email && !errors.password) {
    const loggedInUser = users.find(
      (user) =>
        user.email === email &&
        user.password === password
    );

    if (loggedInUser) {
      localStorage.setItem(
        "currentUser",
        JSON.stringify(loggedInUser)
      );

      if (loggedInUser.role === "Admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } else {
      setPasswordError("Invalid email or password.");
    }
  }
};

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex w-full flex-col gap-5"
    >
      {/* Email */}
      <div className="w-full">
        <div className="relative">
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
          />

          <Mail
            size={20}
            strokeWidth={2}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#8f7778]"
          />
        </div>

        {emailError && (
          <p className="mt-1.5 text-xs font-medium text-[#a64b4b]">
            {emailError}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="w-full">
        <div className="relative">
          <Input
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
          />

          {/* Password Toggle Button */}
          <button
            type="button"
            onClick={togglePassword}
            title={showPassword ? "Hide password" : "Show password"}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[#8f7778] transition-all duration-300 hover:bg-[#f8eeee] hover:text-[#7b1113] active:scale-95"
          >
            {showPassword ? (
              <EyeOff size={20} strokeWidth={2} />
            ) : (
              <Eye size={20} strokeWidth={2} />
            )}
          </button>
        </div>

        {passwordError && (
          <p className="mt-1.5 text-xs font-medium text-[#a64b4b]">
            {passwordError}
          </p>
        )}
      </div>

      {/* Login Button */}
      <Button
        type="submit"
        className="w-full"
      >
        Sign In
      </Button>
    </form>
  );
}