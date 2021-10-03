/* eslint-disable @next/next/no-img-element */
import { Dialog, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import Cart from 'components/Cart';
import Auth from 'components/login';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import React, { Fragment, ReactElement, useState } from 'react';
import { useAppSelector } from 'redux/store';
import { supabase } from 'utils/supabaseClient';

export type LayoutProps = {
  children: JSX.Element | JSX.Element[];
  authRequired?: boolean;
};
export default function Layout({
  children,
  authRequired,
}: LayoutProps): ReactElement {
  const [open, setOpen] = useState(false);
  const session = useAppSelector((state) => state.auth.session);
  const profile = useAppSelector((state) => state.user.profile);

  if (authRequired && !session) return <Auth />;

  return (
    <div style={{ backgroundColor: '#f7f5f0' }}>
      <NextSeo
        title="Camels Apparel"
        description="It’s time for you to represent .... YOU"
      />
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-40 lg:hidden"
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div
              className="relative max-w-xs w-full  shadow-xl pb-12 flex flex-col overflow-y-auto"
              style={{ backgroundColor: '#f7f5f0' }}
            >
              <div className="px-4 pt-5 pb-2 flex">
                <button
                  type="button"
                  className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                <div className="flow-root">
                  <a
                    href="#"
                    className="-m-2 p-2 block font-medium text-gray-900"
                  >
                    Sign in
                  </a>
                </div>
                <div className="flow-root">
                  <a
                    href="#"
                    className="-m-2 p-2 block font-medium text-gray-900"
                  >
                    Create account
                  </a>
                </div>
              </div>

              <div className="border-t border-gray-200 py-6 px-4">
                <a href="#" className="flex items-center">
                  <img
                    src="/camels.png"
                    alt=""
                    className="h-14 w-auto block flex-shrink-0"
                  />
                </a>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
      <header className="relative overflow-hidden">
        {/* Top navigation */}
        <nav
          aria-label="Top"
          className="relative z-20 bg-opacity-90 backdrop-filter backdrop-blur-xl"
          style={{ backgroundColor: '#f7f5f0' }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-16 flex items-center">
              <button
                type="button"
                className=" p-2 rounded-md text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link href="/">
                  <a>
                    <span className="sr-only">Workflow</span>
                    <img className="h-16 w-auto" src="/camels.png" alt="" />
                  </a>
                </Link>
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {session && profile ? (
                    <a
                      href="#"
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {profile.firstName} {profile.lastName}
                    </a>
                  ) : (
                    <a
                      href="#"
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Sign in
                    </a>
                  )}

                  <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  {session && profile ? (
                    <a
                      onClick={() => supabase.auth.signOut()}
                      className="text-sm font-medium text-gray-700 hover:text-gray-800 hover:cursor-pointer"
                    >
                      sign out
                    </a>
                  ) : (
                    <a
                      href="#"
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Create account
                    </a>
                  )}
                </div>

                {/* Cart */}
                <Cart />
              </div>
            </div>
          </div>
        </nav>
      </header>
      {children}
      {/* <Banner /> */}
    </div>
  );
}
