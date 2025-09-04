function ProjectsPage() {
  const projects = [
    {
      title: "Instameow – Social Media Platform",
      image: "/insta-meow.png",
      description:
        "Full‑stack app using Node.js, Express, PostgreSQL, Redis, React, Tailwind CSS, and Cloudinary.",
      repoUrl: "https://github.com/SnowAceAlex/Social-Media-Project",
      tags: ["Full‑stack", "Node.js", "React", "PostgreSQL"],
    },
    {
      title: "LibMan – Library Management System",
      image: "/lib-man.png",
      description:
        "Full‑stack system with Spring Boot backend and React + TypeScript frontend.",
      repoUrl: "https://github.com/tnphucccc/LibMan",
      tags: ["Spring Boot", "React", "TypeScript"],
    },
  ];

  return (
    <main className="bg-black text-white min-h-screen font-jakarta">
      <section className="max-w-6xl mx-auto px-6 pt-12 pb-6 text-center">
        <p className="text-transparent bg-clip-text bg-gradient-to-t from-[#FF8660] via-[#D5491D] to-[#8E1F00] to-90% uppercase tracking-wide font-bold text-4xl">
          Projects
        </p>
        <h1 className="mt-4 text-3xl md:text-5xl font-semibold">
          Selected Work
        </h1>
        <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
          A curated collection of applications and systems I’ve built across
          web, backend, and full‑stack development.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid gap-8 sm:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.title}
              className="bg-[#2A2A2A] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative w-full aspect-video">
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-left">
                  <h3
                    className="font-bold text-lg md:text-xl text-white cursor-pointer hover:underline"
                    onClick={() =>
                      window.open(
                        project.repoUrl,
                        "_blank",
                        "noopener,noreferrer"
                      )
                    }
                  >
                    {project.title}
                  </h3>
                </div>
              </div>

              <div className="p-5">
                <p className="text-sm text-gray-300">{project.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-full bg-black/40 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-white text-black text-sm font-medium hover:bg-gray-200 transition-colors"
                  >
                    Repository
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="text-center text-gray-400 mt-12">
          Want more details? Reach out via the contact section below.
        </p>
      </section>
    </main>
  );
}

export default ProjectsPage;
