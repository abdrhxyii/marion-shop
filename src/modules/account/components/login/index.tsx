import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { login } from "@lib/data/customer"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import Input from "@modules/common/components/input"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useActionState } from "react"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(login, null)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen" data-testid="login-page">
      <div className="lg:order-1 order-2 relative h-[500px] lg:h-full lg:min-h-screen mx-4 lg:mx-0 lg:w-full">
        <Image
          src="/Images/hero14.webp"
          alt="Login"
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
          <h1 className="text-3xl-semi mb-4">Welcome back</h1>
          <p className="text-base-regular text-ui-fg-subtle mb-8">
            Sign in to access an enhanced shopping experience.
          </p>
          <form className="w-full" action={formAction}>
            <div className="flex flex-col w-full gap-y-4">
              <Input
                label="Email"
                name="email"
                type="email"
                title="Enter a valid email address."
                autoComplete="email"
                required
                data-testid="email-input"
              />
              <Input
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                data-testid="password-input"
              />
            </div>
            <ErrorMessage error={message} data-testid="login-error-message" />
            <SubmitButton data-testid="sign-in-button" className="w-full mt-6 h-12 rounded-none bg-black text-white hover:bg-black">
              Sign in
            </SubmitButton>
          </form>
          <span className="text-center text-base-regular text-ui-fg-subtle mt-6">
            Not a member?{" "}
            <button
              onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
              className="underline text-ui-fg-interactive hover:text-ui-fg-interactive-hover transition-colors"
              data-testid="register-button"
            >
              Join us
            </button>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Login
