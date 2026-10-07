import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import ProductViewSection from "@modules/home/components/product-view-section"
import CollectionView from "@modules/home/components/collection-view"
import ProductList from "@modules/home/components/product-list"
import ReviewSection from "@modules/home/components/review-section"
import StorySection from "@modules/home/components/story-section"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { listProducts } from "@lib/data/products"

export const metadata: Metadata = {
  title: "Medusa Next.js Starter Template",
  description:
    "A performant frontend ecommerce starter template with Next.js 15 and Medusa.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  const { response: { products: productsData } } = await listProducts({
    countryCode,
    queryParams: {
      limit: 12,
    },
  })

  return (
    <>
      <Hero />
      <ProductViewSection />
      <CollectionView />
      <ProductList
        subtitle="(New Arrivals)"
        titleLine1="This Season's"
        titleLine2="Must-Haves"
        products={productsData}
        region={region}
      />
      <StorySection />
      <ProductList
        subtitle="(Discounts)"
        titleLine1="Top Picks,"
        titleLine2="Now on Discount"
        products={productsData}
        region={region}
      />
      <ReviewSection />
    </>
  )
}
