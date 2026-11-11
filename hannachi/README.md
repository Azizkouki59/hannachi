# Hannachi Elektrohaushaltsgeräte Service

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Lucide icons. Self-hosted Manrope font, no other runtime dependencies.

## Run
    npm install
    npm run dev      # http://localhost:3000
    npm run build && npm start

## Hero image
Place the illustration at `public/images/hannachi-workshop.png` (4:5 portrait works best). Until it exists, a drawn workshop scene is shown instead.

## Repair form backend
`src/lib/repairRequest.ts` → `submitRepairRequest`. Set `NEXT_PUBLIC_REPAIR_REQUEST_URL` to an endpoint that accepts multipart/form-data. Without it, nothing is sent and the success screen says so.

## Business data
All verified facts live in `src/data/site.ts`. Reviews are verbatim from hannachi.de. Missing legal data is marked on /impressum and /datenschutz.
