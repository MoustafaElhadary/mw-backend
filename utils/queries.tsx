import { gql } from '@apollo/client';

export const PRODUCT = gql`
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
                                    width
                                    height
                              }
                        }
                  }
                  tags
                  variants(first: 100) {
                        edges {
                              node {
                                    title
                                    sku
                                    availableForSale
                                    id
                                    compareAtPriceV2 {
                                          amount
                                          currencyCode
                                    }
                                    priceV2 {
                                          amount
                                          currencyCode
                                    }
                                    unitPrice {
                                          amount
                                          currencyCode
                                    }
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

export const PRODUCTS = gql`
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
                                                width
                                                height
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