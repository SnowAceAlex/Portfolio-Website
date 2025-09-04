function Header() {
  return (
    <header className="bg-[#222222] text-white h-20 font-jakarta">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-12 py-5">
        {/* Logo */}
        <div className="text-4xl font-bold font-doulaise">Snow Ace</div>
        {/* Navigation */}
        <nav>
          <ul className="flex space-x-32">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/projects">Projects</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
