/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from '@apollo/client';
import { Dialog, RadioGroup, Transition } from '@headlessui/react';
import { CurrencyDollarIcon, GlobeIcon, XIcon } from '@heroicons/react/outline';
import { StarIcon } from '@heroicons/react/solid';
import Layout from 'components/shared/Layout';
import _ from 'lodash';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useMemo, useState } from 'react';
import {
  GetProduct,
  GetProduct_productByHandle_variants_edges_node,
  GetProduct_productByHandle_variants_edges_node_selectedOptions,
} from 'types/generated/GetProduct';
import { GetProducts } from 'types/generated/GetProducts';
import { Colors, Rings } from 'utils/colors';
import { classNames } from 'utils/helpers';
import { PRODUCT, PRODUCTS } from 'utils/queries';

const policies = [
  {
    name: 'International delivery',
    icon: GlobeIcon,
    description: 'Get your order in 2 years',
  },
  {
    name: 'Loyalty rewards',
    icon: CurrencyDollarIcon,
    description: "Don't look at other tees",
  },
];
const reviews = {
  average: 3.9,
  totalCount: 512,
  featured: [
    {
      id: 1,
      title: "Can't say enough good things",
      rating: 5,
      content: `
          <p>I was really pleased with the overall shopping experience. My order even included a little personal, handwritten note, which delighted me!</p>
          <p>The product quality is amazing, it looks and feel even better than I had anticipated. Brilliant stuff! I would gladly recommend this store to my friends. And, now that I think of it... I actually have, many times!</p>
        `,
      author: 'Risako M',
      date: 'May 16, 2021',
      datetime: '2021-01-06',
    },
    // More reviews...
  ],
};
const sizeGuide = [
  { size: 'XS', chest: '34 ⅝', waist: '26 ¾', hips: '37' },
  { size: 'S', chest: '36 ¼', waist: '28 ⅜', hips: '38 ⅝' },
  { size: 'M', chest: '37 ¾', waist: '29 ⅞', hips: '40 ⅛' },
  { size: 'L', chest: '41', waist: '33 ⅛', hips: '43 ¼' },
  { size: 'XL', chest: '44 ⅛', waist: '36 ¼', hips: '46 ½' },
  { size: '2XL', chest: '47 ¼', waist: '39 ⅜', hips: '49 ⅝' },
  { size: '3XL', chest: '50 ⅜', waist: '42 ½', hips: '52 ¾' },
];
const testProduct = {
  id: 1,
  name: 'Machined Pen',
  color: 'Black',
  price: '$35',
  href: '#',
  imageSrc:
    'https://tailwindui.com/img/ecommerce-images/home-page-02-product-01.jpg',
  imageAlt:
    'Black machined steel pen with hexagonal grip and small white logo at top.',
  availableColors: [
    { name: 'Black', colorBg: '#111827' },
    { name: 'Brass', colorBg: '#FDE68A' },
    { name: 'Chrome', colorBg: '#E5E7EB' },
  ],
};

