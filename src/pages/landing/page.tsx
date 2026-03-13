import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BiQrScan,
  BiBarChartAlt2,
  BiRevision,
  BiCheckCircle,
} from "react-icons/bi";

export default function LandingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const hasToken = localStorage.getItem("token");
    setIsLoggedIn(!!hasToken);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="bg-black p-1.5 rounded-lg">
            <BiQrScan className="text-white text-2xl" />
          </div>
          <span className="text-xl font-bold tracking-tight">QRFlow</span>
        </div>

        <div className="flex items-center gap-6">
          {isLoggedIn ? (
            <Link
              to="/dashboard"
              className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-gray-800 transition-all shadow-md"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium hover:text-gray-600 transition-colors"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="bg-black text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-all"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <header className="px-6 pt-20 pb-16 text-center max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 leading-[1.1]">
          Dynamic QR Codes <br />
          <span className="text-gray-400">with real-time analytics.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          Create, track, and update your QR codes instantly. Change your
          destination URL anytime without reprinting your codes.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to={isLoggedIn ? "/dashboard" : "/signup"}
            className="w-full sm:w-auto bg-black text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition-all shadow-lg shadow-black/10"
          >
            {isLoggedIn ? "Go to Dashboard" : "Create Your Free QR"}
          </Link>
          <a
            href="#pricing"
            className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-lg border border-gray-200 hover:bg-gray-50 transition-all"
          >
            View Pricing
          </a>
        </div>
      </header>

      {/* Features Section */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-100">
              <BiBarChartAlt2 className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold">Track Analysis</h3>
            <p className="text-gray-500 leading-relaxed">
              Monitor scans in real-time. See exactly when and how many people
              are interacting with your content.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-100">
              <BiRevision className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold">Instant Updates</h3>
            <p className="text-gray-500 leading-relaxed">
              Printed a code but need to change the link? Update your
              destination URL instantly without changing the QR.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-100">
              <BiQrScan className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold">High Fidelity</h3>
            <p className="text-gray-500 leading-relaxed">
              Download your QR codes in high-quality formats suitable for
              digital screens or professional printing.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="px-6 py-24 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-500">Choose the plan that fits your needs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div className="border border-gray-200 rounded-3xl p-8 hover:border-black transition-colors group">
            <h4 className="text-lg font-bold mb-2">Free</h4>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-extrabold">$0</span>
              <span className="text-gray-500 text-sm">/forever</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-gray-600">
                <BiCheckCircle className="text-black text-xl" />
                <span>
                  Up to <strong>5</strong> Dynamic QRs
                </span>
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <BiCheckCircle className="text-black text-xl" />
                <span>
                  <strong>5</strong> Destination changes / QR
                </span>
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <BiCheckCircle className="text-black text-xl" />
                <span>Basic scan analytics</span>
              </li>
            </ul>
            <Link
              to={isLoggedIn ? "/dashboard" : "/signup"}
              className="block text-center w-full py-3 rounded-xl border border-gray-200 font-bold hover:bg-gray-50 transition-all"
            >
              {isLoggedIn ? "Manage My QRs" : "Get Started"}
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="bg-black rounded-3xl p-8 text-white shadow-2xl shadow-black/20 relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-white/20 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
              Popular
            </div>
            <h4 className="text-lg font-bold mb-2">Pro</h4>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-extrabold">$12</span>
              <span className="text-gray-400 text-sm">/month</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <BiCheckCircle className="text-white text-xl" />
                <span>
                  Up to <strong>20</strong> Dynamic QRs
                </span>
              </li>
              <li className="flex items-center gap-3">
                <BiCheckCircle className="text-white text-xl" />
                <span>
                  <strong>20</strong> Destination changes / QR
                </span>
              </li>
              <li className="flex items-center gap-3">
                <BiCheckCircle className="text-white text-xl" />
                <span>Advanced real-time analytics</span>
              </li>
              <li className="flex items-center gap-3">
                <BiCheckCircle className="text-white text-xl" />
                <span>Priority Support</span>
              </li>
            </ul>
            <Link
              to={isLoggedIn ? "/billing" : "/signup"}
              className="block text-center w-full py-3 rounded-xl bg-white text-black font-bold hover:bg-gray-100 transition-all"
            >
              {isLoggedIn ? "Upgrade Plan" : "Go Pro"}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-12 px-6 text-center text-gray-400 text-sm">
        <p>
          &copy; {new Date().getFullYear()} QRFlow Systems. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
