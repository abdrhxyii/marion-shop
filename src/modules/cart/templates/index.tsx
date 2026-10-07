import ItemsTemplate from "./items"
import Summary from "./summary"
import EmptyCartMessage from "../components/empty-cart-message"
import SignInPrompt from "../components/sign-in-prompt"
import Divider from "@modules/common/components/divider"
import { HttpTypes } from "@medusajs/types"

const CartTemplate = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  return (
    <div className="py-16 pl-8 pr-8" data-testid="cart-container">
      {cart?.items?.length ? (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-x-32">
          <div className="flex flex-col gap-y-8">
            {!customer && (
              <>
                <SignInPrompt />
                <Divider />
              </>
            )}
            <ItemsTemplate cart={cart} />
          </div>
          <div className="relative">
            <div className="flex flex-col sticky top-20">
              {cart && cart.region && (
                <Summary cart={cart as any} />
              )}
            </div>
          </div>
        </div>
      ) : (
        <EmptyCartMessage />
      )}
    </div>
  )
}

export default CartTemplate
