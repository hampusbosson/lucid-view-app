import { useState } from "react";
import { motion } from "framer-motion";
import Header from "../../components/ui/header";
import Footer from "../../components/ui/footer";

const LandingPage = () => {
  const [url, setUrl] = useState("");

  return (
    <div className="w-screen max-w-full flex flex-col">
      <Header />
      <div className="bg-[#0f0f11] text-white pt-42 pb-16 font-sans">
        <motion.header
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full mx-auto text-center mb-20"
        >
          <h1 className="text-6xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text">
            Get Actionable Website Feedback in Second
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            SpotCheck analyzes your site’s clarity, messaging, and design — and
            gives you a clear, actionable report to boost trust and conversions.
          </p>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <input
              type="url"
              placeholder="Paste your website URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="p-4 rounded-xl text-black w-full max-w-md bg-white"
            />
            <button
              onClick={() => console.log("Run SpotCheck clicked")}
              className="px-6 py-4 bg-primary rounded-xl font-semibold hover:bg-blue-400 transition text-white"
            >
              Run SpotCheck
            </button>
          </motion.div>
        </motion.header>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-32 overflow-x-hidden overflow-y-hidden"
        >
          {[
            {
              title: "First Impressions Matter",
              desc: "We analyze your landing page in the first 5 seconds — because that’s all the time users give you.",
            },
            {
              title: "AI + Heuristics",
              desc: "Get an intelligent blend of GPT-powered insights and real UX principles that top designers use.",
            },
            {
              title: "Fix What Matters",
              desc: "You’ll get a short, crystal-clear list of things to improve — and why they matter.",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="bg-[#161618] border border-gray-800 p-6 rounded-xl shadow-xl"
            >
              <h3 className="text-xl font-semibold mb-2 text-blue-400">
                {f.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold mb-4 text-white">
            Try It Free — No Sign-Up Required
          </h2>
          <p className="text-gray-400 mb-8 text-md">
            SpotCheck is perfect for indie hackers, early startups, and
            growth-focused creators.
          </p>
          <button
            onClick={() => console.log("Get Started clicked")}
            className="px-8 py-4 bg-white text-black text-lg font-semibold rounded-xl hover:opacity-90"
          >
            Get Started
          </button>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto mt-32"
        >
          <h3 className="text-center text-2xl font-semibold mb-8 text-white">
            What a SpotCheck Report Looks Like
          </h3>
          <div className="bg-[#18181b] p-6 rounded-xl border border-gray-700 shadow-md">
            <pre className="text-gray-300 text-sm whitespace-pre-wrap">
              ✅ Clear headline, but subheading is vague ❌ CTA button is hidden
              below the fold ✅ Strong testimonial placement builds trust
              Suggestion: Move CTA higher and simplify your value prop
            </pre>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto mt-32"
        >
          <h3 className="text-center text-2xl font-semibold mb-8 text-white">
            Trusted by Makers & Startups
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              "This feedback helped me 2x conversions in one week.",
              "Exactly the kind of input I’d pay an expert for.",
              "Super fast and scarily accurate.",
              "I used this before launching on Product Hunt — clutch.",
              "Better than asking 3 friends who all say 'looks good.'",
              "My design agency uses SpotCheck on every project now.",
            ].map((quote, i) => (
              <div
                key={i}
                className="bg-gray-900 text-gray-300 p-4 rounded-xl border border-gray-800"
              >
                <p className="text-sm">“{quote}”</p>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
