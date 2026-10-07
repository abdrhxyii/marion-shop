import repeat from "@lib/util/repeat"
import { HttpTypes } from "@medusajs/types"
import { Heading } from "@medusajs/ui"

import Item from "@modules/cart/components/item"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"

type ItemsTemplateProps = {
  cart?: HttpTypes.StoreCart
}

const ItemsTemplate = ({ cart }: ItemsTemplateProps) => {
  const items = cart?.items
  return (
    <div>
      <div className="pb-6 flex items-center">
        <Heading level="h1" className="text-3xl-regular">Cart</Heading>
      </div>
      <div className="border-t border-gray-200">
        <div className="hidden lg:grid lg:grid-cols-[120px_1fr_200px_120px_120px] gap-4 py-4 border-b border-gray-200 text-sm text-ui-fg-subtle font-semibold">
          <div>Item</div>
          <div></div>
          <div>Quantity</div>
          <div className="hidden lg:block">Price</div>
          <div className="text-right">Total</div>
        </div>
        <div className="divide-y divide-gray-200">
          {items
            ? items
                .sort((a, b) => {
                  return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
                })
                .map((item) => {
                  return (
                    <Item
                      key={item.id}
                      item={item}
                      currencyCode={cart?.currency_code}
                    />
                  )
                })
            : repeat(5).map((i) => {
                return <SkeletonLineItem key={i} />
              })}
        </div>
      </div>
    </div>
  )
}

export default ItemsTemplate
