import { clx, Text } from "@medusajs/ui"
import { HttpTypes } from "@medusajs/types"

import Thumbnail from "@modules/products/components/thumbnail"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import LineItemPrice from "@modules/common/components/line-item-price"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import LineItemOptions from "@modules/common/components/line-item-options"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem | HttpTypes.StoreOrderLineItem
  currencyCode: string
}

const Item = ({ item, currencyCode }: ItemProps) => {
  return (
    <div className="grid grid-cols-[120px_1fr] lg:grid-cols-[120px_1fr_200px_120px_120px] gap-x-4 py-6">
      <LocalizedClientLink
        href={`/products/${(item as HttpTypes.StoreOrderLineItem).variant?.product?.handle || (item as any).product_handle}`}
        className="w-24 h-24 lg:w-20 lg:h-20 flex-shrink-0"
      >
        <Thumbnail thumbnail={item.thumbnail} images={(item as HttpTypes.StoreOrderLineItem).variant?.product?.images || (item as any).variant?.product?.images} size="square" />
      </LocalizedClientLink>
      <div className="flex flex-col justify-between">
        <div className="flex flex-col flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-col flex-1 min-w-0">
              <h3 className="text-base-regular text-ui-fg-base overflow-hidden text-ellipsis mb-1">
                <LocalizedClientLink
                  href={`/products/${(item as HttpTypes.StoreOrderLineItem).variant?.product?.handle || (item as any).product_handle}`}
                  data-testid="product-link"
                  className="hover:underline"
                >
                  {item.product_title || (item as HttpTypes.StoreOrderLineItem).title}
                </LocalizedClientLink>
              </h3>
              <LineItemOptions variant={item.variant} data-testid="product-variant" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4 lg:hidden">
          <span className="text-sm text-ui-fg-subtle">Qty:</span>
          <span className="text-base-regular text-ui-fg-base font-medium" data-testid="item-quantity" data-value={item.quantity}>
            {item.quantity}
          </span>
        </div>
      </div>
      <div className="hidden lg:flex items-center justify-center">
        <Text className="text-base-regular text-ui-fg-base font-medium" data-testid="item-quantity-desktop" data-value={item.quantity}>
          {item.quantity}
        </Text>
      </div>
      <div className="hidden lg:flex items-center justify-end">
        <LineItemUnitPrice item={item} currencyCode={currencyCode} style="tight" />
      </div>
      <div className="hidden lg:flex items-center justify-end">
        <LineItemPrice item={item} currencyCode={currencyCode} style="tight" />
      </div>
    </div>
  )
}

export default Item
