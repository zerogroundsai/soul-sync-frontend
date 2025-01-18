/* eslint-disable react/no-unescaped-entities */
import { useNavigate } from "react-router-dom";
import { Button, Title, Text, List, Container } from "@mantine/core";

export function WelcomePage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    localStorage.setItem("hasSeenInstructions", "true");
    navigate("/stories");
  };

  return (
    <div className="welcome-container">
      <Container size="md" className="welcome-content">
        <Title order={1} className="welcome-title">
          Welcome to Soul Sync!
        </Title>

        <div className="instructions-block">
          <Text className="section-title">Rating Process:</Text>
          <List className="welcome-list">
            <List.Item>
              <Text>
                <strong>Step 1: Sentiments</strong> - After reading the story,
                identify the emotions you felt and rate how strongly each
                emotion is expressed on a scale from 0 to 1.
              </Text>
            </List.Item>
            <List.Item>
              <Text>
                <strong>Step 2: Tones</strong> - Assess the overall tone of the
                story (e.g., frustrated, calm, humorous) based on how it made
                you feel.
              </Text>
            </List.Item>
            <List.Item>
              <Text>
                <strong>Step 3: Facial Expressions</strong> - Choose the emoji
                that best matches the overall emotional response you had while
                reading the story.
              </Text>
            </List.Item>
            <List.Item>
              <Text>
                <strong>Overall Confidence</strong> - Picture yourself telling
                this story to a friend and rate how confidently you feel the
                story reflects the emotions you experienced.
              </Text>
            </List.Item>
          </List>

          <Text className="section-title">Using the Sliders:</Text>
          <List className="welcome-list">
            <List.Item>
              <Text>Slide right (towards 1) for stronger presence</Text>
            </List.Item>
            <List.Item>
              <Text>Slide left (towards 0) for weaker presence</Text>
            </List.Item>
            <List.Item>
              <Text>Default value of 0.5 indicates moderate presence</Text>
            </List.Item>
          </List>

          <Text className="section-title">Tips:</Text>
          <List className="welcome-list">
            <List.Item>
              <Text>Read each story carefully before rating</Text>
            </List.Item>
            <List.Item>
              <Text>Consider both obvious and subtle emotional cues</Text>
            </List.Item>
            <List.Item>
              <Text>Take your time - there's no rush!</Text>
            </List.Item>
          </List>
        </div>

        <Button
          className="get-started-button"
          onClick={handleGetStarted}
          size="lg"
          fullWidth
        >
          Get Started
        </Button>
      </Container>
    </div>
  );
}
