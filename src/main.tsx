import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { DarkModeProvider } from "./context/DarkModeContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <DarkModeProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </DarkModeProvider>
);
