import { useState } from "react";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-[#222222] text-white font-jakarta">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-5">
        {/* Logo */}
        <div className="text-3xl md:text-4xl font-bold font-doulaise">
          Snow Ace
        </div>
        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex md:space-x-16 lg:space-x-32">
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
        {/* Mobile menu button */}
        <button
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 ring-1 ring-white/20 hover:bg-white/10"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((v) => !v)}
        >
          <span className="sr-only">Open main menu</span>
          {!isOpen ? (
            /* Hamburger */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M3.75 5.25a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 6a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 6a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            /* Close */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 0 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      </div>
      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden border-t border-white/10">
          <ul className="px-6 py-4 space-y-3">
            <li>
              <a href="/" onClick={() => setIsOpen(false)}>
                Home
              </a>
            </li>
            <li>
              <a href="/projects" onClick={() => setIsOpen(false)}>
                Projects
              </a>
            </li>
            <li>
              <a href="/contact" onClick={() => setIsOpen(false)}>
                Contact
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Header;
