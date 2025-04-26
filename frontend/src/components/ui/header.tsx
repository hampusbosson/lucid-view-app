const Header = () => {
  return (
    <header className="w-full py-6 border-b fixed backdrop">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="text-xl font-semibold text-white tracking-tight">
          SpotCheck
        </div>
        <nav className="space-x-6 text-sm text-gray-400">
          <a href="#features" className="hover:text-white">
            Features
          </a>
          <a href="#demo" className="hover:text-white">
            Demo
          </a>
          <a href="#pricing" className="hover:text-white">
            Pricing
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
