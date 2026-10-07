import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

type ProductCardProps = {
  title: string
  price: string
  image: string
  href?: string
  alt?: string
  badge?: "New" | "Sale"
}

const ProductCard = ({ title, price, image, href = "#", alt, badge }: ProductCardProps) => {
  return (
    <Link href={href} className="group">
      <div className="flex flex-col">
        <div className="relative w-full aspect-[3/4] bg-grey-10 mb-4 overflow-hidden">
          {badge && (
            <div
              className="absolute top-3 left-3 z-20 text-white px-3 py-1.5 rounded-sm"
              style={{
                fontSize: '14px',
                fontWeight: 500,
                backgroundColor: badge === "New" ? "#000000" : "#b02724",
              }}
            >
              {badge}
            </div>
          )}
          <Image
            src={image}
            alt={alt || title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4 pb-4">
            <div className="bg-white px-4 py-3 flex items-center justify-between">
              <span className="text-[#1a1a1a]" style={{ fontSize: '14px', fontWeight: 500 }}>
                Select Options
              </span>
              <ChevronRight className="w-5 h-5 text-grey-60" />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className="text-[#1a1a1a] text-[18px] mb-1" data-testid="product-title">
            {title}
          </h3>
          <p className="text-[#6b6b6b] text-[16px]" style={{ fontWeight: 600 }}>
            {price}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard

