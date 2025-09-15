"use client";

import { SignUp } from "@clerk/nextjs";

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <SignUp
        path="/auth/register"
        routing="path"
        signInUrl="/auth/login"
        afterSignInUrl="/"   // 👈 al Home después de registrarse
        afterSignUpUrl="/"   // 👈 igual al Home
      />
    </div>
  );
}
