import { gql } from "@apollo/client"

const associateCustomerWithCheckoutMutation = /* GraphQl */ gql`
mutation associateCustomerWithCheckout($checkoutId: ID!, $customerAccessToken: String!) {
    checkoutCustomerAssociateV2(checkoutId: $checkoutId, customerAccessToken: $customerAccessToken) {
      checkout {
        id
      }
      checkoutUserErrors {
        code
        field
        message
      }
      customer {
        id
      }
    }
  }
`
export default associateCustomerWithCheckoutMutation
