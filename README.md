# 🦖 [trypticon](https://tfwiki.net/mediawiki/images2/4/4f/TrypticonGenerations1.jpg)

utility-functions to perform arithmetical operations on data with any shape.<br/>

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

- addition

```ts
import { add } from 'trypticon'

result = add(1, 2)
  // 3

result = add(1, 2, 3, 4, 5, 6)
  // 21

result = add({ value: 1}, { value: 2})
  // {value: 3}

result = add([1, 2], [3, 4])
  // {value: [4, 6]}

result = add({ value: [0, 1]}, 2)
  // {value: [2, 3]}

result = add({ value: [{nested: 1}, 2]}, { value: [{nested: 3}, 4]}, 2)
  // {value: [{nested: 6}, 8]}
```

options: `{strict: boolean = false, string: boolean = false}` 

```ts
result({strict: true})({value: 1}, {value: "b"}, {value: 2})
  // undefined
result({strict: false})({value: 1}, {value: "b"}, {value: 2})
  // {value: 3} -> will choose first 'valid' type as the correct type

result({string: true})({value: "a"}, {value: "b"}, {value: "c"})
  // {value: "abc"}
result({string: false})({value: "a"}, {value: "b"}, {value: "c"})
  // {value: "a"}
```

- multiplication

```ts
import { multiply } from 'trypticon'

result = multiply(1, 2)
  // 2

result = multiply(1, 2, 3, 4, 5, 6)
  // 720

result = multiply({ value: 1}, { value: 2})
  // {value: 2}

result = multiply([1, 2], [3, 4])
  // [3, 8]

result = multiply({ value: [0, 1]}, 2)
  // {value: [0, 2]}

result = multiply({ value: [{nested: 1}, 2]}, { value: [{nested: 3}, 4]}, 2)
  // {value: [{nested: 8}, 12]}
```

options: `{strict: boolean = false}`

```ts
result = multiply({strict: true})({value: 1}, {value: "b"}, {value: 2})
  // undefined
result = multiply({strict: false})({value: 1}, {value: "b"}, {value: 2})
  // {value: 2} -> will choose first 'valid' type as the correct type
```
