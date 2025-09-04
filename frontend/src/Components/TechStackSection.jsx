function TechStackSection() {
  return (
    <section className="py-12 text-center bg-black w-full font-jakarta">
      <p className="text-white uppercase tracking-wide mb- font-bold text-4xl">
        Experience With
      </p>
      <div className="flex justify-center gap-6 mt-8 text-white">
        <img
          className="max-w-full w-96"
          src="/tech-stack.png"
          alt="Tech Stack"
        />
      </div>
    </section>
  );
}

export default TechStackSection;
