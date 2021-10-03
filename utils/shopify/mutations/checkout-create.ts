import { gql } from '@apollo/client';
import { checkoutDetailsFragment } from '../queries/get-checkout-query';

const checkoutCreateMutation = /* GraphQL */ gql`
  mutation checkoutCreate($input: CheckoutCreateInput = {}) {
    checkoutCreate(input: $input) {
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
export default checkoutCreateMutation;
