export default function VisaCard({ visa }) 
{
    return (
      <div className="bg-white p-6 rounded-xl shadow-md border border-indigo-100 hover:shadow-xl hover:-translate-y-1 transition duration-300">

        <h3 className="text-xl font-semibold text-indigo-900 mb-3 tracking-tight">{visa.visaType}</h3>

        <p className="text-sm text-indigo-700 mb-1">
          <span className="font-medium text-amber-600">Country:</span> {visa.country}
        </p>

        <p className="text-sm text-indigo-700 mb-1">
          <span className="font-medium text-amber-600">Purpose:</span> {visa.purpose}
        </p>

        <p className="text-sm text-indigo-700 mb-1">
          <span className="font-medium text-amber-600">Duration:</span> {visa.duration}
        </p>

        <p className="text-sm text-indigo-700 mb-1">
          <span className="font-medium text-amber-600">Processing Time:</span> {visa.processingTime}
        </p>

        <p className="text-sm text-indigo-700 mb-4">
          <span className="font-medium text-amber-600">Cost:</span> {visa.cost}
        </p>
        
        <div>
          <p className="text-sm font-medium text-indigo-800 mb-2">Requirements:</p>
          <ul className="list-disc list-inside text-sm text-indigo-700">{visa.requirements.map((req, index) => ( <li key={index}>{req}</li> ))}</ul>
        </div>
        
      </div>
    );
}