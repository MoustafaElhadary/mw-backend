import { gql, useQuery } from '@apollo/client';
import { RadioGroup } from '@headlessui/react';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
    GetProduct,
    GetProduct_productByHandle_variants_edges_node,
    GetProduct_productByHandle_variants_edges_node_selectedOptions
} from 'types/generated/GetProduct';
import { Colors } from 'utils/Colors';
import { classNames } from 'utils/helpers';

const PRODUCT = gql`
  query GetProduct($handle: String!) {
    productByHandle(handle: $handle) {
      handle
      id
      title
      availableForSale
      compareAtPriceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      createdAt
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      descriptionHtml
      images(first: 100) {
        edges {
          node {
            transformedSrc
            altText
            id
          }
        }
      }
      variants(first: 100) {
        edges {
          node {
            title
            sku
            availableForSale
            id
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  }
`;

export default function Product() {
  const router = useRouter();

  const { handle } = router.query;

  console.log({ handle });
  const { loading, error, data } = useQuery<GetProduct>(PRODUCT, {
    variables: { handle },
  });
  const [option, setOption] =
    useState<GetProduct_productByHandle_variants_edges_node | undefined>();
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [selectedSize, setSelectedSize] = useState<string | undefined>();

  console.log({ loading, data, error });

  useEffect(() => {
    setOption(data?.productByHandle.variants.edges[0].node);
  }, []);
  if (loading) return <> Loading.... </>;

  if (error) return <> error.... </>;

  if (!data) return <> no data.... </>;

  const product = data.productByHandle;


  let options: string[] = [];
  options = _.uniq(
    options.concat.apply(
      [],
      product.variants.edges.map((p) =>
        p.node.selectedOptions.map((o) => o.name)
      )
    )
  );

  let attrs: GetProduct_productByHandle_variants_edges_node_selectedOptions[] = [];
  attrs = _.uniq(
    attrs.concat.apply(
      [],
      product.variants.edges.map((p) => p.node.selectedOptions)
    )
  );

  const grouped = _.groupBy(attrs, 'name');
  const colors =grouped.Color.map((g)=> g.value);
  const sizes =grouped.Size.map((g)=>g.value);

  console.log({ product, options, grouped, attrs, option,colors,sizes });
  return (
    <div>
      <form>
        {/* Color picker */}
        <div>
          <h2 className="text-sm font-medium text-gray-900">Color</h2>

          <RadioGroup
            value={selectedColor}
            onChange={setSelectedColor}
            className="mt-2"
          >
            <RadioGroup.Label className="sr-only">
              Choose a color
            </RadioGroup.Label>
            <div className="flex items-center space-x-3">
              {colors.map((color) => (
                <RadioGroup.Option
                  key={color}
                  value={color}
                  className={({ active, checked }) =>
                    classNames(
                      'ring-gray-900',
                      active && checked ? 'ring ring-offset-1' : '',
                      !active && checked ? 'ring-2' : '',
                      '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none'
                    )
                  }
                >
                  <RadioGroup.Label as="p" className="sr-only">
                    {color}
                  </RadioGroup.Label>
                  <span
                    aria-hidden="true"
                    className={classNames(
                        Colors[color as keyof Colors || 0] ,
                      'h-8 w-8 border border-black border-opacity-10 rounded-full'
                    )}
                  />
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>

        {/* Size picker */}
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-gray-900">Size</h2>
            <a
              href="#"
              className="text-sm font-medium text-black hover:text-black"
            >
              See sizing chart
            </a>
          </div>

          <RadioGroup
            value={selectedSize}
            onChange={setSelectedSize}
            className="mt-2"
          >
            <RadioGroup.Label className="sr-only">
              Choose a size
            </RadioGroup.Label>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
              {sizes.map((size) => (
                <RadioGroup.Option
                  key={size}
                  value={size}
                  className={({ active, checked }) =>
                    classNames(
                    //   size.inStock
                    //     ? 'cursor-pointer focus:outline-none'
                    //     : 'opacity-25 cursor-not-allowed',
                    //   active ? 'ring-2 ring-offset-2 ring-black' : '',
                      checked
                        ? 'bg-black border-transparent text-white hover:bg-black'
                        : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50',
                      'border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1'
                    )
                  }
                //   disabled={!size.inStock}
                >
                  <RadioGroup.Label as="p">{size}</RadioGroup.Label>
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>

        <button
          type="submit"
          className="mt-8 w-full bg-black border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          Add to cart
        </button>
      </form>
      {options.map((o) => (
        <li key={o}>
          {o}
          <br />
        </li>
      ))}
      {JSON.stringify(option)}
    </div>
  );
}
