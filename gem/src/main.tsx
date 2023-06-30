import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./UseContext/UseAuth/UseAuth";
import SearchMessageUser from "./UseContext/UseMessage/SearchMessageUser.tsx";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <AuthProvider>
    <SearchMessageUser>
      <App />
    </SearchMessageUser>
  </AuthProvider>
  // </React.StrictMode>
);
