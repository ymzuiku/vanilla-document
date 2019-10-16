export function decode(input: string) {
  try {
    return decodeURIComponent(input.replace(/\+/g, ' '));
  } catch (e) {
    return null;
  }
}

export function encode(input: string) {
  try {
    return encodeURIComponent(input);
  } catch (e) {
    return null;
  }
}

export function parse(query?: string, withoutNumber?: boolean) {
  if (!query) {
    return null;
  }

  const parser = /([^=?&]+)=?([^&]*)/g;
  const result: any = {};
  let part;

  // tslint:disable-next-line
  while ((part = parser.exec(query))) {
    const key = decode(part[1]);
    let value: any = decode(part[2]);

    if (key === null || value === null || key in result) {
      continue;
    }
    if (!withoutNumber) {
      value = isNaN(Number(value)) ? value : Number(value);
    }

    result[key] = value;
  }

  return result;
}

export function stringify(obj: any, prefix: string = '') {
  const pairs = [];
  let value: any;
  let key: any;

  //
  // Optionally prefix with a '?' if needed
  //
  if (typeof prefix !== 'string') {
    prefix = '?';
  }

  for (key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      value = obj[key];
      //
      // Edge cases where we actually want to encode the value to an empty
      // string instead of the stringified value.
      //
      if (!value && (value === null || value === undefined || isNaN(value))) {
        value = '';
      }

      key = encodeURIComponent(key);
      value = encodeURIComponent(value);

      //
      // If we failed to encode the strings, we should bail out as we don't
      // want to add invalid strings to the query.
      //
      if (key === null || value === null) {
        continue;
      }
      pairs.push(`${key}=${value}`);
    }
  }

  return pairs.length ? prefix + pairs.join('&') : '';
}

const queryString = {
  parse,
  stringify,
  decode,
  encode,
};

export default queryString;
