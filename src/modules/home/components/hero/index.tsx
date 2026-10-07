"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  
  const slides = [
    {
      image: "/Images/MC_FW_2025_GIFTGUIDE_DS_RGB_150DPI_16X9_9.avif",
      line1: "Timeless Essentials",
      line2: "for the Season",
    },
    {
      image: "/Images/hero8.avif",
      line1: "Seasonal Essentials",
      line2: "For Women",
    },
    {
      image: "/Images/hero13.webp",
      line1: "New Arrivals Drop",
      line2: "For Men",
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
          setCurrentIndex((prev) => (prev + 1) % slides.length)
          setIsAnimating(true)
        }, 50)
      }
    }, 16)

    return () => clearInterval(progressInterval)
  }, [currentIndex, slides.length, slideDuration])

  return (
    <div className="relative w-full h-screen overflow-hidden -mt-20">
      <div className="absolute inset-0">
        <div className="relative w-full h-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={slide.image}
                alt={`Hero ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/45 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none"></div>

      <div className="absolute inset-0 z-10 flex flex-col justify-end pb-8">
        <div className="w-full flex flex-col gap-6 px-5 lg:px-8 pb-6 relative">
          <div className="flex flex-col gap-3">
            <span
              key={`counter-${currentIndex}`}
              className="text-grey-40 text-sm lg:text-lg"
              style={{
                fontWeight: 600,
                opacity: isAnimating ? 1 : 0,
                transform: isAnimating ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
              }}
            >
              {String(currentIndex + 1).padStart(2, "0")}—{String(slides.length).padStart(2, "0")}
            </span>
            <h1
              key={`line1-${currentIndex}`}
              className="text-white text-4xl lg:text-7xl leading-none"
              style={{
                fontWeight: 600,
                opacity: isAnimating ? 1 : 0,
                transform: isAnimating ? "translateY(0)" : "translateY(50px)",
                transition: "opacity 0.6s ease-out 0.1s, transform 0.6s ease-out 0.1s",
              }}
            >
              {slides[currentIndex].line1}
            </h1>
            <h2
              key={`line2-${currentIndex}`}
              className="text-white text-4xl lg:text-7xl"
              style={{
                fontWeight: 600,
                opacity: isAnimating ? 1 : 0,
                transform: isAnimating ? "translateY(0)" : "translateY(50px)",
                transition: "opacity 0.6s ease-out 0.2s, transform 0.6s ease-out 0.2s",
              }}
            >
              {slides[currentIndex].line2}
            </h2>
          </div>

          <div className="lg:hidden">
            <Link href="/store">
              <button className="bg-white text-grey-90 px-4 py-3 flex items-center gap-2 text-sm" style={{ fontWeight: 600 }}>
                Shop Now
                <ChevronRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

          <div className="flex gap-3 relative z-20">
            {slides.map((_, index) => (
              <div
                key={index}
                className="h-1 bg-white/30 rounded-full flex-1 relative overflow-hidden"
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

        <div className="hidden lg:block absolute right-8 bottom-[5rem] z-20">
          <Link href="/store">
            <button className="bg-white text-grey-90 px-6 py-5 flex items-center gap-2 text-base" style={{ fontWeight: 600 }}>
              Shop Now
              <ChevronRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Hero
