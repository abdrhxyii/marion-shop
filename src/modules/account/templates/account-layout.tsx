import React from "react"

import UnderlineLink from "@modules/common/components/interactive-link"

import AccountNav from "../components/account-nav"
import { HttpTypes } from "@medusajs/types"

interface AccountLayoutProps {
  customer: HttpTypes.StoreCustomer | null
  children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  customer,
  children,
}) => {
  const isLoginPage = !customer

  return (
    <div className="flex-1" data-testid="account-page">
      {isLoginPage ? (
        <div>{children}</div>
      ) : (
        <div className="py-8 lg:py-16 px-4 lg:pl-8 lg:pr-8">
          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
            <div><AccountNav customer={customer} /></div>
            <div className="flex-1">{children}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AccountLayout
