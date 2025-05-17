import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./routes/landing";
import LoginPage from "./routes/auth/login";
import SignupPage from "./routes/auth/signup";
import ResetPasswordPage from "./routes/auth/reset-password";
import VerifyEmailPage from "./routes/auth/verify-email";
import RequestResetPasswordPage from "./routes/auth/request-reset-password";

const AppRouter: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                <Route path="/verify-email" element={<VerifyEmailPage />} />
                <Route path="/request-reset-password" element={<RequestResetPasswordPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;