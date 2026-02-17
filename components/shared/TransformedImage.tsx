"use client"

import { dataUrl, debounce, download, getImageSize } from '@/lib/utils'
import { CldImage, getCldImageUrl } from 'next-cloudinary'
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import React, { useState } from 'react'

const IMAGE_FORMATS = [
  { value: 'png', label: 'PNG' },
  { value: 'jpg', label: 'JPG' },
  { value: 'webp', label: 'WEBP' },
  { value: 'avif', label: 'AVIF' },
  { value: 'svg', label: 'SVG' },
] as const;

type ImageFormat = typeof IMAGE_FORMATS[number]['value'];

const TransformedImage = ({ image, type, title, transformationConfig, isTransforming, setIsTransforming, hasDownload = false }: TransformedImageProps) => {
  const [selectedFormat, setSelectedFormat] = useState<ImageFormat>('png');
  const [showFormatMenu, setShowFormatMenu] = useState(false);

  const downloadHandler = (format: ImageFormat = selectedFormat) => {
    if (!image?.publicId || !transformationConfig) return;

    const url = getCldImageUrl({
      width: image?.width,
      height: image?.height,
      src: image?.publicId,
      quality: 'auto:best',
      ...transformationConfig,
      format,
    });

    download(url, title, format);
    setShowFormatMenu(false);
  }

  const canDownload = !!(image?.publicId && transformationConfig && !isTransforming);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex-between">
        <h3 className="h3-bold text-dark-600">
          Transformed
        </h3>

        {hasDownload && (
          <div className="relative">
            <div className="flex items-center gap-1">
              <button
                className={`download-btn ${!canDownload ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => downloadHandler()}
                disabled={!canDownload}
                title={canDownload ? `Download as ${selectedFormat.toUpperCase()}` : 'Apply transformation first'}
              >
                <Image
                  src="/assets/icons/download.svg"
                  alt="Download"
                  width={24}
                  height={24}
                  className="pb-[6px]"
                />
              </button>
              <button
                className={`flex items-center justify-center rounded-md border border-purple-200 bg-purple-100/50 px-2 py-1 text-xs font-semibold text-purple-600 transition hover:bg-purple-200 dark:border-purple-800 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-800/50 ${!canDownload ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => setShowFormatMenu(!showFormatMenu)}
                disabled={!canDownload}
              >
                {selectedFormat.toUpperCase()}
                <span className="ml-1 text-[10px]">&#9662;</span>
              </button>
            </div>

            {showFormatMenu && (
              <div className="absolute right-0 top-full z-50 mt-1 min-w-[120px] overflow-hidden rounded-lg border border-purple-200 bg-white shadow-lg dark:border-purple-800 dark:bg-gray-900">
                {IMAGE_FORMATS.map((fmt) => (
                  <button
                    key={fmt.value}
                    className={`flex w-full items-center gap-2 px-3 py-2 text-sm transition hover:bg-purple-50 dark:hover:bg-purple-900/40 ${
                      selectedFormat === fmt.value
                        ? 'bg-purple-100 font-semibold text-purple-700 dark:bg-purple-900/50 dark:text-purple-300'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                    onClick={() => {
                      setSelectedFormat(fmt.value);
                      downloadHandler(fmt.value);
                    }}
                  >
                    {fmt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {image?.publicId && transformationConfig ? (
        <div className="relative">
          <CldImage 
            width={getImageSize(type, image, "width")}
            height={getImageSize(type, image, "height")}
            src={image?.publicId}
            alt={image.title}
            sizes={"(max-width: 767px) 100vw, 50vw"}
            placeholder={dataUrl as PlaceholderValue}
            className="transformed-image"
            quality="auto:best"
            onLoad={() => {
              setIsTransforming && setIsTransforming(false);
            }}
            onError={() => {
              debounce(() => {
                setIsTransforming && setIsTransforming(false);
              }, 8000)()
            }}
            {...transformationConfig}
          />

          {isTransforming && (
            <div className="transforming-loader">
              <Image 
                src="/assets/icons/spinner.svg"
                width={50}
                height={50}
                alt="spinner"
              />
              <p className="text-white/80">Please wait...</p>
            </div>
          )}
        </div>
      ): (
        <div className="transformed-placeholder">
          Transformed Image
        </div>
      )}
    </div>
  )
}

export default TransformedImage