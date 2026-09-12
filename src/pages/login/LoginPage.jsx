
import { Card } from "../../componenets/ui/Card";
import { LoginForm } from "../../componenets/auth/LoginForm";
import React, { useEffect, useState } from "react";


export function LoginPage() {
    const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#faf7f7] px-4 py-10">
      <Card 
      className={`w-full max-w-md p-8 transition-all duration-2000 ease-out ${
    show
      ? "translate-y-0 scale-100 opacity-100"
      : "translate-y-4 scale-90 opacity-0"
  }`}
      >
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#7b1113]">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-[#9b8585]">
            Sign in to continue to your account
          </p>
        </div>

        {/* Login Form */}
        <LoginForm />
      </Card>
    </div>
  );
}