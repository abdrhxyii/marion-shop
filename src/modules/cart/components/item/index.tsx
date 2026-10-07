"use client"

import { Text } from "@medusajs/ui"
import { updateLineItem } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import CartItemSelect from "@modules/cart/components/cart-item-select"
import ErrorMessage from "@modules/checkout/components/error-message"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Spinner from "@modules/common/icons/spinner"
import Thumbnail from "@modules/products/components/thumbnail"
import { useState } from "react"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem
  type?: "full" | "preview"
  currencyCode: string
}

const Item = ({ item, type = "full", currencyCode }: ItemProps) => {
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const changeQuantity = async (quantity: number) => {
    setError(null)
    setUpdating(true)

    await updateLineItem({
      lineId: item.id,
      quantity,
    })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setUpdating(false)
      })
  }

  // TODO: Update this to grab the actual max inventory
  const maxQtyFromInventory = 10
  const maxQuantity = item.variant?.manage_inventory ? 10 : maxQtyFromInventory

  if (type === "preview") {
    return (
      <div className="py-4 flex items-center gap-4" data-testid="product-row">
        <LocalizedClientLink
          href={`/products/${item.product_handle}`}
          className="w-16 h-16 flex-shrink-0"
        >
          <Thumbnail
            thumbnail={item.thumbnail}
            images={item.variant?.product?.images}
            size="square"
          />
        </LocalizedClientLink>
        <div className="flex-1 min-w-0">
          <Text
            className="text-base-regular text-ui-fg-base"
            data-testid="product-title"
          >
            {item.product_title}
          </Text>
          <LineItemOptions variant={item.variant} data-testid="product-variant" />
        </div>
        <div className="flex flex-col items-end">
          <span className="flex gap-x-1">
            <Text className="text-base-regular text-ui-fg-muted">{item.quantity}x </Text>
            <LineItemUnitPrice
              item={item}
              style="tight"
              currencyCode={currencyCode}
            />
          </span>
          <LineItemPrice
            item={item}
            style="tight"
            currencyCode={currencyCode}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="py-6 lg:grid lg:grid-cols-[120px_1fr_200px_120px_120px] lg:gap-4 lg:items-center" data-testid="product-row">
      <div className="mb-4 lg:mb-0">
        <LocalizedClientLink
          href={`/products/${item.product_handle}`}
          className="w-24 h-24 lg:w-20 lg:h-20 block"
        >
          <Thumbnail
            thumbnail={item.thumbnail}
            images={item.variant?.product?.images}
            size="square"
          />
        </LocalizedClientLink>
      </div>

      <div className="mb-4 lg:mb-0 flex-1 min-w-0">
        <Text
          className="text-base-regular text-ui-fg-base mb-1"
          data-testid="product-title"
        >
          {item.product_title}
        </Text>
        <LineItemOptions variant={item.variant} data-testid="product-variant" />
      </div>

      <div className="mb-4 lg:mb-0">
        <div className="flex gap-3 items-center">
          <DeleteButton id={item.id} data-testid="product-delete-button" />
          <CartItemSelect
            value={item.quantity}
            onChange={(value) => changeQuantity(parseInt(value.target.value))}
            className="w-16 h-10"
            data-testid="product-select-button"
          >
            {Array.from(
              {
                length: Math.min(maxQuantity, 10),
              },
              (_, i) => (
                <option value={i + 1} key={i}>
                  {i + 1}
                </option>
              )
            )}
            <option value={1} key={1}>
              1
            </option>
          </CartItemSelect>
          {updating && <Spinner />}
        </div>
        <ErrorMessage error={error} data-testid="product-error-message" />
      </div>

      <div className="hidden lg:flex items-center">
        <LineItemUnitPrice
          item={item}
          style="tight"
          currencyCode={currencyCode}
        />
      </div>

      <div className="lg:text-right">
        <LineItemPrice
          item={item}
          style="tight"
          currencyCode={currencyCode}
        />
      </div>
    </div>
  )
}

export default Item
