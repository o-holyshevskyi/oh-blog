# ⚡ oh-os: Quality-Driven Portfolio Architecture

![CI/CD Pipeline](https://img.shields.io/badge/CI%2FCD-GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
![Playwright Tests](https://img.shields.io/badge/E2E_Tests-Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![Lighthouse Performance](https://img.shields.io/badge/Lighthouse-100%2F100-success?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

A high-performance, engineer-focused portfolio built to demonstrate modern Quality Assurance, CI/CD automation, and defensive programming practices. This is not just a static site; it is an observable system with strict quality gates.

## 🏗 Architecture & Stack

*   **Frontend:** Next.js (App Router), React, Tailwind CSS.
*   **Quality Gates:** Playwright (E2E, API Contracts, Rate Limiter Testing), Lighthouse CI.
*   **Infrastructure:** GitHub Actions, Vercel, GitHub Gist (Telemetry storage).
*   **Design System:** Strict terminal/monospaced aesthetic with WCAG-compliant accessibility (Contrast ratio > 4.5:1).

## 🔍 System Observability & Live Telemetry

Instead of static claims, this portfolio continuously audits itself in production.
*   **Lighthouse CI Pipeline:** On every push, GitHub Actions runs a headless Lighthouse audit (`--preset=desktop`) against the production deployment.
*   **Gist-Backed Telemetry:** The pipeline extracts `PERF`, `A11Y`, and `SEO` scores and pushes them to a public GitHub Gist.
*   **React Integration:** The frontend fetches these metrics dynamically, proving the site's health in real-time.

## 🛡 Security & Resilience

*   **Proxy API Pattern:** Sensitive operations (like fetching CI logs from GitHub) are routed through Next.js Serverless Functions (`/api/test-logs`), ensuring no API keys are exposed to the client.
*   **In-Memory Rate Limiter:** API routes are protected by a custom rate-limiting algorithm to prevent DDoS attacks or abuse of the external GitHub APIs, returning HTTP 429 when limits are exceeded.

## 🧪 Automated Testing Strategy

The system is validated by a rigorous Playwright test suite focusing on risk-based coverage:
1.  **Security Testing:** Validates that the Rate Limiter successfully blocks aggressive polling and triggers the `[ SECURITY FAULT ]` UI state.
2.  **API Contract Testing:** Ensures the `/api/resume` endpoint consistently returns a strictly validated JSON structure.
3.  **Event-Driven Architecture Testing:** Simulates keyboard events to verify the global `CustomEvent` communication between the isolated Command Palette and the DOM elements.

## 💻 Developer Terminal (Command Palette)

The application features a global, event-driven Command Palette.
*   **Trigger:** Press `Ctrl + K` (or `Cmd + K`).
*   **Event-Driven (Pub/Sub):** The terminal operates entirely decoupled from the UI, communicating with components via isolated `window.dispatchEvent` signals (e.g., triggering E2E log fetches remotely).

## 🚀 Local Setup

```bash
# Clone the repository
git clone [https://github.com/o-holyshevskyi/portfolio.git](https://github.com/o-holyshevskyi/portfolio.git)

# Install dependencies
npm install

# Run the development server
npm run dev

# Execute Playwright Test Suite
npx playwright test