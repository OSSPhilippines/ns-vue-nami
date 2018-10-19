# ns-vue-nami
Router companion for Nativescript-Vue 2.0's Manual Routing.

Yep, that's her, Nami from One Piece. Why? Coz she's a navigator.

## Installation

**npm**

`npm install ns-vue-nami`

**yarn**

`yarn add nami`

## Recommended Implementation

Create a `router` folder with an `index.js` file within your `app` folder.
```
app
|- components
|- router
   |- index.js
```

**index.js**

```javascript
import Vue from 'nativescript-vue';
import NsVueRouter from 'ns-vue-nami';
import foo from '~/components/foo';
import bar from '~/components/bar';

Vue.use(NsVueNami);

const vm = new Vue();

// register all routes here.
vm.$nami.register([
  {
    name: 'foo',
    component: foo
  },
  {
    name: 'bar',
    component: bar
  }
]);
```

**main.js**

Just invoke the router in your `main.js`

```javascript
import './router';
```

## Sample Usage

**From the template**

```vue
<button @tap="$nami.navigate('foo')">Go to foo</button>
```

**From script**

```javascript
export default {
  methods: {
    someFunc() {
      this.$nami.navigate('bar');
    }
  }
}
```

## API

**.register()**

> Registers all the routable components across the whole app.

```javascript
import cat from '~/components/cat';

vm.$nami.register([
  {
    name: 'cat-component',
    component: cat
  }
])
```

**.navigate()**

```javascript
// Basic
this.$nami.navigate('cat-component');

// With props
this.$nami.navigate('cat-component', {name: 'Kidlat', color: 'Black'});
```

```vue
<button @tap="$nami.navigate('cat-component', {name: 'Kidlat', color: 'Black'})">View Cat</button>
```

**.back()** 

> Goes back to the previous component.

```javascript
this.$nami.back();
```

```vue
<button @tap="$nami.back()">Go back</button>
```

**.showModal()** 

> Just like `.navigate()` but shows the component on a modal.

```javascript
// Basic
this.$nami.modal('cat-component');

// With props
this.$nami.modal('cat-component', {name: 'Kidlat', color: 'Black'});
```

```vue
<button @tap="$nami.modal('cat-component', {name: 'Kidlat', color: 'Black'})">View Cat in a Modal</button>
```
