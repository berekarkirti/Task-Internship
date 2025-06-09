'use client';

import { useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaIdCard, FaPaperPlane, FaSpinner, FaClipboardCheck, FaHourglassHalf } from 'react-icons/fa';

const dummyStatuses = [
  {
    application: '123456789',
    status: 'Submitted',
    details: 'Your visa application has been successfully submitted.',
    lastUpdated: 'May 20, 2025',
  },
  {
    application: '234567',
    status: 'In Progress',
    details: 'Your visa application is being reviewed by the authorities.',
    lastUpdated: 'May 22, 2025',
  },
  {
    application: '2345678',
    status: 'Approved',
    details: 'Congratulations! Your visa application has been approved.',
    lastUpdated: 'May 24, 2025',
  },
  {
    application: '12345',
    status: 'Rejected',
    details: 'Unfortunately, your visa application was not approved.',
    lastUpdated: 'May 24, 2025',
  },
  {
    application: '1234',
    status: 'In Progress',
    details: 'Your visa application is being reviewed by the authorities.',
    lastUpdated: 'May 22, 2025',
  },
  {
    application: '123',
    status: 'In Progress',
    details: 'Your visa application is being reviewed by the authorities.',
    lastUpdated: 'May 22, 2025',
  },
];

export default function Home() {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [applicationNumber, setApplicationNumber] = useState('');
  const [error, setError] = useState(null);

  const steps = [
    { name: 'Enter Application Number', icon: <FaIdCard /> },
    { name: 'Submit Application', icon: <FaPaperPlane /> },
    { name: 'Processing', icon: <FaSpinner /> },
    { name: 'View Status', icon: <FaClipboardCheck /> },
  ];

  const handleApplication = (e) => 
  {
    e.preventDefault();
    if (applicationNumber.trim()) 
    {
      const matchedStatus = dummyStatuses.find((item) => item.application === applicationNumber.trim());

      if (matchedStatus) 
      {
        setStatus(matchedStatus);
        setError(null);
        setStep(2);
      } 
      else
      {
        setError('No application found with this number. Please try again.');
      }
    }
  };

  const checkVisaStatus = async () => 
  {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const matchedStatus = dummyStatuses.find((item) => item.application === applicationNumber.trim());

    if (matchedStatus) 
    {
      setStatus(matchedStatus);
      setError(null);
    } 
    else 
    {
      setError('No application found with this number. Please try again.');
    }
    setLoading(false);
    setStep(4);
  };

  const handleNext = () => 
  {
    if (step === 2) 
    {
      setStep(3);
      checkVisaStatus();
    } 
    else if (step < 4) 
    {
      setStep(step + 1);
    }
  };

  const handleBack = () => 
  {
    if (step > 1) 
    {
      setStep(step - 1);
      setError(null);
      if (step === 4)
      {
        setStatus(null);
      } 
    }
  };

  // const renderProgressBar = () => (
  //   <div className="flex items-center justify-between mb-8 relative">
  //     {steps.map((stepItem, index) => (
  //       <div key={index} className="flex-1 flex flex-col items-center relative z-10">
  //         <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${ step >= index + 1 ? 'bg-blue-500 text-white shadow-lg' : 'bg-gray-200 text-gray-500' }`} >{stepItem.icon}</div>
  //         <p className="text-xs mt-2 text-blue-600 font-medium text-center">
  //           {stepItem.name}
  //         </p>
  //         {index < steps.length - 1 && ( <div className={`absolute top-5 left-1/2 w-full h-1 -z-10 transition-all duration-300 ${ step > index + 1 ? 'bg-blue-500' : 'bg-gray-200' }`} style={{ transform: 'translateX(50%)', width: 'calc(100% - 3rem)' }} /> )}
  //       </div>
  //     ))}
  //   </div>
  // );
  const renderProgressBar = () => (
  <div className="flex items-center justify-between mb-8 relative">
    {steps.map((stepItem, index) => (
      <div key={index} className="flex-1 flex flex-col items-center relative z-10">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
            step >= index + 1 ? 'bg-blue-500 text-white shadow-lg' : 'bg-gray-200 text-gray-500'
          }`}
        >
          {stepItem.icon}
        </div>
        <p className="text-xs mt-2 text-blue-600 font-medium text-center">{stepItem.name}</p>
        {index < steps.length - 1 && (
          <div
            className={`absolute top-5 left-1/2 w-full h-1 -z-10 transition-all duration-300 ${
              step > index + 1 ? 'bg-blue-500' : 'bg-gray-200'
            }`}
            style={{ transform: 'translateX(50%)', width: 'calc(100% - 3rem)' }}
          />
        )}
      </div>
    ))}
  </div>
);
  const getStatusIcon = (status) => 
  {
    switch (status) 
    {
      case 'Approved':
        return <FaCheckCircle className="text-green-500 text-4xl animate-bounce" />;
      case 'In Progress':
        return <FaHourglassHalf className="text-yellow-500 text-4xl animate-pulse" />;
      case 'Submitted':
        return <FaPaperPlane className="text-blue-500 text-4xl animate-pulse" />;
      case 'Rejected':
        return <FaTimesCircle className="text-red-500 text-4xl animate-pulse" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md transform transition-all duration-300 hover:scale-105">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center tracking-tight">
          Visa Status Checker
        </h1>

        {renderProgressBar()}

        {step === 1 && (
          <form onSubmit={handleApplication} className="mb-6">
            <label htmlFor="applicationNumber" className="block text-sm font-semibold text-blue-700 mb-2">
              Enter Application Number
            </label>
            <input type="text" id="applicationNumber" value={applicationNumber} onChange={(e) => setApplicationNumber(e.target.value)} placeholder="Enter your visa application number" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200" required />
            {error && (<p className="mt-2 text-sm text-red-500 font-medium animate-pulse">{error}</p>)}
            <button type="submit" className="mt-4 w-full py-3 px-4 rounded-lg text-white font-semibold bg-blue-500 hover:bg-blue-600 transition-all duration-300 shadow-md" >
              Submit
            </button>
          </form>
        )}

        {step === 2 && (
          <div className="text-center">
            <p className="text-gray-600 mb-4 font-medium">
              Application {applicationNumber} submitted. Click Next to proceed.
            </p>
            <button onClick={handleNext} className="w-full py-3 px-4 rounded-lg text-white font-semibold bg-blue-500 hover:bg-blue-600 transition-all duration-300 shadow-md" >
              Next
            </button>
            <button onClick={handleBack} className="mt-3 w-full py-3 px-4 rounded-lg text-blue-600 font-semibold border border-blue-500 hover:bg-blue-50 transition-all duration-300" >
              Back
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="text-center">
            <p className="text-gray-600 mb-4 font-medium">
              {loading ? 'Processing your application...' : 'Processing complete. Click Next to view status.'}
            </p>
            <button onClick={handleNext} disabled={loading} className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition-all duration-300 shadow-md ${ loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600' }`}>
              {loading ? 'Processing...' : 'Next'}
            </button>
            <button onClick={handleBack} className="mt-3 w-full py-3 px-4 rounded-lg text-blue-600 font-semibold border border-blue-500 hover:bg-blue-50 transition-all duration-300" >
              Back
            </button>
          </div>
        )}

        {step === 4 && status && (
          <div className="mt-6 p-6 bg-blue-50 rounded-lg border border-blue-200 text-center transform transition-all duration-300">
            <div className="flex justify-center mb-3">
              {getStatusIcon(status.status)}
            </div>
            <h2 className="text-xl font-semibold text-blue-800">
              Status: {status.status}
            </h2>
            <p className="text-gray-600 mt-2 font-medium">{status.details}</p>
            <p className="text-sm text-gray-500 mt-1">
              Last Updated: {status.lastUpdated}
            </p>
            <button onClick={handleBack} className="mt-4 w-full py-3 px-4 rounded-lg text-blue-600 font-semibold border border-blue-500 hover:bg-blue-50 transition-all duration-300" >
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}