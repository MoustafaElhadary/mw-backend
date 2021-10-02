import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { HTMLAttributes, ReactElement } from 'react';
const activeIconClass = 'text-white mr-3 h-6 w-6';
const normalIconClass = 'text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6';

const activeClass =
  'bg-black text-white group flex items-center px-2 py-2 text-base font-medium rounded-md';
const normalClass =
  'text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md';

const siteLinks = {
  home: ['/home'],
  communities: ['/c/[name]', '/p/[name]', '/communities'],
  groups: ['/g/[name]', '/groups'],
  events: ['/e/[name]', '/events'],
  friend: ['/friends'],
};

export enum PageType {
  home,
  communities,
  groups,
  events,
  friend,
}

interface IconProps extends HTMLAttributes<HTMLElement> {
  active?: boolean;
  Icon?: React.ElementType;
  text?: string;
  href?: string;
  type?: PageType;
}

export function FilledHomeIcon({ active, className }: IconProps): ReactElement {
  return (
    <svg
      className={
        className ? className : active ? activeIconClass : normalIconClass
      }
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
    </svg>
  );
}
export function HomeIcon({ active, className }: IconProps): ReactElement {
  return (
    <svg
      className={
        className ? className : active ? activeIconClass : normalIconClass
      }
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    </svg>
  );
}

export function GroupIcon({ active, className }: IconProps): ReactElement {
  return (
    <svg
      className={
        className ? className : active ? activeIconClass : normalIconClass
      }
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  );
}

