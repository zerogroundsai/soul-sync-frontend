import { useState, useEffect } from "react";
import { Button, Text, Title, Slider } from "@mantine/core";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

// Sentiment definitions with enhanced descriptions and mobile-friendly layout
const SENTIMENTS = [
  {
    name: "joy",
    positive: true,
    description: "Feelings of happiness, delight, and contentment",
    icon: "😊",
  },
  {
    name: "trust",
    positive: true,
    description: "Faith in others and feeling of security",
    icon: "🤝",
  },
  {
    name: "fear",
    positive: false,
    description: "Sense of anxiety or apprehension",
    icon: "😨",
  },
  {
    name: "surprise",
    positive: true,
    description: "Wonder and amazement",
  },
  {
    name: "sadness",
    positive: false,
    description: "Deep sorrow or unhappiness",
  },
  {
    name: "disgust",
    positive: false,
    description: "Strong sense of aversion",
  },
  {
    name: "anger",
    positive: false,
    description: "Strong displeasure or hostility",
  },
  {
    name: "anticipation",
    positive: true,
    description: "Expecting or looking forward",
  },
  {
    name: "love",
    positive: true,
    description: "Deep affection or care",
  },
  {
    name: "lust",
    positive: true,
    description: "Strong desire or attraction",
  },
  {
    name: "optimism",
    positive: true,
    description: "Positive outlook on the future",
  },
  {
    name: "gratitude",
    positive: true,
    description: "Thankfulness and appreciation",
  },
  {
    name: "serenity",
    positive: true,
    description: "Calmness and peacefulness",
  },
  {
    name: "acceptance",
    positive: true,
    description: "Embracing or tolerating something",
  },
  {
    name: "apprehension",
    positive: false,
    description: "Anxiety or unease about the future",
  },
  {
    name: "suspense",
    positive: true,
    description: "Uncertainty or excitement as events unfold",
  },
  {
    name: "nostalgia",
    positive: false,
    description: "Sentimental longing for the past",
  },
  {
    name: "guilt",
    positive: false,
    description: "Awareness of guilt or failure",
  },
  {
    name: "shame",
    positive: false,
    description: "Painful emotion from guilt or failure",
  },
  {
    name: "pride",
    positive: true,
    description: "Self-respect and satisfaction",
  },
  {
    name: "confidence",
    positive: true,
    description: "Trust in one's abilities",
  },
  {
    name: "compassion",
    positive: true,
    description: "Empathy and kindness",
  },
  {
    name: "envy",
    positive: false,
    description: "Discontentment from someone's success",
  },
  {
    name: "jealousy",
    positive: false,
    description: "Suspicion and rivalry",
  },
  {
    name: "hope",
    positive: true,
    description: "Desire for a positive outcome",
  },
  {
    name: "remorse",
    positive: false,
    description: "Regret or sorrow for one's actions",
  },
  {
    name: "frustration",
    positive: false,
    description: "Annoyance or dissatisfaction",
  },
  {
    name: "contempt",
    positive: false,
    description: "Lack of respect or disdain",
  },
  {
    name: "relief",
    positive: true,
    description: "Relaxation after a stressful situation",
  },
  {
    name: "excited",
    positive: true,
    description: "Enthusiastic and energetic",
    emoji: "🤩",
  },
];

const TONES = [
  {
    name: "neutral",
    positive: true,
    description: "Balanced and unbiased",
  },
  {
    name: "sarcastic",
    positive: true,
    description: "Playfully mocking or ironic",
  },
  {
    name: "empathetic",
    positive: true,
    description: "Showing understanding and sharing feelings",
  },
  {
    name: "frustrated",
    positive: false,
    description: "Expressing annoyance or dissatisfaction",
  },
  {
    name: "humorous",
    positive: true,
    description: "Lighthearted and funny",
  },
  {
    name: "calm",
    positive: true,
    description: "Composed and relaxed",
  },
  {
    name: "authoritative",
    positive: true,
    description: "Commanding and confident",
  },
  {
    name: "sympathetic",
    positive: true,
    description: "Showing care and concern",
  },
  {
    name: "excited",
    positive: true,
    description: "Full of enthusiasm and energy",
  },
];

