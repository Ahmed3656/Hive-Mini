import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  BarChart3,
  Users,
  Palette,
  Send,
  Library,
  Zap,
  FileText,
  Settings,
  HelpCircle,
  LogOut,
  Bell,
  User,
  Menu,
  X,
} from 'lucide-react';
import '../../styles/Layout.css';

const sidebarItems = [
  { id: 'survey', icon: BarChart3, label: 'Survey', active: true },
  { id: 'contacts', icon: Users, label: 'Contacts' },
  { id: 'themes', icon: Palette, label: 'Themes' },
  { id: 'invitations', icon: Send, label: 'Invitations' },
  { id: 'library', icon: Library, label: 'Library' },
  { id: 'action-cards', icon: Zap, label: 'Action cards' },
  { id: 'reports', icon: FileText, label: 'Reports' },
  { id: 'settings', icon: Settings, label: 'Settings' },
  { id: 'help', icon: HelpCircle, label: 'Help' },
];

export const Layout = ({ children }) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when clicking outside
  useEffect(() => {
    const overlay = document.querySelector('.mobile-overlay');
    const handleOverlayClick = (e) => {
      if (e.target === overlay) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen && overlay) {
      overlay.addEventListener('click', handleOverlayClick);
    }

    return () => {
      if (overlay) {
        overlay.removeEventListener('click', handleOverlayClick);
      }
    };
  }, [mobileMenuOpen]);

  const SidebarContent = ({ isMobile = false }) => (
    <>
      {/* Logo and Toggle */}
      <div className="mb-8 px-4 flex items-center relative">
        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 relative z-10">
          <span className="text-[#0075BE] font-bold text-lg">H</span>
        </div>
        <span
          className={`ml-3 text-white font-semibold text-lg ${isMobile ? '' : 'logo-text'}`}
        >
          hivecfm
        </span>
        {isMobile && (
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="ml-auto text-white/70 hover:text-white p-2"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Toggle Button - lg screen */}
      {!isMobile && (
        <div className="mb-6 px-4">
          <button
            onClick={() => setSidebarExpanded(!sidebarExpanded)}
            className="sidebar-button w-full"
            title={
              !sidebarExpanded
                ? sidebarExpanded
                  ? 'Collapse'
                  : 'Expand'
                : undefined
            }
          >
            <Menu size={20} className="sidebar-icon" />
            <span className="sidebar-label">
              {sidebarExpanded ? 'Collapse' : 'Expand'}
            </span>
          </button>
        </div>
      )}

      {/* Navigation Items */}
      <div className="flex flex-col space-y-2 flex-1 px-4">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === `/${item.id}`;

          return (
            <Link
              key={item.id}
              to={`/${item.id}`}
              className={`sidebar-button ${isActive ? 'active' : ''} ${isMobile ? 'w-full justify-start' : ''}`}
              title={!sidebarExpanded && !isMobile ? item.label : undefined}
              // onClick={() => isMobile && setMobileMenuOpen(false)}
            >
              <Icon size={20} className={isMobile ? 'mr-3' : 'sidebar-icon'} />
              <span
                className={isMobile ? 'text-sm font-medium' : 'sidebar-label'}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Logout */}
      <div className="px-4 mt-4">
        <button
          className={`sidebar-button w-full ${isMobile ? 'justify-start' : ''}`}
          title={!sidebarExpanded && !isMobile ? 'Logout' : undefined}
          onClick={() => isMobile && setMobileMenuOpen(false)}
        >
          <LogOut size={20} className={isMobile ? 'mr-3' : 'sidebar-icon'} />
          <span className={isMobile ? 'text-sm font-medium' : 'sidebar-label'}>
            Logout
          </span>
        </button>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Overlay */}
      <div
        className={`mobile-overlay md:hidden ${mobileMenuOpen ? 'open' : ''}`}
      />

      {/* Desktop Sidebar */}
      <div
        className={`hidden md:flex bg-[#0075BE] sidebar-main flex-col py-6 ${
          sidebarExpanded ? 'w-64 sidebar-expanded' : 'w-20 sidebar-collapsed'
        }`}
      >
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`mobile-sidebar md:hidden bg-[#0075BE] flex flex-col py-6 ${mobileMenuOpen ? 'open' : ''}`}
      >
        <SidebarContent isMobile={true} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-2 text-gray-600 hover:text-gray-900"
              >
                <Menu size={20} />
              </button>
              <div className="text-sm text-gray-600">
                <span className="text-[#0075BE] font-medium">hivecfm</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <span className="hidden sm:block text-gray-700">
                Welcome, Basem Shawaly!
              </span>
              <span className="sm:hidden text-gray-700 text-sm">Welcome!</span>

              <div className="flex items-center space-x-2 sm:space-x-3">
                <button className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors">
                  <User size={14} className="sm:w-4 sm:h-4 text-gray-600" />
                </button>
                <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Bell size={18} className="sm:w-5 sm:h-5" />
                  <span className="absolute top-0.5 right-1 w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded-full text-white text-[8px] sm:text-[10px] flex items-center justify-center">
                    20
                  </span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
};
