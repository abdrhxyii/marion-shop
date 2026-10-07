import { notFound } from "next/navigation"
import { Suspense } from "react"
import { ArrowLeft } from "lucide-react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import HeroImage from "@modules/common/components/hero-image"
import { HttpTypes } from "@medusajs/types"

export default function CategoryTemplate({
  category,
  sortBy,
  page,
  countryCode,
  handle,
}: {
  category: HttpTypes.StoreProductCategory
  sortBy?: SortOptions
  page?: string
  countryCode: string
  handle?: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  if (!category || !countryCode) notFound()

  const parents = [] as HttpTypes.StoreProductCategory[]

  const getParents = (category: HttpTypes.StoreProductCategory) => {
    if (category.parent_category) {
      parents.push(category.parent_category)
      getParents(category.parent_category)
    }
  }

  getParents(category)

  return (
    <>
      <HeroImage handle={handle} title={category.name} />
    <div
        className="flex flex-col lg:flex-row lg:items-start py-6 px-5 lg:px-8"
      data-testid="category-container"
    >
      <RefinementList sortBy={sort} data-testid="sort-by-container" />
      <div className="w-full">
        {category.parent_category && (
          <div className="mb-8">
            <LocalizedClientLink
              href={`/categories/${category.parent_category.handle}`}
              className="flex items-center gap-2 text-ui-fg-subtle hover:text-ui-fg-base"
            >
              <ArrowLeft size={20} />
              <span className="text-base">Back to {category.parent_category.name}</span>
            </LocalizedClientLink>
          </div>
        )}
        {!category.parent_category && (
        <div className="flex flex-row mb-8 text-2xl-semi gap-4">
          {parents &&
            parents.map((parent) => (
              <span key={parent.id} className="text-ui-fg-subtle">
                <LocalizedClientLink
                  className="mr-4 hover:text-black"
                  href={`/categories/${parent.handle}`}
                  data-testid="sort-by-link"
                >
                  {parent.name}
                </LocalizedClientLink>
                /
              </span>
            ))}
        </div>
        )}
        {category.description && (
          <div className="mb-8 text-base-regular">
            <p>{category.description}</p>
          </div>
        )}
        {category.category_children && (
          <div className="mb-8">
            <ul className="flex flex-wrap gap-6">
              {!category.parent_category && (
                <li>
                  <LocalizedClientLink 
                    href={`/categories/${category.handle}`}
                    style={{ color: '#000000', fontSize: '35px', fontWeight: 700 }}
                  >
                    All
                  </LocalizedClientLink>
                </li>
              )}
              {category.category_children?.map((c) => (
                <li key={c.id}>
                  <LocalizedClientLink 
                    href={`/categories/${c.handle}`}
                    style={{ color: '#b7b7b7', fontSize: '35px' }}
                  >
                    {c.name}
                  </LocalizedClientLink>
                </li>
              ))}
            </ul>
          </div>
        )}
        <Suspense
          fallback={
            <SkeletonProductGrid
              numberOfProducts={category.products?.length ?? 8}
            />
          }
        >
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            categoryId={category.id}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
    </>
  )
}
