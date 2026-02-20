"use client";

import { useToast } from "@/components/ui/use-toast";
import { dataUrl, getImageSize } from "@/lib/utils";
import { CldImage } from "next-cloudinary";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React, { useCallback, useRef, useState } from "react";
import { Logo } from "@/app/(landing)/components/Logo";

type MediaUploaderProps = {
  onValueChange: (value: string) => void;
  setImage: React.Dispatch<any>;
  publicId: string;
  image: any;
  type: string;
};

const ACCEPTED_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/avif",
  "image/gif",
  "image/tiff",
  "image/svg+xml",
];
const MAX_SIZE = 25 * 1024 * 1024; // 25MB

const MediaUploader = ({
  onValueChange,
  setImage,
  image,
  publicId,
  type,
}: MediaUploaderProps) => {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadToCloudinary = useCallback(
    async (file: File) => {
      setIsUploading(true);
      setUploadProgress(0);

      try {
        // Get signature from our API
        const sigRes = await fetch("/api/upload", { method: "POST" });
        const { signature, timestamp, cloudName, apiKey } = await sigRes.json();

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "khizo_ai");
        formData.append("signature", signature);
        formData.append("timestamp", String(timestamp));
        formData.append("api_key", apiKey);

        const xhr = new XMLHttpRequest();
        xhr.open(
          "POST",
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
        );

        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            setUploadProgress(Math.round((e.loaded / e.total) * 100));
          }
        };

        const result: any = await new Promise((resolve, reject) => {
          xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              resolve(JSON.parse(xhr.responseText));
            } else {
              reject(new Error("Upload failed"));
            }
          };
          xhr.onerror = () => reject(new Error("Upload failed"));
          xhr.send(formData);
        });

        setImage((prevState: any) => ({
          ...prevState,
          publicId: result.public_id,
          width: result.width,
          height: result.height,
          secureURL: result.secure_url,
        }));

        onValueChange(result.public_id);

        toast({
          title: "Image uploaded successfully",
          description: "1 credit was deducted from your account",
          duration: 5000,
          className: "success-toast",
        });

        setIsModalOpen(false);
        setPreview(null);
      } catch (error) {
        toast({
          title: "Something went wrong while uploading",
          description: "Please try again",
          duration: 5000,
          className: "error-toast",
        });
      } finally {
        setIsUploading(false);
        setUploadProgress(0);
      }
    },
    [onValueChange, setImage, toast]
  );

  const validateFile = (file: File): boolean => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload PNG, JPG, JPEG, WEBP, AVIF, GIF, TIFF or SVG",
        duration: 5000,
        className: "error-toast",
      });
      return false;
    }
    if (file.size > MAX_SIZE) {
      toast({
        title: "File too large",
        description: "Maximum file size is 25MB",
        duration: 5000,
        className: "error-toast",
      });
      return false;
    }
    return true;
  };

  const handleFileSelect = (file: File) => {
    if (!validateFile(file)) return;
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
    uploadToCloudinary(file);
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFileSelect(file);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [uploadToCloudinary]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="h3-bold text-dark-600">Original</h3>

      {publicId ? (
        <div className="cursor-pointer overflow-hidden rounded-[10px]">
          <CldImage
            width={getImageSize(type, image, "width")}
            height={getImageSize(type, image, "height")}
            src={publicId}
            alt="image"
            sizes={"(max-width: 767px) 100vw, 50vw"}
            placeholder={dataUrl as PlaceholderValue}
            className="media-uploader_cldImage"
          />
        </div>
      ) : (
        <div
          className="media-uploader_cta"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="media-uploader_cta-image">
            <Image
              src="/assets/icons/add.svg"
              alt="Add Image"
              width={24}
              height={24}
            />
          </div>
          <p className="p-14-medium">Click here to upload image</p>
        </div>
      )}

      {/* Custom Upload Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget && !isUploading) {
              setIsModalOpen(false);
              setPreview(null);
            }
          }}
        >
          <div className="relative w-[95vw] max-w-lg rounded-2xl bg-white shadow-2xl dark:bg-slate-900 dark:border dark:border-slate-700 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 px-6 py-4">
              <div className="flex items-center gap-2.5">
                <Logo className="w-7 h-7" />
                <span className="font-bold text-lg tracking-tight text-indigo-600 dark:text-indigo-400">
                  Khizo AI
                </span>
                <span className="text-sm text-slate-400 dark:text-slate-500">
                  — Upload
                </span>
              </div>
              {!isUploading && (
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setPreview(null);
                  }}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300 transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M5 5L15 15M15 5L5 15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              )}
            </div>

            {/* Body */}
            <div className="p-6">
              {isUploading ? (
                /* Uploading state */
                <div className="flex flex-col items-center gap-5 py-8">
                  {preview && (
                    <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-indigo-200 dark:border-indigo-700 shadow-md">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="w-full max-w-xs">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                        Uploading...
                      </span>
                      <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                        {uploadProgress}%
                      </span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 ease-out"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                  <p className="text-xs text-slate-400">
                    Please wait while your image is being uploaded
                  </p>
                </div>
              ) : (
                /* Drop zone */
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`flex flex-col items-center gap-4 rounded-xl border-2 border-dashed p-10 transition-all cursor-pointer ${
                    isDragging
                      ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30 scale-[1.02]"
                      : "border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 hover:border-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20"
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div
                    className={`rounded-full p-4 transition-colors ${
                      isDragging
                        ? "bg-indigo-100 dark:bg-indigo-900/50"
                        : "bg-slate-100 dark:bg-slate-700"
                    }`}
                  >
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      className={`transition-colors ${
                        isDragging
                          ? "text-indigo-500"
                          : "text-slate-400 dark:text-slate-500"
                      }`}
                    >
                      <path
                        d="M20 6.667v20M13.333 13.333L20 6.667l6.667 6.666"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M33.333 25v5a3.333 3.333 0 01-3.333 3.333H10A3.333 3.333 0 016.667 30v-5"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="text-base font-semibold text-slate-700 dark:text-slate-200">
                      {isDragging
                        ? "Drop your image here"
                        : "Drag & Drop your image here"}
                    </p>
                    <p className="mt-1 text-sm text-slate-400 dark:text-slate-500">
                      or click to browse
                    </p>
                  </div>
                  <div className="mt-2 flex flex-wrap justify-center gap-1.5">
                    {["PNG", "JPG", "WEBP", "AVIF", "GIF", "TIFF", "SVG"].map(
                      (fmt) => (
                        <span
                          key={fmt}
                          className="rounded-md bg-slate-200/70 dark:bg-slate-700 px-2 py-0.5 text-[10px] font-semibold text-slate-500 dark:text-slate-400"
                        >
                          {fmt}
                        </span>
                      )
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500">
                    Max file size: 25MB
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-slate-200 dark:border-slate-700 px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Logo className="w-4 h-4" />
                <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                  Powered by Khizo AI
                </span>
              </div>
              {!isUploading && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 active:bg-indigo-800"
                >
                  Browse Files
                </button>
              )}
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED_TYPES.join(",")}
            onChange={handleInputChange}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
};

export default MediaUploader;