import gql from 'graphql-tag';
import { checkoutDetailsFragment } from '../queries/get-checkout-query';

const checkoutLineItemRemoveMutation = /* GraphQL */ gql`
  mutation checkoutLineItemRemove($checkoutId: ID!, $lineItemIds: [ID!]!) {
    checkoutLineItemsRemove(
      checkoutId: $checkoutId
      lineItemIds: $lineItemIds
    ) {
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
export default checkoutLineItemRemoveMutation;
