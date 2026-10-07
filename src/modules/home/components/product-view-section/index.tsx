import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import SectionTitle from "@modules/common/components/section-title"

const ProductViewSection = () => {
  const products = [
    {
      id: 1,
      name: "Essential Hoodie",
      price: "$99",
      image: "/data/essential-hoodies.avif",
    },
    {
      id: 2,
      name: "Ocean Hoodie",
      price: "$99",
      image: "/data/ocean-hoodies.avif",
    },
    {
      id: 3,
      name: "Forest Oversize T-Shirt",
      price: "$49",
      image: "/data/forest-tshirt.avif",
    },
  ]

  return (
    <section className="w-full py-16 bg-white">
      <div className="px-5 lg:px-8">
        <SectionTitle
          subtitle="(Bestsellers)"
          titleLine1="Our Most Popular"
          titleLine2="Pieces This Season"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          <Link href="#" className="group">
            <div className="flex flex-col">
              <div className="relative w-full aspect-square bg-grey-10 mb-4 overflow-hidden">
                <Image
                  src={products[0].image}
                  alt={products[0].name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4 pb-4">
                  <div className="bg-white px-4 py-3 flex items-center justify-between">
                    <span className="text-grey-90" style={{ fontSize: '14px', fontWeight: 500 }}>
                      Select Options
                    </span>
                    <ChevronRight className="w-5 h-5 text-grey-60" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <h3 className="text-grey-90 text-[14px] mb-1">
                  {products[0].name}
                </h3>
                <p className="text-grey-60 text-[14px]" style={{ fontWeight: 600 }}>
                  {products[0].price}
                </p>
              </div>
            </div>
          </Link>

          <div className="grid grid-cols-2 gap-2.5">
            {products.slice(1).map((product) => (
              <Link key={product.id} href="#" className="group">
                <div className="flex flex-col">
                  <div className="relative w-full aspect-square bg-grey-10 mb-4 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-2 pb-2">
                      <div className="bg-white px-4 py-3 flex items-center justify-between">
                        <span className="text-grey-90" style={{ fontSize: '14px', fontWeight: 500 }}>
                          Select Options
                        </span>
                        <ChevronRight className="w-5 h-5 text-grey-60" />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-grey-90 text-[14px] mb-1">
                      {product.name}
                    </h3>
                    <p className="text-grey-60 text-[14px]" style={{ fontWeight: 600 }}>
                      {product.price}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductViewSection

