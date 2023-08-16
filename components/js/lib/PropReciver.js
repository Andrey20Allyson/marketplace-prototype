export class PropReciver {
  name
  defaultValue

  /**
   * 
   * @param {string} name
   * @param {string} defaultValue  
   */
  constructor(name, defaultValue = '') {
    this.name = name;
    this.defaultValue = defaultValue;
  }

  /**
   * 
   * @param {string} text 
   */
  static compile(text) {
    const entries = text.split('=');
    if (entries.length > 2) throw new Error(`invalid input "${text}"`);

    /**@type {[string, string | undefined]} */
    const [name, defaultValueText] = entries;
    let defaultValue = undefined;

    if (defaultValueText) {
      const dvTextStart = defaultValueText.indexOf('"') + 1;
      const dvTextEnd = defaultValueText.indexOf('"', dvTextStart);
      if (dvTextStart === -1 || dvTextEnd === -1) throw new Error(`invalid default value "${defaultValueText}"`);

      defaultValue = defaultValueText.slice(dvTextStart, dvTextEnd);
    }

    return new this(name.trim(), defaultValue);
  }
}