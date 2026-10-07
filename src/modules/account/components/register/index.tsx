"use client"

import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { useActionState } from "react"
import Input from "@modules/common/components/input"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { signup } from "@lib/data/customer"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(signup, null)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen" data-testid="register-page">
      <div className="lg:order-1 order-2 relative h-[500px] lg:h-full lg:min-h-screen mx-4 lg:mx-0 lg:w-full">
        <Image
          src="/Images/hero14.webp"
          alt="Sign up"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute top-3 left-3 z-10 hidden lg:block">
          <LocalizedClientLink
            href="/"
            className="bg-white px-4 py-2 flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-base-regular">Back to Homepage</span>
          </LocalizedClientLink>
        </div>
      </div>
      <div className="lg:order-2 order-1 flex items-center justify-center p-8 lg:p-16">
        <div className="w-full max-w-md flex flex-col">
          <h1 className="text-3xl-semi mb-4">
            Create an account
          </h1>
          <p className="text-base-regular text-ui-fg-subtle mb-8">
            Create your account profile and get access to an enhanced shopping experience.
          </p>
          <form className="w-full flex flex-col" action={formAction}>
            <div className="flex flex-col w-full gap-y-4">
              <Input
                label="First name"
                name="first_name"
                required
                autoComplete="given-name"
                data-testid="first-name-input"
              />
              <Input
                label="Last name"
                name="last_name"
                required
                autoComplete="family-name"
                data-testid="last-name-input"
              />
              <Input
                label="Email"
                name="email"
                required
                type="email"
                autoComplete="email"
                data-testid="email-input"
              />
              <Input
                label="Phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                data-testid="phone-input"
              />
              <Input
                label="Password"
                name="password"
                required
                type="password"
                autoComplete="new-password"
                data-testid="password-input"
              />
            </div>
            <ErrorMessage error={message} data-testid="register-error" />
            <span className="text-base-regular text-ui-fg-subtle mt-6">
              By creating an account, you agree to MARION&apos;s{" "}
              <LocalizedClientLink
                href="/content/privacy-policy"
                className="underline text-ui-fg-interactive hover:text-ui-fg-interactive-hover transition-colors"
              >
                Privacy Policy
              </LocalizedClientLink>{" "}
              and{" "}
              <LocalizedClientLink
                href="/content/terms-of-use"
                className="underline text-ui-fg-interactive hover:text-ui-fg-interactive-hover transition-colors"
              >
                Terms of Use
              </LocalizedClientLink>
              .
            </span>
            <SubmitButton className="w-full mt-6 h-12 rounded-none bg-black text-white hover:bg-black" data-testid="register-button">
              Join
            </SubmitButton>
          </form>
          <span className="text-center text-base-regular text-ui-fg-subtle mt-6">
            Already a member?{" "}
            <button
              onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
              className="underline text-ui-fg-interactive hover:text-ui-fg-interactive-hover transition-colors"
            >
              Sign in
            </button>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Register
