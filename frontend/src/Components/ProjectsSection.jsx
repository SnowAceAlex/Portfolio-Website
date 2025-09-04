function ProjectsSection() {
  return (
    <section className="py-12 text-center bg-black w-full font-jakarta">
      <p className="text-transparent bg-clip-text bg-gradient-to-t from-[#FF8660] via-[#D5491D] to-[#8E1F00] to-90% uppercase tracking-wide mb- font-bold text-4xl">
        Projects
      </p>

      <div className="flex justify-center gap-6 mt-8 flex-wrap">
        {/* Instameow */}
        <div className="bg-[#2A2A2A] rounded-xl overflow-hidden shadow-lg w-96 aspect-square">
          <div className="relative w-full h-full">
            <img
              src="./insta-meow.png"
              alt="instameow"
              className="absolute inset-0 w-full h-full object-cover object-left-top"
            />
            <div className=" absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-left">
              <h3
                className="font-bold text-lg text-white cursor-pointer hover:underline"
                onClick={() =>
                  window.open(
                    "https://github.com/SnowAceAlex/Social-Media-Project",
                    "_blank"
                  )
                }
              >
                Instameow – Social Media Platform
              </h3>
              <p className="text-sm text-gray-200/90 mt-1">
                <p class="text-sm text-gray-400">
                  Full-stack app built with Node.js, Express, PostgreSQL, Redis,
                  React, Tailwind CSS, and Cloudinary.
                </p>
              </p>
            </div>
          </div>
        </div>

        {/* LibMan */}
        <div className="bg-[#2A2A2A] rounded-xl overflow-hidden shadow-lg w-96 aspect-square">
          <div className="relative w-full h-full">
            <img
              src="./lib-man.png"
              alt="libman"
              className="absolute inset-0 w-full h-full object-cover object-left-top"
            />
            <div className=" absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-left">
              <h3
                className="font-bold text-lg text-white cursor-pointer hover:underline"
                onClick={() =>
                  window.open("https://github.com/tnphucccc/LibMan", "_blank")
                }
              >
                LibMan – Library Management System
              </h3>
              <p className="text-sm text-gray-200/90 mt-1">
                <p class="text-sm text-gray-400">
                  Full-stack app built with Spring Boot (backend) and React +
                  TypeScript (frontend).
                </p>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
