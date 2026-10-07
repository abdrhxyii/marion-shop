"use client"

import Link from "next/link"
import { Package, RotateCcw, ShieldCheck, MessageCircle } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-black/90 text-white">
      <div className="px-5 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex flex-col items-center justify-center py-8 px-4" style={{ backgroundColor: '#262626' }}>
          <div className="w-12 h-12 flex items-center justify-center mb-3">
            <Package className="w-8 h-8 text-white" />
          </div>
          <p className="text-center text-sm" style={{ fontWeight: 500, color: '#b7b7b7' }}>
            Free shipping from $149
          </p>
        </div>
        <div className="flex flex-col items-center justify-center py-8 px-4" style={{ backgroundColor: '#262626' }}>
          <div className="w-12 h-12 flex items-center justify-center mb-3">
            <RotateCcw className="w-8 h-8 text-white" />
          </div>
          <p className="text-center text-sm" style={{ fontWeight: 500, color: '#b7b7b7' }}>
            Easy returns within 30 days
          </p>
        </div>
        <div className="flex flex-col items-center justify-center py-8 px-4" style={{ backgroundColor: '#262626' }}>
          <div className="w-12 h-12 flex items-center justify-center mb-3">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <p className="text-center text-sm" style={{ fontWeight: 500, color: '#b7b7b7' }}>
            Secure payments online
          </p>
        </div>
        <div className="flex flex-col items-center justify-center py-8 px-4" style={{ backgroundColor: '#262626' }}>
          <div className="w-12 h-12 flex items-center justify-center mb-3">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <p className="text-center text-sm" style={{ fontWeight: 500, color: '#b7b7b7' }}>
            24/7 customer support
          </p>
        </div>
        </div>
      </div>

      <div className="flex flex-col md:grid md:grid-cols-2 gap-12 py-6 px-5 lg:px-8">
        <div className="flex flex-col order-2 md:order-1">
          <h2 className="text-white uppercase mb-4 text-[48px] md:text-[111px] leading-[43.2px] md:leading-[99.9px]" style={{ fontWeight: 600, letterSpacing: '-2.22px', textAlign: 'left' }}>
            MARION
          </h2>
          <p className="text-white/60 text-sm">
            © {currentYear} All Rights Reserved
          </p>
        </div>

        <div className="flex flex-col order-1 md:order-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="flex flex-col">
              <span className="text-white/60 mb-4 block" style={{ fontSize: '13px', fontWeight: 500 }}>
                (Navigation)
              </span>
              <ul className="flex flex-col gap-3">
                <li>
                  <Link href="/" className="text-white hover:text-white/80 transition-colors" style={{ fontSize: '14px', fontWeight: 500 }}>
                    Index
                  </Link>
                </li>
                <li>
                  <Link href="/store/men" className="text-white hover:text-white/80 transition-colors" style={{ fontSize: '14px', fontWeight: 500 }}>
                    Men
                  </Link>
                </li>
                <li>
                  <Link href="/store/women" className="text-white hover:text-white/80 transition-colors" style={{ fontSize: '14px', fontWeight: 500 }}>
                    Women
                  </Link>
                </li>
                <li>
                  <Link href="/our-story" className="text-white hover:text-white/80 transition-colors" style={{ fontSize: '14px', fontWeight: 500 }}>
                    Our Story
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col">
              <span className="text-white/60 mb-4 block" style={{ fontSize: '13px', fontWeight: 500 }}>
                (Legal)
              </span>
              <ul className="flex flex-col gap-3">
                <li>
                  <Link href="/privacy-policy" className="text-white hover:text-white/80 transition-colors" style={{ fontSize: '14px', fontWeight: 500 }}>
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms-of-service" className="text-white hover:text-white/80 transition-colors" style={{ fontSize: '14px', fontWeight: 500 }}>
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col">
              <span className="text-white/60 mb-4 block" style={{ fontSize: '13px', fontWeight: 500 }}>
                (Help)
              </span>
              <ul className="flex flex-col gap-3">
                <li>
                  <Link href="/contact" className="text-white hover:text-white/80 transition-colors" style={{ fontSize: '14px', fontWeight: 500 }}>
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-white hover:text-white/80 transition-colors" style={{ fontSize: '14px', fontWeight: 500 }}>
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col">
            <h3 className="text-white mb-4 text-base" style={{ fontWeight: 500 }}>
              Subscribe to our newsletter for new arrivals and special offers.
            </h3>
            <form className="flex flex-col md:flex-row gap-3 mb-3 w-full md:w-[70%]">
              <input
                type="email"
                placeholder="Your Email"
                className="flex-1 px-4 py-3 text-white placeholder:text-white/60 focus:outline-none"
                style={{ backgroundColor: '#2a2a2a', fontWeight: 500 }}
              />
              <button
                type="submit"
                className="bg-white text-black px-6 py-3 hover:bg-white/90 transition-colors"
                style={{ fontWeight: 500 }}
              >
                Submit
              </button>
            </form>
            <p className="text-white/60 text-xs">
              By subscribing to our newsletter, you agree to receive
              <br />
              emails from us and accept our{" "}
              <Link href="/privacy-policy" className="text-white hover:text-white/80 underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>

      <div className="py-6 px-5 lg:px-8">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-white/60 text-sm">VISA</span>
          <span className="text-white/60 text-sm">Mastercard</span>
          <span className="text-white/60 text-sm">PayPal</span>
          <span className="text-white/60 text-sm">G Pay</span>
          <span className="text-white/60 text-sm">Apple Pay</span>
        </div>
      </div>
    </footer>
  )
}
