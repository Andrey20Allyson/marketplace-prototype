import { PropReciver } from "./PropReciver.js";

export const PROP_REGEXP = /{{([^ ]+)}}/sg;

/**
 * 
 * @param {string} html 
 * @param {Map<string, string>} props 
 * @returns {HTMLElement}
 */
export function compile(html, props = new Map()) {
  const htmlWithProps = html.replace(PROP_REGEXP, (_, text) => {
    const { name, defaultValue } = PropReciver.compile(text);

    return props.get(name) ?? defaultValue;
  });

  const div = document.createElement('div');
  div.innerHTML = htmlWithProps;

  const element = div.children.item(0);

  return element ?? document.createDocumentFragment();
}

/**
 * 
 * @param {string} styleSheetName 
 */
export function addStyleSheetLink(url) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = url;

  document.head.appendChild(link);

  return link;
}