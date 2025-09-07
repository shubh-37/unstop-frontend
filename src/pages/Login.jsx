import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import unstop from '../assets/Illustration.png';
import google from '../assets/google.png';
import facebook from '../assets/facebook.png';
import accountCircle from '../assets/account_circle.png';
import mail from '../assets/mail.png';
import key from '../assets/key.png';

export default function Login({ onLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.username !== 'emilys') {
      newErrors.username = 'Username must be "emilys"';
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email format (e.g., example@gmail.com)';
    }
    if (formData.password.length < 8) {
      newErrors.password = 'Password must contain at least 8 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        onLogin(data.accessToken);
        localStorage.setItem('user', JSON.stringify({ ...data, accessToken: '', refreshToken: '' }));
      } else {
        setErrors({ general: data.message || 'Login failed' });
      }
    } catch (error) {
      setErrors({ general: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f4f4] flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
        <div className="flex items-center justify-center">
          <img src={unstop} alt="Unstop" className="hidden md:block w-full h-full object-contain" />
        </div>

        <div className="flex items-center justify-center">
          <div className="w-full max-w-xl border border-gray-200 rounded-xl p-10 bg-white">
            <div className="mb-8">
              <h1 className="text-4xl font-medium text-gray-800 mb-1">Welcome to</h1>
              <h2 className="text-4xl font-black text-[#6358DC]">Unstop</h2>
            </div>

            <div className="space-y-4 mb-6">
              <button className="w-full shadow-xs flex items-center justify-center gap-[10px] px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <img src={google} alt="Google" />
                <span className="text-gray-700 font-medium">Login with Google</span>
              </button>

              <button className="w-full shadow-xs flex items-center justify-center gap-[10px] px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <img src={facebook} alt="Facebook" />
                <span className="text-gray-700 font-medium">Login with Facebook</span>
              </button>
            </div>
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-6 bg-white font-normal">OR</span>
              </div>
            </div>

            {errors.general && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {errors.general}
              </div>
            )}
            <form className="space-y-[10px]" onSubmit={handleSubmit}>
              <div>
                <div className="relative bg-gray-100 rounded-lg py-3 px-4">
                  <img
                    src={accountCircle}
                    alt="accountCircle"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <div className="pl-10">
                    <label className="block text-xs text-gray-600 mb-1">User name</label>
                    <input
                      type="text"
                      placeholder="username"
                      value={formData.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      className="w-full bg-transparent border-0 outline-none text-gray-800 font-bold placeholder-gray-500"
                    />
                  </div>
                </div>
                {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
              </div>

              <div>
                <div className="relative bg-gray-100 rounded-lg py-3 px-4">
                  <img
                    src={mail}
                    alt="mail"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <div className="pl-10">
                    <label className="block text-xs text-gray-600 mb-1">Email</label>
                    <input
                      type="email"
                      placeholder="username@gmail.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full bg-transparent border-0 outline-none text-gray-800 font-bold placeholder-gray-500"
                    />
                  </div>
                </div>
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <div className="relative bg-gray-100 rounded-lg py-3 px-4">
                  <img
                    src={key}
                    alt="key"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <div className="pl-10 pr-8">
                    <label className="block text-xs text-gray-600 mb-1">Password</label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••••"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="w-full bg-transparent border-0 outline-none text-gray-800  font-bold placeholder-gray-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-black" />
                    ) : (
                      <Eye className="w-5 h-5" fill="black" />
                    )}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>

              <div className="flex items-center justify-between my-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 bg-gray-200 border-0 rounded text-[#6358DC] appearance-none checked:bg-[#6358DC] checked:border-0"
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-sm text-[#6358dc] hover:text-[#6258dc]">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#6358dc] text-white py-3 rounded-lg font-semibold text-base hover:bg-[#6258dc] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-6">
              Don't have an account?{' '}
              <a href="#" className="text-[#6358dc] hover:text-[#6258dc]">
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
