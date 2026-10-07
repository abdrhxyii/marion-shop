"use client"

import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { X } from "lucide-react"

const CartDropdown = ({
  cart: cartState,
  hideButton = false,
  customTrigger,
}: {
  cart?: HttpTypes.StoreCart | null
  hideButton?: boolean
  customTrigger?: React.ReactNode
}) => {
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>(
    undefined
  )

  const totalItems =
    cartState?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  const subtotal = cartState?.subtotal ?? 0
  const itemRef = useRef<number>(totalItems || 0)

  const openDrawer = () => {
    setDrawerVisible(true)
    setTimeout(() => setDrawerOpen(true), 20)
  }

  const closeDrawer = () => {
    setDrawerOpen(false)
    setTimeout(() => setDrawerVisible(false), 500)
  }

  const timedOpen = () => {
    openDrawer()

    const timer = setTimeout(closeDrawer, 5000)

    setActiveTimer(timer)
  }

  const openAndCancel = () => {
    if (activeTimer) {
      clearTimeout(activeTimer)
    }

    openDrawer()
  }

  // Clean up the timer when the component unmounts
  useEffect(() => {
    return () => {
      if (activeTimer) {
        clearTimeout(activeTimer)
      }
    }
  }, [activeTimer])

  const pathname = usePathname()

  // Auto-open when cart items change (and not on cart page)
  useEffect(() => {
    if (itemRef.current !== totalItems && !pathname.includes("/cart")) {
      timedOpen()
      itemRef.current = totalItems
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalItems, pathname])

  // Close drawer when navigating
  useEffect(() => {
    if (drawerVisible) {
      closeDrawer()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <>
      {!hideButton && (
        <button
          onClick={openAndCancel}
          className="relative"
          data-testid="nav-cart-link"
        >
          {customTrigger || `Cart (${totalItems})`}
        </button>
      )}
      {customTrigger && (
        <div onClick={openAndCancel} className="cursor-pointer">
          {customTrigger}
        </div>
      )}

      {drawerVisible && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop overlay */}
          <div
            className={`fixed inset-0 bg-black/50 transition-opacity duration-500 ${
              drawerOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={closeDrawer}
          />

          {/* Sidebar panel */}
          <div
            className={`fixed right-0 top-0 h-full w-full max-w-lg transform bg-white shadow-xl transition-transform duration-500 ease-in-out flex flex-col ${
              drawerOpen ? "translate-x-0" : "translate-x-full"
            }`}
            data-testid="cart-sidebar"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-xl font-semibold">Cart</h3>
              <button
                onClick={closeDrawer}
                className="p-2 hover:bg-gray-100 transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Content */}
            <div className="flex-1 overflow-y-auto">
              {cartState && cartState.items?.length ? (
                <div className="px-4 py-6 space-y-6">
                  {cartState.items
                    .sort((a, b) => {
                      return (a.created_at ?? "") > (b.created_at ?? "")
                        ? -1
                        : 1
                    })
                    .map((item) => (
                      <div
                        className="grid grid-cols-[100px_1fr] gap-4 pb-6 border-b border-gray-100"
                        key={item.id}
                        data-testid="cart-item"
                      >
                        <LocalizedClientLink
                          href={`/products/${item.product_handle}`}
                          className="w-24 h-24"
                          onClick={closeDrawer}
                        >
                          <Thumbnail
                            thumbnail={item.thumbnail}
                            images={item.variant?.product?.images}
                            size="square"
                          />
                        </LocalizedClientLink>
                        <div className="flex flex-col justify-between flex-1">
                          <div className="flex flex-col flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex flex-col flex-1 min-w-0">
                                <h3 className="text-base font-medium overflow-hidden text-ellipsis mb-1">
                                  <LocalizedClientLink
                                    href={`/products/${item.product_handle}`}
                                    data-testid="product-link"
                                    onClick={closeDrawer}
                                    className="hover:underline"
                                  >
                                    {item.title}
                                  </LocalizedClientLink>
                                </h3>
                                <LineItemOptions
                                  variant={item.variant}
                                  data-testid="cart-item-variant"
                                  data-value={item.variant}
                                />
                                <span
                                  className="text-sm text-gray-600 mt-1"
                                  data-testid="cart-item-quantity"
                                  data-value={item.quantity}
                                >
                                  Quantity: {item.quantity}
                                </span>
                              </div>
                              <div className="flex flex-col items-end">
                                <LineItemPrice
                                  item={item}
                                  style="tight"
                                  currencyCode={cartState.currency_code}
                                />
                                <DeleteButton
                                  id={item.id}
                                  className="mt-2 text-sm text-gray-600 hover:text-black"
                                  data-testid="cart-item-remove-button"
                                >
                                  Remove
                                </DeleteButton>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full px-4 py-16">
                  <p className="text-lg font-semibold text-gray-900 mb-2">
                    Your shopping bag is empty.
                  </p>
                  <p className="text-base text-gray-600 mb-8 text-center">
                    Continue shopping to add items to your bag.
                  </p>
                  <LocalizedClientLink href="/store">
                    <Button 
                      onClick={closeDrawer}
                      className="h-10 px-6 rounded-none bg-black text-white hover:bg-black transition-colors"
                    >
                      Explore products
                    </Button>
                  </LocalizedClientLink>
                </div>
              )}
            </div>

            {/* Footer */}
            {cartState && cartState.items?.length ? (
              <div className="border-t border-gray-200 px-4 py-6 space-y-4 bg-white">
                <div className="flex items-center justify-between text-base">
                  <span className="font-semibold">
                    Subtotal{" "}
                    <span className="font-normal text-gray-600">
                      (excl. taxes)
                    </span>
                  </span>
                  <span
                    className="font-semibold"
                    data-testid="cart-subtotal"
                    data-value={subtotal}
                  >
                    {convertToLocale({
                      amount: subtotal,
                      currency_code: cartState.currency_code,
                    })}
                  </span>
                </div>
                <LocalizedClientLink href="/cart" className="block">
                  <Button
                    className="w-full rounded-none py-3"
                    size="large"
                    onClick={closeDrawer}
                    data-testid="go-to-cart-button"
                  >
                    Go to cart
                  </Button>
                </LocalizedClientLink>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </>
  )
}

export default CartDropdown
