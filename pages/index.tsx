import { gql, useQuery } from '@apollo/client';
import Layout from 'components/shared/Layout';
import { GetProducts } from 'types/generated/GetProducts';
const PRODUCTS = gql`
  query GetProducts {
    products(first: 100) {
      edges {
        node {
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
          totalInventory
          variants(first: 100) {
            edges {
              node {
                title
                sku
                quantityAvailable
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
    }
  }
`;
export default function HomePage() {
  const { loading, error, data } = useQuery<GetProducts>(PRODUCTS);

  console.log({ loading, data, error });

  return (
    <Layout>
      <main>
        {/* Hero section */}
        <section className="relative overflow-hidden">
          <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:static">
              <div className="sm:max-w-lg">
                <h1 className="text-4xl font font-bold tracking-tight text-gray-900 sm:text-6xl font-title">
                  It&rsquo;s time for you to represent .... YOU
                </h1>
                <p className="mt-4 text-xl text-gray-500">
                  This year, our new summer collection will shelter you from the
                  harsh elements of a world that doesn&rsquo;t care if you live
                  or die.
                </p>
              </div>
              <div>
                <div className="mt-10">
                  {/* Decorative image grid */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none lg:absolute lg:inset-y-0 lg:max-w-7xl lg:mx-auto lg:w-full"
                  >
                    <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                      <div className="flex items-center space-x-6 lg:space-x-8">
                        <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                          <div className="w-44 h-64 rounded-lg overflow-hidden sm:opacity-0 lg:opacity-100">
                            <img
                              src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg"
                              alt=""
                              className="w-full h-full object-center object-cover"
                            />
                          </div>
                          <div className="w-44 h-64 rounded-lg overflow-hidden">
                            <img
                              src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-02.jpg"
                              alt=""
                              className="w-full h-full object-center object-cover"
                            />
                          </div>
                        </div>
                        <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                          <div className="w-44 h-64 rounded-lg overflow-hidden">
                            <img
                              src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-03.jpg"
                              alt=""
                              className="w-full h-full object-center object-cover"
                            />
                          </div>
                          <div className="w-44 h-64 rounded-lg overflow-hidden">
                            <img
                              src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-04.jpg"
                              alt=""
                              className="w-full h-full object-center object-cover"
                            />
                          </div>
                          <div className="w-44 h-64 rounded-lg overflow-hidden">
                            <img
                              src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-05.jpg"
                              alt=""
                              className="w-full h-full object-center object-cover"
                            />
                          </div>
                        </div>
                        <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                          <div className="w-44 h-64 rounded-lg overflow-hidden">
                            <img
                              src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-06.jpg"
                              alt=""
                              className="w-full h-full object-center object-cover"
                            />
                          </div>
                          <div className="w-44 h-64 rounded-lg overflow-hidden">
                            <img
                              src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-07.jpg"
                              alt=""
                              className="w-full h-full object-center object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <a
                    href="#"
                    className="inline-block text-center bg-black border border-transparent rounded-md py-3 px-8 font-medium text-white hover:bg-black"
                  >
                    Shop Collection
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Favorites section */}
        <section aria-labelledby="favorites-heading">
          <div className="max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-baseline sm:justify-between">
              <h2
                id="favorites-heading"
                className="text-2xl font-extrabold tracking-tight text-gray-900"
              >
                Our Favorites
              </h2>
              <a
                href="#"
                className="hidden text-sm font-semibold text-black hover:text-black sm:block"
              >
                Browse all favorites<span aria-hidden="true"> &rarr;</span>
              </a>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-3 sm:gap-y-0 sm:gap-x-6 lg:gap-x-8">
              {data?.products?.edges.map(({ node: product }) => (
                <div key={product.id} className="group relative">
                  <div className="w-full h-96 rounded-lg overflow-hidden group-hover:opacity-75 sm:h-auto sm:aspect-w-2 sm:aspect-h-3">
                    <img
                      src={product.images.edges[0].node.transformedSrc}
                      alt={product.images.edges[0].node.altText}
                      className="w-full h-full object-center object-cover"
                    />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-gray-900">
                    <a href={product.handle}>
                      <span className="absolute inset-0" />
                      {product.title}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    ${product.priceRange.minVariantPrice.amount}
                  </p>
                </div>
              ))}

           
            </div>

            <div className="mt-6 sm:hidden">
              <a
                href="#"
                className="block text-sm font-semibold text-black hover:text-black"
              >
                Browse all favorites<span aria-hidden="true"> &rarr;</span>
              </a>
            </div>
          </div>
        </section>

        {/* Featured section */}
        <section aria-labelledby="cause-heading">
          <div className="relative bg-gray-800 py-32 px-6 sm:py-40 sm:px-12 lg:px-16">
            <div className="absolute inset-0 overflow-hidden">
              <img
                src="https://tailwindui.com/img/ecommerce-images/home-page-03-feature-section-full-width.jpg"
                alt=""
                className="w-full h-full object-center object-cover"
              />
            </div>
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gray-900 bg-opacity-50"
            />
            <div className="relative max-w-3xl mx-auto flex flex-col items-center text-center">
              <h2
                id="cause-heading"
                className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
              >
                Long-term thinking
              </h2>
              <p className="mt-3 text-xl text-white">
                We&rsquo;re committed to responsible, sustainable, and ethical
                manufacturing. Our small-scale approach allows us to focus on
                quality and reduce our impact. We&rsquo;re doing our best to
                delay the inevitable heat-death of the universe.
              </p>
              <a
                href="#"
                className="mt-8 w-full block  border border-transparent rounded-md py-3 px-8 text-base font-medium bg-white text-black hover:bg-gray-100 sm:w-auto"
              >
                Read our story
              </a>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
