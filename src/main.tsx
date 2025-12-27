
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import "./index.css";
  import { initGA4 } from "./lib/analytics";
  import { SpeedInsights } from "@vercel/speed-insights/react";

  // Initialize analytics
  initGA4();

  createRoot(document.getElementById("root")!).render(
    <>
      <App />
      <SpeedInsights />
    </>
  );
  