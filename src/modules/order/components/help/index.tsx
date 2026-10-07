import { Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import React from "react"

const Help = () => {
  return (
    <div className="border border-gray-200 bg-white p-6 shadow-sm">
      <Heading level="h2" className="text-xl-semi mb-4">
        Need help?
      </Heading>
      <div className="flex flex-col gap-3">
        <LocalizedClientLink
          href="/contact"
          className="text-base-regular text-ui-fg-interactive hover:text-ui-fg-interactive-hover hover:underline"
        >
          Contact
        </LocalizedClientLink>
        <LocalizedClientLink
          href="/contact"
          className="text-base-regular text-ui-fg-interactive hover:text-ui-fg-interactive-hover hover:underline"
        >
          Returns & Exchanges
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default Help
