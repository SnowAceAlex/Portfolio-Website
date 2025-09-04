function HeroSection() {
  return (
    <section className="text-center py-12 md:py-16 bg-black w-full text-white px-6">
      <img
        src="/avatar.png"
        alt="avatar"
        className="w-28 h-28 md:w-48 md:h-48 rounded-full mx-auto mb-6 bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90%"
      />
      <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mt-6 md:mt-8 leading-tight">
        You will never win
        <br /> if you never {""}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-blue-400 to-indigo-500 to-90%">
          code!
        </span>
      </h1>
      {/* My name */}
      <h2 className="text-xl sm:text-2xl md:text-3xl mt-6 md:mt-8">
        My name is Bui Cong Vinh
      </h2>
      {/* My description */}
      <p className="text-[#C5C5C5] mt-4 max-w-xl mx-auto text-sm sm:text-base">
        I am currently a final-year Computer Science student at International
        University - VNU HCMC. I have hands-on experience with full-stack
        development using Node.js, Express, Spring Boot, React, and Next.js,
        along with relational databases. I’m always eager to learn, collaborate,
        and apply my skills to real-world projects
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-6 md:mt-8">
        <a
          href="/contact"
          className="px-5 py-2 md:px-6 md:py-2 bg-white text-black rounded-full font-semibold hover:bg-gray-200"
        >
          Get In Touch
        </a>
        <a
          href="/cv.pdf"
          download
          className="px-5 py-2 md:px-6 md:py-2 border border-white rounded-full font-semibold hover:bg-gray-800"
        >
          Download CV
        </a>
      </div>
    </section>
  );
}

export default HeroSection;
