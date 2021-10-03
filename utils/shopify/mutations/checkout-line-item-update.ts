import { gql } from '@apollo/client'
import { checkoutDetailsFragment } from '../queries/get-checkout-query'

const checkoutLineItemUpdateMutation = /* GraphQL */ gql`
  mutation checkoutLineItemUpdate(
    $checkoutId: ID!
    $lineItems: [CheckoutLineItemUpdateInput!]!
  ) {
    checkoutLineItemsUpdate(checkoutId: $checkoutId, lineItems: $lineItems) {
      checkoutUserErrors {
        code
        field
        message
      }
      checkout {
        ...checkoutDetails
      }
    }
  }

  ${checkoutDetailsFragment}
`
export default checkoutLineItemUpdateMutation
