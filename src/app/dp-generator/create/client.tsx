"use client";
import { useState } from "react";

import { Upload } from "@/components/dp-generator/upload";
import { AICustomize } from "@/components/dp-generator/ai-customize";
import { Results } from "@/components/dp-generator/result";
import { Crop } from "@/components/dp-generator/cropper";
import ProductDesign from "@/components/icons/productdesign-icon";
import "./dpai.css";
import "./dpmaker.css";

export const DPMakerClient = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [finalImage, setFinalImage] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<"upload" | "edit" | "customize" | "results">(
    "upload"
  );
  const [userName, setUserName] = useState("");

  const handleImageUpload = (image: string) => {
    setUploadedImage(image);
    setCurrentStep("edit");
  };

  const handleImageCrop = (croppedImg: string) => {
    setCroppedImage(croppedImg);
    setFinalImage(croppedImg);
    setCurrentStep("customize");
  };

  const handleImageUpdate = (newImage: string) => {
    setFinalImage(newImage);
  };

  const handleReplacePhoto = () => {
    setUploadedImage(null);
    setCroppedImage(null);
    setFinalImage(null);
    setCurrentStep("upload");
  };

  const handleGenerateDP = () => {
    if (!userName.trim()) {
      alert("Please enter your name before generating your DP");
      return;
    }

    if (!finalImage && !croppedImage) {
      alert("Please upload and crop an image first");
      return;
    }

    setCurrentStep("results");
  };

  const handleCreateAnother = () => {
    setUploadedImage(null);
    setCroppedImage(null);
    setFinalImage(null);
    setUserName("");
    setCurrentStep("upload");
  };

  return (
    <>
      <section className="relative z-[2] flex items-center justify-center p-2">
        <div className="upload-container">
          {currentStep === "upload" ? (
            <Upload onImageUpload={handleImageUpload} />
          ) : currentStep === "edit" ? (
            <Crop
              image={uploadedImage || ""}
              onCrop={handleImageCrop}
              onReplacePhoto={handleReplacePhoto}
            />
          ) : currentStep === "customize" ? (
            <AICustomize
              image={finalImage || croppedImage || uploadedImage || ""}
              originalCroppedImage={croppedImage || uploadedImage || ""}
              userName={userName}
              onUserNameChange={setUserName}
              onGenerateDP={handleGenerateDP}
              onImageUpdate={handleImageUpdate}
            />
          ) : (
            <Results
              userName={userName}
              finalImage={finalImage || croppedImage || uploadedImage || ""}
              onCreateAnother={handleCreateAnother}
            />
          )}
        </div>
      </section>

      {currentStep !== "results" && (
        <>
          <div className="fixed top-[90%] right-0 z-[5] -translate-y-1/2 max-md:hidden">
            <ProductDesign />
          </div>
        </>
      )}
    </>
  );
};
