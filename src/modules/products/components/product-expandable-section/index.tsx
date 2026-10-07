"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

type ProductExpandableSectionProps = {
  title: string
  children: React.ReactNode
}

export default function ProductExpandableSection({
  title,
  children,
}: ProductExpandableSectionProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span 
          className="font-medium"
          style={{
            color: '#4f4f4f',
            fontSize: '15px',
            letterSpacing: '-0.28px',
            lineHeight: '21px'
          }}
        >
          {title}
        </span>
        <ChevronDown
          className={`w-5 h-5 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div 
          className="pb-4 font-medium"
          style={{
            color: '#4f4f4f',
            fontSize: '14px',
            letterSpacing: '-0.28px',
            lineHeight: '21px'
          }}
        >
          {children}
        </div>
      )}
    </div>
  )
}

