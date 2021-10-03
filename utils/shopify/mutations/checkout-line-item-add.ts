import { gql } from '@apollo/client';
import { checkoutDetailsFragment } from '../queries/get-checkout-query';

const checkoutLineItemAddMutation = /* GraphQL */ gql`
  mutation checkoutLineItemAdd(
    $checkoutId: ID!
    $lineItems: [CheckoutLineItemInput!]!
  ) {
    checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
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
`;
export default checkoutLineItemAddMutation;
