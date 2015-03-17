/**
 * An HtmlObject that renders to markup.
 *
 * @param {string} [tag] The tag for the new element. E.g. "div" or "span".
 * @param {Object} [attributes] An object of attributes. E.g. {id:"myId"}
 *
 * @class HtmlObject
 * @license MIT
 * @constructor
 */
function HtmlObject(tag, attributes) {
  attributes = attributes || {};

  this.tag = tag || 'div';
  this.children = [];
  this.content = '';
  this.appendPrepend = 'append';

  this.setAttributes(attributes);
  this.setIsVoid(this.isVoidElement(this.tag));
}

/**
 * Object methods.
 */
HtmlObject.prototype = {

  /**
   * An array of elements considered void.
   */
  voidElements : [
    'area',
    'base',
    'br',
    'col',
    'command',
    'embed',
    'hr',
    'img',
    'input',
    'keygen',
    'link',
    'meta',
    'param',
    'source',
    'track',
    'wbr'
  ],

  /**
   * Holds if this element is xhtml
   */
  xhtml : false,

  /**
   * Holds if this element is void
   */
  void : false,

  /**
   * Set if this element is void. This is useful for custom elements that you think should be void (think angularjs).
   *
   * @param {boolean} isVoid Boolean indicating if this element should, or should not be void.
   *
   * @returns {HtmlObject} Fluent interface
   */
  setIsVoid : function(isVoid) {
    this.void = !!isVoid;

    return this;
  },

  /**
   * Returns whether or not this element's, or the supplied tag is void.
   *
   * @param {string} [tag] The tag you wish to check is void.
   *
   * @returns {boolean} If this element, or the supplied tag is considered void.
   */
  isVoidElement : function(tag) {
    if (!tag) {
      return this.void;
    }

    return this.voidElements.indexOf(tag) > -1;
  },

  /**
   * Returns whether or not this element is void
   *
   * @returns {boolean} If this element is Xhtml
   */
  isXhtml : function() {
    return this.xhtml;
  },

  /**
   * Set whether or not this element is Xhtml.
   *
   * @param {boolean} boolean True to set to xhtml, false to set to html x.
   *
   * @returns {HtmlObject} Fluent interface
   */
  setIsXhtml : function(boolean) {
    this.xhtml = !!boolean;

    return this;
  },

  /**
   * Get this element's tag name
   *
   * @returns {string} The tag of this element
   */
  getTag : function() {
    return this.tag;
  },

  /**
   * Remove a specific attribute.
   *
   * @param {string} attribute The name of the attribute to remove.
   *
   * @returns {HtmlObject} Fluent interface
   */
  removeAttribute : function(attribute) {
    if (typeof this.attributes[attribute] !== 'undefined') {
      delete this.attributes[attribute];
    }

    return this;
  },

  /**
   * Get this element's attributes.
   *
   * @returns {Object} The element's attributes.
   */
  getAttributes : function() {
    return this.attributes;
  },

  /**
   * Get a specific attribute.
   *
   * @param {string} attribute The name of the attribute you wish to get.
   *
   * @returns {string|null} The value of the attribute, or null when not set.
   */
  getAttribute : function(attribute) {
    if (typeof this.attributes[attribute] !== 'undefined') {
      return this.attributes[attribute];
    }

    return null;
  },

  /**
   * Set (and overwrite) the attributes.
   *
   * @param {Object} attributes An object of attributes to set.
   *
   * @returns {HtmlObject} Fluent interface
   */
  setAttributes : function(attributes) {
    this.attributes = attributes;

    return this;
  },

  /**
   * Add multiple attributes.
   *
   * @param {Object} attributes An object of attributes to add.
   *
   * @returns {HtmlObject} Fluent interface
   */
  addAttributes : function(attributes) {
    Object.getOwnPropertyNames(attributes).forEach(function(attribute) {
      this.setAttribute(attribute, attributes[attribute]);
    });

    return this;
  },

  /**
   * Set a specific attribute.
   *
   * @param {string} attribute The name of the attribute you wish to set.
   * @param {string} value The value of the attribute.
   *
   * @returns {HtmlObject} Fluent interface
   */
  setAttribute : function(attribute, value) {
    this.attributes[attribute] = value;

    return this;
  },

  /**
   * Set content placement to "append".
   * this will append the content to the body _after_ the child elements.
   *
   * @returns {HtmlObject} Fluent interface
   */
  setAppendContent : function() {
    this.appendPrepend = 'append';

    return this;
  },

  /**
   * Set content placement to "prepend".
   * this will prepend the content to the body _before_ the child elements.
   *
   * @returns {HtmlObject} Fluent interface
   */
  setPrependContent : function() {
    this.appendPrepend = 'prepend';

    return this;
  },

  /**
   * Convenience method. Add an array of multiple classes at once.
   *
   * @param {Array} classes The classes to add.
   *
   * @returns {HtmlObject} Fluent interface
   */
  addClasses : function(classes) {
    classes.forEach(function(className) {
      this.addClass(className);
    }, this);

    return this;
  },

  /**
   * Convenience method. Add a class to the element.
   *
   * @param {string} className The class to add.
   *
   * @returns {HtmlObject} Fluent interface
   */
  addClass : function(className) {
    var classes = this.getAttribute('class') || [];

    if (typeof classes === 'string') {
      classes = classes.split(' ');
    }

    classes.push(className);

    return this.setAttribute('class', classes.join(' '));
  },

  /**
   * Convenience method. Remove a class from the element.
   *
   * @param {string} className The class to remove.
   *
   * @returns {HtmlObject} Fluent interface
   */
  removeClass : function(className) {
    var classes = this.getAttribute('class')
      , classIndex;

    if (null === classes) {
      return this;
    }

    classes = classes.split(' ');

    classIndex = classes.indexOf(className);

    if (classIndex > -1) {
      classes.splice(classIndex, 1);
    }

    return this.setAttribute('class', classes.join(' '));
  },

  /**
   * Set (and overwrite) content.
   *
   * @param {string} content The content to set
   *
   * @returns {HtmlObject} Fluent interface
   */
  setContent : function(content) {
    this.content = content;

    return this;
  },

  /**
   * Add (append) content.
   *
   * @param {string} content The content to append to the existing content.
   *
   * @returns {HtmlObject} Fluent interface
   */
  appendContent : function(content) {
    this.content += content;

    return this;
  },

  /**
   * Add (prepend) content.
   *
   * @param {string} content The content to prepend to the existing content.
   *
   * @returns {HtmlObject} Fluent interface
   */
  prependContent : function(content) {
    this.content = content + this.content;

    return this;
  },

  /**
   * Clear (remove) the content.
   *
   * @returns {HtmlObject} Fluent interface
   */
  clearContent : function() {
    this.content = '';

    return this;
  },

  /**
   * Render the attributes to a string.
   *
   * @returns {string} A rendered string of attributes.
   */
  renderAttributes : function() {
    var attributesString = ''
      , attributes = this.attributes
      , attribute;

    if (Object.keys(attributes).length === 0) {
      return attributesString;
    }

    Object.getOwnPropertyNames(attributes).forEach(function(attribute) {
      attributesString += ' ' + attribute + '="' + attributes[attribute] + '"';
    });

    return attributesString;
  },

  /**
   * Convenience method. Set data-something.
   *
   * @param {string} key The key for the data attribute you wish to set
   * @param {string} value The value to set for key.
   *
   * @returns {HtmlObject} Fluent interface
   */
  setData : function(key, value) {
    return this.setAttribute('data-' + key, value);
  },

  /**
   * Convenience method. Get data-something.
   *
   * @param {string} key The key for the data attribute you wish to get.
   *
   * @returns {string} The value of the data attribute.
   */
  getData : function(key) {
    return this.getAttribute('data-' + key);
  },

  /**
   * Convenience method. jQuery-like syntax for data.
   *
   * @param {string} key The key for which you wish to get or set the value.
   * @param {string} [value] The value to set for key.
   *
   * @returns {HtmlObject|string} Fluent interface, or data value on get.
   */
  data : function(key, value) {
    if (typeof value === 'undefined') {
      return this.getData(key);
    }

    return this.setData(key, value);
  },

  /**
   * Convenience method. Remove data-something.
   *
   * @param {string} key Remove the data-something value.
   *
   * @returns {HtmlObject} Fluent interface
   */
  removeData : function(key) {
    return this.removeAttribute('data-' + key);
  },

  /**
   * Render the children for this element.
   *
   * @returns {string} The rendered string.
   */
  renderChildren : function() {
    var childString = '';

    this.children.forEach(function(child) {
      childString += child.render();
    });

    return childString;
  },

  /**
   * Add a child to this element
   *
   * @param {HtmlObject} child The child instance.
   *
   * @returns {HtmlObject} Fluent interface
   */
  addChild : function(child) {
    this.children.push(child);

    return this;
  },

  /**
   * Spawn a new child for this element.
   *
   * @param {string} [tag] The tag for the child element.
   * @param {Object} [attributes] An object of properties for the child element.
   *
   * @returns {HtmlObject} Fluent interface} The child element
   */
  spawnChild : function(tag, attributes) {
    var child = new HtmlObject(tag, attributes);

    child.setIsXhtml(this.isXhtml());

    this.addChild(child);

    return child;
  },

  /**
   * Render this element.
   *
   * @returns {string} The rendered output.
   */
  render : function() {
    var body = ''
      , elementParts;

    elementParts = [
      '<',
      this.getTag(),
      this.renderAttributes()
    ];

    if (this.isVoidElement()) {
      if (this.isXhtml()) {
        elementParts.push(' /');
      }

      elementParts.push('>');

      return elementParts.join('');
    } else {
      elementParts.push('>');
    }

    if (this.children.length > 0) {
      body = this.renderChildren();
    }

    if (this.appendPrepend === 'prepend') {
      elementParts.push(this.content, body);
    } else {
      elementParts.push(body, this.content);
    }

    elementParts = elementParts.concat([
      '<',
      '/',
      this.getTag(),
      '>'
    ]);

    return elementParts.join('');
  }
};

module.exports = HtmlObject;
