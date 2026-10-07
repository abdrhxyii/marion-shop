import { retrieveCart } from "@lib/data/cart"
import NewNavClient from "./new-nav-client"

export default async function NewNav() {
  const cart = await retrieveCart().catch(() => null)

  return <NewNavClient cart={cart} />
}

