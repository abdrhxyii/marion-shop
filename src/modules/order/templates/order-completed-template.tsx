import { Heading } from "@medusajs/ui"
import { cookies as nextCookies } from "next/headers"

import CartTotals from "@modules/common/components/cart-totals"
import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OnboardingCta from "@modules/order/components/onboarding-cta"
import OrderDetails from "@modules/order/components/order-details"
import ShippingDetails from "@modules/order/components/shipping-details"
import PaymentDetails from "@modules/order/components/payment-details"
import { HttpTypes } from "@medusajs/types"

type OrderCompletedTemplateProps = {
  order: HttpTypes.StoreOrder
}

export default async function OrderCompletedTemplate({
  order,
}: OrderCompletedTemplateProps) {
  const cookies = await nextCookies()

  const isOnboarding = cookies.get("_medusa_onboarding")?.value === "true"

  return (
    <div className="py-16 min-h-[calc(100vh-64px)]">
      <div className="flex flex-col items-center gap-y-12 max-w-5xl mx-auto px-8 w-full">
        {isOnboarding && <OnboardingCta orderId={order.id} />}
        <div
          className="flex flex-col gap-8 w-full"
          data-testid="order-complete-container"
        >
          <div className="flex flex-col gap-3">
            <Heading
              level="h1"
              className="text-4xl-semi text-ui-fg-base"
            >
              Thank you!
            </Heading>
            <p className="text-lg-regular text-ui-fg-subtle">
              Your order was placed successfully.
            </p>
          </div>
          
          <OrderDetails order={order} />
          
          <div className="border border-gray-200 bg-white p-8 shadow-sm">
            <Heading level="h2" className="text-2xl-semi mb-6">
              Order Summary
            </Heading>
            <Items order={order} />
            <div className="mt-6 pt-6 border-t border-gray-200">
              <CartTotals totals={order} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ShippingDetails order={order} />
            <PaymentDetails order={order} />
          </div>

          <Help />
        </div>
      </div>
    </div>
  )
}
