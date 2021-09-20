/* eslint-disable @next/next/no-img-element */
import React, { ReactElement, useState, Fragment } from 'react';
import { Menu, Popover, Transition } from '@headlessui/react';
import {
  BellIcon,
  MenuIcon,
  XIcon,
  SpeakerphoneIcon,
} from '@heroicons/react/outline';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import OtherApparel from 'components/profile/OtherApparel';
import { classNames } from 'utils/helpers';
import Link from 'next/link';

export default function ProfilePage(): ReactElement {
  const router = useRouter();
  const { username } = router.query;
  // const { data, error } = useSWR(`/api/profile/${username}`);

  // if (error) return <div>failed to load</div>;
  // if (!data) return <div>loading...</div>;

  // console.log(data);
  const masterlist = [
    '🎨 painting',
    '📸 photography',
    '🎥 videography',
    '🎙 podcasts',
    '📙 reading',
  ];
  const profile = {
    name: 'Moustafa Elhadary',
    imageUrl:
      'https://pbs.twimg.com/profile_images/1315750025125822466/7hLfs3Qy_400x400.jpg',
    coverImageUrl:
      'https://thumbs.dreamstime.com/b/giza-plateau-skyline-23265268.jpg',
    bio: 'Egyptian 🇪🇬. I love code, food and people equally.',
    fields: {
      Phone: '(555) 123-4567',
      Email: 'ricardocooper@example.com',
      Title: 'Senior Front-End Developer',
      Team: 'Product Development',
      Location: 'San Francisco',
      Sits: 'Oasis, 4th floor',
      Salary: '$145,000',
      Birthday: 'June 8, 1990',
    },
  };

  const apparel = {
    name: 'King Tut',
    role: 'Front-end Developer',
    imageUrl:
      'https://footwearnews.com/wp-content/uploads/2021/09/GW3354_01_standard-1-e1631901814188.jpg?w=700&h=437&crop=1',
    twitterUrl: '#',
    linkedinUrl: '#',
  };

  const user = {
    name: 'Whitney Francis',
    email: 'whitney@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
  };

  const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header>
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <Popover className="flex justify-between h-16">
            {({ open }) => (
              <>
                <div className="flex px-2 lg:px-0">
                  <div className="flex-shrink-0 flex items-center">
                    <Link href="#">
                      <a>
                        <img
                          className="h-16 w-auto sm:h-16"
                          src="/camels.png"
                          alt=""
                        />
                      </a>
                    </Link>
                  </div>
                  <nav
                    aria-label="Global"
                    className="hidden lg:ml-6 lg:flex lg:items-center lg:space-x-4"
                  ></nav>
                </div>
                <div className="flex items-center lg:hidden">
                  {/* Mobile menu button */}
                  <Popover.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black">
                    <span className="sr-only">Open main menu</span>
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
                <Transition.Root show={open} as={Fragment}>
                  <div className="lg:hidden">
                    <Transition.Child
                      as={Fragment}
                      enter="duration-150 ease-out"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="duration-150 ease-in"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Popover.Overlay
                        static
                        className="z-20 fixed inset-0 bg-black bg-opacity-25"
                        aria-hidden="true"
                      />
                    </Transition.Child>

                    <Transition.Child
                      as={Fragment}
                      enter="duration-150 ease-out"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="duration-150 ease-in"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Popover.Panel
                        focus
                        static
                        className="z-30 absolute top-0 right-0 max-w-none w-full p-2 transition transform origin-top"
                      >
                        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5  divide-y divide-gray-200 bg-white">
                          <div className="pt-3 pb-2">
                            <div className="flex items-center justify-between px-4">
                              <div>
                                <img
                                  className="h-16 w-auto sm:h-16"
                                  src="/camels.png"
                                  alt=""
                                />
                              </div>
                              <div className="-mr-2">
                                <Popover.Button className=" rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black">
                                  <span className="sr-only">Close menu</span>
                                  <XIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                  />
                                </Popover.Button>
                              </div>
                            </div>
                            <div className="mt-3 px-2 space-y-1"></div>
                          </div>
                          <div className="pt-4 pb-2">
                            <div className="flex items-center px-5">
                              <div className="flex-shrink-0">
                                <img
                                  className="h-16 w-16 rounded-full"
                                  src={user.imageUrl}
                                  alt=""
                                />
                              </div>
                              <div className="ml-3">
                                <div className="text-base font-medium text-gray-800">
                                  {user.name}
                                </div>
                                <div className="text-sm font-medium text-gray-500">
                                  {user.email}
                                </div>
                              </div>
                            </div>
                            <div className="mt-3 px-2 space-y-1">
                              {userNavigation.map((item) => (
                                <Link href={item.href}
                                    key={item.name}>
                                  <a
                                    className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800 z-10 bg-white"
                                  >
                                    {item.name}
                                  </a>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition.Child>
                  </div>
                </Transition.Root>
                <div className="hidden lg:ml-4 lg:flex lg:items-center">
                  <button
                    type="button"
                    className="flex-shrink-0  p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-4 relative flex-shrink-0">
                    {({ open }) => (
                      <>
                        <div>
                          <Menu.Button className=" rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-12 w-12 rounded-full"
                              src={user.imageUrl}
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          show={open}
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            static
                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 z-10 ring-1 ring-black ring-opacity-5 focus:outline-none"
                          >
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <Link href={item.href}>
                                    <a
                                      className={classNames(
                                        active ? 'bg-gray-100' : '',
                                        'block px-4 py-2 text-sm text-gray-700 bg-white'
                                      )}
                                    >
                                      {item.name}
                                    </a>
                                  </Link>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                  </Menu>
                </div>
              </>
            )}
          </Popover>
        </div>
      </header>

      <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last pb-24">
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
                    <h1 className="text-2xl font-bold text-gray-900 truncate text-center">
                      {profile.name}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1">
                <h1 className="text-2xl font-bold text-gray-900 truncate">
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
                      🎓 Penn State
                    </div>
                    <div className="mt-2 flex items-center text-lg text-gray-500">
                      📍 Miami, FL
                    </div>
                    <div className="mt-2 flex items-center text-lg text-gray-500">
                      <img className="h-4 w-4 mr-2" src="/tiktok.svg" alt="" />
                      <Link href="#">
                        <a className="text-md font-semibold text-gray-700 hover:text-gray-900">
                          moustafaelhadary
                        </a>
                      </Link>
                    </div>
                    <div className="mt-2 flex items-center text-lg text-gray-500">
                      <img
                        className="h-4 w-4 mr-2"
                        src="/instagram.svg"
                        alt=""
                      />
                      <Link href="#">
                        <a className="text-md font-semibold text-gray-700 hover:text-gray-900">
                          themoustafa
                        </a>
                      </Link>
                    </div>
                    <div className="mt-2 flex items-center text-lg text-gray-500">
                      <img className="h-5 w-5 mr-1" src="/twitter.png" alt="" />
                      <Link href="#">
                        <a className="text-md font-semibold text-gray-700 hover:text-gray-900">
                          themoustafa_
                        </a>
                      </Link>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>

          {/* fields */}
          <div className="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              {/* {Object.keys(profile.fields).map((field) => (
                <div key={field} className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">{field}</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {profile.fields[field]}
                  </dd>
                </div>
              ))} */}
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Bio</dt>
                <dd
                  className="mt-1 max-w-prose text-sm text-gray-900 space-y-5"
                  dangerouslySetInnerHTML={{ __html: profile.bio }}
                />
              </div>
            </dl>
          </div>

          <div className="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <dt className="text-sm font-medium text-gray-500">Interests</dt>
            <ul className=" mt-3">
              {masterlist.map((l) => {
                return (
                  <li
                    className="inline mr-2 cursor-pointer"
                    key={' ' + Math.random() * 100}
                  >
                    <div className="relative inline-flex items-center rounded-full border border-gray-300 px-3 py-2 mb-3 bg-black shadow">
                      <div className=" text-sm font-medium text-white">{l}</div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
            <div className="space-y-12">
              <div className="space-y-5">
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-center">
                  {apparel.name}
                </h2>
                <h3 className="text-xl font-light tracking-tight sm:text-2xl text-center -mt-8">
                  (#7/3000)
                </h3>
              </div>
              <div className="space-y-12">
                <div>
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
          </div>

          {/* images */}
          <OtherApparel name={profile.name} />
        </article>
      </main>
      <div className="fixed inset-x-0 bottom-0">
        <div className="bg-black">
          <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between flex-wrap">
              <div className="w-0 flex-1 flex items-center">
                <span className="flex p-2 rounded-lg bg-white">
                  <SpeakerphoneIcon
                    className="h-6 w-6 text-black"
                    aria-hidden="true"
                  />
                </span>
                <p className="ml-3 font-medium text-white">
                  <span className=" flex-wrap">
                    Sign in to receive $5 every time you scan a <i>Camels</i>{' '}
                    apparel !
                  </span>
                </p>
              </div>
              <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                <a
                  href="#"
                  className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-50"
                >
                  Learn more
                </a>
              </div>
              <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
                <button
                  type="button"
                  className="-mr-1 flex p-2 rounded-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
                >
                  <span className="sr-only">Dismiss</span>
                  <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
