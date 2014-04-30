# Html-object
A very simple module that helps you build html structures programmatically.

## Installation
Using npm, simply run:

`npm install html-object --save`

## Usage
Usage is pretty straight-forward. Simply instantiate a new `HtmlObject` and start creating awesome-sauce.

```js
var HtmlObject = require('html-object') // Require HtmlObject
  , list = new HtmlObject('ul');        // Create a new instance.

// Add some children
list.spawnChild('li').addClass('list-item').setContent('I am an item!');
list.spawnChild('li').addClass('list-item').setContent('And so am I!');
list.spawnChild('li').addClass('list-item').setContent('Look at us being sassy!');

// Now let's get some output.
console.log(list.render());

// <ul><li class="list-item">I am an item!</li><li class="list-item">And so am I!</li><li class="list-item">Look at us being sassy!</li></ul>
```

## Interface

### Class HtmlObject

#### HtmlObject(tag, attributes)
> An HtmlObject that renders to markup.

#### Parameters

**[tag]**: *string*, The tag for the new element. E.g. "div" or "span".

**[attributes]**: *Object*, An object of attributes. E.g. {id:"myId"}

### Methods

#### setIsVoid(isVoid)
> Set if this element is void. This is useful for custom elements that you think should be void (think angularjs).

##### Parameters

**isVoid**:  *boolean*,  Boolean indicating if this element should, or should not be void.

##### Returns

*HtmlObject*,  Fluent interface

***

#### isVoidElement([tag])
> Returns whether or not this element's, or the supplied tag is void.

#### Parameters

**[tag]**:  *string*,  The tag you wish to check is void.

#### Returns

*boolean*,  If this element, or the supplied tag is considered void.

***

#### isXhtml()
> Returns whether or not this element is void



#### Returns

*boolean*,  If this element is Xhtml

***

#### setIsXhtml(boolean)
> Set whether or not this element is Xhtml.




#### Parameters

**boolean**:  *boolean*,  True to set to xhtml, false to set to html x.

#### Returns

*HtmlObject*,  Fluent interface

***

#### getTag()
> Get this element's tag name



#### Returns

*string*,  The tag of this element

***

#### removeAttribute(attribute)
> Remove a specific attribute.




#### Parameters

**attribute**:  *string*,  The name of the attribute to remove.

#### Returns

*HtmlObject*,  Fluent interface

***

#### getAttributes()
> Get this element's attributes.



#### Returns

*Object*,  The element's attributes.

***

#### getAttribute(attribute)
> Get a specific attribute.




#### Parameters

**attribute**:  *string*,  The name of the attribute you wish to get.

#### Returns

*string|null*,  The value of the attribute, or null when not set.

***

#### setAttributes(attributes)
> Set (and overwrite) the attributes.




#### Parameters

**attributes**:  *Object*,  An object of attributes to set.

#### Returns

*HtmlObject*,  Fluent interface

***

#### addAttributes(attributes)
> Add multiple attributes.




#### Parameters

**attributes**:  *Object*,  An object of attributes to add.

#### Returns

*HtmlObject*,  Fluent interface

***

#### setAttribute(attribute, value)
> Set a specific attribute.




#### Parameters

**attribute**:  *string*,  The name of the attribute you wish to set.

**value**:  *string*,  The value of the attribute.

#### Returns

*HtmlObject*,  Fluent interface

***

#### setAppendContent()
> Set content placement to "append".
this will append the content to the body _after_ the child elements.



#### Returns

*HtmlObject*,  Fluent interface

***

#### setPrependContent()
> Set content placement to "prepend".
this will prepend the content to the body _before_ the child elements.



#### Returns

*HtmlObject*,  Fluent interface

***

#### addClasses(classes)
> Convenience method. Add an array of multiple classes at once.




#### Parameters

**classes**:  *Array*,  The classes to add.

#### Returns

*HtmlObject*,  Fluent interface

***

#### addClass(className)
> Convenience method. Add a class to the element.




#### Parameters

**className**:  *string*,  The class to add.

#### Returns

*HtmlObject*,  Fluent interface

***

#### removeClass(className)
> Convenience method. Remove a class from the element.




#### Parameters

**className**:  *string*,  The class to remove.

#### Returns

*HtmlObject*,  Fluent interface

***

#### setContent(content)
Set (and overwrite) content.




#### Parameters

**content**:  *string*,  The content to set

#### Returns

*HtmlObject*,  Fluent interface

***

#### appendContent(content)
> Add (append) content.




#### Parameters

**content**:  *string*,  The content to append to the existing content.

#### Returns

*HtmlObject*,  Fluent interface

***

#### prependContent(content)
> Add (prepend) content.




#### Parameters

**content**:  *string*,  The content to prepend to the existing content.

#### Returns

*HtmlObject*,  Fluent interface

***

#### clearContent()
> Clear (remove) the content.



#### Returns

*HtmlObject*,  Fluent interface

***

#### renderAttributes()
> Render the attributes to a string.



#### Returns

*string*,  A rendered string of attributes.

***

#### setData(key, value)
> Convenience method. Set data-something.




#### Parameters

**key**:  *string*,  The key for the data attribute you wish to set

**value**:  *string*,  The value to set for key.

#### Returns

*HtmlObject*,  Fluent interface

***

#### getData(key)
> Convenience method. Get data-something.




#### Parameters

**key**:  *string*,  The key for the data attribute you wish to get.

#### Returns

*string*,  The value of the data attribute.

***

#### data(key, [value])
> Convenience method. jQuery-like syntax for data.




#### Parameters

**key**:  *string*,  The key for which you wish to get or set the value.

**[value]**:  *string*,  The value to set for key.

#### Returns

*HtmlObject|string*,  Fluent interface, or data value on get.

***

#### removeData(key)
> Convenience method. Remove data-something.




#### Parameters

**key**:  *string*,  Remove the data-something value.

#### Returns

*HtmlObject*,  Fluent interface

***

#### renderChildren()
> Render the children for this element.



#### Returns

*string*,  The rendered string.

***

#### addChild(child)
> Add a child to this element




#### Parameters

**child**:  *HtmlObject*,  The child instance.

#### Returns

*HtmlObject*,  Fluent interface

***

#### spawnChild([tag], [attributes])
> Spawn a new child for this element.

#### Parameters

**[tag]**:  *string*,  The tag for the child element.

**[attributes]**:  *Object*,  An object of properties for the child element.

#### Returns

*HtmlObject*,  Fluent interface} The child element

***
#### render()
> Render this element.


#### Returns

*string*,  The rendered output.

