"use client";

import { useState, useEffect } from "react";
import VisaForm from "../components/VisaForm";
import VisaCard from "../components/VisaCard";
import FilterPanel from "../components/FilterPanel";
import visasData from "../data/visas.json";

export default function Home()
{
  const [visas, setVisas] = useState(visasData);
  const [filteredVisas, setFilteredVisas] = useState([]);
  const [formFilters, setFormFilters] = useState({ country: "", purpose: "" });
  const [costTimeFilters, setCostTimeFilters] = useState({ maxCost: "", maxProcessingTime: "" });


  const handleFormSubmit = ({ country, purpose }) => 
  {
    setFormFilters({ country, purpose });
  };


  function parseProcessingTime(timeStr) 
  {
    const time = timeStr.toLowerCase().trim();

    const match = time.match(/^(\d+)\s*(week|weeks|month|months|day|days)$/);

    if (!match) 
    {
      return null;
    }

    const value = parseInt(match[1], 10);
    const unit = match[2];

    if (unit.includes("day")) 
    {
      return value;
    }
    if (unit.includes("week")) 
    {
      return value * 7;
    }
    if (unit.includes("month")) 
    {
      return value * 30;
    }
    return null;
  }


  useEffect(() => 
  {
    let filtered = visasData;

    if (formFilters.country && formFilters.purpose) 
    {
      filtered = filtered.filter((visa) => visa.country.toLowerCase() === formFilters.country.toLowerCase() && visa.purpose.toLowerCase() === formFilters.purpose.toLowerCase());
    }

  
    if (costTimeFilters.maxCost) 
    {
      const maxCost = parseFloat(costTimeFilters.maxCost);

      if (!isNaN(maxCost)) 
      {
        filtered = filtered.filter((visa) => 
        {
          const costStr = visa.cost.replace(/[^0-9.]/g, "");
          const cost = parseFloat(costStr);
          return !isNaN(cost) && cost <= maxCost;
        });
      }
    }

  
    if (costTimeFilters.maxProcessingTime) 
    {
      const maxTime = parseProcessingTime(costTimeFilters.maxProcessingTime);
      if (maxTime !== null) 
      {
        filtered = filtered.filter((visa) => 
        {
          const visaTime = parseProcessingTime(visa.processingTime);
          return visaTime !== null && visaTime <= maxTime;
        });
      }
    }

    setFilteredVisas(filtered);

  }, [formFilters, costTimeFilters]);


  useEffect(() => 
  {
    setFilteredVisas(visasData);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-amber-50 py-16 px-4 sm:px-6 lg:px-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold text-center text-indigo-900 mb-12 tracking-tight"> Visa Finder Tool </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          <div className="md:col-span-1"> <FilterPanel filters={costTimeFilters} setFilters={setCostTimeFilters} /> </div>

          <div className="md:col-span-3">

            <VisaForm onSubmit={handleFormSubmit} />

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVisas.length > 0 
              ? 
              (
                filteredVisas.map((visa) => <VisaCard key={visa.id} visa={visa} />)
              ) 
              : 
              (
                <p className="text-center text-amber-600 col-span-full text-lg font-medium"> No visas found. Try different options! </p>
              )}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}