export function EventsIcon({ active, className }: IconProps): ReactElement {
  return (
    <svg
      className={
        className ? className : active ? activeIconClass : normalIconClass
      }
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
}

export function FireIcon({ active, className }: IconProps): ReactElement {
  return (
    <svg
      className={
        className ? className : active ? activeIconClass : normalIconClass
      }
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
      />
    </svg>
  );
}

export function LocationIcon({ active, className }: IconProps): ReactElement {
  return (
    <svg
      className={
        className ? className : active ? activeIconClass : normalIconClass
      }
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

export function Logo({}: IconProps): ReactElement {
  return (
    <Link href="/">
      <a>
        <span className="sr-only">NoDramaNoPolitics</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-auto sm:h-8"
          viewBox="0 0 238 42"
        >
          <g>
            <g stroke="null" id="svg_12">
              <g
                stroke="null"
                transform="matrix(0.2443633502756328,0,0,0.2443633502756328,-5187.891440402716,-3955.1454874444753) "
                id="svg_4"
              >
                <path
                  stroke="null"
                  id="svg_6"
                  d="m21490.55007,16345.17201a4.74,4.74 0 0 0 3.23,5.27a8.31,8.31 0 0 0 2.57,0.31c4.79,-0.12 13,-0.34 12.88,-4.44c-0.05,-1.73 -3.45,-1.27 -8.31,-3.88c-4,-2.18 -4.73,-11.21 -4.49,-14.92c0.49,-7.54 3.45,-11.73 3.6,-19.24c0.19,-10 -3.41,-25.89 -1.49,-30.73s12.73,-9.9 19.56,-10.08s25.28,-0.66 32.51,-11.79s6.79,-24.58 13,-25.64c4.77,-0.8 6.49,-13.16 10.59,-13.26s12.3,-0.32 12.19,-4.42s-5.07,-10.81 -12.58,-10.61s-4.71,2.86 -8.13,2.94s-4.19,-3.3 -10.34,-3.14s-5.34,4.92 -8.73,5.7s-3.4,0.77 -4.07,1.47s2.23,6.78 2.23,6.78s-6.92,22.74 -13.77,22.23s-23.62,-14.42 -30.62,-19.05s-8.94,-1.82 -14.47,-4.41s-8.16,-24.4 -28,-23.19s-22.67,21.78 -30.06,26.76s-29.63,17.19 -34.88,25.53s-9.54,21.19 -6.87,43.87c0.38,3.25 6.17,-30.16 9.59,-30.25s5.83,25.81 1.19,31.4s-3.85,9.67 -3.76,13.08s6.74,22.39 3.59,32.73s5.84,14.2 10.63,14.07s11.59,-1 10.8,-5.06s-6.27,-4.63 -10.39,-5.2s-0.87,-59.46 4,-54.8s-0.34,13 -0.25,16.41s8.54,12.77 10.84,22.28s1.69,12.26 3.79,14.26s-0.49,7.53 9.08,7.28s9.51,-2.3 9.44,-5s-4.21,-4 -8.31,-3.89s-9.31,-16.16 -8.79,-22.33s-3,-9.49 -3.12,-15s5.63,-20 13.18,-18.81s35.67,2.39 43.76,0.22c6,-1.6 -3.65,17.19 -5.54,23.39s1.83,17.73 -2.11,24s-2.55,6.9 -1.83,8.25s-1.13,10.28 8.46,10c3.42,-0.09 8.2,-0.21 7.43,-3.61c-0.53,-2.31 -4.48,-3.58 -7,-4.16a2.24,2.24 0 0 1 -1.7,-2.57c0.57,-3.3 3,-9.71 4.61,-17.78c6.62,-34.35 3.9,-1.1 4.85,2.61a69.41,69.41 0 0 1 2.01,26.42z"
                  style={{ fill: '#F15A24' }}
                />
                <path
                  stroke="null"
                  id="svg_7"
                  d="m21353.38007,16311.97201l0,36.13a120.74,120.74 0 0 1 -27.15,3.57q-41.53,0 -67.34,-22.51t-25.81,-59.24q0,-34.08 26.05,-56.25t65.83,-22.17a127.1,127.1 0 0 1 28.42,3l0,36.17a111.08,111.08 0 0 0 -25.89,-3.3q-18.63,0 -30.95,12.3t-12.31,31.35q0,20.5 12.39,32.42t33.08,11.91a98.82,98.82 0 0 0 23.68,-3.38z"
                />
                <path
                  stroke="null"
                  id="svg_8"
                  d="m21615.50007,16195.72201l60.47,0q12.95,49.25 20.41,84.68l5.21,-23.59q3.17,-13.78 6.79,-26.9l9.32,-34.19l61.68,0l24,152.16l-47.37,0l-12.79,-104.63l-29.52,104.63l-32.32,0l-31,-104.86l-12.3,104.86l-45.31,0l22.73,-152.16z"
                />
                <path
                  stroke="null"
                  id="svg_9"
                  d="m21831.38007,16195.72201l96.78,0l0,32.37l-48.94,0l0,28l42.47,0l0,31.58l-42.47,0l0,27.69l49.25,0l0,32.49l-97.09,0l0,-152.13z"
                />
                <path
                  stroke="null"
                  id="svg_10"
                  d="m21968.15007,16195.72201l47.84,0l0,116.95l37.89,0l0,35.22l-85.73,0l0,-152.17z"
                />
                <path
                  stroke="null"
                  id="svg_11"
                  d="m22094.02007,16345.03201l0,-35.45q22.74,9.57 38.21,9.57q9,0 14.21,-3.59a11,11 0 0 0 5.21,-9.51q0,-4.56 -4.18,-8.55t-14.45,-9.69q-24.78,-13.68 -35.92,-25.47t-11.13,-26.27q0,-19.72 17.21,-32.14t44.52,-12.43a132.7,132.7 0 0 1 40.1,6.27l0,34.08q-21.32,-8.43 -34.57,-8.43q-8.85,0 -14,3.13t-5.14,8.61q0,9.57 23.84,21.54a135.88,135.88 0 0 1 28.82,19.89q14.6,12.81 14.6,29.69q0,19.71 -19.1,32.65t-48.47,12.94a120.79,120.79 0 0 1 -39.76,-6.84z"
                />
              </g>
            </g>
          </g>
        </svg>
      </a>
    </Link>
  );
}

export function IconWithText({
  active,
  Icon,
  text,
  href = '/',
}: IconProps): ReactElement {
  return (
    <Link href={href}>
      <a className={active ? activeClass : normalClass}>
        <Icon active={active} />
        {text}
      </a>
    </Link>
  );
}

export function IconLinkWithText({
  text,
  href = '/',
  type,
}: IconProps): ReactElement {
  const router = useRouter();

  let Icon: React.ElementType;
  switch (type) {
    case PageType.home:
      Icon = HomeIcon;
      break;
    case PageType.communities:
      Icon = LocationIcon;
      break;
    case PageType.groups:
      Icon = GroupIcon;
      break;
    case PageType.events:
      Icon = EventsIcon;
      break;
    case PageType.friend:
      Icon = FireIcon;
      break;

    default:
      Icon = FireIcon;
  }

  return (
    <IconWithText
      Icon={Icon}
      text={text}
      href={href}
      active={siteLinks[PageType[type]]?.includes(router.pathname)}
    />
  );
}
