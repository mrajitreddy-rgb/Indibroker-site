/*
Indian Stock Broker - Single-file React component (Tailwind + shadcn + recharts)

How to use:
- Place this file in a React + Tailwind project (Next.js or CRA).
- Ensure the following packages are installed:
  - react, react-dom
  - recharts
  - lucide-react
  - @/components/ui (if using shadcn/ui; optional)
- Tailwind CSS should be configured in the project.

This file is a production-ready single-page marketing + onboarding site for an Indian stock broker.
It includes: hero, features, pricing, account form, platform highlights, FAQ, footer, and a sample live-chart placeholder using Recharts.
Replace placeholder images and API endpoints with your assets and backend.
*/

import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { TrendingUp, UserPlus, ShieldCheck, Wallet } from "lucide-react";

export default function BrokerWebsite() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [accountType, setAccountType] = useState("I")
  const [submitted, setSubmitted] = useState(false);

  // Mock chart data (replace with live API for real prices / indices)
  const marketData = [
    { time: "09:15", value: 18200 },
    { time: "10:00", value: 18340 },
    { time: "11:00", value: 18275 },
    { time: "12:30", value: 18410 },
    { time: "13:45", value: 18360 },
    { time: "15:30", value: 18505 }
  ];

  const features = [
    { icon: <TrendingUp size={20} />, title: "Low Brokerage", desc: "Transparent, low-cost plans tailored for investors and traders." },
    { icon: <UserPlus size={20} />, title: "Instant Account Opening", desc: "Aadhaar & PAN based eKYC onboarding in minutes." },
    { icon: <ShieldCheck size={20} />, title: "Secure & Regulated", desc: "SEBI-registered broker with bank-grade encryption." },
    { icon: <Wallet size={20} />, title: "Powerful Trading App", desc: "Web & mobile apps with advanced order types and charts." }
  ];

  function submitLead(e) {
    e.preventDefault();
    // Replace with your backend API call
    // fetch('/api/leads', { method: 'POST', body: JSON.stringify({name,email,phone,accountType}) })
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* NAV */}
      <header className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">IB</div>
          <div>
            <div className="font-semibold">IndiBroker</div>
            <div className="text-xs text-slate-500">SEBI Registered • DP Enabled</div>
          </div>
        </div>
        <nav className="hidden md:flex gap-8 items-center text-sm text-slate-700">
          <a href="#features">Features</a>
          <a href="#platforms">Platforms</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
          <a href="#open-account" className="ml-4 inline-block px-4 py-2 bg-indigo-600 text-white rounded-md">Open Account</a>
        </nav>
      </header>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Trade Indian Markets — Nifty, BankNifty, Stocks & ETFs</h1>
          <p className="mt-4 text-slate-600">Low brokerage, fast order execution, secure settlements. Built for new investors and active traders alike.</p>

          <div className="mt-6 flex gap-4">
            <a href="#open-account" className="px-5 py-3 bg-indigo-600 text-white rounded-lg shadow">Open Demat Account</a>
            <a href="#features" className="px-5 py-3 border border-slate-200 rounded-lg">Why IndiBroker?</a>
          </div>

          <ul className="mt-6 grid grid-cols-2 gap-3 text-sm text-slate-600">
            <li>✔ Zero account opening fees</li>
            <li>✔ Margin against shares</li>
            <li>✔ 24x7 customer support</li>
            <li>✔ Fast NEFT/UPI payouts</li>
          </ul>
        </div>

        {/* Live chart card */}
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-sm text-slate-500">NIFTY 50</div>
              <div className="text-xl font-semibold">18,505.00 <span className="text-sm text-green-600">+0.35%</span></div>
            </div>
            <div className="text-xs text-slate-400">Updated: Today</div>
          </div>

          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={marketData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 flex gap-3">
            <button className="px-3 py-2 border rounded-md text-sm">Buy</button>
            <button className="px-3 py-2 border rounded-md text-sm">Sell</button>
            <button className="ml-auto px-3 py-2 bg-indigo-50 text-indigo-700 rounded-md text-sm">Trade Now</button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold">What we offer</h2>
        <p className="text-slate-600 mt-2">Everything you need to invest and trade across Indian markets.</p>

        <div className="mt-6 grid md:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div key={i} className="bg-white p-5 rounded-lg shadow-sm">
              <div className="flex items-center gap-3 text-indigo-600">{f.icon}</div>
              <h3 className="mt-3 font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PLATFORMS */}
      <section id="platforms" className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-xl font-bold">Trade on web, mobile & APIs</h3>
            <p className="mt-2 text-slate-600">Feature-rich desktop platform, native Android/iOS apps, and REST/Websocket APIs for algo traders.</p>

            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>• Advanced charts with 100+ indicators</li>
              <li>• Bracket orders, cover orders, AMO</li>
              <li>• Real-time market data & alerts</li>
              <li>• Token-based API access for algo strategies</li>
            </ul>

            <div className="mt-5 flex gap-3">
              <a className="px-4 py-2 border rounded-md text-sm">Demo Platform</a>
              <a className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm">Download App</a>
            </div>
          </div>

          <div className="p-6">
            <img src="https://images.unsplash.com/photo-1542223616-464b2b1ce6f5?auto=format&fit=crop&w=800&q=60" alt="trading" className="rounded-lg shadow-md w-full" />
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold">Pricing</h2>
        <p className="text-slate-600 mt-2">Simple, transparent plans. No hidden charges. GST and exchange fees extra.</p>

        <div className="mt-6 grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-sm text-slate-500">Investor</div>
            <div className="text-3xl font-extrabold mt-3">₹0/txn</div>
            <div className="text-sm text-slate-600 mt-2">Equity delivery trades — ₹0 brokerage. Intraday and F&O charged per trade.</div>
            <ul className="mt-4 text-sm text-slate-600 space-y-2">
              <li>• Free account opening</li>
              <li>• Research reports</li>
              <li>• SMS & email alerts</li>
            </ul>
            <button className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-md">Choose Investor</button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-sm text-slate-500">Trader</div>
            <div className="text-3xl font-extrabold mt-3">₹20 or 0.03%/txn</div>
            <div className="text-sm text-slate-600 mt-2">Intraday & F&O traders get low flat fees and priority support.</div>
            <ul className="mt-4 text-sm text-slate-600 space-y-2">
              <li>• Margin funding</li>
              <li>• API access</li>
              <li>• Priority customer service</li>
            </ul>
            <button className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-md">Choose Trader</button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-sm text-slate-500">Pro</div>
            <div className="text-3xl font-extrabold mt-3">Custom</div>
            <div className="text-sm text-slate-600 mt-2">For high-frequency / institutional clients — negotiate custom pricing and SLAs.</div>
            <ul className="mt-4 text-sm text-slate-600 space-y-2">
              <li>• Co-location</li>
              <li>• FIX/API feed</li>
              <li>• Dedicated account manager</li>
            </ul>
            <button className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-md">Contact Sales</button>
          </div>
        </div>
      </section>

      {/* ACCOUNT OPENING FORM */}
      <section id="open-account" className="bg-indigo-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold">Open your Demat & Trading Account</h3>
            <p className="mt-3 text-indigo-100">Fast eKYC using Aadhaar & PAN. Start trading within the same day after verification.</p>

            <ul className="mt-4 text-sm space-y-2">
              <li>• Aadhaar-based eSign</li>
              <li>• In-person verification (if required)</li>
              <li>• Online UPI-based initial funding</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg text-slate-900">
            {!submitted ? (
              <form onSubmit={submitLead} className="space-y-3">
                <div>
                  <label className="text-sm">Full name</label>
                  <input required value={name} onChange={(e)=>setName(e.target.value)} className="mt-1 w-full px-3 py-2 border rounded-md" placeholder="Rahul Sharma" />
                </div>
                <div>
                  <label className="text-sm">Email</label>
                  <input required type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="mt-1 w-full px-3 py-2 border rounded-md" placeholder="you@example.com" />
                </div>
                <div>
                  <label className="text-sm">Mobile (with country code)</label>
                  <input required value={phone} onChange={(e)=>setPhone(e.target.value)} className="mt-1 w-full px-3 py-2 border rounded-md" placeholder="+91 98xxxxxxx" />
                </div>

                <div>
                  <label className="text-sm">Account type</label>
                  <select value={accountType} onChange={(e)=>setAccountType(e.target.value)} className="mt-1 w-full px-3 py-2 border rounded-md">
                    <option value="I">Individual</option>
                    <option value="H">HUF</option>
                    <option value="B">NRI</option>
                  </select>
                </div>

                <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md">Get Started</button>
              </form>
            ) : (
              <div className="text-center py-8">
                <h4 className="text-lg font-semibold">Thanks, {name.split(" ")[0] || "there"}!</h4>
                <p className="mt-2 text-sm text-slate-600">We've received your request. Our team will contact you on {phone} shortly.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold">Frequently asked questions</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-6 text-slate-700">
          <div>
            <h4 className="font-semibold">How long does account opening take?</h4>
            <p className="mt-2 text-sm text-slate-600">Usually same-day eKYC. In some cases, 1–2 business days depending on documents and verification.</p>
          </div>
          <div>
            <h4 className="font-semibold">Which exchanges are supported?</h4>
            <p className="mt-2 text-sm text-slate-600">NSE, BSE and MCX (optional) for derivatives and commodity trading.</p>
          </div>
          <div>
            <h4 className="font-semibold">What is required for NRI accounts?</h4>
            <p className="mt-2 text-sm text-slate-600">Overseas address proof, PAN, and completed FATCA declaration. Our team assists with paperwork.</p>
          </div>
          <div>
            <h4 className="font-semibold">How secure is my money?</h4>
            <p className="mt-2 text-sm text-slate-600">All client funds are held in segregated bank accounts. We follow RBI and SEBI guidelines strictly.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-300 py-8">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">IB</div>
              <div>
                <div className="font-semibold text-white">IndiBroker</div>
                <div className="text-xs">SEBI Reg. No: INDBR-12345</div>
              </div>
            </div>
            <p className="mt-4 text-sm">Address line 1, City, State — CIN: U12345MH2025PTC123456</p>
          </div>

          <div>
            <div className="font-semibold">Contact</div>
            <div className="mt-2 text-sm">support@indibroker.in</div>
            <div className="text-sm mt-1">+91 22 4000 0000</div>
            <div className="text-sm mt-2">Mon–Fri, 9:00–18:00 IST</div>
          </div>

          <div>
            <div className="font-semibold">Legal</div>
            <ul className="mt-2 text-sm space-y-2">
              <li>• Terms & Conditions</li>
              <li>• Privacy Policy</li>
              <li>• Risk Disclosure</li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-6 text-center text-xs text-slate-500">© {new Date().getFullYear()} IndiBroker — All rights reserved.</div>
      </footer>
    </div>
  );
}
