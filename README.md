## React-awesome-carousel

[Demo](https://ovlwxk3xqy.codesandbox.io/)

![](https://ucarecdn.com/ab0f255b-512f-42ef-a543-9e36e1543399/ezgifcomoptimize.gif)

### Installation

---

**via NPM**

```code
npm i react-awesome-carousel
```

**via Yarn**

```code
yarn add react-awesome-carousel
```

**via CDN (unpkg)**

```code
https://unpkg.com/react-awesome-carousel@1.0.5/dest/react-awesome-carousel.js
```

UMD library exposed as `ReactAwesomeCarousel`

```js
const { Carousel, Dots } = ReactAwesomeCarousel;
```

### Stylesheet

```jsx
import "react-awesome-carousel/react-awesome-carousel.css";
```

**via CDN (unpkg)**

```code
https://unpkg.com/react-awesome-carousel@1.0.5/dest/react-awesome-carousel.css
```

The basic carousel sample.The Carousel component returns a callback function with the following arguments.
So, you can deeply customize the render.

`galleryProps` and `ulProps` must be passed down to the elements

```jsx
<Carousel itemWidth={320} showCount={4} data={this.state.data}>
	{(galleryProps, ulProps, data) => {
		return (
			<div>
				<div {...galleryProps}>
					<ul {...ulProps}>{this.state.data.map(renderItem)}</ul>
				</div>
			</div>
		);
	}}
</Carousel>
```

But the Carousel component also returns other arguments, like `step`, `goTo`, `next`, `prev`, `Scrollbar`, `DotsProps`

### Moving and Touching

```jsx
<Carousel enableMoving={true} ... />
```

![](https://res.cloudinary.com/dxv8p5zck/image/upload/q_auto/v1516352523/rac-prev-move_kp9fxa.gif)

#### For touch devices

For the component to work, for example, on mobile devices, set the value to true for touching.

```jsx
<Carousel enableMoving touch />
```

![](https://ucarecdn.com/1586c7c1-6912-4378-b108-cb7ddb488883/ezgifcomgifmaker.gif)

### Scrollbar

Set the value `true` for `enableScrollbar` and place the `Scrollbar` argument in your jsx template

```jsx
<Carousel enableScrollbar={true} {...}>
  {(galleryProps, ulProps, data, step, goTo, next, prev, Scrollbar) => {
    return (
      <div>
        <div {...galleryProps}>
          <ul {...ulProps}>{this.state.data.map(renderItem)}</ul>
        </div>
        {Scrollbar}
      </div>
    );
  }}
</Carousel>;
```

![](http://res.cloudinary.com/dxv8p5zck/image/upload/q_auto/v1516364197/ezgif.com-video-to-gif_3_rz7zun.gif)

### Auto Correcting

When you stop moving your mouse triggers a function which calculates the position of the elements.

Set the value `true` for the prop `autoCalculate`.

![](https://res.cloudinary.com/dxv8p5zck/image/upload/q_auto/v1516357941/ezgif.com-video-to-gif_j8wf3t.gif)

### Lazy Load

For example, you want to fetch data or trigger some function when you reach the end of the carousel.

```jsx
<Carousel onReachEnd={::this.fn} />
```

You specified a function, but you also need to tell the component when to run it.

It has a few props

* onReachForMouseUp - When you finish moving with the mouse, the `mouseup` event starts
* onReachForMove - While moving
* onReachForScroll - While scrolling
* onReachForScrollEnd - When the scroll bar reached the end of its width.
* onReachForDots - Wwhen you click on the last dot.

Also, there is a prop `nextAfterFetchStart`.it accepts the number.When you want to display a spinner while extracting data, you will surely want to see the spinner .when the spinner will be shown you will do the following.

```jsx
<Carousel onReachEnd={::this.fn} onReachForMove nextAfterFetchStarts={10} /> // 10ms
```

After 10 milliseconds you will go to the next item, which means that you will see a spinner.

**The default value for `nextAfterFetchStarts` is 0**

```jsx
this.setState({ data: this.state.data.concat({ status: "LOADING" }) });

const renderItem = (value, index) =>
	typeof value === "object" ? (
		<li className="renderItem" key={index}>
			<h1>Loading...</h1>
		</li>
	) : (
		<li className="renderItem" key={index}>
			<h1>{value}</h1>
		</li>
	);
```

![](https://res.cloudinary.com/dxv8p5zck/image/upload/q_auto/v1516363765/ezgif.com-video-to-gif_2_gk7rdi.gif)

### Dots

import `Dots` component from the package.

```jsx
import { Carousel, Dots } from "react-awesome-carousel";
```

**`DotsProps` must be passed to the `Dots` component**

```jsx
<Carousel {...}>
  {(galleryProps, ulProps, data, step, goTo, next, prev, Scrollbar, DotsProps) => {
    return (
      <div>
        <div {...galleryProps}>
          <ul {...ulProps}>{this.state.data.map(renderItem)}</ul>
        </div>
        <Dots renderDots={renderDots} goTo={(i) => goTo(i)} {...DotsProps} /> // here is your dots
      </div>
    );
  }}
</Carousel>;
```

Render your dots with `renderDots`

```jsx
const renderDots = (index, goTo, active) => (
	<li onClick={goTo.bind(null, index)} className={active ? "renderDots active yourClassName" : "renderDots"} key={index}>
		{index}
	</li>
);
```

### Buttons

Use the arguments `next()` and `prev()` from the callback.

```jsx
<Carousel {...}>
	{(galleryProps, ulProps, data, step, goTo, next, prev, Scrollbar, DotsProps) => {
		return (
			<div>
				<button onClick={() => next()}>Prev</button>
				<div {...galleryProps}>
					<ul {...ulProps}>{this.state.data.map(renderItem)}</ul>
				</div>
				<Dots renderDots={renderDots} goTo={i => goTo(i)} {...DotsProps} /> // here is your dots
				<button onClick={() => prev()}>Next</button>
			</div>
		);
	}}
</Carousel>
```

### Props

### Carousel Props

<table>
  <tr>
    <th>Prop</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>autoCorrect</td>
    <td>Boolean</td>
    <td>Set true if you want to correct the position of items after scrolling or moving.</td>
  </tr>
  <tr>
    <td>enableScrolling</td>
    <td>Boolean</td>
    <td>it enables scrollbar usage</td>
  </tr>
  <tr>
    <td>enableMoving</td>
    <td>Boolean</td>
    <td>it enables moving items with mouse events.For using this in mobile devices check the prop <code>touch</code></td>
  </tr>
  <tr>
    <td>touch</td>
    <td>Boolean</td>
    <td>The <code>touch</code> prop allows you to using <code>enableMoving</code> prop in mobile devices using touch event instead of mouse event.</td>
  </tr>
  <tr>
    <td>itemWidth</td>
    <td>Number</td>
    <td>Set the with of item in the carousel.The number must be fixed for all items.</td>
  </tr>
  <tr>
    <td>showCount</td>
    <td>Number</td>
    <td>Sets the count of items in carousel.</td>
  </tr>
  <tr>
    <td>onReachEnd</td>
    <td>Function</td>
    <td>This function runs when you reach the end of the carousel.</td>
  </tr>
  <tr>
    <td>onReachForMouseUp</td>
    <td>Boolean</td>
    <td>The `onReachEnd` function runs when you finish moving with the mouse</td>
  </tr>
  <tr>
    <td>onReachForMove</td>
    <td>Boolean</td>
    <td>The `onReachEnd` function runs while moving</td>
  </tr>
  <tr>
    <td>onReachForScroll</td>
    <td>Boolean</td>
    <td>The `onReachEnd` function runs while scrolling</td>
  </tr>
  <tr>
    <td>onReachForScrollEnd</td>
    <td>Boolean</td>
    <td>The `onReachEnd` function runs when the scroll bar reached the end of its width.</td>
  </tr>
  <tr>
    <td>onReachForDots</td>
    <td>Boolean</td>
    <td>The `onReachEnd` function runs when you click on the last dot.</td>
  </tr>
  <tr>
    <td>nextAfterFetchStarts</td>
    <td>Number</td>
    <td>After a given time you will go to the next carousel's item</td>
  </tr>
</table>

### Dots props

<table>
  <tr>
    <th>Prop</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>renderDots</td>
    <td>Function</td>
    <td>Rendering dots elements</td>
  </tr>
  <tr>
    <td>goTo</td>
    <td>Function</td>
    <td>The value must be <code>goTo={i => goTo(i)}</code></td>
  </tr>
</table>
