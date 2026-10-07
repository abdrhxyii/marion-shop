"use client"

import { Badge, Text } from "@medusajs/ui"
import React from "react"

import { applyPromotions } from "@lib/data/cart"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import Trash from "@modules/common/icons/trash"
import ErrorMessage from "../error-message"
import { SubmitButton } from "../submit-button"

type DiscountCodeProps = {
  cart: HttpTypes.StoreCart & {
    promotions: HttpTypes.StorePromotion[]
  }
}

const DiscountCode: React.FC<DiscountCodeProps> = ({ cart }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState("")

  const { promotions = [] } = cart
  const removePromotionCode = async (code: string) => {
    const validPromotions = promotions.filter(
      (promotion) => promotion.code !== code
    )

    await applyPromotions(
      validPromotions.filter((p) => p.code !== undefined).map((p) => p.code!)
    )
  }

  const addPromotionCode = async (formData: FormData) => {
    setErrorMessage("")

    const code = formData.get("code")
    if (!code) {
      return
    }
    const input = document.getElementById("promotion-input") as HTMLInputElement
    const codes = promotions
      .filter((p) => p.code !== undefined)
      .map((p) => p.code!)
    codes.push(code.toString())

    try {
      await applyPromotions(codes)
    } catch (e: any) {
      setErrorMessage(e.message)
    }

    if (input) {
      input.value = ""
    }
  }

  return (
    <div className="w-full flex flex-col gap-y-4">
      <form action={(a) => addPromotionCode(a)} className="w-full">
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="text-base-regular text-ui-fg-interactive hover:text-ui-fg-interactive-hover transition-colors"
          data-testid="add-discount-button"
        >
          Add Promotion Code(s)
        </button>

        {isOpen && (
          <div className="flex flex-col gap-y-3 mt-3">
            <div className="flex w-full gap-x-2">
              <input
                className="flex-1 h-11 px-4 border border-gray-200 focus:outline-none focus:ring-0 focus:border-black transition-colors"
                id="promotion-input"
                name="code"
                type="text"
                placeholder="Enter code"
                autoFocus={false}
                data-testid="discount-input"
              />
              <SubmitButton
                variant="primary"
                className="h-11 px-6 rounded-none bg-black text-white hover:bg-black"
                data-testid="discount-apply-button"
              >
                Apply
              </SubmitButton>
            </div>

            <ErrorMessage
              error={errorMessage}
              data-testid="discount-error-message"
            />
          </div>
        )}
      </form>

      {promotions.length > 0 && (
        <div className="flex flex-col gap-y-3">
          <Text className="text-base-semi">
            Promotion(s) applied:
          </Text>

          <div className="flex flex-col gap-y-2">
            {promotions.map((promotion) => {
              return (
                <div
                  key={promotion.id}
                  className="flex items-center justify-between gap-x-3"
                  data-testid="discount-row"
                >
                  <div className="flex items-center gap-x-2 flex-1 min-w-0">
                    <Badge
                      color={promotion.is_automatic ? "green" : "grey"}
                      size="small"
                      className="flex-shrink-0"
                    >
                      {promotion.code}
                    </Badge>
                    {promotion.application_method?.value !== undefined &&
                      promotion.application_method.currency_code !==
                        undefined && (
                        <Text className="text-base-regular text-ui-fg-subtle whitespace-nowrap">
                          (
                          {promotion.application_method.type === "percentage"
                            ? `${promotion.application_method.value}%`
                            : convertToLocale({
                                amount: +promotion.application_method.value,
                                currency_code:
                                  promotion.application_method.currency_code,
                              })}
                          )
                        </Text>
                      )}
                  </div>
                  {!promotion.is_automatic && (
                    <button
                      className="flex items-center justify-center w-6 h-6 hover:bg-gray-100 transition-colors flex-shrink-0"
                      onClick={() => {
                        if (!promotion.code) {
                          return
                        }

                        removePromotionCode(promotion.code)
                      }}
                      data-testid="remove-discount-button"
                      aria-label="Remove discount code"
                    >
                      <Trash size={14} className="text-ui-fg-subtle" />
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default DiscountCode
