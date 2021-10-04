/* eslint-disable @next/next/no-img-element */
import { useQuery } from '@apollo/client';
import React, { ReactElement } from 'react';
import { getProductQuery } from 'utils/shopify/queries';

export default function OtherApparel({ handle, count }): ReactElement {
  const { data, error, loading } = useQuery<GetProductBySlugQuery>(
    getProductQuery,
    {
      variables: { slug: handle },
    }
  );
  console.log({ data, error, loading, Test: 'test' });
  const product = data?.productByHandle;
  if (!data) return <></>;

  return (
    <li>
      <div className="space-y-4">
        <div className="aspect-w-3 aspect-h-2">
          <img
            className="object-cover shadow-lg rounded-lg w-96 h-96 relative mx-auto"
            src={product.images.edges[0].node.originalSrc}
            alt={product.images.edges[0].node.altText}
          />
        </div>

        <div className="space-y-2">
          <div className="text-lg leading-6 font-bold space-y-1">
            <h3 className="text-center">{product.title} &#8594;</h3>
          </div>
          <div className="text-lg leading-6 font-light space-y-1">
            <h3 className="text-center">viewed {count} times</h3>
          </div>
        </div>
      </div>
    </li>
  );
}
