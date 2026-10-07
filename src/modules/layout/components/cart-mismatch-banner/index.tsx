"use client"

import { transferCart } from "@lib/data/customer"
import { ExclamationCircleSolid } from "@medusajs/icons"
import { StoreCart, StoreCustomer } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import { useState } from "react"

function CartMismatchBanner(props: {
  customer: StoreCustomer
  cart: StoreCart
}) {
  const { customer, cart } = props
  const [isPending, setIsPending] = useState(false)

  if (!customer || !!cart.customer_id) {
    return
  }

  const handleSubmit = async () => {
    try {
      setIsPending(true)
      await transferCart()
    } catch {
      setIsPending(false)
    }
  }

  return (
    <div className="w-full bg-gray-100 border-b border-gray-200 px-5 lg:px-8 py-4">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 lg:gap-4">
        <div className="flex items-center gap-2">
          <ExclamationCircleSolid className="w-5 h-5 text-black flex-shrink-0" />
          <p className="text-base-regular text-black">
            Something went wrong when we tried to transfer your cart
          </p>
        </div>
        <Button
          variant="primary"
          className="h-10 px-6 rounded-none bg-black text-white hover:bg-black"
          disabled={isPending}
          onClick={handleSubmit}
          isLoading={isPending}
        >
          Transfer cart
        </Button>
      </div>
    </div>
  )
}

export default CartMismatchBanner
