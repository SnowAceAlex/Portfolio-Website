import {
  siCloudinary,
  siExpress,
  siGit,
  siJavascript,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siOpenjdk,
  siPostgresql,
  siReact,
  siRedis,
  siSpringboot,
  siTailwindcss,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";
import { toolbox } from "@/content/site";

const icons: Record<(typeof toolbox)[number]["icon"], SimpleIcon> = {
  siTypescript,
  siJavascript,
  siOpenjdk,
  siReact,
  siNextdotjs,
  siNodedotjs,
  siExpress,
  siSpringboot,
  siPostgresql,
  siMysql,
  siRedis,
  siTailwindcss,
  siCloudinary,
  siGit,
};

function Item({ name, icon }: { name: string; icon: SimpleIcon }) {
  return (
    <li className="flex shrink-0 items-center gap-3 px-6 text-muted transition-colors duration-300 hover:text-fg md:px-8">
      <svg role="img" viewBox="0 0 24 24" className="size-6 fill-current md:size-7" aria-hidden="true">
        <path d={icon.path} />
      </svg>
      <span className="whitespace-nowrap text-lg font-medium tracking-tight md:text-xl">{name}</span>
    </li>
  );
}

// The one marquee on the page. Two copies of the list make the loop seamless.
export function Toolbox() {
  return (
    <div className="marquee relative overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <p className="sr-only">Tools I work with: {toolbox.map((t) => t.name).join(", ")}.</p>
      <div className="marquee-track flex w-max" aria-hidden="true">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex">
            {toolbox.map((t) => (
              <Item key={t.name} name={t.name} icon={icons[t.icon]} />
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
