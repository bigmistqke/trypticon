# 🦖 [trypticon](https://tfwiki.net/mediawiki/images2/4/4f/TrypticonGenerations1.jpg)

Transform 1 object into the other with 🦖 trypticon:<br/>
A set of utility-functions to perform arithmetical operations on data with any shape.

## Quick start

Install it:

```bash
npm i trypticon
# or
yarn add trypticon
# or
pnpm add trypticon
```

Use it:

### addition

```ts
import { add } from 'trypticon'

add(1, 2)
// 3

add(1, 2, 3, 4, 5, 6)
// 21

add({ value: 1}, { value: 2})
// {value: 3}

add([1, 2], [3, 4])
// {value: [4, 6]}

add({ value: [0, 1]}, 2)
// {value: [2, 3]}

add({ value: [{nested: 1}, 2]}, { value: [{nested: 3}, 4]}, 2)
// {value: [{nested: 6}, 8]}
```

- options: `{strict: boolean, string: boolean}` defaults to `{strict: false, string: false}` 

```ts
add({strict: true})({value: 1}, {value: "b"}, {value: 2})
// undefined
add({strict: false})({value: 1}, {value: "b"}, {value: 2})
// {value: 3} -> will choose first valid type as the 'correct' type

add({string: true})({value: "a"}, {value: "b"}, {value: "c"})
// {value: "abc"}
add({string: false})({value: "a"}, {value: "b"}, {value: "c"})
// {value: "a"}
```

### multiplication

```ts
import { multiply } from 'trypticon'

multiply(1, 2)
// 2

multiply(1, 2, 3, 4, 5, 6)
// 720

multiply({ value: 1}, { value: 2})
// {value: 2}

multiply([1, 2], [3, 4])
// [3, 8]

multiply({ value: [0, 1]}, 2)
// {value: [0, 2]}

multiply({ value: [{nested: 1}, 2]}, { value: [{nested: 3}, 4]}, 2)
// {value: [{nested: 6}, 16]}
```

options: `{strict: boolean}` defaults to `{strict: false}` 

```ts
multiply({strict: true})({value: 1}, {value: "b"}, {value: 2})
  // undefined
multiply({strict: false})({value: 1}, {value: "b"}, {value: 2})
  // {value: 2} -> will choose first valid type as the 'correct' type
```

## TODO:
- arithmetic
  - [x] addition
  - [x] multiplaction
  - [ ] subtraction
  - [ ] division
  - [ ] power
  - [ ] root
- misc
  - [ ] operate (reducer)
  - [ ] lerp
