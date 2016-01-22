# React Gallery

Elegant gallery with swipe.

WORK IN PROGRESS many changes will be made to core function.

Check it out
[ferndopolis.github.io/react-gallery](http://ferndopolis.github.io/react-gallery/)

## Basic Usage

```jsx
const images = [
  { title: 'Foo', src: 'http://example.com/foo.jpg' },
  { title: 'Bar', src: 'http://example.com/bar.jpg' }
]

<Gallery images={this.images} />
```

## Props

|Property|Type|Default|Description|
|--------|----|-------|-----------|
| loop | bool | false | inifinte loop through gallery |
| images | array | undefined | required list of images |
| animate | string | null | optional animate style [ slideLR, slideUD, fade ] |


## Local Development

` npm install `
` npm test `
` npm start `
` npm watch `

Point browser to [`localhost:8080`](http://localhost:8080)
