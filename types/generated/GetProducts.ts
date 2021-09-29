/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CurrencyCode } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetProducts
// ====================================================

export interface GetProducts_products_edges_node_compareAtPriceRange_minVariantPrice {
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

export interface GetProducts_products_edges_node_compareAtPriceRange_maxVariantPrice {
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

export interface GetProducts_products_edges_node_compareAtPriceRange {
  __typename: "ProductPriceRange";
  /**
   * The lowest variant's price.
   */
  minVariantPrice: GetProducts_products_edges_node_compareAtPriceRange_minVariantPrice;
  /**
   * The highest variant's price.
   */
  maxVariantPrice: GetProducts_products_edges_node_compareAtPriceRange_maxVariantPrice;
}

export interface GetProducts_products_edges_node_priceRange_minVariantPrice {
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

export interface GetProducts_products_edges_node_priceRange_maxVariantPrice {
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

export interface GetProducts_products_edges_node_priceRange {
  __typename: "ProductPriceRange";
  /**
   * The lowest variant's price.
   */
  minVariantPrice: GetProducts_products_edges_node_priceRange_minVariantPrice;
  /**
   * The highest variant's price.
   */
  maxVariantPrice: GetProducts_products_edges_node_priceRange_maxVariantPrice;
}

export interface GetProducts_products_edges_node_images_edges_node {
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
  /**
   * The original width of the image in pixels. Returns `null` if the image is not hosted by Shopify.
   */
  width: number | null;
  /**
   * The original height of the image in pixels. Returns `null` if the image is not hosted by Shopify.
   */
  height: number | null;
}

export interface GetProducts_products_edges_node_images_edges {
  __typename: "ImageEdge";
  /**
   * The item at the end of ImageEdge.
   */
  node: GetProducts_products_edges_node_images_edges_node;
}

export interface GetProducts_products_edges_node_images {
  __typename: "ImageConnection";
  /**
   * A list of edges.
   */
  edges: GetProducts_products_edges_node_images_edges[];
}

export interface GetProducts_products_edges_node_variants_edges_node_selectedOptions {
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

export interface GetProducts_products_edges_node_variants_edges_node {
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
   * The total sellable quantity of the variant for online sales channels.
   */
  quantityAvailable: number | null;
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
  selectedOptions: GetProducts_products_edges_node_variants_edges_node_selectedOptions[];
}

export interface GetProducts_products_edges_node_variants_edges {
  __typename: "ProductVariantEdge";
  /**
   * The item at the end of ProductVariantEdge.
   */
  node: GetProducts_products_edges_node_variants_edges_node;
}

export interface GetProducts_products_edges_node_variants {
  __typename: "ProductVariantConnection";
  /**
   * A list of edges.
   */
  edges: GetProducts_products_edges_node_variants_edges[];
}

export interface GetProducts_products_edges_node {
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
  compareAtPriceRange: GetProducts_products_edges_node_compareAtPriceRange;
  /**
   * The date and time when the product was created.
   */
  createdAt: ShopifyDateTime;
  /**
   * The price range.
   */
  priceRange: GetProducts_products_edges_node_priceRange;
  /**
   * The description of the product, complete with HTML formatting.
   */
  descriptionHtml: ShopifyHTML;
  /**
   * List of images associated with the product.
   */
  images: GetProducts_products_edges_node_images;
  /**
   * The total quantity of inventory in stock for this Product.
   */
  totalInventory: number | null;
  /**
   * List of the product’s variants.
   */
  variants: GetProducts_products_edges_node_variants;
}

export interface GetProducts_products_edges {
  __typename: "ProductEdge";
  /**
   * The item at the end of ProductEdge.
   */
  node: GetProducts_products_edges_node;
}

export interface GetProducts_products {
  __typename: "ProductConnection";
  /**
   * A list of edges.
   */
  edges: GetProducts_products_edges[];
}

export interface GetProducts {
  /**
   * List of the shop’s products.
   */
  products: GetProducts_products;
}
