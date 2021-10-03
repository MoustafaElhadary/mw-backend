/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CurrencyCode } from "./globalTypes";

// ====================================================
// GraphQL fragment: checkoutDetails
// ====================================================

export interface checkoutDetails_subtotalPriceV2 {
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

export interface checkoutDetails_totalTaxV2 {
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

export interface checkoutDetails_totalPriceV2 {
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

export interface checkoutDetails_lineItems_pageInfo {
  __typename: "PageInfo";
  /**
   * Indicates if there are more pages to fetch.
   */
  hasNextPage: boolean;
  /**
   * Indicates if there are any pages prior to the current page.
   */
  hasPreviousPage: boolean;
}

export interface checkoutDetails_lineItems_edges_node_variant_selectedOptions {
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

export interface checkoutDetails_lineItems_edges_node_variant_image {
  __typename: "Image";
  /**
   * The location of the original image as a URL.
   * 
   * If there are any existing transformations in the original source URL, they will remain and not be stripped.
   */
  originalSrc: ShopifyURL;
  /**
   * A word or phrase to share the nature or contents of an image.
   */
  altText: string | null;
  /**
   * The original width of the image in pixels. Returns `null` if the image is not hosted by Shopify.
   */
  width: number | null;
  /**
   * The original height of the image in pixels. Returns `null` if the image is not hosted by Shopify.
   */
  height: number | null;
}

export interface checkoutDetails_lineItems_edges_node_variant_priceV2 {
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

export interface checkoutDetails_lineItems_edges_node_variant_compareAtPriceV2 {
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

export interface checkoutDetails_lineItems_edges_node_variant_product {
  __typename: "Product";
  /**
   * A human-friendly unique string for the Product automatically generated from its title.
   * They are used by the Liquid templating language to refer to objects.
   */
  handle: string;
}

export interface checkoutDetails_lineItems_edges_node_variant {
  __typename: "ProductVariant";
  /**
   * A globally-unique identifier.
   */
  id: string;
  /**
   * The SKU (stock keeping unit) associated with the variant.
   */
  sku: string | null;
  /**
   * The product variant’s title.
   */
  title: string;
  /**
   * List of product options applied to the variant.
   */
  selectedOptions: checkoutDetails_lineItems_edges_node_variant_selectedOptions[];
  /**
   * Image associated with the product variant. This field falls back to the product image if no image is available.
   */
  image: checkoutDetails_lineItems_edges_node_variant_image | null;
  /**
   * The product variant’s price.
   */
  priceV2: checkoutDetails_lineItems_edges_node_variant_priceV2;
  /**
   * The compare at price of the variant. This can be used to mark a variant as on sale, when `compareAtPriceV2` is higher than `priceV2`.
   */
  compareAtPriceV2: checkoutDetails_lineItems_edges_node_variant_compareAtPriceV2 | null;
  /**
   * The product object that the product variant belongs to.
   */
  product: checkoutDetails_lineItems_edges_node_variant_product;
}

export interface checkoutDetails_lineItems_edges_node {
  __typename: "CheckoutLineItem";
  /**
   * A globally-unique identifier.
   */
  id: string;
  /**
   * Title of the line item. Defaults to the product's title.
   */
  title: string;
  /**
   * Product variant of the line item.
   */
  variant: checkoutDetails_lineItems_edges_node_variant | null;
  /**
   * The quantity of the line item.
   */
  quantity: number;
}

export interface checkoutDetails_lineItems_edges {
  __typename: "CheckoutLineItemEdge";
  /**
   * The item at the end of CheckoutLineItemEdge.
   */
  node: checkoutDetails_lineItems_edges_node;
}

export interface checkoutDetails_lineItems {
  __typename: "CheckoutLineItemConnection";
  /**
   * Information to aid in pagination.
   */
  pageInfo: checkoutDetails_lineItems_pageInfo;
  /**
   * A list of edges.
   */
  edges: checkoutDetails_lineItems_edges[];
}

export interface checkoutDetails {
  __typename: "Checkout";
  /**
   * A globally-unique identifier.
   */
  id: string;
  /**
   * The url pointing to the checkout accessible from the web.
   */
  webUrl: ShopifyURL;
  /**
   * Price of the checkout before duties, shipping and taxes.
   */
  subtotalPriceV2: checkoutDetails_subtotalPriceV2;
  /**
   * The sum of all the taxes applied to the line items and shipping lines in the checkout.
   */
  totalTaxV2: checkoutDetails_totalTaxV2;
  /**
   * The sum of all the prices of all the items in the checkout, duties, taxes and discounts included.
   */
  totalPriceV2: checkoutDetails_totalPriceV2;
  /**
   * The date and time when the checkout was completed.
   */
  completedAt: ShopifyDateTime | null;
  /**
   * The date and time when the checkout was created.
   */
  createdAt: ShopifyDateTime;
  /**
   * Specifies if taxes are included in the line item and shipping line prices.
   */
  taxesIncluded: boolean;
  /**
   * A list of line item objects, each one containing information about an item in the checkout.
   */
  lineItems: checkoutDetails_lineItems;
}
