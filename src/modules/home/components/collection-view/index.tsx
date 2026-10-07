import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

const CollectionView = () => {
  const collections = [
    {
      id: 1,
      title: "Men's",
      subtitle: "Collection",
      image: "/Images/ff2a6635_overshirts.jpg",
      href: "/categories/men",
    },
    {
      id: 2,
      title: "Women's",
      subtitle: "Collection",
      image: "/Images/5858f4cf_knitwear_(4).jpg",
      href: "/categories/women",
    },
  ]

  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-2">
      {collections.map((collection) => (
        <Link key={collection.id} href={collection.href} className="group relative h-[600px] md:h-screen overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={collection.image}
              alt={`${collection.title} ${collection.subtitle}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none"></div>

          <div className="absolute inset-0 z-10 flex flex-col justify-end pb-8">
            <div className="px-5 lg:px-8 flex items-end justify-between gap-4">
              <div className="flex flex-col gap-3">
                <h2
                  className="text-white text-3xl lg:text-[46px] leading-tight lg:leading-[55.2px]"
                  style={{
                    fontWeight: 500,
                  }}
                >
                  {collection.title}
                  <br />
                  {collection.subtitle}
                </h2>
              </div>

              <button className="bg-white text-grey-90 px-4 py-3 lg:px-6 lg:py-5 flex items-center gap-2 text-sm lg:text-base" style={{ fontWeight: 600 }}>
                Shop Now
                <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5" />
              </button>
            </div>
          </div>
        </Link>
      ))}
    </section>
  )
}

export default CollectionView

