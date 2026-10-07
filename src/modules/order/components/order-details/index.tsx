import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"

type OrderDetailsProps = {
  order: HttpTypes.StoreOrder
  showStatus?: boolean
}

const OrderDetails = ({ order, showStatus }: OrderDetailsProps) => {
  const formatStatus = (str: string) => {
    const formatted = str.split("_").join(" ")

    return formatted.slice(0, 1).toUpperCase() + formatted.slice(1)
  }

  return (
    <div className="border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center justify-between">
          <Heading level="h2" className="text-2xl-semi">
            Order Details
          </Heading>
          <Text className="text-lg-regular text-ui-fg-base font-semibold">
            #{order.display_id}
          </Text>
        </div>
        
        <div className="flex flex-col gap-3">
          <Text className="text-base-regular text-ui-fg-subtle">
            We have sent the order confirmation details to{" "}
            <span
              className="text-ui-fg-base font-semibold"
              data-testid="order-email"
            >
              {order.email}
            </span>
            .
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-base-regular text-ui-fg-subtle">
          <div>
            <Text className="text-base-semi text-ui-fg-base mb-1">Order Date</Text>
            <Text data-testid="order-date">
              {new Date(order.created_at).toLocaleDateString()}
            </Text>
          </div>
          {showStatus && (
            <>
              <div>
                <Text className="text-base-semi text-ui-fg-base mb-1">Order Status</Text>
                <Text className="capitalize text-ui-fg-base" data-testid="order-status">
                  {formatStatus(order.fulfillment_status)}
                </Text>
              </div>
              <div>
                <Text className="text-base-semi text-ui-fg-base mb-1">Payment Status</Text>
                <Text className="capitalize text-ui-fg-base" data-testid="order-payment-status">
                  {formatStatus(order.payment_status)}
                </Text>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default OrderDetails
