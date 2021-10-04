/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useQuery } from '@apollo/client';
import OtherApparel from 'components/profile/OtherApparel';
import Layout from 'components/shared/Layout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';
import { definitions } from 'types/supabase';
import { getProductQuery } from 'utils/shopify/queries';
import { supabase } from 'utils/supabaseClient';

export default function ProfilePage(): ReactElement {
  const router = useRouter();
  const { link } = router.query;
  const [product, setProduct] = useState<
    definitions['qrs'] & {
      profile: definitions['profiles'];
    }
  >();
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [otherProducts, setOtherProducts] = useState<
    definitions['qrs'][] | null
  >();

  useEffect(() => {
    getProfile();
  }, [link]);

  async function getProfile() {
    try {
      console.log('entering',link);

      let { data, error, status } = await supabase
        .from<
          definitions['qrs'] & {
            profile: definitions['profiles'];
          }
        >('qrs')
        .select(
          `
          *,
          profile: profiles( 
            *
          )
        `
        )
        .eq('id', link as string)
        .single();
        console.log({
          data,
          error,
          status
        });
      let {
        data: otherProductsData
      } = await supabase
        .from<definitions['qrs']>('qrs')
        .select(`*`)
        .eq('profile_id', data.profile_id);

     
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        downloadImage(data.profile.avatar_url);
        setProduct(data);
        // dispatch(setProfile(data));
      }

      if (otherProductsData) {
        const x = otherProductsData.filter((op) => op.id !== link);
        setOtherProducts(x);

        console.log({ x });
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }

  const { data: productData } = useQuery<GetProductBySlugQuery>(
    getProductQuery,
    {
      variables: { slug: product?.handle },
    }
  );

  const profile = product?.profile;

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage
        .from('avatars')
        .download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error: any) {
      console.log('Error downloading image: ', error.message);
    }
  }

  return (
    <Layout>
      <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last pb-36">
        <article>
          {/* image */}
          <div>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mt-8  mx-auto">
                <div className="flex justify-center align-middle">
                  <img
                    className="h-32 w-32 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                    src={avatarUrl}
                    alt=""
                  />
                </div>
                <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                  <div className=" 2xl:block mt-6 min-w-0 flex-1">
                    <h1 className="text-3xl font-extrabold text-gray-900 truncate text-center sm:text-4xl">
                      {profile?.firstName} {profile?.lastName}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* header  info */}
          <div className="sm:mt-2 2xl:mt-5">
            <div className="border-b border-gray-200  pb-6">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                  <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-8 sm:mx-auto">
                    <div className="mt-2 flex items-center text-lg text-gray-500">
                      🎓 {profile?.education} {'   '}|{'   '}📍{' '}
                      {profile?.location}
                    </div>
                    {profile?.tiktok && (
                      <div className="mt-2 flex items-center text-lg text-gray-500">
                        <img
                          className="h-4 w-4 mr-2"
                          src="/tiktok.svg"
                          alt=""
                        />
                        <Link href={`https://tiktok.com/@${profile?.tiktok}`}>
                          <a className="text-md font-semibold text-gray-700 hover:text-gray-900">
                            {profile?.tiktok}
                          </a>
                        </Link>
                      </div>
                    )}

                    {profile?.instagram && (
                      <div className="mt-2 flex items-center text-lg text-gray-500">
                        <img
                          className="h-4 w-4 mr-2"
                          src="/instagram.svg"
                          alt=""
                        />
                        <Link
                          href={`https://instagram.com/${profile?.instagram}`}
                        >
                          <a className="text-md font-semibold text-gray-700 hover:text-gray-900">
                            {profile?.instagram}
                          </a>
                        </Link>
                      </div>
                    )}

                    {profile?.twitter && (
                      <div className="mt-2 flex items-center text-lg text-gray-500">
                        <img
                          className="h-4 w-4 mr-2"
                          src="/twitter.png"
                          alt=""
                        />
                        <Link href={`https://twitter.com/${profile?.twitter}`}>
                          <a className="text-md font-semibold text-gray-700 hover:text-gray-900">
                            {profile?.twitter}
                          </a>
                        </Link>
                      </div>
                    )}
                  </div>
                </nav>
              </div>
              <div className="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <dd
                      className="mt-1 ext-md text-gray-900 space-y-5 text-center align-middle"
                      dangerouslySetInnerHTML={{ __html: profile?.bio }}
                    />
                  </div>
                </dl>
              </div>
            </div>
          </div>

          <div className="mx-auto py-4 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-">
            <div className="space-y-6">
              <div className="space-y-5 align-middle">
                <h2 className="text-2xl font-semibold tracking-tight sm:text-4xl text-center align-middle">
                  {productData?.productByHandle.title}{' '}
                  <span className="text-xl font-light tracking-tight sm:text-2xl text-center">
                    (#7/3000)
                  </span>
                </h2>
              </div>
              <div className="space-y-12">
                <div className="space-y-4">
                  <div className="aspect-w-3 aspect-h-2">
                    <img
                      className="object-cover shadow-lg rounded-lg mx-auto"
                      src={
                        productData?.productByHandle.images.edges[0].node
                          .originalSrc
                      }
                      alt={
                        productData?.productByHandle.images.edges[0].node
                          .altText
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="text-lg leading-6 font-medium space-y-1 w-full">
                      <h3 className=" text-center">
                        This shirt has been viewed {product?.view_count} times
                      </h3>
                      {/* <div className="align-middle justify-center mx-auto pl-36">
                        <p className="text-gray-700 text-left md:text-center">
                          #1 Miami, Fl
                        </p>
                        <p className="text-gray-700 text-left  md:text-center">
                          #3 🌍
                        </p>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* images */}
          {otherProducts && (
            <div className="mx-auto px-4 max-w-7xl py-6 sm:px-6 lg:px-8 lg:py-24">
              <div className="space-y-12">
                <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
                  <h2 className="text-2xl font-semibold tracking-tight sm:text-4xl text-center align-middle">
                    Other merch {profile?.firstName} {profile?.lastName} owns
                    &#8594;
                  </h2>
                </div>
                <ul className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8">
                  {otherProducts?.map((otherProduct) => (
                    <OtherApparel
                      handle={otherProduct.handle}
                      count={otherProduct.view_count}
                      key={otherProduct.id}
                    />
                  ))}
                </ul>
              </div>
            </div>
          )}
        </article>
      </main>
    </Layout>
  );
}
