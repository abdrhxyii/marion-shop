import { Heading } from "@medusajs/ui"

import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import DiscountCode from "@modules/checkout/components/discount-code"
import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"

const CheckoutSummary = ({ cart }: { cart: any }) => {
  return (
    <div className="sticky top-20 flex flex-col gap-y-6">
      <div className="w-full border border-gray-200 p-6 flex flex-col">
        <Heading
          level="h2"
          className="text-2xl-semi mb-6"
        >
          In your Cart
        </Heading>
        <CartTotals totals={cart} />
        <Divider className="my-6" />
        <ItemsPreviewTemplate cart={cart} />
        <div className="mt-6">
          <DiscountCode cart={cart} />
        </div>
      </div>
    </div>
  )
}

export default CheckoutSummary
