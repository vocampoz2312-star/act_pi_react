"use client";

import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <SignIn
        path="/auth/login"
        routing="path"
        signUpUrl="/auth/register"
        afterSignInUrl="/"   // 👈 manda al Home después de login
        afterSignUpUrl="/"   // 👈 manda al Home después de registro
      />
    </div>
  );
}
