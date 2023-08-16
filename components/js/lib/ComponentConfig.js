import { Component } from "./Component.js";

export class ComponentConfig {
  static COMMENT_REGEXP = /<!--(.*)-->/sg;
  static CONFIG_REGEXP = /@([^@ =]*)(="(.*)")?/sg;

  /**
   * @private
   * @type {Map<string, string | true>}
   */
  _map;
  component;

  /**
   * 
   * @param {Component} component 
   */
  constructor(component) {
    this._map = new Map();
    this._component = component;

    this.compile();
  }

  /**
   * 
   * @param {string} key 
   */
  get(key) {
    return this._map.get(key) ?? null;
  }

  /**
   * 
   * @param {string} key 
   * @param {string | true} value 
   */
  set(key, value) {
    this._map.set(key, value);
  }

  /**
   * 
   * @param {string} key 
   */
  delete(key) {
    this._map
  }

  compile() {
    while (true) {
      const [, comment] = ComponentConfig.COMMENT_REGEXP.exec(this._component.html) ?? [];
      if (!comment) break;

      while (true) {
        const [, name, , value = true] = ComponentConfig.CONFIG_REGEXP.exec(comment) ?? [];
        if (!name) break;

        this.set(name.trim(), value);
      }
    }

    return this;
  }
}