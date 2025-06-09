export default function FilterPanel({ filters, setFilters }) 
{
    return (
      <div className="bg-white p-6 rounded-xl shadow-md border border-indigo-100 sticky top-6">

        <h3 className="text-lg font-semibold text-indigo-900 mb-4 tracking-tight">Filter Visas</h3>

        <div className="mb-5">
          <label className="block text-sm font-medium text-indigo-800 mb-2">Max Cost ($)</label>
          <input type="number" name="maxCost" value={filters.maxCost} onChange={(e) => setFilters({ ...filters, maxCost: e.target.value })} placeholder="e.g., 500" className="w-full p-3 bg-indigo-50 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-300 text-indigo-900" />
        </div>

        <div>
          <label className="block text-sm font-medium text-indigo-800 mb-2">Max Processing Time</label>
          <input type="text" name="maxProcessingTime" value={filters.maxProcessingTime} onChange={(e) => setFilters({ ...filters, maxProcessingTime: e.target.value })} placeholder="e.g., 2 weeks" className="w-full p-3 bg-indigo-50 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-300 text-indigo-900" />
        </div>
        
      </div>
    );
}