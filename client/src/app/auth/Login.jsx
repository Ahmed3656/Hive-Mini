import React from 'react';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import {
  Button,
  Input,
  Carousel,
  Checkbox,
  useToastHelpers,
} from '../../components/ui';

const carouselSlides = [
  {
    title: 'Observe, measure & analyze',
    description:
      'Deliver accurate CX insights to all levels and all positions Discover growth opportunities Internal teams collaboration to identify root causes of bad customer experience',
    image: '/images/c1.jpg',
  },
  {
    title: 'Collect & understand',
    description:
      'Gather comprehensive feedback from your customers across multiple touchpoints and channels to build a complete picture of their experience',
    image: '/images/c2.jpg',
  },
  {
    title: 'Act & improve',
    description:
      'Transform insights into actionable strategies that drive meaningful improvements in customer satisfaction and business growth',
    image: '/images/c3.jpg',
  },
];

export const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const { success, danger } = useToastHelpers();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/API/User/Login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Username: username,
            Password: password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.Result) {
        if (rememberMe) {
          localStorage.setItem('rememberedUsername', username);
        } else {
          localStorage.removeItem('rememberedUsername');
        }

        success('Login successful!');
        onLogin(data.Result);
      } else {
        danger('Login failed.', 'Invalid email or password.');
      }
    } catch (err) {
      danger('Network error.', 'Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const rememberedUsername = localStorage.getItem('rememberedUsername');
    if (rememberedUsername) {
      setUsername(rememberedUsername);
      setRememberMe(true);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex sm:flex-row">
      {/* Carousel Section */}
      <div className="hidden lg:flex lg:w-2/5">
        <Carousel carouselSlides={carouselSlides} className="h-full" />
      </div>

      {/* Login Form Section */}
      <div className="flex-1 lg:w-3/5 bg-white flex items-center justify-center px-4 sm:px-8 lg:px-12 py-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8 lg:mb-12">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0075BE] mb-2">
              hive<span className="text-[#FAB900]">cfm</span>
            </h1>
          </div>

          {/* Header */}
          <div className="text-center mb-6 lg:mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              LOGIN
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Please login with username & password to enter the portal
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <Input
                id="username"
                type="text"
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[2.6rem] text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <Checkbox
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              label="Remember my Username & Password"
            />

            <Button type="submit" className="w-full" size="lg">
              Enter
            </Button>
          </form>

          {/* Create Account Link */}
          <div className="text-center mt-4 sm:mt-6">
            <span className="text-sm sm:text-base text-gray-600">
              {"Don't have an account? "}
            </span>
            <Button
              variant="highlight"
              className="font-medium p-0 text-sm sm:text-base"
            >
              Create New Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
