/* HoldingsPage.jsx - Custom Holdings List

User holdings:

Tata Motors: 250 shares

State Bank of India: 100 shares

Adani Power: 300 shares */


import React, { useMemo, useState } from 'react'; import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'; import { Download } from 'lucide-react';

const COLORS = ['#4f46e5', '#06b6d4', '#f97316'];

export default function HoldingsPage() { const [holdings, setHoldings] = useState([ { symbol: 'TATAMOTORS', name: 'Tata Motors Ltd', qty: 250, avgPrice: 900.0, ltp: 940.0 }, { symbol: 'SBIN', name: 'State Bank of India', qty: 100, avgPrice: 625.0, ltp: 640.0 }, { symbol: 'ADANIPOWER', name: 'Adani Power Ltd', qty: 300, avgPrice: 560.0, ltp: 575.0 } ]);

const computed = useMemo(() => { const rows = holdings.map(h => { const invested = h.avgPrice * h.qty; const marketValue = h.ltp * h.qty; const pnl = marketValue - invested; const pnlPercent = invested === 0 ? 0 : (pnl / invested) * 100; return { ...h, invested, marketValue, pnl, pnlPercent }; });

const totalInvested = rows.reduce((s, r) => s + r.invested, 0);
const totalMarket = rows.reduce((s, r) => s + r.marketValue, 0);
const totalPnl = totalMarket - totalInvested;
const allocation = rows.map(r => ({ name: r.symbol, value: r.marketValue }));

return { rows, totalInvested, totalMarket, totalPnl, allocation };

}, [holdings]);

function downloadCSV() { const header = ['Symbol', 'Name', 'Qty', 'Avg Price', 'LTP', 'Invested', 'Market Value', 'P/L', 'P/L %']; const lines = computed.rows.map(r => [r.symbol, r.name, r.qty, r.avgPrice, r.ltp, r.invested.toFixed(2), r.marketValue.toFixed(2), r.pnl.toFixed(2), r.pnlPercent.toFixed(2)].join(',')); const csv = [header.join(','), ...lines].join('\n'); const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'holdings.csv'; a.click(); URL.revokeObjectURL(url); }

function updateQty(symbol, newQty) { setHoldings(prev => prev.map(h => h.symbol === symbol ? { ...h, qty: Number(newQty) } : h)); }

return ( <div className="min-h-screen bg-slate-50 py-8"> <div className="max-w-7xl mx-auto px-6"> <div className="flex items-center justify-between"> <div> <h1 className="text-2xl font-bold">My Holdings</h1> <p className="text-sm text-slate-600 mt-1">Snapshot of your equity holdings and allocation.</p> </div>

<div className="flex items-center gap-3">
        <button onClick={downloadCSV} className="inline-flex items-center gap-2 px-4 py-2 border rounded-md bg-white">
          <Download size={16} />
          Export CSV
        </button>
      </div>
    </div>

    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="text-sm text-slate-500">Total Invested</div>
        <div className="text-2xl font-semibold mt-2">₹ {computed.totalInvested.toFixed(2)}</div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="text-sm text-slate-500">Market Value</div>
        <div className="text-2xl font-semibold mt-2">₹ {computed.totalMarket.toFixed(2)}</div>
      </div>
      <div className={`p-4 rounded-lg shadow-sm ${computed.totalPnl >= 0 ? 'bg-emerald-50' : 'bg-rose-50'}`}>
        <div className="text-sm text-slate-500">Unrealised P/L</div>
        <div className={`text-2xl font-semibold mt-2 ${computed.totalPnl >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>₹ {computed.totalPnl.toFixed(2)}</div>
      </div>
    </div>

    <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-500 text-left border-b">
              <th className="py-3">Symbol</th>
              <th>Qty</th>
              <th>Avg Price</th>
              <th>LTP</th>
              <th>Invested</th>
              <th>Market Value</th>
              <th>P/L</th>
              <th className="text-right">P/L %</th>
            </tr>
          </thead>
          <tbody>
            {computed.rows.map(r => (
              <tr key={r.symbol} className="border-b last:border-b-0">
                <td className="py-3">
                  <div className="font-medium">{r.symbol}</div>
                  <div className="text-xs text-slate-500">{r.name}</div>
                </td>
                <td>
                  <input type="number" value={r.qty} onChange={(e)=>updateQty(r.symbol, e.target.value)} className="w-20 px-2 py-1 border rounded-md" />
                </td>
                <td>₹ {r.avgPrice.toFixed(2)}</td>
                <td>₹ {r.ltp.toFixed(2)}</td>
                <td>₹ {r.invested.toFixed(2)}</td>
                <td>₹ {r.marketValue.toFixed(2)}</td>
                <td className={`${r.pnl >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>₹ {r.pnl.toFixed(2)}</td>
                <td className="text-right">{r.pnlPercent.toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="text-sm text-slate-500">Allocation by Market Value</div>
        <div style={{ height: 300 }} className="mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={computed.allocation} dataKey="value" nameKey="name" outerRadius={90} innerRadius={45} label={({ percent }) => `${(percent * 100).toFixed(0)}%`}>
                {computed.allocation.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `₹ ${Number(value).toFixed(2)}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>

    <div className="mt-8 flex gap-3">
      <button className="px-4 py-2 bg-indigo-600 text-white rounded-md">Place Order</button>
      <button className="px-4 py-2 border rounded-md">Add Cash</button>
      <button className="px-4 py-2 border rounded-md">View Transactions</button>
    </div>
  </div>
</div>

); }
