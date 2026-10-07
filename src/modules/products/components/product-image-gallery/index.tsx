"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { HttpTypes } from "@medusajs/types"

type ProductImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

export default function ProductImageGallery({ images }: ProductImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!images || images.length === 0) {
    return null
  }

  const hasMultipleImages = images.length > 1

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <>
      <div className="lg:hidden relative w-full aspect-square bg-gray-100">
        {hasMultipleImages && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
        
        {images[currentIndex]?.url && (
          <Image
            src={images[currentIndex].url}
            alt={`Product image ${currentIndex + 1}`}
            fill
            className="object-cover"
            priority={currentIndex === 0}
            sizes="100vw"
          />
        )}
      </div>

      <div className="hidden lg:flex flex-col gap-0">
        {images.map((image, index) => (
          <div
            key={image.id}
            className="relative w-full aspect-square bg-gray-100"
          >
            {image.url && (
              <Image
                src={image.url}
                alt={`Product image ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="50vw"
              />
            )}
          </div>
        ))}
      </div>
    </>
  )
}

