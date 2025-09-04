import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

function Footer() {
  return (
    <footer className="bg-[#191919] h-64 w-full py-10 text-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Title */}
        <h2 className="text-4xl font-semibold mb-4">Contact</h2>

        {/* Description */}
        <p className="max-w-2xl mb-4">
          I am currently a final-year Computer Science student at International
          University - VNU HCMC. I have hands-on experience with full-stack
          development using Node.js, Express, Spring Boot, React, and Next.js,
          along with relational databases. I’m always eager to learn,
          collaborate, and apply my skills to real-world projects
        </p>

        {/* Contact Information */}
        <div className="mb-6 flex items-center space-x-6">
          {/* Email */}
          <div className="flex items-center space-x-2">
            <EmailOutlinedIcon />
            <span className="inline-flex">
              <a
                href="mailto:alexvinh2911@gmail.com"
                className="hover:underline"
              >
                alexvinh2911@gmail.com
              </a>
            </span>
          </div>
          {/* Phone */}
          <div className="flex items-center space-x-2">
            <span className="inline-flex ">
              <PhoneIphoneOutlinedIcon />
              <a href="tel:+84971956757" className="hover:underline">
                +84 0971956757
              </a>
            </span>
          </div>
          {/* LinkedIn */}
          <div className="flex items-center space-x-2">
            <LinkedInIcon />
            <span
              role="button"
              tabIndex={0}
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/cong-vinh-bui/",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  window.open(
                    "https://www.linkedin.com/in/cong-vinh-bui/",
                    "_blank",
                    "noopener,noreferrer"
                  );
                }
              }}
              className="hover:underline cursor-pointer"
            >
              LinkedIn
            </span>
          </div>
          {/* GitHub */}
          <div className="flex items-center space-x-2">
            <GitHubIcon />
            <span
              role="button"
              tabIndex={0}
              onClick={() =>
                window.open(
                  "https://github.com/SnowAceAlex",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  window.open(
                    "https://github.com/SnowAceAlex",
                    "_blank",
                    "noopener,noreferrer"
                  );
                }
              }}
              className="hover:underline cursor-pointer"
            >
              GitHub
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
