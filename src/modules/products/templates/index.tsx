import React from "react"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import ProductImageGallery from "@modules/products/components/product-image-gallery"
import ProductDetail from "@modules/products/components/product-detail"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  images,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-0 py-0 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0">
          <div className="w-full lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto lg:no-scrollbar">
            <ProductImageGallery images={images} />
          </div>

          <div className="w-full lg:px-28 lg:py-12">
            <ProductDetail product={product} region={region} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTemplate
