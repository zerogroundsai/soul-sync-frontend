import { useState, useEffect } from "react";
import { Button, Text, Title, Slider } from "@mantine/core";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

// Sentiment definitions with descriptions
const SENTIMENTS = [
  {
    name: "joy",
    positive: true,
    description: "A feeling of happiness and delight.",
  },
  {
    name: "trust",
    positive: true,
    description: "Confidence in the honesty or integrity of someone.",
  },
  {
    name: "fear",
    positive: false,
    description: "An unpleasant emotion caused by the threat of danger.",
  },
  {
    name: "surprise",
    positive: true,
    description: "A feeling of wonder and amazement.",
  },
  {
    name: "sadness",
    positive: false,
    description: "A feeling of deep sorrow or unhappiness.",
  },
  {
    name: "disgust",
    positive: false,
    description: "A strong sense of aversion or repulsion.",
  },
  {
    name: "anger",
    positive: false,
    description: "A feeling of strong displeasure or hostility.",
  },
  {
    name: "anticipation",
    positive: true,
    description: "Expecting or looking forward to something.",
  },
  {
    name: "love",
    positive: true,
    description: "A deep affection or care for someone or something.",
  },
  {
    name: "lust",
    positive: true,
    description: "A strong desire or physical attraction.",
  },
  {
    name: "optimism",
    positive: true,
    description: "A positive outlook on the future.",
  },
  {
    name: "gratitude",
    positive: true,
    description: "A feeling of thankfulness and appreciation.",
  },
  {
    name: "serenity",
    positive: true,
    description: "A state of calmness and peacefulness.",
  },
  {
    name: "acceptance",
    positive: true,
    description: "A willingness to embrace or tolerate something.",
  },
  {
    name: "apprehension",
    positive: false,
    description: "A feeling of anxiety or unease about the future.",
  },
  {
    name: "suspense",
    positive: true,
    description: "A state of uncertainty or excitement as events unfold.",
  },
  {
    name: "nostalgia",
    positive: false,
    description: "A sentimental longing for the past.",
  },
  {
    name: "guilt",
    positive: false,
    description: "A feeling of responsibility for wrongdoing.",
  },
  {
    name: "shame",
    positive: false,
    description: "A painful emotion caused by awareness of guilt or failure.",
  },
  {
    name: "pride",
    positive: true,
    description: "A feeling of satisfaction or self-respect.",
  },
  {
    name: "confidence",
    positive: true,
    description: "A sense of self-assurance and trust in one's abilities.",
  },
  {
    name: "compassion",
    positive: true,
    description: "A feeling of empathy and kindness toward others.",
  },
  {
    name: "envy",
    positive: false,
    description:
      "A feeling of discontentment caused by someone else's success.",
  },
  {
    name: "jealousy",
    positive: false,
    description: "A feeling of suspicion and rivalry.",
  },
  {
    name: "hope",
    positive: true,
    description: "A desire for a positive outcome in the future.",
  },
  {
    name: "remorse",
    positive: false,
    description: "A feeling of regret or sorrow for one's actions.",
  },
  {
    name: "frustration",
    positive: false,
    description: "A feeling of annoyance or dissatisfaction.",
  },
  {
    name: "contempt",
    positive: false,
    description: "A lack of respect or disdain for someone or something.",
  },
  {
    name: "relief",
    positive: true,
    description: "A feeling of relaxation after a stressful situation.",
  },
];

const TONES = [
  {
    name: "neutral",
    positive: true,
    description: "Balanced and unbiased, without showing strong emotions.",
  },
  {
    name: "sarcastic",
    positive: true,
    description:
      "Playfully mocking or ironic, often using humor to make a point.",
  },
  {
    name: "empathetic",
    positive: true,
    description: "Showing understanding and sharing another's feelings.",
  },
  {
    name: "frustrated",
    positive: false,
    description:
      "Expressing annoyance or dissatisfaction due to obstacles or setbacks.",
  },
  {
    name: "humorous",
    positive: true,
    description: "Lighthearted and funny, aiming to entertain or amuse.",
  },
  {
    name: "calm",
    positive: true,
    description: "Composed and relaxed, free from stress or excitement.",
  },
  {
    name: "authoritative",
    positive: true,
    description: "Commanding and confident, showing leadership or expertise.",
  },
  {
    name: "sympathetic",
    positive: true,
    description:
      "Showing care and concern for someone's difficulties or feelings.",
  },
  {
    name: "excited",
    positive: true,
    description:
      "Full of enthusiasm and energy, often about something positive or anticipated.",
  },
];

