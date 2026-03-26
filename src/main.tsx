import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { DarkModeProvider } from "./context/DarkModeContext";

if (import.meta.env.DEV) {
    const _removeChild = Node.prototype.removeChild;
    Node.prototype.removeChild = function <T extends Node>(child: T): T {
        if (this.contains(child)) {
            return _removeChild.call(this, child) as T;
        }
        return child;
    };
}

ReactDOM.createRoot(document.getElementById("root")!).render(
    <DarkModeProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </DarkModeProvider>
);
