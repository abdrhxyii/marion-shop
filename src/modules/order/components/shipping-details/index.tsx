import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"

type ShippingDetailsProps = {
  order: HttpTypes.StoreOrder
}

const ShippingDetails = ({ order }: ShippingDetailsProps) => {
  return (
    <div className="border border-gray-200 bg-white p-6 shadow-sm">
      <Heading level="h2" className="text-2xl-semi mb-6">
        Delivery
      </Heading>
      <div className="flex flex-col gap-6">
        <div
          className="flex flex-col"
          data-testid="shipping-address-summary"
        >
          <Text className="text-base-semi text-ui-fg-base mb-3 uppercase tracking-wide">
            Shipping Address
          </Text>
          <div className="flex flex-col gap-1.5">
            <Text className="text-base-regular text-ui-fg-base font-medium">
              {order.shipping_address?.first_name}{" "}
              {order.shipping_address?.last_name}
            </Text>
            <Text className="text-base-regular text-ui-fg-subtle">
              {order.shipping_address?.address_1}
              {order.shipping_address?.address_2 && (
                <>, {order.shipping_address.address_2}</>
              )}
            </Text>
            <Text className="text-base-regular text-ui-fg-subtle">
              {order.shipping_address?.postal_code},{" "}
              {order.shipping_address?.city}
            </Text>
            <Text className="text-base-regular text-ui-fg-subtle font-medium">
              {order.shipping_address?.country_code?.toUpperCase()}
            </Text>
          </div>
        </div>

        <div
          className="flex flex-col"
          data-testid="shipping-contact-summary"
        >
          <Text className="text-base-semi text-ui-fg-base mb-3 uppercase tracking-wide">
            Contact
          </Text>
          <div className="flex flex-col gap-1.5">
            {order.shipping_address?.phone && (
              <Text className="text-base-regular text-ui-fg-subtle">
                {order.shipping_address.phone}
              </Text>
            )}
            <Text className="text-base-regular text-ui-fg-subtle">
              {order.email}
            </Text>
          </div>
        </div>

        <div
          className="flex flex-col"
          data-testid="shipping-method-summary"
        >
          <Text className="text-base-semi text-ui-fg-base mb-3 uppercase tracking-wide">
            Delivery Method
          </Text>
          <Text className="text-base-regular text-ui-fg-base font-medium">
            {(order as any).shipping_methods[0]?.name}
          </Text>
          <Text className="text-lg-regular text-ui-fg-base font-semibold mt-1">
            {convertToLocale({
              amount: order.shipping_methods?.[0].total ?? 0,
              currency_code: order.currency_code,
            })}
          </Text>
        </div>
      </div>
    </div>
  )
}

export default ShippingDetails
