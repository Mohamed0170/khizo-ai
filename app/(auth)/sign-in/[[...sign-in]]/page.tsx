"use client";

import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

const SignInPage = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<"email" | "password" | "code" | "reset_code" | "new_password">("email");
  const [newPassword, setNewPassword] = useState("");

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded || !email) return;
    setLoading(true);
    setError("");

    try {
      const result = await signIn.create({ identifier: email });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/dashboard");
        return;
      }

      // Check which first factor strategies are available
      const firstFactor = result.supportedFirstFactors;
      const hasPassword = firstFactor?.some(
        (f: any) => f.strategy === "password"
      );
      const hasEmailCode = firstFactor?.some(
        (f: any) => f.strategy === "email_code"
      );

      if (hasPassword) {
        setStep("password");
      } else if (hasEmailCode) {
        // Prepare email code verification
        await signIn.prepareFirstFactor({
          strategy: "email_code",
          emailAddressId: firstFactor?.find((f: any) => f.strategy === "email_code")?.emailAddressId as string,
        });
        setStep("code");
      } else {
        setError("No supported sign-in method found. Try signing in with Google or Apple.");
      }
    } catch (err: any) {
      const msg = err.errors?.[0]?.longMessage || err.errors?.[0]?.message || "Something went wrong";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded || !password) return;
    setLoading(true);
    setError("");

    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "password",
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/dashboard");
      } else if (result.status === "needs_second_factor") {
        setError("Two-factor authentication is not yet supported in this form. Please contact support.");
      }
    } catch (err: any) {
      const msg = err.errors?.[0]?.longMessage || err.errors?.[0]?.message || "Invalid password";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded || !code) return;
    setLoading(true);
    setError("");

    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "email_code",
        code,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/dashboard");
      }
    } catch (err: any) {
      const msg = err.errors?.[0]?.longMessage || err.errors?.[0]?.message || "Invalid code";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!isLoaded) return;
    setLoading(true);
    setError("");

    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });
      setStep("reset_code");
    } catch (err: any) {
      const msg = err.errors?.[0]?.longMessage || err.errors?.[0]?.message || "Could not send reset code";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleResetCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded || !code) return;
    setLoading(true);
    setError("");

    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
      });

      if (result.status === "needs_new_password") {
        setStep("new_password");
      } else if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/dashboard");
      }
    } catch (err: any) {
      const msg = err.errors?.[0]?.longMessage || err.errors?.[0]?.message || "Invalid code";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleNewPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded || !newPassword) return;
    setLoading(true);
    setError("");

    try {
      const result = await signIn.resetPassword({ password: newPassword });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/dashboard");
      }
    } catch (err: any) {
      const msg = err.errors?.[0]?.longMessage || err.errors?.[0]?.message || "Could not reset password";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (strategy: "oauth_google" | "oauth_apple") => {
    if (!isLoaded) return;
    try {
      await signIn.authenticateWithRedirect({
        strategy,
        redirectUrl: "/sign-in/sso-callback",
        redirectUrlComplete: "/dashboard",
      });
    } catch (err: any) {
      setError(err.errors?.[0]?.longMessage || "OAuth sign in failed");
    }
  };

  const goBack = () => {
    setStep("email");
    setPassword("");
    setCode("");
    setNewPassword("");
    setError("");
  };

  // ── Logo Header ──
  const logoHeader = (
    <div className="flex items-center justify-center gap-2.5 mb-2">
      <svg width="36" height="36" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="auth-logo-grad" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4F46E5" />
            <stop offset="1" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
        <g fill="url(#auth-logo-grad)">
          <rect x="12" y="-4" width="8" height="40" rx="2" transform="rotate(45 16 16)" />
          <rect x="12" y="-4" width="8" height="40" rx="2" transform="rotate(-45 16 16)" />
        </g>
      </svg>
      <span className="text-xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400">Khizo AI</span>
    </div>
  );

  const errorBox = error && (
    <div className="auth-error">
      {error}
    </div>
  );

  const submitBtn = (text: string, loadingText: string) => (
    <button type="submit" disabled={loading} className="auth-submit-btn">
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
          {loadingText}
        </div>
      ) : text}
    </button>
  );

  // ── Step: Password ──
  if (step === "password") {
    return (
      <div className="auth-card">
        {logoHeader}
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white text-center">Enter your password</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-1">{email}</p>
        <button type="button" onClick={goBack} className="text-xs text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 text-center block mx-auto mb-6">
          Use a different account
        </button>

        <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="password" className="auth-label">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input pr-10"
                placeholder="••••••••"
                required
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors"
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                )}
              </button>
            </div>
            <button type="button" onClick={handleForgotPassword} className="text-xs text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 mt-1.5 block">
              Forgot password?
            </button>
          </div>
          {errorBox}
          {submitBtn("Sign In", "Signing in...")}
        </form>
      </div>
    );
  }

  // ── Step: Email Code ──
  if (step === "code") {
    return (
      <div className="auth-card">
        {logoHeader}
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white text-center">Check your email</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-6">
          We sent a code to <span className="font-medium text-slate-700 dark:text-slate-300">{email}</span>
        </p>

        <form onSubmit={handleCodeSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="code" className="auth-label">Verification code</label>
              <input
                id="code"
                type="text"
                value={code}
                onChange={(e) => {
                  // Only allow up to 6 digits, numbers only
                  const val = e.target.value.replace(/[^0-9]/g, "").slice(0, 6);
                  setCode(val);
                }}
                className="auth-input text-center tracking-[0.3em] text-lg"
                placeholder="000000"
                required
                autoFocus
                inputMode="numeric"
                maxLength={6}
                pattern="[0-9]{6}"
              />
          </div>
          {errorBox}
          {submitBtn("Verify", "Verifying...")}
        </form>

        <button type="button" onClick={goBack} className="text-xs text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 text-center block mx-auto mt-4">
          Use a different method
        </button>
      </div>
    );
  }

  // ── Step: Reset Password Code ──
  if (step === "reset_code") {
    return (
      <div className="auth-card">
        {logoHeader}
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white text-center">Reset your password</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-6">
          Enter the code sent to <span className="font-medium text-slate-700 dark:text-slate-300">{email}</span>
        </p>

        <form onSubmit={handleResetCodeSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="reset-code" className="auth-label">Reset code</label>
            <input
              id="reset-code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="auth-input text-center tracking-[0.3em] text-lg"
              placeholder="000000"
              required
              autoFocus
            />
          </div>
          {errorBox}
          {submitBtn("Continue", "Verifying...")}
        </form>

        <button type="button" onClick={goBack} className="text-xs text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 text-center block mx-auto mt-4">
          Back to sign in
        </button>
      </div>
    );
  }

  // ── Step: New Password ──
  if (step === "new_password") {
    return (
      <div className="auth-card">
        {logoHeader}
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white text-center">Set new password</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-6">Choose a strong password for your account</p>

        <form onSubmit={handleNewPasswordSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="new-password" className="auth-label">New password</label>
            <input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="auth-input"
              placeholder="••••••••"
              required
              autoFocus
            />
          </div>
          {errorBox}
          {submitBtn("Reset Password", "Resetting...")}
        </form>
      </div>
    );
  }

  // ── Step: Email (default) ──
  return (
    <div className="auth-card">
      {logoHeader}
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white text-center">Welcome back</h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-6">Sign in to your account to continue</p>

      {/* OAuth Buttons */}
      <div className="flex flex-col gap-3 mb-5">
        <button type="button" onClick={() => handleOAuth("oauth_google")} className="auth-oauth-btn">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        <button type="button" onClick={() => handleOAuth("oauth_apple")} className="auth-oauth-btn">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
          </svg>
          Continue with Apple
        </button>
      </div>

      {/* Divider */}
      <div className="auth-divider">
        <div className="auth-divider-line" />
        <span className="auth-divider-text">or</span>
        <div className="auth-divider-line" />
      </div>

      {/* Email Form */}
      <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="email" className="auth-label">Email address</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
            placeholder="you@example.com"
            required
          />
        </div>
        {errorBox}
        {submitBtn("Continue", "Please wait...")}
      </form>

      <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="text-indigo-600 font-semibold hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default SignInPage;