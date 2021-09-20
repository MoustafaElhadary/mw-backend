/* eslint-disable @next/next/no-img-element */
import React, { ReactElement } from 'react';
import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/solid';
import { classNames } from 'utils/helpers';

export default function Stats(): ReactElement {
  const stats = [
    {
      name: 'Total Subscribers',
      stat: '71,897',
      previousStat: '70,946',
      change: '12%',
      changeType: 'increase',
    },
    {
      name: 'Avg. Open Rate',
      stat: '58.16%',
      previousStat: '56.14%',
      change: '2.02%',
      changeType: 'increase',
    },
    {
      name: 'Avg. Click Rate',
      stat: '24.57%',
      previousStat: '28.62%',
      change: '4.05%',
      changeType: 'decrease',
    },
  ];
  return (
    <div className="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.name}
            className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6"
          >
            <dt className="text-base font-normal text-gray-900">{item.name}</dt>
            <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
              <div className="flex items-baseline text-2xl font-semibold text-black">
                {item.stat}
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
