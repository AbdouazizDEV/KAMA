import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";
import kamaLogo from "./images/KAMAlogo1.jpeg";

const favicon = document.createElement("link");
favicon.rel = "icon";
favicon.type = "image/jpeg";
favicon.href = kamaLogo;
document.head.appendChild(favicon);

createRoot(document.getElementById("root")!).render(<App />);
  