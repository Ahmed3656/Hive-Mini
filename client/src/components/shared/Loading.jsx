import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { colorConfig, sizeConfig } from '../../constants';
import '../../styles/Loading.css';

export const Loading = ({
  isLoading,
  type = 'spinner',
  size = 'md',
  overlay = true,
  blur = true,
  message,
  submessage,
  color = 'blue',
  className = '',
  children,
}) => {
  const [dots, setDots] = useState('');

  // Animated dots
  useEffect(() => {
    if (!message) return;

    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev.length >= 3) return '';
        return prev + '.';
      });
    }, 500);

    return () => clearInterval(interval);
  }, [message]);

  const currentSize = sizeConfig[size];
  const currentColor = colorConfig[color];

  const renderLoadingAnimation = () => {
    switch (type) {
      case 'spinner':
        return (
          <div
            className={`${currentSize.container} relative flex items-center justify-center`}
          >
            <Loader2
              size={currentSize.icon}
              className={`${currentColor.primary} animate-spin`}
            />
          </div>
        );

      case 'dots':
        return (
          <div className="flex space-x-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`w-3 h-3 ${currentColor.bg} rounded-full animate-bounce`}
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        );

      case 'pulse':
        return (
          <div className={`${currentSize.container} relative`}>
            <div
              className={`w-full h-full ${currentColor.bg} rounded-full pulse-scale`}
            />
          </div>
        );

      case 'wave':
        return (
          <div className="flex space-x-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`w-2 h-8 ${currentColor.bg} rounded-full wave-${(i % 3) + 1}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        );

      case 'orbit':
        return (
          <div className={`${currentSize.container} relative mb-4`}>
            <div className="absolute inset-0 rounded-full" />
            <div
              className={`absolute top-0 left-1/2 w-2 h-2 ${currentColor.bg} rounded-full orbit`}
            />
          </div>
        );

      case 'gradient':
        return (
          <div className={`${currentSize.container} relative`}>
            <div className="w-full h-full rounded-full gradient-shift" />
          </div>
        );

      default:
        return (
          <div className={`${currentSize.container} relative`}>
            <Loader2
              size={currentSize.icon}
              className={`${currentColor.primary} animate-spin`}
            />
          </div>
        );
    }
  };

  if (!isLoading) return <>{children}</>;

  return (
    <>
      {children}
      {overlay && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
            blur ? 'backdrop-blur-sm' : ''
          } bg-black bg-opacity-30`}
        >
          {message || submessage ? (
            <div
              className={`
                bg-white rounded-2xl shadow-2xl p-8 max-w-sm mx-4 flex flex-col justify-center items-center space-y-8 text-center aspect-square transform transition-all duration-300
                ${className}
              `}
            >
              {/* Loading Animation */}
              <div className="flex justify-center items-center">
                {renderLoadingAnimation()}
              </div>

              {/* Message */}
              {message && (
                <div className="space-y-2">
                  <h3
                    className={`font-semibold ${currentColor.primary} ${currentSize.text}`}
                  >
                    {message}
                    <span className="inline-block w-6 text-left">{dots}</span>
                  </h3>
                  {submessage && (
                    <p className="text-sm text-gray-600">{submessage}</p>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* Animation without background when no messages */
            <div className="flex justify-center">
              {renderLoadingAnimation()}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export const InlineLoading = ({
  type = 'spinner',
  size = 'md',
  color = 'blue',
  message,
  className = '',
}) => {
  return (
    <div className={`flex items-center justify-center space-x-3 ${className}`}>
      <Loading
        isLoading={true}
        type={type}
        size={size}
        color={color}
        overlay={false}
        className="bg-transparent shadow-none p-0"
      />
      {message && <span className="text-sm text-gray-600">{message}</span>}
    </div>
  );
};

export const useLoading = (initialState = false) => {
  const [isLoading, setIsLoading] = useState(initialState);

  const startLoading = React.useCallback(() => setIsLoading(true), []);
  const stopLoading = React.useCallback(() => setIsLoading(false), []);
  const toggleLoading = React.useCallback(
    () => setIsLoading((prev) => !prev),
    []
  );

  return {
    isLoading,
    startLoading,
    stopLoading,
    toggleLoading,
  };
};

const LoadingContext = React.createContext(undefined);

export const useGlobalLoading = () => {
  const context = React.useContext(LoadingContext);
  if (!context) {
    throw new Error('useGlobalLoading must be used within a LoadingProvider');
  }
  return context;
};

export const LoadingProvider = ({
  children,
  type: defaultType = 'gradient',
  color: defaultColor = 'blue',
  size: defaultSize = 'md',
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState();
  const [submessage, setSubmessage] = useState();
  const [currentType, setCurrentType] = useState(defaultType);
  const [currentColor, setCurrentColor] = useState(defaultColor);
  const [currentSize, setCurrentSize] = useState(defaultSize);

  const startLoading = React.useCallback(
    (msg, submsg, options) => {
      setMessage(msg);
      setSubmessage(submsg);
      setCurrentType(options?.type || defaultType);
      setCurrentColor(options?.color || defaultColor);
      setCurrentSize(options?.size || defaultSize);

      setIsLoading(true);
    },
    [defaultType, defaultColor, defaultSize]
  );

  const stopLoading = React.useCallback(() => {
    setIsLoading(false);
    setMessage(undefined);
    setSubmessage(undefined);
    setCurrentType(defaultType);
    setCurrentColor(defaultColor);
    setCurrentSize(defaultSize);
  }, [defaultType, defaultColor, defaultSize]);

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        startLoading,
        stopLoading,
        message,
        submessage,
        type: currentType,
        color: currentColor,
        size: currentSize,
      }}
    >
      <Loading
        isLoading={isLoading}
        type={currentType}
        color={currentColor}
        size={currentSize}
        message={message}
        submessage={submessage}
        overlay={true}
        blur={true}
      >
        {children}
      </Loading>
    </LoadingContext.Provider>
  );
};
