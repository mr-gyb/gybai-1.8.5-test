import React, { useState } from 'react';
import { Apple, Mail, Phone, ChevronDown, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import VerificationStep from './VerificationStep';

const UserOnboarding: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [password, setPassword] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [country, setCountry] = useState('US');
  const [error, setError] = useState('');

  const handleContinue = () => {
    setError('');
    if (step === 0 && !phoneNumber && !email) {
      setError('Please enter a valid phone number or email');
      return;
    }
    if (step === 1 && (!firstName || !lastName)) {
      setError('Please enter your first and last name');
      return;
    }
    if (step === 2 && !birthday) {
      setError('Please enter your birthday');
      return;
    }
    if (step === 3 && !password) {
      setError('Please enter a password');
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleFinish = () => {
    login({ 
      name: `${firstName} ${lastName}`, 
      email: email || undefined,
      phoneNumber: phoneNumber || undefined,
      birthday,
      notificationsEnabled,
      username: email ? email.split('@')[0] : undefined,
      experience: 'intermediate',
      rating: 4.7,
      joinDate: 'Joined April 2023',
      following: 250,
      followers: 1000,
      bio: 'Passionate about technology and innovation',
      location: 'San Francisco, CA',
      website: 'https://example.com'
    });
    navigate('/dashboard');
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {step > 0 && (
          <button onClick={handleBack} className="mb-4 text-navy-blue">
            <ArrowLeft size={24} />
          </button>
        )}
        {step === 0 && (
          <>
            <h1 className="text-3xl font-bold mb-6 text-center">Welcome to GYB AI</h1>
            <div className="space-y-4">
              <button className="w-full bg-black text-white rounded-full py-3 px-4 font-semibold flex items-center justify-center">
                <Apple size={24} className="mr-2" />
                Continue with Apple
              </button>
              <div className="flex items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="px-4 text-gray-500">or</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Phone number"
                className="w-full bg-white border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-navy-blue"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full bg-white border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-navy-blue"
              />
            </div>
          </>
        )}
        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold mb-4">What's your name?</h2>
            <div className="space-y-4">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
                className="w-full bg-white border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-navy-blue"
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
                className="w-full bg-white border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-navy-blue"
              />
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <h2 className="text-2xl font-bold mb-4">When's your birthday?</h2>
            <input
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-navy-blue"
            />
          </>
        )}
        {step === 3 && (
          <>
            <h2 className="text-2xl font-bold mb-4">Create a password</h2>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-white border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-navy-blue"
            />
          </>
        )}
        {step === 4 && (
          <>
            <h2 className="text-2xl font-bold mb-4">Enable notifications</h2>
            <div className="flex items-center justify-between">
              <span>Receive notifications</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={notificationsEnabled}
                  onChange={(e) => setNotificationsEnabled(e.target.checked)}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </>
        )}
        {step === 5 && (
          <>
            <h2 className="text-2xl font-bold mb-4">Select your country</h2>
            <div className="relative">
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-lg py-3 px-4 appearance-none focus:outline-none focus:ring-2 focus:ring-navy-blue"
              >
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="UK">United Kingdom</option>
                {/* Add more countries as needed */}
              </select>
              <ChevronDown size={24} className="absolute right-3 top-3 pointer-events-none" />
            </div>
          </>
        )}
        {step === 6 && (
          <VerificationStep
            onVerificationComplete={handleFinish}
            contactMethod={phoneNumber ? 'phone' : 'email'}
            contactValue={phoneNumber || email}
          />
        )}
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {step < 6 && (
          <button
            onClick={handleContinue}
            className="w-full bg-navy-blue text-white rounded-full py-3 px-4 font-semibold mt-6 hover:bg-opacity-90 transition duration-300"
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
};

export default UserOnboarding;