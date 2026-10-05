# Portfolio — road-trip redesign

Personal portfolio built with Next.js 16, React Three Fiber (the line-drawn car on the hero road) and Tailwind.

## Develop

```bash
npm ci
npm run dev    # http://localhost:3000
npm run lint
npm run build
```

## Where things live

- `src/content/site.ts` — all copy, jobs, projects and links
- `src/app/` — routes: home, `/projects`, `/projects/[slug]`, `/contact`, 404
- `src/components/home/` — home page sections
- `src/components/hero/` — 3D road scene and engine-start interaction
- `public/` — CV and project images

Deployed on Vercel from the repo root via `vercel.json`, which builds this folder.
