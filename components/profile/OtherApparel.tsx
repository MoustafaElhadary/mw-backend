/* eslint-disable @next/next/no-img-element */
import React, { ReactElement } from 'react';

export default function OtherApparel({ name }): ReactElement {
  const apparelList = [
    {
      name: 'Donda',
      imageUrl: '/1-back.png',
      count: 703,
    },
    {
      name: 'GD',
      imageUrl: '/1-back.png',
      count: 3201,
    },
    {
      name: 'Blue 🍎',
      imageUrl: '/1-front.png',
      count: 420,
    },
  ];
  return (
    <div className="mx-auto px-4 max-w-7xl py-6 sm:px-6 lg:px-8 lg:py-24">
      <div className="space-y-12">
        <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-4xl text-center align-middle">
            Other merch {name} owns &#8594;
          </h2>
        </div>
        <ul className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8">
          {apparelList.map((apparel, index) => (
            <li key={`${apparel.name} ${index}`}>
              <div className="space-y-4">
                <div className="aspect-w-3 aspect-h-2">
                  <img
                    className="object-cover shadow-lg rounded-lg w-96 h-96 relative mx-auto"
                    src={apparel.imageUrl}
                    alt=""
                  />
                </div>

                <div className="space-y-2">
                  <div className="text-lg leading-6 font-bold space-y-1">
                    <h3 className="text-center">{apparel.name} &#8594;</h3>
                  </div>
                  <div className="text-lg leading-6 font-light space-y-1">
                    <h3 className="text-center">
                      viewed {apparel.count} times
                    </h3>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
