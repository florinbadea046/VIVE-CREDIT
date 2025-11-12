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
│ ├── index.html
src/
├── core/
│ ├── components/
│ ├── layouts/
│ ├── services/
│ └── utils/
├── modules/
│ ├── onboarding/
│ ├── kyc/
│ ├── applications/
│ ├── scoring/
│ ├── contract/
│ ├── payments/
│ ├── collections/
│ ├── admin/
│ └── reports/
├── routes/
│ └── AppRoutes.tsx
├── store/
├── hooks/
├── types/
├── styles/
├── utils/
├── App.tsx
└── main.tsx
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── tsconfig.json
├── vite.config.ts
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
