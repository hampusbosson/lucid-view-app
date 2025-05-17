import React, { useRef, useState } from "react";

const VerifyEmailPage: React.FC = () => {
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/\d/.test(value) && value !== "") return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = code.join("");
    console.log("Submitting code:", fullCode);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D1117] px-4">
      <div className="bg-[#161b22] border border-white/10 backdrop-blur-lg rounded-2xl shadow-xl w-full max-w-md p-8 space-y-6 text-center">
        <h2 className="text-2xl font-semibold text-white">Verify your email</h2>
        <p className="text-sm text-gray-400">
          We’ve sent a 6-digit verification code to your email. Enter it below to verify your account.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-2">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-14 text-center text-lg rounded-lg bg-[#0D1117] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
          >
            Verify Email
          </button>
        </form>

        <div className="mt-4">
          <p className="text-sm text-gray-500">Didn’t receive the code?</p>
          <button
            onClick={() => console.log("Resend code clicked")}
            className="mt-1 text-blue-400 hover:underline"
          >
            Resend Verification Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
