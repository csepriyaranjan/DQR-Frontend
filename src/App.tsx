import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { AuthProvider } from "./context/AuthContext";
import Notification from "./components/ui/Notification";

function App() {
  return (

      <AuthProvider>
        <BrowserRouter>
        <Notification />
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>

  );
}

export default App;
