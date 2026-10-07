"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { addToCart } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { isEqual } from "lodash"

type ProductAddToCartProps = {
  product: HttpTypes.StoreProduct
  selectedOptions: Record<string, string>
}

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt: any) => {
    acc[varopt.option_id] = varopt.value
    return acc
  }, {})
}

export default function ProductAddToCart({
  product,
  selectedOptions,
}: ProductAddToCartProps) {
  const [isAdding, setIsAdding] = useState(false)
  const countryCode = useParams().countryCode as string

  // Find the selected variant based on options
  const selectedVariant = product.variants?.find((v) => {
    const variantOptions = optionsAsKeymap(v.options)
    return isEqual(variantOptions, selectedOptions)
  })

  // Check if variant is in stock
  const inStock = selectedVariant
    ? !selectedVariant.manage_inventory ||
      selectedVariant.allow_backorder ||
      (selectedVariant.inventory_quantity || 0) > 0
    : false

  // Check if all required options are selected
  const allOptionsSelected =
    product.options?.every((opt) => selectedOptions[opt.id]) ?? true

  const handleAddToCart = async () => {
    if (!selectedVariant?.id || !inStock || isAdding) return

    setIsAdding(true)
    try {
      await addToCart({
        variantId: selectedVariant.id,
        quantity: 1,
        countryCode,
      })
    } catch (error) {
      console.error("Failed to add to cart:", error)
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <button
      onClick={handleAddToCart}
      className="w-full py-4 px-6 bg-black text-white transition-colors"
      style={{
        fontSize: '14px',
        fontWeight: 500,
        letterSpacing: '-0.28px',
        lineHeight: '21px'
      }}
    >
      {isAdding
        ? "Adding..."
        : !allOptionsSelected
        ? "Select options"
        : !inStock
        ? "Out of stock"
        : "Add to Cart"}
    </button>
  )
}

