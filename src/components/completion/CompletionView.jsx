import { Button, Container, Title, Text, Paper } from "@mantine/core";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export function CompletionView() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="completion-container">
      <Paper className="completion-card">
        <Title order={1} className="completion-title">
          Thank You!
        </Title>
        <Text className="completion-text">
          Thank you for completing all the story ratings. Your contribution
          helps us understand emotional responses to different narratives.
        </Text>
        <Button
          className="button-logout"
          onClick={handleLogout}
          size="lg"
          fullWidth
        >
          Logout
        </Button>
      </Paper>
    </div>
  );
}
