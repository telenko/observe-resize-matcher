# General description
Library provides attribute-matcher to observe elements resizing declaratively. To read more about matchers take a look at:
https://github.com/telenko/matcher-js
https://medium.com/@mangolik931/matcherjs-new-way-of-making-dom-extensions-ddb8a6f088ec

# Purpose of creating
Makes much easier to observe elements resize by declarative API. Library uses ResizeObserver polyfill under the hood.

# API
1) Install library
```
npm i @telenko/onresize
```
2) Include library to your code-base
```Javascript
import '@telenko/onresize';
```
3) Use 'observe-resize' attribute for your elements
```HTML
<div id="container" observe-resize onresize="alert('I am resized!!')">
  <custom-element observe-resize>I'm custom element and can be resized!</custom-element>
</div>

```
4) Listen for 'resize' event
```Javascript
const container = document.getElementById("container");
container.addEventListener("resize", event => {
  const { left, top, width, height } = event.detail;
});
container.style.width = "200px";
//callback called
container.style.width = "250px";
//callback called
```
5) After removing 'observe-resize' attribute observer will disconnect
```Javascript
container.removeAttribute("observe-resize");
container.style.width = "100px";//no callback on resize called anymore
```

# Catches RESIZE when
Since matcher is based on ResizeObserver polyfill - please take a look at it first to know behavior.
Generally resize will be emitted EACH time when real size of element on screen was changed.
It can be after such events:
1) Direct width/height was changed for element
2) Window resize caused resize of element
3) Other "class" or "style" rules was changed for element
4) Same rules for children/parents of observed element IF these changes caused real resize