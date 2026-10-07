"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { Check } from "lucide-react"

const ReviewSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const reviews = [
    {
      image: "/Images/hero10.webp",
      quote: "The pieces are versatile — from casual days to evenings out. A timeless design that will never go out of style.",
      name: "Daniel Wright",
    },
    {
      image: "/Images/hero14.webp",
      quote: "I love the quality — the fabric feels premium and the fit is perfect. I've received compliments and will order.",
      name: "Emma Collins",
    },
    {
      image: "/Images/hero13.webp",
      quote: "Exceptional craftsmanship and attention to detail. These pieces have become staples in my wardrobe.",
      name: "Michael Chen",
    },
  ]

  const slideDuration = 5000

  useEffect(() => {
    setProgress(0)
    setIsAnimating(true)
    const startTime = Date.now()

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min((elapsed / slideDuration) * 100, 100)
      setProgress(newProgress)

      if (newProgress >= 100) {
        setIsAnimating(false)
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % reviews.length)
          setIsAnimating(true)
        }, 50)
      }
    }, 16)

    return () => clearInterval(progressInterval)
  }, [currentIndex, reviews.length, slideDuration])

  return (
    <section className="relative w-full h-screen bg-black text-white overflow-hidden">
      <div className="absolute inset-0">
        <div className="relative w-full h-full">
          {reviews.map((review, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={review.image}
                alt={`Review ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/40"></div>
      </div>

      <div className="absolute inset-0 z-10 flex flex-col justify-end px-5 lg:px-8 pb-8">
        <div className="w-full max-w-2xl">
          <div
            key={`review-${currentIndex}`}
            className="flex flex-col gap-4 mb-6"
            style={{
              opacity: isAnimating ? 1 : 0,
              transform: isAnimating ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
            }}
          >
            <span className="text-white/60" style={{ fontSize: '14px', fontWeight: 500 }}>
              (Reviews)
            </span>
            <blockquote 
              className="text-white leading-relaxed overflow-hidden text-xl lg:text-[30px]"
              style={{ 
                fontWeight: 500,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                textOverflow: 'clip'
              }}
            >
              "{reviews[currentIndex].quote}"
            </blockquote>
            <div className="flex flex-col gap-2">
              <p className="text-white text-base" style={{ fontWeight: 500 }}>
                {reviews[currentIndex].name}
              </p>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-white" />
                <span className="text-white/80 text-sm" style={{ fontWeight: 500 }}>
                  Verified Buyer
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            {reviews.map((_, index) => (
              <div
                key={index}
                className="h-1 w-12 bg-white/30 rounded-full relative overflow-hidden"
              >
                {index === currentIndex && (
                  <div
                    className="absolute top-0 left-0 h-full bg-white rounded-full transition-all duration-75 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                )}
                {index < currentIndex && (
                  <div className="absolute top-0 left-0 h-full w-full bg-white rounded-full" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ReviewSection

