# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

web-hospital-otomation/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx               # React DOM entry point
    ├── App.jsx                # Root — wires sidebar, topbar, page router
    ├── styles/
    │   └── global.css         # All CSS variables, layout, component styles
    ├── data/
    │   ├── constants.js       # All static data (nav, patients, doctors, etc.)
    │   └── generators.js      # Deterministic sample data factories
    ├── hooks/
    │   ├── useCounter.js      # Animated number counter hook
    │   └── useTheme.js        # Dark/light CSS variable switcher
    ├── components/            # Reusable UI components
    │   ├── Icons.jsx          # All SVG icons as named exports
    │   ├── Badge.jsx          # Status colour pill
    │   ├── Modal.jsx          # Generic modal overlay
    │   ├── StatCard.jsx       # Animated KPI card
    │   ├── SparkLine.jsx      # Pure-SVG line/area chart
    │   ├── BarChart.jsx       # Pure-SVG grouped bar chart
    │   ├── DonutChart.jsx     # Pure-SVG donut chart
    │   ├── MiniCalendar.jsx   # Interactive monthly calendar
    │   ├── Sidebar.jsx        # Collapsible navigation sidebar
    │   ├── Topbar.jsx         # Top header bar
    │   └── NotificationPanel.jsx
    └── pages/                 # One file per page
        ├── Dashboard.jsx
        ├── Patients.jsx
        ├── Appointments.jsx
        ├── Doctors.jsx
        ├── Laboratory.jsx
        ├── Pharmacy.jsx
        ├── Reports.jsx
        ├── Financial.jsx
        └── Settings.jsx