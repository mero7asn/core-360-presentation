# SUPER ERP Immersive Presentation

This is a presentation layer for an existing ERP. It does not implement ERP authentication, storage, accounting, HR, CRM, inventory, or workflow logic.

## Run

```bash
npm install
npm run dev
```

The production check is:

```bash
npm run build
```

## Presentation flow

The experience moves through `HeroLoader`, the headquarters walkthrough, a department door transition, `DepartmentStage`, and `WholeOrgExperience`. `PRESENTATION_FLOW` in `src/config/presentation.config.ts` controls guided mode order.

The presenter HUD supports:

- Guided presentation and free exploration modes
- Previous/next flow navigation
- Presenter notes
- Global search with `Ctrl+K`
- Fullscreen with `F`
- Home/lobby recovery with `H`
- Department shortcuts `2` through `7`

## Add a department

Add one `DepartmentConfig` object to `DEPARTMENTS_CONFIG`, including its floor, room, generated interior image, KPIs, features, showcase hotspots, presenter notes, and ERP link metadata. Navigation, search, room portals, door transitions, and the reusable presentation scene consume this configuration automatically.

Add the department to `PRESENTATION_FLOW` to include it in guided mode.

## Assets and ERP integration

Place presentation images and videos in `public/` with meaningful names. `realisticRoomImage` supplies the architectural room material; `showcase.screenshotUrl` is available for future real ERP screenshots.

Copy `.env.example` to `.env.local` and set:

```env
VITE_ERP_BASE_URL=https://your-existing-erp.example.com
VITE_ENABLE_LIVE_DATA=false
```

The default UI labels metrics as `DEMO DATA`. Set `VITE_ENABLE_LIVE_DATA=true` only when a real data provider is connected. No credentials or secrets belong in this frontend.
