function TechStackSection() {
  return (
    <section className="py-12 text-center bg-black w-full font-jakarta px-6">
      <p className="text-white uppercase tracking-wide font-bold text-3xl sm:text-4xl">
        Experience With
      </p>
      <div className="flex justify-center mt-6 sm:mt-8 text-white">
        <img
          className="w-full max-w-md sm:max-w-lg md:max-w-2xl h-auto"
          src="/tech-stack.png"
          alt="Tech Stack"
        />
      </div>
    </section>
  );
}

export default TechStackSection;
