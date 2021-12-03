// import {} from "/"

import moment from 'moment';

// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
export function makeId(length: number): string {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// https://gist.github.com/codeguy/6684588#gistcomment-2759673
export function slugify(str: string): string {
  str = str.trim();
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  const from = 'åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;';
  const to = 'aaaaaaeeeeiiiioooouuuunc------';

  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  return str
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-') // collapse dashes
    .replace(/^-+/, '') // trim - from start of text
    .replace(/-+$/, '') // trim - from end of text
    .replace(/-/g, '_');
}

export function formatPhoneNumber(phoneNumberString: string): string {
  //normalize string and remove all unnecessary characters
  phoneNumberString = phoneNumberString.replace(/[^\d]/g, '');

  console.log(phoneNumberString);
  //check if number length equals to 10
  if (phoneNumberString.length == 10) {
    //reformat and return phoneNumberString number
    return phoneNumberString.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  }

  return null;
}
export function numberWithCommas(x: string): string {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

export function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

export function roundup(value: number, minimum: number = 0.45): number {
  return Math.ceil(value) - value >= minimum
    ? Math.ceil(value) - value
    : minimum;
}

export function getNextMonday() {
  const today = moment();
  const day = today.day();
  const nextMonday = today.add(7 - day, 'days');
  return nextMonday;
}


export function groupBy(xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}
