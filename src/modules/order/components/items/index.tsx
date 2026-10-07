import repeat from "@lib/util/repeat"
import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"

import Item from "@modules/order/components/item"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"

type ItemsProps = {
  order: HttpTypes.StoreOrder
}

const Items = ({ order }: ItemsProps) => {
  const items = order.items

  return (
    <div className="flex flex-col">
      <div className="hidden lg:grid grid-cols-[120px_1fr_200px_120px_120px] gap-x-4 border-b border-gray-200 pb-3 mb-4">
        <Text className="text-base-semi uppercase">Item</Text>
        <Text className="text-base-semi uppercase"></Text>
        <Text className="text-base-semi uppercase">Quantity</Text>
        <Text className="text-base-semi uppercase text-right">Price</Text>
        <Text className="text-base-semi uppercase text-right">Total</Text>
      </div>
      <div className="flex flex-col divide-y divide-gray-200">
        {items?.length
          ? items
              .sort((a, b) => {
                return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
              })
              .map((item) => {
                return (
                  <Item
                    key={item.id}
                    item={item}
                    currencyCode={order.currency_code}
                  />
                )
              })
          : repeat(5).map((i) => {
              return <SkeletonLineItem key={i} />
            })}
      </div>
    </div>
  )
}

export default Items
