import { Component } from "./Component.js";

export const COMPONENT_CONFIG_ACTIVATED = Symbol();

export class ComponentLoader {
  componentsPath = import.meta.url.slice(0, import.meta.url.lastIndexOf('/') + 1) + '../../';
  
  /**@type {Map<string, Component>} */
  mapped = new Map();
  
  /**
   * 
   * @param {string[]} componentNames 
   */
  async load(...componentNames) {
    /**@type {Array<Promise<Component>>} */
    const loadingComponents = [];

    for (const name of componentNames) {
      loadingComponents.push(Component.load(this.componentsPath, name));
    }

    const components = await Promise.all(loadingComponents);

    for (const component of components) {
      this.mapped.set(component.name, component);
    }
  }
}