const FACIAL_EXPRESSIONS = [
  {
    id: 1,
    emoji: "😀",
    description: "Smiling face with happiness.",
    positive: true,
  },
  {
    id: 2,
    emoji: "🤗",
    description: "Hugging face showing trust or gratitude.",
    positive: true,
  },
  {
    id: 3,
    emoji: "😨",
    description: "Fearful face showing worry or terror.",
    positive: false,
  },
  {
    id: 4,
    emoji: "😲",
    description: "Amazed face with wide eyes of surprise.",
    positive: true,
  },
  {
    id: 5,
    emoji: "😢",
    description: "Crying face showing sadness or sorrow.",
    positive: false,
  },
  {
    id: 6,
    emoji: "🤢",
    description: "Face feeling nauseous or disgusted.",
    positive: false,
  },
  {
    id: 7,
    emoji: "😠",
    description: "Angry face showing displeasure.",
    positive: false,
  },
  {
    id: 8,
    emoji: "🤔",
    description: "Thinking face showing anticipation or doubt.",
    positive: false,
  },
  {
    id: 9,
    emoji: "😏",
    description: "Smirking face showing lust or desire.",
    positive: true,
  },
  {
    id: 10,
    emoji: "😌",
    description: "Relaxed face for optimism.",
    positive: true,
  },
  {
    id: 11,
    emoji: "😃",
    description: "Showing gratitude.",
    positive: true,
  },
  {
    id: 12,
    emoji: "😇",
    description: "Angel face showing serenity.",
    positive: true,
  },
  {
    id: 13,
    emoji: "🤗",
    description: "Showing acceptance.",
    positive: true,
  },
  {
    id: 14,
    emoji: "😟",
    description: "Worried face showing apprehension.",
    positive: false,
  },
  {
    id: 15,
    emoji: "😬",
    description: "Grimacing face showing suspense.",
    positive: false,
  },
  {
    id: 16,
    emoji: "🥹",
    description: "Tearful face showing nostalgia.",
    positive: true,
  },
  {
    id: 17,
    emoji: "😔",
    description: "Sad face showing guilt.",
    positive: false,
  },
  {
    id: 18,
    emoji: "😳",
    description: "Flushed face showing shame.",
    positive: false,
  },
  {
    id: 19,
    emoji: "😌",
    description: "Content face showing pride.",
    positive: true,
  },
  {
    id: 20,
    emoji: "😎",
    description: "Cool face with sunglasses for confidence.",
    positive: true,
  },
  {
    id: 21,
    emoji: "🥰",
    description: "Smiling face with hearts for love and compassion.",
    positive: true,
  },
  {
    id: 22,
    emoji: "😒",
    description: "Unimpressed face showing envy.",
    positive: false,
  },
  {
    id: 23,
    emoji: "🥴",
    description: "Dizzy face showing jealousy.",
    positive: false,
  },
  {
    id: 24,
    emoji: "😊",
    description: "Smiling face for hope.",
    positive: true,
  },
  {
    id: 25,
    emoji: "😥",
    description: "Crying face showing remorse.",
    positive: false,
  },
  {
    id: 26,
    emoji: "😤",
    description: "Face exhaling showing frustration.",
    positive: false,
  },
  {
    id: 27,
    emoji: "😑",
    description: "Neutral face showing contempt.",
    positive: false,
  },
  {
    id: 28,
    emoji: "😮",
    description: "Face exhaling showing relief.",
    positive: true,
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
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState("sentiments");
  const [isConfidenceCollapsed, setIsConfidenceCollapsed] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchUserProgress();
  }, [token]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsSidebarVisible(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const fetchStoryById = async (storyId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/stories/${storyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch story");
      }

      const data = await response.json();
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
      setError(error.message);
      if (error.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchNextStory = async () => {
    try {
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

      if (!response.ok) {
        throw new Error("Failed to fetch story");
      }

      const data = await response.json();
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
      setError(error.message);
      if (error.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleStoryClick = (storyId, e) => {
    if (e) e.stopPropagation();
    setActiveStoryId(storyId);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const sentimentData = SENTIMENTS.map((sentiment) => ({
        name: sentiment.name,
        value: ratings.sentiments[sentiment.name] || 0.5,
      }));

      const toneData = TONES.map((tone) => ({
        name: tone.name,
        value: ratings.tones[tone.name] || 0.5,
      }));

      const facialExpressionData = FACIAL_EXPRESSIONS.map((expression) => ({
        name: expression.emoji,
        value: ratings.facialExpressions[expression.emoji] || 0.5,
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

  const renderStoryList = () => {
    return (
      <div className="story-list">
        {stories.map((story) => (
          <div
            key={story._id}
            className={`story-item ${
              activeStoryId === story._id ? "active" : ""
            } ${story.isCompleted ? "completed" : ""}`}
            onClick={(e) => handleStoryClick(story._id, e)}
          >
            <div className="story-item-content">
              <span>{story.name}</span>
              {story.isCompleted && <span className="checkmark">✓</span>}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const toggleSidebar = (e) => {
    if (e) e.stopPropagation();
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleSidebarInteraction = (e) => {
    if (e) e.stopPropagation();
  };

  const renderSidebar = () => (
    <>
      <div className={`sidebar-overlay ${isSidebarVisible ? "visible" : ""}`} />
      <div
        className={`sidebar ${isSidebarVisible ? "visible" : ""}`}
        onClick={handleSidebarInteraction}
      >
        <h1 className="app-title">Soul Sync</h1>
        <p className="app-subtitle">Sentiment Rating Tool</p>
        <div className="story-list-section">{renderStoryList()}</div>
      </div>
    </>
  );

  if (loading) {
    return (
      <div className="app-container">
        <div className="mobile-app-header">
          <h1 className="mobile-app-title">Soul Sync Data Tool</h1>
        </div>

        <button
          className="hamburger-button"
          onClick={toggleSidebar}
          aria-label={isSidebarVisible ? "Close menu" : "Open menu"}
        >
          <div
            className={`hamburger-line ${isSidebarVisible ? "open" : ""}`}
          ></div>
          <div
            className={`hamburger-line ${isSidebarVisible ? "open" : ""}`}
          ></div>
          <div
            className={`hamburger-line ${isSidebarVisible ? "open" : ""}`}
          ></div>
        </button>

        {renderSidebar()}

        <div
          className={`main-content ${
            isSidebarVisible ? "sidebar-visible" : ""
          }`}
        >
          <Text>Loading story...</Text>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container">
        <div className="mobile-app-header">
          <h1 className="mobile-app-title">Soul Sync Data Tool</h1>
        </div>

        <button
          className="hamburger-button"
          onClick={toggleSidebar}
          aria-label={isSidebarVisible ? "Close menu" : "Open menu"}
        >
          <div
            className={`hamburger-line ${isSidebarVisible ? "open" : ""}`}
          ></div>
          <div
            className={`hamburger-line ${isSidebarVisible ? "open" : ""}`}
          ></div>
          <div
            className={`hamburger-line ${isSidebarVisible ? "open" : ""}`}
          ></div>
        </button>

        {renderSidebar()}

        <div
          className={`main-content ${
            isSidebarVisible ? "sidebar-visible" : ""
          }`}
        >
          <Text>Error: {error}</Text>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="mobile-app-header">
        <h1 className="mobile-app-title">Soul Sync Data Tool</h1>
      </div>

      <button
        className="hamburger-button"
        onClick={toggleSidebar}
        aria-label={isSidebarVisible ? "Close menu" : "Open menu"}
      >
        <div
          className={`hamburger-line ${isSidebarVisible ? "open" : ""}`}
        ></div>
        <div
          className={`hamburger-line ${isSidebarVisible ? "open" : ""}`}
        ></div>
        <div
          className={`hamburger-line ${isSidebarVisible ? "open" : ""}`}
        ></div>
      </button>

      {renderSidebar()}

      <div
        className={`main-content ${isSidebarVisible ? "sidebar-visible" : ""}`}
      >
        <div className="story-container">
          <Title order={3} className="sentiment-title">
            User Story
          </Title>
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
                      {(ratings.sentiments[sentiment.name] !== undefined
                        ? ratings.sentiments[sentiment.name]
                        : 0.5
                      ).toFixed(4)}
                    </Text>
                  </div>
                  <Text className="sentiment-description">
                    {sentiment.description}
                  </Text>
                  <Slider
                    value={
                      ratings.sentiments[sentiment.name] !== undefined
                        ? ratings.sentiments[sentiment.name]
                        : 0.5
                    }
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
                      {(ratings.tones[tone.name] !== undefined
                        ? ratings.tones[tone.name]
                        : 0.5
                      ).toFixed(4)}
                    </Text>
                  </div>
                  <Text className="sentiment-description">
                    {tone.description}
                  </Text>
                  <Slider
                    value={
                      ratings.tones[tone.name] !== undefined
                        ? ratings.tones[tone.name]
                        : 0.5
                    }
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
                    <Text className="sentiment-name">
                      {expression.emoji} {expression.description}
                    </Text>
                    <Text className="sentiment-value">
                      {(ratings.facialExpressions[expression.emoji] !==
                      undefined
                        ? ratings.facialExpressions[expression.emoji]
                        : 0.5
                      ).toFixed(4)}
                    </Text>
                  </div>
                  <Slider
                    value={
                      ratings.facialExpressions[expression.emoji] !== undefined
                        ? ratings.facialExpressions[expression.emoji]
                        : 0.5
                    }
                    onChange={(value) =>
                      setRatings((prev) => ({
                        ...prev,
                        facialExpressions: {
                          ...prev.facialExpressions,
                          [expression.emoji]: value,
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
