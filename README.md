# 🛢️ Oil-Well Monitoring Dashboard

A modern **React-based dashboard** for managing and visualizing oil well data—built with real-world needs in mind.

---

## 🚀 Features

- 📊 **Interactive Charts & Gauges**  
  Real-time display of pressure, temperature, flow rates, and other key metrics using Chart.js.

- 🖥 **Modular Dashboard & Pages**  
  Includes separate Dashboard, Data Entry, and Well Monitoring views for clear separation of concerns.

- 🔁 **Mock Data Ready**  
  Start immediately with simulated data; easy to connect to real APIs or WebSocket streams.

- 🎨 **Light and Dark Themes**  
  Toggle between themes for comfortable viewing in any environment.

- 🔧 **Responsive Layout**  
  Automatic layout adjustment across desktop and mobile devices.

---

## 🧭 Quick Start

```bash
# Clone the repo
git clone https://github.com/gourabpal04/Oil-Well-Monitoring-Dashboard.git
cd Oil-Well-Monitoring-Dashboard

# Install dependencies
npm install
# or
yarn install

# Run locally
npm start
# or
yarn start
````

Open [http://localhost:3000](http://localhost:3000) to view the app.

To create a production-ready build:

```bash
npm run build
# or
yarn build
```

---

## 📂 Project Structure

```
/src
├── components/     # Reusable components (charts, navigation, cards)
├── data/           # Mock JSON data & data services
├── views/          # Main view pages (Dashboard, Data Entry, Well Monitor)
├── styles/         # Theme files & global styles
└── App.js          # Routing setup & entry point
```

---

## ⚙️ Customization Guide

* **Connect Live Data**
  Replace mock data in `src/data/` with your actual API endpoints or add WebSocket handlers.

* **Enhance Charts**
  Use Chart.js plugins for advanced chart types (e.g., real-time streaming, gauge charts).

* **Add Maps**
  Integrate mapping libraries (e.g. Leaflet, Mapbox) for well location visualization.

* **User Auth & Roles**
  Add authentication, role-based access control, and secure backend.

---


---

## 🧪 Technologies Used

* **React** – UI library + React Router
* **Chart.js** – Charts and data visualization
* **CSS Modules** – Scoped styling for components
* **Create React App** – Build tooling + Hot Reloading

---

## 🤝 Contributing

Contributions are welcome! Here’s how to get started:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-new-component`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push the branch (`git push origin feature/my-new-component`)
5. Open a pull request

Feel free to add issues for bugs, enhancements, or features.

---

## 📬 Contact

* **Gourab Pal** – Project maintainer
* For issues, feature requests, or help, please open an issue or reach out via GitHub.

---

