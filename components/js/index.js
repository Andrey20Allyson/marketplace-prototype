import { ComponentLoader } from './lib/index.js';

export const RenderEvents = {
  /**@type {'render:end'} */
  END: 'render:end',
};

export const componentLoader = new ComponentLoader();

function render() {
  const searchInMarketComponent = componentLoader.mapped.get('SearchInMarket')

  for (const componentName of componentLoader.mapped.keys()) {
    const component = componentLoader.mapped.get(componentName);
    if (!component) continue;

    while (true) {
      const element = document.querySelector(componentName);
      if (!element) break;

      component.render(element);
    }
  }

  const ev = new Event(RenderEvents.END);

  document.dispatchEvent(ev);
}

function importedComponents() {
  const components = [];

  for (const usingDeclaration of document.querySelectorAll('using')) {
    for (const componentDeclaration of usingDeclaration.querySelectorAll('component')) {
      const componentName = componentDeclaration.textContent;

      if (componentName && componentName.length > 0) components.push(componentName);
    }

    usingDeclaration.remove();
  }

  return components;
}

componentLoader
  .load(...importedComponents())
  .then(render);