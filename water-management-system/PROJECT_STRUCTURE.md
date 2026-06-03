# Water Management System

Proyecto base creado con **React + Vite + TypeScript** usando arquitectura **Feature-Driven Architecture (FDA)**.

## Stack incluido

- React Router v6
- TanStack Query (React Query)
- React Hook Form + Zod + @hookform/resolvers
- Tailwind CSS
- Recharts
- Dependencias utiles para Shadcn/ui (`class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react`)

## Estructura principal

```text
src/
├── app/
│   ├── App.tsx
│   ├── providers/
│   │   └── AppProviders.tsx
│   └── router/
│       └── AppRouter.tsx
├── assets/
├── shared/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── types/
│   └── utils/
├── config/
├── features/
│   ├── auth/
│   ├── socios/
│   ├── medidores/
│   ├── lecturas/
│   │   ├── api/
│   │   │   └── lecturasApi.ts
│   │   ├── components/
│   │   │   ├── LecturaForm.tsx
│   │   │   ├── LecturasTable.tsx
│   │   │   └── ConsumoAtipicoAlert.tsx
│   │   ├── hooks/
│   │   │   ├── useLecturas.ts
│   │   │   ├── useCrearLectura.ts
│   │   │   └── useValidarLectura.ts
│   │   ├── pages/
│   │   │   ├── LecturasPage.tsx
│   │   │   └── NuevaLecturaPage.tsx
│   │   ├── schemas/
│   │   │   └── lecturaSchema.ts
│   │   ├── types/
│   │   │   └── lectura.types.ts
│   │   ├── utils/
│   │   │   └── calcularConsumo.ts
│   │   └── index.ts
│   ├── facturacion/
│   ├── pagos/
│   ├── comunidad/
│   ├── multas/
│   ├── portal-socio/
│   └── reportes/
├── styles/
│   └── index.css
└── main.tsx
```

## Comandos

```bash
npm install
npm run dev
npm run build
```
