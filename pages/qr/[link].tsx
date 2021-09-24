/* eslint-disable @next/next/no-img-element */
import OtherApparel from 'components/profile/OtherApparel';
import Layout from 'components/shared/Layout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';

export default function ProfilePage(): ReactElement {
  const router = useRouter();
  const { username } = router.query;
  // const { data, error } = useSWR(`/api/profile/${username}`);

  // if (error) return <div>failed to load</div>;
  // if (!data) return <div>loading...</div>;

  // console.log(data);
  const masterList = [
    '🎨 painting',
    '📸 photography',
    '🎥 drone videos',
    '🎙 podcasts',
    '📙 reading',
  ];
  const profile = {
    name: 'Moustafa Elhadary',
    education: 'Penn State',
    location: 'Miami, FL',

    imageUrl:
      'https://pbs.twimg.com/profile_images/1315750025125822466/7hLfs3Qy_400x400.jpg',
    coverImageUrl:
      'https://thumbs.dreamstime.com/b/giza-plateau-skyline-23265268.jpg',
    bio: 'Egyptian 🇪🇬. I love code, food and people equally.',
    tikTok: 'moustafaElhadary',
    instagram: 'theMoustafa',
    twitter: 'theMoustafa_',
  };
  const apparel = {
    name: 'King Tut',
    imageUrl: '/1-front.png',
  };

  return (
    <Layout>
      <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last pb-36">
        <article>
          {/* image */}
          <div>
            <div>
              <img
                className="h-32 w-full max-w-7xl mx-auto object-cover lg:rounded-3xl sm:h-80"
                src={profile.coverImageUrl}
                alt=""
              />
            </div>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5 mx-auto">
                <div className="flex justify-center align-middle">
                  <img
                    className="h-32 w-32 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                    src={profile.imageUrl}
                    alt=""
                  />
                </div>
                <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                  <div className="sm:hidden 2xl:block mt-6 min-w-0 flex-1">
                    <h1 className="text-3xl font-extrabold text-gray-900 truncate text-center sm:text-4xl">
                      {profile.name}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1">
                <h1 className="text-3xl font-bold text-gray-900 truncate sm:text-4xl">
                  {profile.name}
                </h1>
              </div>
            </div>
          </div>

          {/* header  info */}
          <div className="sm:mt-2 2xl:mt-5">
            <div className="border-b border-gray-200">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                  <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-8  pb-6">
                    <div className="mt-2 flex items-center text-lg text-gray-500">
                      🎓 {profile.education} {'   '}|{'   '}📍{' '}
                      {profile.location}
                    </div>
                    {profile.tikTok && (
                      <div className="mt-2 flex items-center text-lg text-gray-500">
                        <img
                          className="h-4 w-4 mr-2"
                          src="/tiktok.svg"
                          alt=""
                        />
                        <Link href={`https://tiktok.com/@${profile.tikTok}`}>
                          <a className="text-md font-semibold text-gray-700 hover:text-gray-900">
                            {profile.tikTok}
                          </a>
                        </Link>
                      </div>
                    )}

                    {profile.instagram && (
                      <div className="mt-2 flex items-center text-lg text-gray-500">
                        <img
                          className="h-4 w-4 mr-2"
                          src="/instagram.svg"
                          alt=""
                        />
                        <Link
                          href={`https://instagram.com/${profile.instagram}`}
                        >
                          <a className="text-md font-semibold text-gray-700 hover:text-gray-900">
                            {profile.instagram}
                          </a>
                        </Link>
                      </div>
                    )}

                    {profile.twitter && (
                      <div className="mt-2 flex items-center text-lg text-gray-500">
                        <img
                          className="h-4 w-4 mr-2"
                          src="/twitter.png"
                          alt=""
                        />
                        <Link href={`https://twitter.com/${profile.twitter}`}>
                          <a className="text-md font-semibold text-gray-700 hover:text-gray-900">
                            {profile.twitter}
                          </a>
                        </Link>
                      </div>
                    )}
                  </div>
                </nav>
              </div>
            </div>
          </div>

          {/* bio */}
          <div className="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <dt className="text-2xl font-semibold tracking-tight sm:text-4xl text-center">
                  About
                </dt>
                <dd
                  className="mt-1 ext-md text-gray-900 space-y-5 text-center align-middle"
                  dangerouslySetInnerHTML={{ __html: profile.bio }}
                />
              </div>
            </dl>
          </div>

          {/* <div className="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <dt className="text-2xl font-semibold tracking-tight sm:text-4xl">
              Interests
            </dt>
            <ul className=" mt-3">
              {masterList.map((l) => {
                return (
                  <li
                    className="inline mr-2 cursor-pointer"
                    key={' ' + Math.random() * 100}
                  >
                    <div className="relative inline-flex items-center rounded-full border border-gray-300 px-3 py-2 mb-3 bg-gray-600 shadow">
                      <div className=" text-sm font-medium text-white">{l}</div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div> */}

          <div className="mx-auto py-4 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-">
            <div className="space-y-6">
              <div className="space-y-5 align-middle">
                <h2 className="text-2xl font-semibold tracking-tight sm:text-4xl text-center align-middle">
                  {apparel.name} <span className="text-xl font-light tracking-tight sm:text-2xl text-center">(#7/3000)</span>
                </h2>
              </div>
              <div className="space-y-12">
                <div className="space-y-4">
                  <div className="aspect-w-3 aspect-h-2">
                    <img
                      className="object-cover shadow-lg rounded-lg mx-auto"
                      src={apparel.imageUrl}
                      alt=""
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="text-lg leading-6 font-medium space-y-1 w-full">
                      <h3 className=" text-center">
                        This shirt has been viewed 790 times
                      </h3>
                      <div className="align-middle justify-center mx-auto pl-36">
                        <p className="text-gray-700 text-left md:text-center">
                          #1 Miami, Fl
                        </p>
                        <p className="text-gray-700 text-left  md:text-center">
                          #3 🌍
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* images */}
          <OtherApparel name={profile.name} />
        </article>
      </main>
    </Layout>
  );
}
