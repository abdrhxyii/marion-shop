"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Search, X } from "lucide-react"

const mockProducts = [
  { id: "1", title: "Distressed Light Jeans", handle: "distressed-light-jeans" },
  { id: "2", title: "Forest Oversize T-Shirt", handle: "forest-oversize-t-shirt" },
  { id: "3", title: "Core Utility Pants", handle: "core-utility-pants" },
  { id: "4", title: "Faded Black Jeans", handle: "faded-black-jeans" },
  { id: "5", title: "Sand Oversize T-Shirt", handle: "sand-oversize-t-shirt" },
  { id: "6", title: "Black Oversize T-Shirt", handle: "black-oversize-t-shirt" },
  { id: "7", title: "Classic White Denim Jacket", handle: "classic-white-denim-jacket" },
  { id: "8", title: "Navy Blue Cargo Shorts", handle: "navy-blue-cargo-shorts" },
  { id: "9", title: "Olive Green Hoodie", handle: "olive-green-hoodie" },
  { id: "10", title: "Charcoal Wool Coat", handle: "charcoal-wool-coat" },
  { id: "11", title: "Cream Knit Sweater", handle: "cream-knit-sweater" },
  { id: "12", title: "Burgundy Leather Boots", handle: "burgundy-leather-boots" },
  { id: "13", title: "Gray Tailored Blazer", handle: "gray-tailored-blazer" },
  { id: "14", title: "Beige Chino Trousers", handle: "beige-chino-trousers" },
  { id: "15", title: "White Canvas Sneakers", handle: "white-canvas-sneakers" },
]

type SearchOverlayProps = {
  isOpen: boolean
  onClose: () => void
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<typeof mockProducts>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const params = useParams()
  const countryCode = params?.countryCode as string

  useEffect(() => {
    if (isOpen) {
      searchInputRef.current?.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([])
      setSelectedIndex(0)
      return
    }

    const filtered = mockProducts.filter((product) =>
      product.title?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setSearchResults(filtered)
    setSelectedIndex(0)
  }, [searchQuery])

  const handleClose = () => {
    setSearchQuery("")
    setSearchResults([])
    setSelectedIndex(0)
    onClose()
  }

  const handleClearSearch = () => {
    setSearchQuery("")
    searchInputRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      handleClose()
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prev) =>
        prev < searchResults.length - 1 ? prev + 1 : prev
      )
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0))
    } else if (e.key === "Enter" && searchResults[selectedIndex]) {
      const product = searchResults[selectedIndex]
      window.location.href = `/${countryCode}/products/${product.handle}`
    }
  }

  if (!isOpen) return null

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
      <div className="fixed inset-0 z-[100] flex items-start justify-center pt-32">
        <div
          className="absolute inset-0 bg-black/50"
          onClick={handleClose}
        />
        <div className="relative w-full max-w-xl mx-8 bg-white overflow-hidden" style={{ borderRadius: "18px" }}>
        <div className="flex items-center px-6 py-5">
          <Search className="w-5 h-5 text-black mr-4 flex-shrink-0" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search..."
            className="flex-1 outline-none text-gray-900 placeholder-gray-400 bg-transparent"
            style={{ fontSize: "16px" }}
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="ml-4 bg-black rounded-full p-1 flex-shrink-0 hover:bg-black/80 transition-colors"
            >
              <X className="w-3 h-3 text-white" style={{ fontSize: "12px", fontWeight: 500 }} />
            </button>
          )}
        </div>
        {searchQuery && searchResults.length > 0 && (
          <div 
            className="border-t border-gray-200 max-h-[500px] overflow-y-auto hide-scrollbar"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {searchResults.map((product, index) => {
              const isLast = index === searchResults.length - 1
              return (
              <Link
                key={product.id}
                href={`/${countryCode}/products/${product.handle}`}
                onClick={handleClose}
                className={`block px-6 py-3 hover:bg-gray-50 transition-colors ${
                  index === selectedIndex ? "bg-gray-50" : ""
                } ${isLast ? "rounded-b-[18px]" : ""}`}
              >
                <div className="text-gray-900" style={{ fontSize: "18px", fontWeight: 500 }}>
                  {product.title}
                </div>
                <div className="text-gray-500 mt-0.5" style={{ fontSize: "16px", fontWeight: 500 }}>
                  /products/{product.handle}
                </div>
              </Link>
              )
            })}
          </div>
        )}
        {searchQuery && searchResults.length === 0 && (
          <div className="px-6 py-8 text-center text-gray-500 border-t border-gray-200">
            No products found
          </div>
        )}
      </div>
    </div>
    </>
  )
}

