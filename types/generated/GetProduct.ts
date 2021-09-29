/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CurrencyCode } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetProduct
// ====================================================

export interface GetProduct_productByHandle_compareAtPriceRange_minVariantPrice {
  __typename: "MoneyV2";
  /**
   * Decimal money amount.
   */
  amount: ShopifyDecimal;
  /**
   * Currency of the money.
   */
  currencyCode: CurrencyCode;
}

export interface GetProduct_productByHandle_compareAtPriceRange_maxVariantPrice {
  __typename: "MoneyV2";
  /**
   * Decimal money amount.
   */
  amount: ShopifyDecimal;
  /**
   * Currency of the money.
   */
  currencyCode: CurrencyCode;
}

export interface GetProduct_productByHandle_compareAtPriceRange {
  __typename: "ProductPriceRange";
  /**
   * The lowest variant's price.
   */
  minVariantPrice: GetProduct_productByHandle_compareAtPriceRange_minVariantPrice;
  /**
   * The highest variant's price.
   */
  maxVariantPrice: GetProduct_productByHandle_compareAtPriceRange_maxVariantPrice;
}

export interface GetProduct_productByHandle_priceRange_minVariantPrice {
  __typename: "MoneyV2";
  /**
   * Decimal money amount.
   */
  amount: ShopifyDecimal;
  /**
   * Currency of the money.
   */
  currencyCode: CurrencyCode;
}

export interface GetProduct_productByHandle_priceRange_maxVariantPrice {
  __typename: "MoneyV2";
  /**
   * Decimal money amount.
   */
  amount: ShopifyDecimal;
  /**
   * Currency of the money.
   */
  currencyCode: CurrencyCode;
}

export interface GetProduct_productByHandle_priceRange {
  __typename: "ProductPriceRange";
  /**
   * The lowest variant's price.
   */
  minVariantPrice: GetProduct_productByHandle_priceRange_minVariantPrice;
  /**
   * The highest variant's price.
   */
  maxVariantPrice: GetProduct_productByHandle_priceRange_maxVariantPrice;
}

export interface GetProduct_productByHandle_images_edges_node {
  __typename: "Image";
  /**
   * The location of the transformed image as a URL.
   * 
   * All transformation arguments are considered "best-effort". If they can be applied to an image, they will be.
   * Otherwise any transformations which an image type does not support will be ignored.
   */
  transformedSrc: ShopifyURL;
  /**
   * A word or phrase to share the nature or contents of an image.
   */
  altText: string | null;
  /**
   * A unique identifier for the image.
   */
  id: string | null;
}

export interface GetProduct_productByHandle_images_edges {
  __typename: "ImageEdge";
  /**
   * The item at the end of ImageEdge.
   */
  node: GetProduct_productByHandle_images_edges_node;
}

export interface GetProduct_productByHandle_images {
  __typename: "ImageConnection";
  /**
   * A list of edges.
   */
  edges: GetProduct_productByHandle_images_edges[];
}

export interface GetProduct_productByHandle_variants_edges_node_selectedOptions {
  __typename: "SelectedOption";
  /**
   * The product option’s name.
   */
  name: string;
  /**
   * The product option’s value.
   */
  value: string;
}

export interface GetProduct_productByHandle_variants_edges_node {
  __typename: "ProductVariant";
  /**
   * The product variant’s title.
   */
  title: string;
  /**
   * The SKU (stock keeping unit) associated with the variant.
   */
  sku: string | null;
  /**
   * Indicates if the product variant is available for sale.
   */
  availableForSale: boolean;
  /**
   * A globally-unique identifier.
   */
  id: string;
  /**
   * List of product options applied to the variant.
   */
  selectedOptions: GetProduct_productByHandle_variants_edges_node_selectedOptions[];
}

export interface GetProduct_productByHandle_variants_edges {
  __typename: "ProductVariantEdge";
  /**
   * The item at the end of ProductVariantEdge.
   */
  node: GetProduct_productByHandle_variants_edges_node;
}

export interface GetProduct_productByHandle_variants {
  __typename: "ProductVariantConnection";
  /**
   * A list of edges.
   */
  edges: GetProduct_productByHandle_variants_edges[];
}

export interface GetProduct_productByHandle {
  __typename: "Product";
  /**
   * A human-friendly unique string for the Product automatically generated from its title.
   * They are used by the Liquid templating language to refer to objects.
   */
  handle: string;
  /**
   * A globally-unique identifier.
   */
  id: string;
  /**
   * The product’s title.
   */
  title: string;
  /**
   * Indicates if at least one product variant is available for sale.
   */
  availableForSale: boolean;
  /**
   * The compare at price of the product across all variants.
   */
  compareAtPriceRange: GetProduct_productByHandle_compareAtPriceRange;
  /**
   * The date and time when the product was created.
   */
  createdAt: ShopifyDateTime;
  /**
   * The price range.
   */
  priceRange: GetProduct_productByHandle_priceRange;
  /**
   * The description of the product, complete with HTML formatting.
   */
  descriptionHtml: ShopifyHTML;
  /**
   * List of images associated with the product.
   */
  images: GetProduct_productByHandle_images;
  /**
   * List of the product’s variants.
   */
  variants: GetProduct_productByHandle_variants;
}

export interface GetProduct {
  /**
   * Find a product by its handle.
   */
  productByHandle: GetProduct_productByHandle | null;
}

export interface GetProductVariables {
  handle: string;
}
