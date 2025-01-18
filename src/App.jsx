import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { LoginForm } from "./components/login/LoginForm";
import { StoryRating } from "./components/stories/StoryRating";
import { CompletionView } from "./components/completion/CompletionView";
import { WelcomePage } from "./components/instructions/WelcomePage";
import { AuthProvider, useAuth } from "./context/AuthContext";
import "./App.css";

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;

  const hasSeenInstructions = localStorage.getItem("hasSeenInstructions");
  if (!hasSeenInstructions && window.location.pathname !== "/welcome") {
    return <Navigate to="/welcome" />;
  }

  return children;
}

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route
              path="/welcome"
              element={
                <ProtectedRoute>
                  <WelcomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/stories"
              element={
                <ProtectedRoute>
                  <StoryRating />
                </ProtectedRoute>
              }
            />
            <Route
              path="/completion"
              element={
                <ProtectedRoute>
                  <CompletionView />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/stories" />} />
          </Routes>
        </AuthProvider>
      </Router>
    </MantineProvider>
  );
}

export default App;
