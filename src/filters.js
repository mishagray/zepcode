export function camelizeFilter(str) {
  return str.replace(/\W+(.)/g, (match, chr) => chr.toUpperCase());
}

export default camelizeFilter;

export function leadingLowerFilter(str) {
  return `${str[0].toLowerCase()}${str.slice(1)}`;
}

export function camelizeLeadingLowerFilter(str) {
  return leadingLowerFilter(camelizeFilter(str));
}
