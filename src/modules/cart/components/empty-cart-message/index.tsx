import { Heading, Text } from "@medusajs/ui"

import InteractiveLink from "@modules/common/components/interactive-link"

const EmptyCartMessage = () => {
  return (
    <div className="py-32 flex flex-col justify-center items-center text-center" data-testid="empty-cart-message">
      <Heading
        level="h1"
        className="text-3xl-semi mb-4"
      >
        Cart
      </Heading>
      <Text className="text-base-regular text-ui-fg-subtle mb-8 max-w-md">
        You don&apos;t have anything in your cart. Let&apos;s change that, use
        the link below to start browsing our products.
      </Text>
      <InteractiveLink href="/store">Explore products</InteractiveLink>
    </div>
  )
}

export default EmptyCartMessage
