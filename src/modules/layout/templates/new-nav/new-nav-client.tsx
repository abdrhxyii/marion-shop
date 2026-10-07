"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useParams } from "next/navigation"
import { Search, ShoppingCart, UserCircle, Menu, X } from "lucide-react"
import { HttpTypes } from "@medusajs/types"
import SearchOverlay from "@modules/layout/components/search-overlay"
import CartDropdown from "@modules/layout/components/cart-dropdown"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function NewNavClient({ cart }: { cart?: HttpTypes.StoreCart | null }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { countryCode } = useParams() as { countryCode: string }

  const isRootPage = pathname === `/${countryCode}` || pathname === `/${countryCode}/`
  const isCategoryPage = pathname?.includes(`/${countryCode}/categories`)
  const isCollectionPage = pathname?.includes(`/${countryCode}/collections`)
  const isStorePage = pathname?.includes(`/${countryCode}/store`)
  const shouldHaveTransparentBg = isRootPage || isCategoryPage || isCollectionPage || isStorePage

  const handleSearchClick = () => {
    setIsSearchOpen(true)
  }

  const handleCloseSearch = () => {
    setIsSearchOpen(false)
  }

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const headerBgClass = shouldHaveTransparentBg ? "bg-transparent" : "bg-white"
  const textColorClass = shouldHaveTransparentBg ? "text-white" : "text-black"
  const cartBadgeBgClass = shouldHaveTransparentBg ? "bg-white text-grey-90" : "bg-black text-white"

  return (
    <>
      <div className="sticky top-0 inset-x-0 z-50">
        <header className={`relative ${headerBgClass} transition-colors duration-300`}>
          <nav className="flex items-center w-full h-20 px-4 lg:px-8">
            <div className="hidden lg:flex items-center gap-5 flex-1">
              <Link href="#" className={textColorClass} style={{ fontWeight: 600 }}>
                Men
              </Link>
              <Link href="#" className={textColorClass} style={{ fontWeight: 600 }}>
                Women
              </Link>
              <Link href="#" className={textColorClass} style={{ fontWeight: 600 }}>
                Our Story
              </Link>
              <Link href="#" className={textColorClass} style={{ fontWeight: 600 }}>
                Contact
              </Link>
            </div>

            <button
              onClick={handleMobileMenuToggle}
              className={`lg:hidden ${textColorClass}`}
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6 stroke-2" strokeWidth={2} />
            </button>

            <div className="flex items-center justify-center flex-1 lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:ml-0 ml-4">
              <LocalizedClientLink href="/">
                <h1
                  className={`${textColorClass} uppercase tracking-tight hover:opacity-80 transition-opacity cursor-pointer`}
                  style={{ fontWeight: 600, fontSize: "16px" }}
                >
                  MARION
                </h1>
              </LocalizedClientLink>
            </div>

            <div className="flex items-center gap-4 justify-end">
              <button
                onClick={handleSearchClick}
                className={textColorClass}
              >
                <Search className="w-6 h-6 stroke-2" strokeWidth={2} />
              </button>
              <LocalizedClientLink href="/account" className={`${textColorClass} hidden lg:block`}>
                <UserCircle className="w-6 h-6 stroke-2" strokeWidth={2} />
              </LocalizedClientLink>
              <CartDropdown
                cart={cart}
                hideButton
                customTrigger={
                  <button className={`${textColorClass} relative`}>
                    <ShoppingCart className="w-6 h-6 stroke-2" strokeWidth={2} />
                    {cart && cart.items && cart.items.length > 0 && (
                      <span
                        className={`absolute -bottom-2 -right-3 ${cartBadgeBgClass} text-xs rounded-full w-5 h-5 flex items-center justify-center`}
                        style={{ fontWeight: 600 }}
                      >
                        {cart.items.reduce((acc, item) => acc + item.quantity, 0)}
                      </span>
                    )}
                  </button>
                }
              />
            </div>
          </nav>
        </header>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={handleCloseMobileMenu}
          />
          <div className="fixed top-0 left-0 right-0 bg-white transform transition-transform duration-300 ease-in-out">
            <div className="flex items-center justify-between h-20 px-4 border-b border-gray-200">
              <button
                onClick={handleCloseMobileMenu}
                className="text-black"
                aria-label="Close menu"
              >
                <X className="w-6 h-6 stroke-2" strokeWidth={2} />
              </button>
              <h2 className="text-black uppercase tracking-tight" style={{ fontWeight: 600, fontSize: "16px" }}>
                MARION
              </h2>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    handleCloseMobileMenu()
                    handleSearchClick()
                  }}
                  className="text-black"
                >
                  <Search className="w-6 h-6 stroke-2" strokeWidth={2} />
                </button>
                <CartDropdown
                  cart={cart}
                  hideButton
                  customTrigger={
                    <button className="text-black relative">
                      <ShoppingCart className="w-6 h-6 stroke-2" strokeWidth={2} />
                      {cart && cart.items && cart.items.length > 0 && (
                        <span
                          className="absolute -bottom-2 -right-3 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                          style={{ fontWeight: 600 }}
                        >
                          {cart.items.reduce((acc, item) => acc + item.quantity, 0)}
                        </span>
                      )}
                    </button>
                  }
                />
              </div>
            </div>
            <nav className="flex flex-col py-4">
              <LocalizedClientLink
                href="#"
                onClick={handleCloseMobileMenu}
                className="px-4 py-4 text-black text-base font-semibold hover:bg-gray-50 transition-colors"
              >
                Men
              </LocalizedClientLink>
              <LocalizedClientLink
                href="#"
                onClick={handleCloseMobileMenu}
                className="px-4 py-4 text-black text-base font-semibold hover:bg-gray-50 transition-colors"
              >
                Women
              </LocalizedClientLink>
              <LocalizedClientLink
                href="#"
                onClick={handleCloseMobileMenu}
                className="px-4 py-4 text-black text-base font-semibold hover:bg-gray-50 transition-colors"
              >
                Our Story
              </LocalizedClientLink>
              <LocalizedClientLink
                href="#"
                onClick={handleCloseMobileMenu}
                className="px-4 py-4 text-black text-base font-semibold hover:bg-gray-50 transition-colors"
              >
                Contact
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/account"
                onClick={handleCloseMobileMenu}
                className="px-4 py-4 text-black text-base font-semibold hover:bg-gray-50 transition-colors"
              >
                Account
              </LocalizedClientLink>
            </nav>
          </div>
        </div>
      )}

      <SearchOverlay isOpen={isSearchOpen} onClose={handleCloseSearch} />
    </>
  )
}

