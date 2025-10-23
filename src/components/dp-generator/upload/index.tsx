"use client";
import { useCallback, useState } from "react";

import UploadIcon from "@/components/icons/upload-icon";
interface UploadProps {
  onImageUpload: (image: string) => void;
}

export const Upload = ({ onImageUpload }: UploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isConverting, setIsConverting] = useState(false);

  const convertHeicToJpeg = async (file: File): Promise<Blob> => {
    // Dynamically import heic2any only on the client when needed
    const heic2any = (await import("heic2any")).default;
    const convertedBlob = await heic2any({
      blob: file,
      toType: "image/jpeg",
      quality: 1,
    });
    const resultBlob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
    return resultBlob as Blob;
  };
  const handleFileUpload = useCallback(
    async (file: File) => {
      if (!file) return;

      try {
        let processedFile = file;

        if (file.type === "image/heic" || file.name.toLowerCase().endsWith(".heic")) {
          setIsConverting(true);
          const heicBlob = await convertHeicToJpeg(file);
          processedFile = new File([heicBlob], file.name.replace(/\.heic$/i, ".jpg"), {
            type: "image/jpeg",
            lastModified: file.lastModified,
          });
        } else if (!(file.type === "image/png" || file.type === "image/jpeg")) {
          alert("Please upload a PNG, JPEG, or HEIC file");
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          onImageUpload(result);
          setIsConverting(false);
        };
        reader.readAsDataURL(processedFile);
      } catch (error) {
        console.error("Error processing image:", error);
        alert("Error processing image. Please try again.");
        setIsConverting(false);
      }
    },
    [onImageUpload]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        handleFileUpload(files[0]);
      }
    },
    [handleFileUpload]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  return (
    <div
      className={`relative flex h-[460px] w-auto flex-col items-center justify-center rounded-[24px] bg-[#FFE7A5] p-[2rem] text-center transition-all duration-300 ease-in-out md:min-h-[500px] md:w-[500px] md:rounded-[10px] md:border-[10px] md:border-[#F6B51E] md:p-[3rem_2rem]${
        isDragOver ? "drag-over" : ""
      } `}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <input
        type="file"
        accept="image/png,image/jpeg,image/heic,.heic"
        onChange={handleFileSelect}
        id="file-upload"
        className="absolute top-0 left-0 h-full w-full cursor-pointer opacity-0"
      />

      <label
        htmlFor="file-upload"
        className="pointer-events-none flex cursor-pointer flex-col items-center"
      >
        <h1 className="max-[480px]:font-akira font-inter my-4 text-base leading-6 font-medium tracking-[-0.03em] text-[#171717]">
          Upload your Photo
        </h1>

        <div className="flex h-[126px] w-[400px] flex-col items-center justify-center gap-1 rounded-xl border border-[#ffecc0] bg-white p-3 max-md:h-[126px] max-md:w-auto max-md:gap-1 max-sm:h-full max-sm:w-full max-sm:p-[15px]">
          <div>
            <UploadIcon />
          </div>

          {isConverting ? (
            <div className="font-inter text-base leading-[1.4] text-[#262626]">
              Converting HEIC image...
            </div>
          ) : (
            <div className="font-inter text-base leading-[1.4] text-[#262626]">
              <span className="font-semibold text-[#171717]">Click to upload</span> or drag and drop
              <br />
              PNG or JPG (max. 800×400px)
            </div>
          )}
        </div>
      </label>
    </div>
  );
};
