import { useState } from "react";

export default function VisaForm({ onSubmit }) 
{
  const [country, setCountry] = useState("");
  const [purpose, setPurpose] = useState("");

  const countries = ["USA", "Canada", "Australia", "UK"];
  const purposes = ["Study", "Work", "Travel"];

  const handleSubmit = (e) => 
  {
    e.preventDefault();
    onSubmit({ country, purpose });
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg max-w-lg mx-auto border border-indigo-100">

      <h2 className="text-3xl font-bold text-center text-indigo-900 mb-6 tracking-tight">Find Your Perfect Visa</h2>

      <form onSubmit={handleSubmit}>

        <div className="mb-6">
          <label className="block text-sm font-medium text-indigo-800 mb-2">Country</label>
          <select value={country} onChange={(e) => setCountry(e.target.value)} className="w-full p-3 bg-indigo-50 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-300 text-indigo-900" required >
            <option value="">Select Country</option>
            {countries.map((c) => ( <option key={c} value={c}>{c}</option> ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-indigo-800 mb-2">Purpose</label>
          <select value={purpose} onChange={(e) => setPurpose(e.target.value)} className="w-full p-3 bg-indigo-50 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-300 text-indigo-900" required >
            <option value="">Select Purpose</option>
            {purposes.map((p) => ( <option key={p} value={p}>{p}</option> ))}
          </select>
        </div>

        <button type="submit" className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition duration-300 font-medium" > Search Visas </button>

      </form>
      
    </div>
  );
}