import { SpeakerphoneIcon, XIcon } from '@heroicons/react/outline';
import React, { Fragment, useState } from 'react';
import { Menu, Popover, Transition, Dialog } from '@headlessui/react';

export default function Banner() {
  const [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <div
        >
          <div className="">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
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
                            Sign in to receive $5 every time you scan a{' '}
                            <i>Camels</i> apparel !
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
                          <XIcon
                            className="h-6 w-6 text-white"
                            aria-hidden="true"
                            onClick={closeModal}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Payment successful
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Your payment has been successfully submitted. We’ve sent you
                    an email with all of the details of your order.
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    Got it, thanks!
                  </button>
                </div>
              </div> */}
            </Transition.Child>
          </div>
        </div>
      </Transition>

      {/* <div className="fixed inset-x-0 bottom-0">
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
    </div> */}
    </>
  );
}