const FACIAL_EXPRESSIONS = [
  {
    id: 1,
    emoji: "😀",
    name: "Happy face",
    description: "Happy",
    positive: true,
    emotion: "happy",
    imagePath: "/emojis/happy.png",
  },
  {
    id: 2,
    emoji: "🤗",
    name: "Grateful face",
    description: "Grateful",
    positive: true,
    emotion: "trust",
    imagePath: "/emojis/grateful.png",
  },
  {
    id: 3,
    emoji: "😨",
    name: "Fearful face",
    description: "Fearful face showing worry or terror",
    positive: false,
    imagePath: "/emojis/fearful.png",
  },
  {
    id: 4,
    emoji: "😲",
    name: "Amazed face",
    description: "Amazed face with wide eyes of surprise",
    positive: true,
    imagePath: "/emojis/amazed.png",
  },
  {
    id: 5,
    emoji: "😢",
    name: "Crying face",
    description: "Crying face showing sadness or sorrow",
    positive: false,
    imagePath: "/emojis/crying.png",
  },
  {
    id: 6,
    emoji: "🤢",
    name: "Nauseous face",
    description: "Face feeling nauseous or disgusted",
    positive: false,
    imagePath: "/emojis/nauseous.png",
  },
  {
    id: 7,
    emoji: "😠",
    name: "Angry face",
    description: "Angry face showing displeasure",
    positive: false,
    imagePath: "/emojis/angry.png",
  },
  {
    id: 8,
    emoji: "🤔",
    name: "Thinking face",
    description: "Thinking face showing anticipation or doubt",
    positive: false,
    imagePath: "/emojis/thinking.png",
  },
  {
    id: 9,
    emoji: "😏",
    name: "Smirking face",
    description: "Smirking face showing lust or desire",
    positive: true,
    imagePath: "/emojis/smirking.png",
  },
  {
    id: 10,
    emoji: "😌",
    name: "Relaxed face",
    description: "Relaxed face for optimism",
    positive: true,
    imagePath: "/emojis/relaxed.png",
  },
  {
    id: 11,
    emoji: "😇",
    name: "Angel face",
    description: "Angel face showing serenity",
    positive: true,
    imagePath: "/emojis/angel.png",
  },
  {
    id: 12,
    emoji: "😊",
    name: "Accepting face",
    description: "Showing acceptance",
    positive: true,
    imagePath: "/emojis/accepting.png",
  },
  {
    id: 13,
    emoji: "😟",
    name: "Worried face",
    description: "Worried face showing apprehension",
    positive: false,
    imagePath: "/emojis/worried.png",
  },
  {
    id: 14,
    emoji: "😬",
    name: "Grimacing face",
    description: "Grimacing face showing suspense",
    positive: false,
    imagePath: "/emojis/grimacing.png",
  },
  {
    id: 15,
    emoji: "🥹",
    name: "Tearful face",
    description: "Tearful face showing nostalgia",
    positive: true,
    imagePath: "/emojis/tearful.png",
  },
  {
    id: 16,
    emoji: "😔",
    name: "Sad face",
    description: "Sad face showing guilt",
    positive: false,
    imagePath: "/emojis/sad.png",
  },
  {
    id: 17,
    emoji: "😳",
    name: "Flushed face",
    description: "Flushed face showing shame",
    positive: false,
    imagePath: "/emojis/flushed.png",
  },
  {
    id: 18,
    emoji: "😊",
    name: "Content face",
    description: "Content face showing pride",
    positive: true,
    imagePath: "/emojis/content.png",
  },
  {
    id: 19,
    emoji: "😎",
    name: "Cool face",
    description: "Cool face with sunglasses for confidence",
    positive: true,
    imagePath: "/emojis/cool.png",
  },
  {
    id: 20,
    emoji: "🥰",
    name: "Loving face",
    description: "Smiling face with hearts for love and compassion",
    positive: true,
    imagePath: "/emojis/loving.png",
  },
  {
    id: 21,
    emoji: "😒",
    name: "Unimpressed face",
    description: "Unimpressed face showing envy",
    positive: false,
    imagePath: "/emojis/unimpressed.png",
  },
  {
    id: 22,
    emoji: "🥴",
    name: "Dizzy face",
    description: "Dizzy face showing jealousy",
    positive: false,
    imagePath: "/emojis/dizzy.png",
  },
  {
    id: 23,
    emoji: "😄",
    name: "Hopeful face",
    description: "Smiling face for hope",
    positive: true,
    imagePath: "/emojis/hopeful.png",
  },
  {
    id: 24,
    emoji: "😥",
    name: "Remorseful face",
    description: "Crying face showing remorse",
    positive: false,
    imagePath: "/emojis/remorseful.png",
  },
  {
    id: 25,
    emoji: "😤",
    name: "Frustrated face",
    description: "Face exhaling showing frustration",
    positive: false,
    imagePath: "/emojis/frustrated.png",
  },
  {
    id: 26,
    emoji: "😑",
    name: "Contemptuous face",
    description: "Neutral face showing contempt",
    positive: false,
    imagePath: "/emojis/contemptuous.png",
  },
  {
    id: 27,
    emoji: "😮",
    name: "Relieved face",
    description: "Face exhaling showing relief",
    positive: true,
    imagePath: "/emojis/relieved.png",
  },
];

