import { ComponentConfig } from "./ComponentConfig.js";
import { HTML } from "./index.js";

export class Component {
  static IMPORT_STYLES_CONFIG_NAME = 'import-styles';
  static IMPORT_COMPONENTS_CONFIG_NAME = 'import-components';
  path;
  name;
  html;
  config;

  /**
   * 
   * @param {string} path 
   * @param {string} name
   * @param {string} html  
   */
  constructor(path, name, html) {
    this.path = path;
    this.name = name;
    this.html = html;

    this.config = new ComponentConfig(this);
  }

  /**
   * 
   * @param {Element} element 
   */
  render(element) {
    const props = Array.from(element.attributes).map(/**@return {[string, string]} */ attr => [attr.name, attr.value]);
    const propMap = new Map(props);

    propMap.set('children', element.innerHTML);

    const newElement = this.compile(propMap);

    element.replaceWith(newElement);

    return this;
  }

  /**
   * 
   * @param {Map<string, string>} props 
   */
  compile(props) {
    return HTML.compile(this.html, props);
  }

  createCompiler() {
    /**
     * 
     * @param {Map<string, string>} props 
     */
    const compiler = props => this.compile(props);

    return compiler;
  }

  loadDependencies() {
    const importStylesConfig = this.config.get(Component.IMPORT_STYLES_CONFIG_NAME);

    if (importStylesConfig) {
      const styleSheetName = importStylesConfig === true ? this.name + '.css' : importStylesConfig;

      HTML.addStyleSheetLink(this.path + styleSheetName);
    }
  }

  /**
   * 
   * @param {string} path 
   * @param {string} name 
   */
  static async load(path, name) {
    const resp = await fetch(path + name + '.html');
    const html = await resp.text();

    const component = new this(path, name, html);

    component.loadDependencies();

    return component;
  }
}