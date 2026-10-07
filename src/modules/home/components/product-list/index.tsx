import SectionTitle from "@modules/common/components/section-title"
import ProductPreview from "@modules/products/components/product-preview"
import { HttpTypes } from "@medusajs/types"

type ProductListProps = {
  subtitle: string
  titleLine1: string
  titleLine2: string
  products: HttpTypes.StoreProduct[]
  region: HttpTypes.StoreRegion
}

const ProductList = ({ subtitle, titleLine1, titleLine2, products, region }: ProductListProps) => {
  return (
    <section className="w-full py-16 bg-white">
      <div className="px-5 lg:px-8">
        <SectionTitle
          subtitle={subtitle}
          titleLine1={titleLine1}
          titleLine2={titleLine2}
        />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5">
          {products.map((product) => (
            <ProductPreview
              key={product.id}
              product={product}
              region={region}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductList

