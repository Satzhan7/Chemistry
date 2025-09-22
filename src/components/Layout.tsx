import React from 'react';
import { Atom, BookOpen, FileText, Gamepad2, Lightbulb, Mail, Menu, X } from 'lucide-react';

type Section = 'home' | 'materials' | 'tests' | 'games' | 'tips' | 'contact';

interface LayoutProps {
  children: React.ReactNode;
  currentSection: Section;
  onSectionChange: (section: Section) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentSection, onSectionChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { key: 'home' as Section, label: 'Басты бет', icon: Atom },
    { key: 'materials' as Section, label: 'Материалдар', icon: BookOpen },
    { key: 'tests' as Section, label: 'Тест және сауалнама', icon: FileText },
    { key: 'games' as Section, label: 'Ойындар және жаттығулар', icon: Gamepad2 },
    { key: 'tips' as Section, label: 'Кеңестер мен тәсілдер', icon: Lightbulb },
    { key: 'contact' as Section, label: 'Байланыс', icon: Mail },
  ];

  const handleNavClick = (section: Section) => {
    onSectionChange(section);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Atomic Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
        
        {/* Floating Atoms */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          >
            <div className="relative">
              {/* Nucleus */}
              <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg"></div>
              {/* Electron Orbits */}
              <div className="absolute top-1/2 left-1/2 w-12 h-12 border border-blue-400/30 rounded-full animate-spin" style={{ transform: 'translate(-50%, -50%)', animationDuration: '4s' }}>
                <div className="absolute top-0 left-1/2 w-1 h-1 bg-blue-400 rounded-full transform -translate-x-1/2"></div>
              </div>
              <div className="absolute top-1/2 left-1/2 w-8 h-8 border border-green-400/30 rounded-full animate-spin" style={{ transform: 'translate(-50%, -50%) rotate(60deg)', animationDuration: '3s', animationDirection: 'reverse' }}>
                <div className="absolute top-0 left-1/2 w-1 h-1 bg-green-400 rounded-full transform -translate-x-1/2"></div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Electron Flow Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <defs>
            <linearGradient id="electronFlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
          {[...Array(8)].map((_, i) => (
            <path
              key={i}
              d={`M${Math.random() * 100},${Math.random() * 100} Q${Math.random() * 100},${Math.random() * 100} ${Math.random() * 100},${Math.random() * 100}`}
              stroke="url(#electronFlow)"
              strokeWidth="1"
              fill="none"
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.5}s` }}
            />
          ))}
        </svg>
      </div>
      
      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen bg-gradient-to-br from-white/95 via-blue-50/90 to-green-50/95 backdrop-blur-sm">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <button 
              onClick={() => handleNavClick('home')}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 p-2 rounded-full shadow-lg">
                <Atom className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Нұрзипа Химия</h1>
                <p className="text-sm text-gray-600">Интерактивті оқыту платформасы</p>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.key}
                    onClick={() => handleNavClick(item.key)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                      currentSection === item.key
                        ? 'bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-purple-600 hover:shadow-md'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-200 hover:scale-105"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? 'max-h-96 pb-4' : 'max-h-0'
          }`}>
              <nav className="grid grid-cols-2 gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.key}
                      onClick={() => handleNavClick(item.key)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                        currentSection === item.key
                          ? 'bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 text-white shadow-md'
                          : 'text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-purple-600'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium text-sm">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 text-white py-8 mt-16 relative">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center relative z-10">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 p-2 rounded-full shadow-lg">
                <Atom className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold">Нұрзипа Химия Платформасы</h3>
            </div>
            <p className="text-gray-400 mb-4">Барлық студенттер үшін химияны қолжетімді және қызықты ету</p>
            <p className="text-sm text-gray-500">© 2025 Химия орталығы. Барлық құқықтар қорғалған.</p>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
};

export default Layout;