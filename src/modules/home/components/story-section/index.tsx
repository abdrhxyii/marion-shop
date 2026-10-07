"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

const StorySection = () => {
  return (
    <section className="relative w-full h-screen bg-black text-white overflow-hidden">
      <div className="absolute inset-0">
        <div className="relative w-full h-full">
          <Image
            src="/Images/hero13.webp"
            alt="About Marioni"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/60"></div>
      </div>

      <div className="absolute inset-0 z-10 flex flex-col justify-end px-5 lg:px-8 pb-8">
        <div className="w-full flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 lg:gap-0">
          <div className="max-w-2xl">
            <div className="flex flex-col gap-4">
              <span className="text-white/60" style={{ fontSize: '14px', fontWeight: 500 }}>
                (About Marioni)
              </span>
              <h2 className="text-white leading-relaxed text-xl lg:text-[30px]" style={{ fontWeight: 500 }}>
                Pieces beyond seasons, created
                <br />
                to adapt and remain timeless.
              </h2>
            </div>
          </div>
          <div>
            <Link href="/our-story">
              <button className="bg-white text-black border border-black px-6 py-5 flex items-center gap-2 hover:bg-white/90 transition-colors" style={{ fontWeight: 600 }}>
                Our Story
                <ChevronRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StorySection

