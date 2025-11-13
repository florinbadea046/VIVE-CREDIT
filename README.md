# 1. Arhitectură sistem Vive Credit

## 1.1.Arhitectura generala

    UI: React (SPA)

    API: Node.js (TypeScript)

    DB: PostgreSQL

    Messaging / Queue: Kafka / RabbitMQ (sau SQS dacă infra cloud-managed)

    Object storage: S3-compatible (documente, contracte)

    Auth: Identity Provider (OpenID Connect) + JWT

    CI/CD: GitHub Actions / GitLab CI

    Observabilitate: OpenTelemetry + Prometheus + Grafana + ELK

## 1.2 Modele de comunicare

    Synchronous (REST/HTTP) — pentru interacțiuni client → API (UI, mobile), apeluri rapide: creare aplicație, preluare status, autentificare.

    Asynchronous (Event-driven / Queue) — pentru procese lungi: scoring heavy, reconciliere, notificări, job-uri colectare, integrații cu PSP/KYC/AML.

## 1.3 Diagrama Completa C4 pe nivelele: Context/Conteiners/Components/Code

### 1. Context

- Client final (aplicant)
- Angajați IFN (vânzări, risc, colectări)
- Sisteme externe (KYC, AML, PSP)

### 2. Containers

- **UI:** React SPA
- **API:** Node.js + Express/TypeScript
- **DB:** PostgreSQL
- **Queue:** Kafka / RabbitMQ
- **Storage:** S3-compatible (documente, contracte)
- **Auth:** Identity Provider + JWT

### 3. Components (exemplu pentru API)

- Onboarding module
- KYC module
- Credit Applications module
- Scoring & Decision module
- Contracting module
- Payments & Servicing module
- Collections module
- Admin & Reporting module

### 4. Code

- React Components (Header, Footer, Pages)
- API Controllers / Services / Repositories
- DB Schemas / Models
- Jobs pentru queue / notificări / reconciliere

# 2. Structura proiectului (React + Vite + Tailwind)

```text
vive-credit/
├── public/
│   └── index.html

├── src/
│   ├── core/
│   │   ├── components/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Loader.tsx
│   │   ├── layouts/
│   │   │   ├── MainLayout.tsx
│   │   │   └── AuthLayout.tsx
│   │   ├── services/
│   │   │   ├── api.ts
│   │   │   └── auth.ts
│   │   └── utils/
│   │       ├── formatters.ts
│   │       ├── validators.ts
│   │       └── constants.ts

│   ├── modules/
│   │   ├── onboarding/
│   │   │   └── Onboarding.tsx
│   │   ├── kyc/
│   │   │   └── KYC.tsx
│   │   ├── applications/
│   │   │   └── CreditApplication.tsx
│   │   ├── scoring/
│   │   │   └── Scoring.tsx
│   │   ├── contract/
│   │   │   └── Contract.tsx
│   │   ├── payments/
│   │   │   └── Payments.tsx
│   │   ├── collections/
│   │   │   └── Collections.tsx
│   │   ├── admin/
│   │   │   └── Admin.tsx
│   │   ├── reports/
│   │   │   └── Reports.tsx
│   │   └── operator-dashboard/
│   │       ├── sales/
│   │       │   ├── SalesDashboard.tsx
│   │       │   ├── ApplicationDetail.tsx
│   │       │   └── index.ts
│   │       ├── risk/
│   │       │   ├── RiskDashboard.tsx
│   │       │   └── index.ts
│   │       └── collections/
│   │           ├── CollectionsDashboard.tsx
│   │           ├── CollectionTasks.tsx
│   │           ├── PTPManagement.tsx
│   │           └── index.ts

│   ├── routes/
│   │   └── AppRoutes.tsx

│   ├── store/
│   │   ├── index.ts
│   │   └── slices/
│   │       ├── userSlice.ts
│   │       ├── appSlice.ts
│   │       └── dashboardSlice.ts

│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useFetch.ts
│   │   └── useDashboard.ts

│   ├── types/
│   │   ├── user.ts
│   │   ├── application.ts
│   │   ├── kyc.ts
│   │   └── logs.ts

│   ├── utils/
│   │   ├── logger.ts
│   │   ├── eventIds.ts
│   │   └── helpers.ts

│   ├── styles/
│   │   └── index.css

│   ├── App.tsx
│   └── main.tsx

├── .gitignore
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── vite.config.ts
├── tailwind.config.cjs
├── postcss.config.js
└── README.md
```

# 3. Pași pentru rulare locală

Instalează dependențele:

```bash
npm install
```

Pornește serverul de dezvoltare:

```bash
npm run dev
```

Deschide browserul la http://localhost:5173