export function StoryRating() {
  const [currentStory, setCurrentStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ratings, setRatings] = useState({
    sentiments: {},
    tones: {},
    facialExpressions: {},
    overallConfidence: 0.5,
  });
  const [stories, setStories] = useState([]);
  const [activeStoryId, setActiveStoryId] = useState(null);
  const { token } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState("sentiments");
  const [isConfidenceCollapsed, setIsConfidenceCollapsed] = useState(false);
  const [skippedStoriesCount, setSkippedStoriesCount] = useState(0);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchUserProgress();
  }, [token]);

  const fetchUserProgress = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/stories/progress`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch progress");
      }

      const data = await response.json();
      setStories(data);
      if (!activeStoryId) {
        fetchNextStory();
      }
    } catch (error) {
      console.error("Error fetching progress:", error);
      if (error.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  const fetchNextStory = async () => {
    try {
      console.log("Fetching next story...");
      setLoading(true);
      setError(null);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/stories/next`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      console.log("API Response:", response);
      if (!response.ok) {
        if (response.status === 404) {
          navigate("/completion");
          return;
        }
        throw new Error("Failed to fetch story");
      }

      const data = await response.json();
      console.log("Next story data:", data);

      if (!data || !data._id) {
        navigate("/completion");
        return;
      }

      setCurrentStory(data);
      setActiveStoryId(data._id);
      setCurrentStep("sentiments");
      setRatings({
        sentiments: {},
        tones: {},
        facialExpressions: {},
        overallConfidence: 0.5,
      });
    } catch (error) {
      console.error("Error fetching next story:", error);
      if (error.message === "No more stories available") {
        navigate("/completion");
        return;
      }
      setError(error.message);
      if (error.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const sentimentData = SENTIMENTS.map((sentiment) => ({
        name: sentiment.name,
        value: ratings.sentiments[sentiment.name] ?? 0.5,
      }));

      const toneData = TONES.map((tone) => ({
        name: tone.name,
        value: ratings.tones[tone.name] ?? 0.5,
      }));

      const facialExpressionData = FACIAL_EXPRESSIONS.map((expression) => ({
        name: expression.name,
        value: ratings.facialExpressions[expression.name] ?? 0.5,
      }));

      const requestBody = {
        sentiments: sentimentData,
        tones: toneData,
        facialExpressions: facialExpressionData,
        overallConfidence: ratings.overallConfidence,
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/stories/${currentStory._id}/rate`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error(errorData.message || "Failed to submit rating");
      }

      setStories((prevStories) =>
        prevStories.map((story) =>
          story._id === currentStory._id
            ? { ...story, isCompleted: true }
            : story
        )
      );

      const updatedStories = stories.map((story) =>
        story._id === currentStory._id ? { ...story, isCompleted: true } : story
      );

      const allCompleted = updatedStories.every((story) => story.isCompleted);

      if (allCompleted) {
        navigate("/completion");
      } else {
        fetchNextStory();
      }
    } catch (error) {
      setError(error.message);
      if (error.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (currentStep === "sentiments") {
      setCurrentStep("tones");
    } else if (currentStep === "tones") {
      setCurrentStep("facialExpressions");
    } else if (currentStep === "facialExpressions") {
      setCurrentStep("confidence");
    } else {
      handleSubmit();
    }
  };

  const completedStoriesCount = stories.filter(
    (story) => story.isCompleted
  ).length;
  const totalStoriesCount = stories.length;

  const handleLogout = () => {
    navigate("/login");
  };

  const handleSkip = async () => {
    try {
      console.log("Skip button clicked");
      setLoading(true);
      setError(null);

      if (!currentStory?._id) {
        throw new Error("No story to skip");
      }

      // Call skip endpoint which will also return the next story
      const skipResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/api/stories/${currentStory._id}/skip`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!skipResponse.ok) {
        const errorData = await skipResponse.json();
        throw new Error(errorData.message || "Failed to skip story");
      }

      const { nextStory } = await skipResponse.json();

      // Increment skip count
      setSkippedStoriesCount((prev) => prev + 1);

      // If there's no next story, navigate to completion page
      if (!nextStory) {
        navigate("/completion");
        return;
      }

      console.log("Next story data:", nextStory);

      // Update the current story and reset ratings
      setCurrentStory(nextStory);
      setActiveStoryId(nextStory._id);
      setCurrentStep("sentiments");
      setRatings({
        sentiments: {},
        tones: {},
        facialExpressions: {},
        overallConfidence: 0.5,
      });

      // Update user progress
      await fetchUserProgress();
      console.log("Skip operation completed");
    } catch (error) {
      console.error("Error in handleSkip:", error);
      setError(error.message);
      if (error.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="app-container">
        <div className="desktop-header">
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
          <h1 className="app-logo">Soul Sync Data Tool</h1>
          <button className="skip-button" onClick={handleSkip}>
            Skip ({skippedStoriesCount})
          </button>
          <div className="story-counter">
            {completedStoriesCount}/{totalStoriesCount}
          </div>
        </div>

        <div className="mobile-app-header">
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
          <h1 className="mobile-app-title">Soul Sync Data Tool</h1>
          <div className="mobile-actions">
            <button className="skip-button" onClick={handleSkip}>
              Skip ({skippedStoriesCount})
            </button>
            <div className="story-counter">
              {completedStoriesCount}/{totalStoriesCount}
            </div>
          </div>
        </div>

        <div className={`main-content`}>
          <div className="story-container">
            <Text style={{ textAlign: "center", marginTop: "2rem" }}>
              Checking for available stories...
            </Text>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container">
        <div className="desktop-header">
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
          <h1 className="app-logo">Soul Sync Data Tool</h1>
          <button className="skip-button" onClick={handleSkip}>
            Skip ({skippedStoriesCount})
          </button>
          <div className="story-counter">
            {completedStoriesCount}/{totalStoriesCount}
          </div>
        </div>

        <div className="mobile-app-header">
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
          <h1 className="mobile-app-title">Soul Sync Data Tool</h1>
          <div className="mobile-actions">
            <button className="skip-button" onClick={handleSkip}>
              Skip ({skippedStoriesCount})
            </button>
            <div className="story-counter">
              {completedStoriesCount}/{totalStoriesCount}
            </div>
          </div>
        </div>

        <div className={`main-content`}>
          <div className="story-container">
            <Title
              order={3}
              style={{ textAlign: "center", marginBottom: "1rem" }}
            >
              Thank You for Your Contribution!
            </Title>
            <Text style={{ textAlign: "center", marginBottom: "2rem" }}>
              You have already rated all available stories. We appreciate your
              valuable input!
            </Text>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button className="button-logout" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="desktop-header">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
        <h1 className="app-logo">Soul Sync Data Tool</h1>
        <button className="skip-button" onClick={handleSkip}>
          Skip ({skippedStoriesCount})
        </button>
        <div className="story-counter">
          {completedStoriesCount}/{totalStoriesCount}
        </div>
      </div>

      <div className="mobile-app-header">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
        <h1 className="mobile-app-title">Soul Sync Data Tool</h1>
        <div className="mobile-actions">
          <button className="skip-button" onClick={handleSkip}>
            Skip ({skippedStoriesCount})
          </button>
          <div className="story-counter">
            {completedStoriesCount}/{totalStoriesCount}
          </div>
        </div>
      </div>

      <div className={`main-content`}>
        <div className="story-container">
          <div className="story-header">
            <Title order={3} className="sentiment-title">
              User Story
            </Title>
          </div>
          <Text className="story-text">{currentStory?.text}</Text>
        </div>

        {currentStep === "confidence" && (
          <div
            className={`confidence-section ${
              isConfidenceCollapsed ? "collapsed" : ""
            }`}
          >
            <div
              className="confidence-header"
              onClick={() => setIsConfidenceCollapsed(!isConfidenceCollapsed)}
            >
              <Title order={3} className="sentiment-title">
                Overall Confidence
              </Title>
              <Text className="cl-value-description">
                Your confidence level in the overall story.
              </Text>
            </div>
            <div className="confidence-content">
              <div className="confidence-slider">
                <Slider
                  value={ratings.overallConfidence}
                  onChange={(value) =>
                    setRatings((prev) => ({
                      ...prev,
                      overallConfidence: value,
                    }))
                  }
                  min={0}
                  max={1}
                  step={0.0001}
                  label={null}
                  precision={4}
                  size="md"
                  styles={{
                    track: { backgroundColor: "rgba(255, 255, 255, 0.1)" },
                    bar: {
                      background:
                        "linear-gradient(90deg, #EF4444 0%, #22C55E 100%)",
                    },
                    thumb: {
                      backgroundColor: "var(--background-darker)",
                      borderColor: "var(--text-primary)",
                      width: 24,
                      height: 24,
                    },
                  }}
                />
                <Text className="confidence-value">
                  {ratings.overallConfidence.toFixed(4)}
                </Text>
              </div>
            </div>
          </div>
        )}

        {currentStep === "sentiments" && (
          <div className="sentiment-section">
            <Title order={3} className="sentiment-title">
              Sentiments
            </Title>
            <div className="sentiment-grid">
              {SENTIMENTS.map((sentiment) => (
                <div key={sentiment.name} className="sentiment-item">
                  <div className="sentiment-header">
                    <Text className="sentiment-name">{sentiment.name}</Text>
                    <Text className="sentiment-value">
                      {(ratings.sentiments[sentiment.name] ?? 0.5).toFixed(4)}
                    </Text>
                  </div>
                  <Text className="sentiment-description">
                    {sentiment.description}
                  </Text>
                  <Slider
                    value={ratings.sentiments[sentiment.name] ?? 0.5}
                    onChange={(value) =>
                      setRatings((prev) => ({
                        ...prev,
                        sentiments: {
                          ...prev.sentiments,
                          [sentiment.name]: value,
                        },
                      }))
                    }
                    min={0}
                    max={1}
                    step={0.0001}
                    label={null}
                    precision={4}
                    styles={{
                      track: { backgroundColor: "rgba(255, 255, 255, 0.1)" },
                      bar: {
                        background: sentiment.positive
                          ? "linear-gradient(90deg, #EF4444 0%, #22C55E 100%)"
                          : "linear-gradient(90deg, #22C55E 0%, #EF4444 100%)",
                      },
                      thumb: {
                        borderColor: "#FFFFFF",
                        width: 24,
                        height: 24,
                      },
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {currentStep === "tones" && (
          <div className="sentiment-section">
            <Title order={3} className="sentiment-title">
              Tones
            </Title>
            <div className="sentiment-grid">
              {TONES.map((tone) => (
                <div key={tone.name} className="sentiment-item">
                  <div className="sentiment-header">
                    <Text className="sentiment-name">{tone.name}</Text>
                    <Text className="sentiment-value">
                      {(ratings.tones[tone.name] ?? 0.5).toFixed(4)}
                    </Text>
                  </div>
                  <Text className="sentiment-description">
                    {tone.description}
                  </Text>
                  <Slider
                    value={ratings.tones[tone.name] ?? 0.5}
                    onChange={(value) =>
                      setRatings((prev) => ({
                        ...prev,
                        tones: {
                          ...prev.tones,
                          [tone.name]: value,
                        },
                      }))
                    }
                    min={0}
                    max={1}
                    step={0.0001}
                    label={null}
                    precision={4}
                    styles={{
                      track: { backgroundColor: "rgba(255, 255, 255, 0.1)" },
                      bar: {
                        background: tone.positive
                          ? "linear-gradient(90deg, #EF4444 0%, #22C55E 100%)"
                          : "linear-gradient(90deg, #22C55E 0%, #EF4444 100%)",
                      },
                      thumb: {
                        borderColor: "#FFFFFF",
                        width: 24,
                        height: 24,
                      },
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {currentStep === "facialExpressions" && (
          <div className="sentiment-section">
            <Title order={3} className="sentiment-title">
              Facial Expressions
            </Title>
            <div className="sentiment-grid">
              {FACIAL_EXPRESSIONS.map((expression) => (
                <div key={expression.id} className="sentiment-item">
                  <div className="sentiment-header">
                    <div className="sentiment-name-container">
                      <img
                        src={expression.imagePath}
                        alt={expression.name}
                        className="expression-emoji"
                      />
                      <Text className="sentiment-name">{expression.name}</Text>
                    </div>
                    <Text className="sentiment-value">
                      {(
                        ratings.facialExpressions[expression.name] ?? 0.5
                      ).toFixed(4)}
                    </Text>
                  </div>
                  <Text className="sentiment-description">
                    {expression.description}
                  </Text>
                  <Slider
                    value={ratings.facialExpressions[expression.name] ?? 0.5}
                    onChange={(value) =>
                      setRatings((prev) => ({
                        ...prev,
                        facialExpressions: {
                          ...prev.facialExpressions,
                          [expression.name]: value,
                        },
                      }))
                    }
                    min={0}
                    max={1}
                    step={0.0001}
                    label={null}
                    precision={4}
                    styles={{
                      track: { backgroundColor: "rgba(255, 255, 255, 0.1)" },
                      bar: {
                        background: expression.positive
                          ? "linear-gradient(90deg, #EF4444 0%, #22C55E 100%)"
                          : "linear-gradient(90deg, #22C55E 0%, #EF4444 100%)",
                      },
                      thumb: {
                        borderColor: "#FFFFFF",
                        width: 24,
                        height: 24,
                      },
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="next-button-container">
          <Button
            className="button-next"
            onClick={handleNext}
            disabled={loading}
          >
            {currentStep === "sentiments"
              ? "Next: Tones"
              : currentStep === "tones"
              ? "Next: Facial Expressions"
              : currentStep === "facialExpressions"
              ? "Next: Overall Confidence"
              : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
}
