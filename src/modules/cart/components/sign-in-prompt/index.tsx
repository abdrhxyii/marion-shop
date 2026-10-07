import { Button, Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = () => {
  return (
    <div className="bg-gray-10 px-4 py-3 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
      <div className="flex flex-col gap-1">
        <Heading level="h2" className="text-sm font-semibold">
          Already have an account?
        </Heading>
        <Text className="text-sm text-ui-fg-subtle">
          Sign in for a better experience.
        </Text>
      </div>
      <LocalizedClientLink href="/account">
        <Button variant="secondary" className="h-9 px-5 rounded-none border border-black hover:bg-black hover:text-white transition-colors text-sm" data-testid="sign-in-button">
          Sign in
        </Button>
      </LocalizedClientLink>
    </div>
  )
}

export default SignInPrompt
