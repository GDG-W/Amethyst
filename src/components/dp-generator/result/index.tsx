"use client";
import { useState } from "react";

import html2canvas from "html2canvas-pro";

import BlueBackground from "@/components/icons/bluebackground-icon";
import DevfestLogoCorner from "@/components/icons/devfestlogocorner-icon";
import GreenBackground from "@/components/icons/greenbackground-icon";
import Instagram from "@/components/icons/instagram-icon";
import LinkedIn from "@/components/icons/linkedin-icon";
import OrangeBackground from "@/components/icons/orangebackground-icon";
import PinkBackground from "@/components/icons/pinkbackground-icon";
import Top from "@/components/icons/top-icon";
import WhiteBackground from "@/components/icons/whitebackground-icon";
import X from "@/components/icons/x-icon";
import "./results.css";

interface ResultsProps {
  userName: string;
  finalImage: string;
  onCreateAnother: () => void;
}

export const Results = ({ userName, finalImage }: ResultsProps) => {
  const [selectedBackground, setSelectedBackground] = useState(<BlueBackground />);

  const backgroundOptions = [
    { name: "Blue", component: <BlueBackground /> },
    { name: "Orange", component: <OrangeBackground /> },
    { name: "Green", component: <GreenBackground /> },
    { name: "Pink", component: <PinkBackground /> },
    { name: "White", component: <WhiteBackground /> },
  ];

  const generateImage = async (): Promise<string> => {
    const previewElement = document.querySelector(".dp-preview") as HTMLElement;
    if (!previewElement) return "";

    try {
      const canvas = await html2canvas(previewElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
      });

      return canvas.toDataURL("image/png");
    } catch (error) {
      console.error("Image generation failed:", error);
      return "";
    }
  };
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 50));
    try {
      const imageUrl = await generateImage();

      if (!imageUrl) {
        setLoading(false);
        return;
      }

      const link = document.createElement("a");
      link.download = `${userName}-DevFestLagos.png`;
      link.href = imageUrl;
      link.click();
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async (platform: "twitter" | "linkedin" | "instagram") => {
    const imageUrl = await generateImage();
    if (!imageUrl) return;

    const message = `I'll be at #DevFestLagos2025!`;
    const imageBlob = await fetch(imageUrl).then((res) => res.blob());
    const imageFile = new File([imageBlob], "devfest-dp.png", { type: "image/png" });

    console.log({ navigator, imageUrl, imageFile });

    try {
      // if (navigator.share && navigator.canShare && navigator.canShare({ files: [imageFile] })) {
      //   await navigator.share({
      //     title: "DevFest Lagos 2025",
      //     text: message,
      //     files: [imageFile],
      //   });
      //   return;
      // }

      const encodedMsg = encodeURIComponent(message);
      const encodedUrl = encodeURIComponent(window.location.origin);

      switch (platform) {
        case "twitter":
          window.open(
            `https://twitter.com/intent/tweet?text=${encodedMsg}&url=${encodedUrl}`,
            "_blank"
          );
          break;

        case "linkedin":
          window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
            "_blank"
          );
          break;

        case "instagram": {
          const link = document.createElement("a");
          link.href = imageUrl;
          link.download = `DevFestLagos-${userName}.png`;
          link.click();

          setTimeout(() => {
            window.open("https://www.instagram.com", "_blank");
            alert(
              "1. Open Instagram\n2. Create a new post\n3. Select the downloaded image\n4. Add the hashtag #DevFestLagos2025"
            );
          }, 1000);
          break;
        }
      }
    } catch (error) {
      console.error("Sharing failed:", error);

      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = `DevFestLagos-${userName}.png`;
      link.click();
    }
  };

  return (
    <div className="results-container">
      <div className="results-content">
        <div className="preview-section">
          <div className="dp-preview">
            <div className="background-svg">{selectedBackground}</div>
            <div className="frame-overlay">
              <div className="frame-message">
                <span>I can&apos;t wait to be at</span>
                <span>DevFest Lagos 2025!</span>
                <div className="quote-mark">
                  <Top />
                </div>
              </div>

              <div className="devfest-logo">
                <DevfestLogoCorner />
              </div>

              <div className="user-name-overlay">
                <h2
                  className="user-name"
                  data-length={
                    userName.length > 30 ? "very-long" : userName.length > 20 ? "long" : "normal"
                  }
                >
                  {userName}
                </h2>
              </div>
            </div>
            <div className="user-image-container">
              <img src={finalImage} alt="Your DP" className="user-image" />
            </div>
          </div>
          <div className="background-selector">
            <div className="background-options">
              {backgroundOptions.map((bg) => (
                <button
                  key={bg.name}
                  className={`background-option ${selectedBackground.type === bg.component.type ? "selected" : ""}`}
                  onClick={() => setSelectedBackground(bg.component)}
                  title={bg.name}
                >
                  <div className="background-preview">{bg.component}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="customization-section">
          <h3>Share the word that you&apos;ll be at #DevFestLagos2025!</h3>
          <button
            className="download-btn"
            onClick={() => {
              setLoading(true);
              handleDownload();
            }}
            disabled={loading}
          >
            {loading ? "Loading..." : "DOWNLOAD DP"}
          </button>

          <div className="share-section">
            <div className="share-buttons">
              <div
                title="Share on Instagram"
                className="share-btn instagram"
                onClick={() => handleShare("instagram")}
              >
                <Instagram />
              </div>
              <div
                title="Share on LinkedIn"
                className="share-btn linkedin"
                onClick={() => handleShare("linkedin")}
              >
                <LinkedIn />
              </div>
              <div
                title="Share on Twitter"
                className="share-btn twitter"
                onClick={() => handleShare("twitter")}
              >
                <X />
              </div>
            </div>
            <p>Share on Social Media!</p>
          </div>
        </div>
      </div>
    </div>
  );
};
