export const validateLogin = (email, password) => {
  const errors = {
    email: "",
    password: "",
  };

  if (email.trim() === "") {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Please enter a valid email (abc@gmail.com)";
  }

  if (password.trim() === "") {
    errors.password = "Password is required";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};