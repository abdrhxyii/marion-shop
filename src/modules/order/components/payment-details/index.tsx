import { Container, Heading, Text } from "@medusajs/ui"

import { isStripeLike, paymentInfoMap } from "@lib/constants"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type PaymentDetailsProps = {
  order: HttpTypes.StoreOrder
}

const PaymentDetails = ({ order }: PaymentDetailsProps) => {
  const payment = order.payment_collections?.[0].payments?.[0]

  return (
    <div className="border border-gray-200 bg-white p-6 shadow-sm">
      <Heading level="h2" className="text-2xl-semi mb-6">
        Payment
      </Heading>
      {payment && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col">
            <Text className="text-base-semi text-ui-fg-base mb-3 uppercase tracking-wide">
              Payment Method
            </Text>
            <Text
              className="text-base-regular text-ui-fg-base font-medium"
              data-testid="payment-method"
            >
              {paymentInfoMap[payment.provider_id].title}
            </Text>
          </div>
          <div className="flex flex-col">
            <Text className="text-base-semi text-ui-fg-base mb-3 uppercase tracking-wide">
              Payment Details
            </Text>
            <div className="flex items-center gap-3">
              <Container className="flex items-center justify-center h-10 w-10 p-2 bg-gray-100 border border-gray-200">
                {paymentInfoMap[payment.provider_id].icon}
              </Container>
              <div className="flex flex-col">
                <Text
                  className="text-base-regular text-ui-fg-base font-medium"
                  data-testid="payment-amount"
                >
                  {isStripeLike(payment.provider_id) && payment.data?.card_last4
                    ? `**** **** **** ${payment.data.card_last4}`
                    : convertToLocale({
                        amount: payment.amount,
                        currency_code: order.currency_code,
                      })}
                </Text>
                {!isStripeLike(payment.provider_id) && (
                  <Text className="text-sm-regular text-ui-fg-subtle mt-1">
                    Paid on {new Date(payment.created_at ?? "").toLocaleDateString()}
                  </Text>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PaymentDetails
