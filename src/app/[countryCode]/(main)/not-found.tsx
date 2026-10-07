import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "404",
  description: "Something went wrong",
}

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-6">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <h1 className="text-[80px] lg:text-[120px] font-bold text-black leading-none mb-4">404</h1>
          <div className="w-16 lg:w-24 h-1 bg-black mx-auto"></div>
        </div>
        
        <h2 className="text-2xl lg:text-3xl font-semibold text-black mb-4">
          Page not found
        </h2>
        <p className="text-base text-gray-600 mb-10 leading-relaxed">
          The page you tried to access does not exist. It may have been moved or removed.
        </p>
        
        <Link
          href="/"
          className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 font-medium hover:bg-gray-800 transition-colors duration-200"
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  )
}