export default function Product() {
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  const router = useRouter();

  const { handle } = router.query;

  const { loading, error, data } = useQuery<GetProduct>(PRODUCT, {
    variables: { handle },
  });

  const {
    loading: loadingProducts,
    error: errorProducts,
    data: dataProducts,
  } = useQuery<GetProducts>(PRODUCTS);

  const [option, setOption] = useState<
    GetProduct_productByHandle_variants_edges_node | undefined
  >();
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [selectedSize, setSelectedSize] = useState<string | undefined>();

  const product = data?.productByHandle;
  //black magic
  //but essentially getting grouping the options to get a list of all the possible options
  const grouped = _.groupBy(
    _.uniq<GetProduct_productByHandle_variants_edges_node_selectedOptions>(
      [].concat.apply(
        [],
        product?.variants.edges.map((p) => p.node.selectedOptions)
      )
    ),
    'name'
  );
  const colors = grouped?.Color?.map((g) => {
    return { value: g.value, available: true };
  });
  const [sizes, setSizes] = useState<
    { value: string; available: Boolean }[] | undefined
  >();

  useMemo(() => {
    const option = product?.variants.edges[0].node;
    setOption(option);

    setSizes(
      grouped?.Size?.map((g) => {
        return { value: g.value, available: false };
      })
    );

    setSelectedColor(
      option?.selectedOptions.find(({ name }) => name === 'Color').value
    );
    setSelectedSize(
      option?.selectedOptions.find(({ name }) => name === 'Size').value
    );
  }, [data]);

  useEffect(() => {
    setOption(
      product?.variants.edges.find(({ node }) => {
        return (
          node.selectedOptions
            .map(({ value }) => value)
            .includes(selectedSize) &&
          node.selectedOptions.map(({ value }) => value).includes(selectedColor)
        );
      })?.node
    );
  }, [product?.variants.edges, selectedColor, selectedSize]);

  useEffect(() => {
    setSizes(
      sizes?.map((s) => {
        const isAvailable =
          product?.variants.edges.filter(
            ({ node }) =>
              node.selectedOptions.find(({ name }) => name === 'Size').value ===
                s.value &&
              node.selectedOptions
                .map(({ value }) => value)
                .includes(selectedColor) &&
              node.availableForSale
          ).length > 0;

        return { ...s, available: isAvailable };
      })
    );
  }, [selectedColor]);

  console.log({ dataProducts });

  const recommendedProducts = dataProducts?.products?.edges.filter(
    ({ node: rp }) => rp.id !== product?.id
  );
  return (
    <Layout>
      <>
        <main className="my-8 max-w-2xl mx-auto pb-16 px-4 sm:pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:auto-rows-min lg:gap-x-8">
            <div className="lg:col-start-8 lg:col-span-5">
              <div className="flex justify-between">
                <h1 className="text-xl font-medium text-gray-900">
                  {product?.title}
                </h1>
                <p className="text-xl font-medium text-gray-900">
                  ${option?.priceV2.amount}
                </p>
              </div>
              {/* Reviews */}
              <div className="mt-4">
                <h2 className="sr-only">Reviews</h2>
                <div className="flex items-center">
                  <p className="text-sm text-gray-700">
                    {reviews.average}
                    <span className="sr-only"> out of 5 stars</span>
                  </p>
                  <div className="ml-1 flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          reviews.average > rating
                            ? 'text-yellow-400'
                            : 'text-gray-200',
                          'h-5 w-5 flex-shrink-0'
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <div
                    aria-hidden="true"
                    className="ml-4 text-sm text-gray-300"
                  >
                    ·
                  </div>
                  <div className="ml-4 flex">
                    <a
                      href="#"
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      See all {reviews.totalCount} reviews
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Image gallery */}
            <div className="mt-8 lg:mt-0 lg:col-start-1 lg:col-span-7 lg:row-start-1 lg:row-span-3">
              <h2 className="sr-only">Images</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
                {product?.images.edges.map(({ node: image }, index) => (
                  <div
                    key={image.id}
                    className={classNames(
                      'relative',
                      index === 0
                        ? 'lg:col-span-2 lg:row-span-2 h-screen'
                        : 'hidden lg:block',
                      'rounded-lg'
                    )}
                  >
                    <Image
                      src={image.transformedSrc}
                      alt={image.altText}
                      layout="fill" // required
                      objectFit="cover" // change to suit your needs
                      className="h-full"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 lg:col-span-5">
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
                      {colors?.map(({ value }) => (
                        <RadioGroup.Option
                          key={value}
                          value={value}
                          className={({ active, checked }) =>
                            classNames(
                              Rings[(value.toLowerCase() as keyof Rings) || 0],
                              active && checked ? 'ring ring-offset-1' : '',
                              !active && checked ? 'ring-2' : '',
                              '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none'
                            )
                          }
                        >
                          <RadioGroup.Label as="p" className="sr-only">
                            {value}
                          </RadioGroup.Label>
                          <span
                            aria-hidden="true"
                            className={classNames(
                              Colors[
                                (value.toLowerCase() as keyof Colors) || 0
                              ],
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
                      onClick={() => setSizeGuideOpen(true)}
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500 hover:cursor-pointer"
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
                      {sizes?.map(({ value, available }) => (
                        <RadioGroup.Option
                          key={value}
                          value={value}
                          className={({ active, checked }) =>
                            classNames(
                              available
                                ? 'cursor-pointer focus:outline-none'
                                : 'opacity-25 cursor-not-allowed',
                              active
                                ? 'ring-2 ring-offset-2 ring-indigo-500'
                                : '',
                              checked
                                ? 'bg-indigo-600 border-transparent text-white hover:bg-indigo-700'
                                : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50',
                              'border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1'
                            )
                          }
                          disabled={!available}
                        >
                          <RadioGroup.Label as="p">{value}</RadioGroup.Label>
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <button
                  type="submit"
                  className={classNames(
                    'mt-8 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
                    option?.availableForSale
                      ? 'cursor-pointer '
                      : 'opacity-25 cursor-not-allowed'
                  )}
                  disabled={
                    option === undefined ||
                    option === null ||
                    !option?.availableForSale
                  }
                >
                  Add to cart
                </button>
              </form>

              {/* Product details */}
              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">
                  Description
                </h2>

                <div
                  className="mt-4 prose prose-sm text-gray-500"
                  dangerouslySetInnerHTML={{
                    __html: product?.descriptionHtml,
                  }}
                />
              </div>

              <div className="mt-8 border-t border-gray-200 pt-8">
                <h2 className="text-sm font-medium text-gray-900">
                  Fabric &amp; Care
                </h2>

                <div className="mt-4 prose prose-sm text-gray-500">
                  <ul role="list">
                    {product?.tags.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Policies */}
              <section aria-labelledby="policies-heading" className="mt-10">
                <h2 id="policies-heading" className="sr-only">
                  Our Policies
                </h2>

                <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {policies.map((policy) => (
                    <div
                      key={policy.name}
                      className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center"
                    >
                      <dt>
                        <policy.icon
                          className="mx-auto h-6 w-6 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="mt-4 text-sm font-medium text-gray-900">
                          {policy.name}
                        </span>
                      </dt>
                      <dd className="mt-1 text-sm text-gray-500">
                        {policy.description}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            </div>
          </div>

          {/* Reviews */}
          <section aria-labelledby="reviews-heading" className="mt-16 sm:mt-24">
            <h2
              id="reviews-heading"
              className="text-lg font-medium text-gray-900"
            >
              Recent reviews
            </h2>

            <div className="mt-6 border-t border-b border-gray-200 pb-10 divide-y divide-gray-200 space-y-10">
              {reviews.featured.map((review) => (
                <div
                  key={review.id}
                  className="pt-10 lg:grid lg:grid-cols-12 lg:gap-x-8"
                >
                  <div className="lg:col-start-5 lg:col-span-8 xl:col-start-4 xl:col-span-9 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:items-start">
                    <div className="flex items-center xl:col-span-1">
                      <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={classNames(
                              review.rating > rating
                                ? 'text-yellow-400'
                                : 'text-gray-200',
                              'h-5 w-5 flex-shrink-0'
                            )}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <p className="ml-3 text-sm text-gray-700">
                        {review.rating}
                        <span className="sr-only"> out of 5 stars</span>
                      </p>
                    </div>

                    <div className="mt-4 lg:mt-6 xl:mt-0 xl:col-span-2">
                      <h3 className="text-sm font-medium text-gray-900">
                        {review.title}
                      </h3>

                      <div
                        className="mt-3 space-y-6 text-sm text-gray-500"
                        dangerouslySetInnerHTML={{ __html: review.content }}
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex items-center text-sm lg:mt-0 lg:col-start-1 lg:col-span-4 lg:row-start-1 lg:flex-col lg:items-start xl:col-span-3">
                    <p className="font-medium text-gray-900">{review.author}</p>
                    <time
                      dateTime={review.datetime}
                      className="ml-4 border-l border-gray-200 pl-4 text-gray-500 lg:ml-0 lg:mt-2 lg:border-0 lg:pl-0"
                    >
                      {review.date}
                    </time>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Related products */}
          <section aria-labelledby="related-heading" className="mt-16 sm:mt-24">
            <h2
              id="related-heading"
              className="text-lg font-medium text-gray-900"
            >
              Customers also purchased
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {recommendedProducts?.map(({ node: relatedProduct }) => (
                <div key={relatedProduct.id} className="group relative">
                  <div className="relative w-full min-h-80 aspect-w-1 aspect-h-1 rounded-lg overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                    <Image
                      src={relatedProduct.images.edges[0].node.transformedSrc}
                      alt={relatedProduct.images.edges[0].node.altText}
                      layout="fill" // required
                      objectFit="cover" // change to suit your needs
                      className="w-full h-full object-center object-cover lg:w-full lg:h-full  rounded-lg"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <a href={`/product/${relatedProduct.handle}`}>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {relatedProduct.title}
                        </a>
                      </h3>
                      <ul
                        role="list"
                        className="mt-auto pt-2 flex items-center justify-center space-x-3"
                      >
                        {_.uniq<GetProduct_productByHandle_variants_edges_node_selectedOptions>(
                          [].concat.apply(
                            [],
                            relatedProduct.variants.edges.map(({ node }) =>
                              node.selectedOptions.filter(
                                (s) => s.name === 'Color'
                              )
                            )
                          )
                        )
                          .map(({ value }) => value)
                          .map((value) => (
                            <li
                              key={value}
                              className={`w-4 h-4 rounded-full border border-black border-opacity-10 ${
                                Colors[
                                  (value.toLowerCase() as keyof Colors) || 0
                                ]
                              }`}
                            >
                              <span className="sr-only">{value}</span>
                            </li>
                          ))}
                      </ul>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      ${relatedProduct.priceRange.minVariantPrice.amount}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
        <Transition.Root show={sizeGuideOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed z-10 inset-0 overflow-y-auto"
            onClose={setSizeGuideOpen}
          >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:p-6 w-3/4">
                  <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                    <button
                      type="button"
                      className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => setSizeGuideOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <table className="min-w-full divide-y divide-gray-200 mt-6 ">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          size
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          chest
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          waist
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          hips
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {sizeGuide.map(({ size, chest, waist, hips }) => (
                        <tr key={size}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {size}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {chest}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {waist}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {hips}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      </>
    </Layout>
  );
}
