import React, { useState } from 'react';

interface VerificationStepProps {
  onVerificationComplete: () => void;
  contactMethod: 'phone' | 'email';
  contactValue: string;
}

const VerificationStep: React.FC<VerificationStepProps> = ({
  onVerificationComplete,
  contactMethod,
  contactValue,
}) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');

  const handleVerify = () => {
    // In a real application, you would verify the code with your backend
    if (verificationCode === '123456') {
      onVerificationComplete();
    } else {
      setError('Invalid verification code. Please try again.');
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Verify your account</h2>
      <p>
        We've sent a verification code to your {contactMethod === 'phone' ? 'phone number' : 'email address'}{' '}
        <strong>{contactValue}</strong>. Please enter it below:
      </p>
      <input
        type="text"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
        placeholder="Verification code"
        className="w-full bg-white border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-navy-blue"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        onClick={handleVerify}
        className="w-full bg-navy-blue text-white rounded-full py-3 px-4 font-semibold hover:bg-opacity-90 transition duration-300 text-center"
      >
        Verify
      </button>
    </div>
  );
};

export default VerificationStep;