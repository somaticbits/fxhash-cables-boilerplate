# Cables fx(hash) boilerplate

A boilerplate to integrate cables.gl into the new fx(hash) boilerplate.

For instructions about to set up the fx(hash) boilerplate and everything else, please check below. This is the original documentation and covers all the necessary bases to develop a generative token within the given framework.

## Cables.gl + fx(hash) boilerplate specifics

Most of the action happens in the `src/index.js` file. Download your patch from Cables.gl and put the `patch.js` file into the `project/public` folder. There is already a sample project inside it, just replace it. You can find the Cables.gl patch here: [Cables.gl - fxhash boilerplate](https://cables.gl/p/8i54GI)

### Features

To define features, you use `$fx.features({})`. You can set features like this:
`$fx.features({"feature one": fx.rand(), "feature two": fx.rand() * 5})`.

To retrieve a feature and set a feature variable in Cables.gl, follow these steps:
`CABLES.patch.setVariable("feature_one", $fx.getFeature("feature one"))`

In this code, `"feature_one"` is the name of the variable in Cables.gl. It's a good practice to avoid spaces in variable names to prevent potential issues later on.

The line `$fx.getFeature("feature one")` is used to fetch the value that you previously defined in the `$fx.features` function, where you set it using `$fx.features({"feature one": fx.rand(), "feature two": fx.rand() * 5})`. This retrieved value is then used to update a variable in Cables.gl.

### Params

To define params, you use `$fx.params([{}])`. You can set features like this:
``` javascript
$fx.params([
	{
		id: "number_id",
		name: "A number/float64",
		type: "number",
		//default: Math.PI,
		options: {
			min: 1,
			max: 10,
			step: 0.0001,
		},
	},...])
```

To retrieve a param and set a param variable in Cables.gl, follow these steps:
`CABLES.patch.setVariable("number_id", $fx.getParam("number_id"))`

The fx(hash) params have various specific types - [see below](#fxparams-types). Not all types translate directly to Cables.gl types.
Here's a more detailed overview:

- `number`: `Number` aka float64 -> Cables.gl: `number`
- `bigint`: `BigInt` aka int64 -> Cables.gl: `number`
- `boolean`: `boolean` -> Cables.gl: `string`
- `color`: Color in 8-hexdigit and abbreviations -> Cables.gl: `string`
- `string`: String with max 64 characters -> Cables.gl: `string`
- `select`: Selection of provided options options -> Cables.gl: `string`


# fx(hash) boilerplate 2.0

A boilerplate to automate and ease the creation of Generative Tokens on fx(hash) using fx(params).

### Scope

- provide a local environment in which you can iterate and use modern features from the javascript ecosystem
- interactive environment to test your project with different seeds and params, called fx(lens)
- automate the creation of a .zip file ready to be uploaded on fxhash

### Prerequisites

- node >= 14
- npm >= 6.14.4

### Getting started

- Clone this repository: `npx degit fxhash/fxhash-boilerplate your_project_name`
- Install dependencies and fx(lens): `npm install`

## Start developing your token project

- `npm start`: Starts a local http server serving your project within fxlens and hot reloading enabled
- Your browser should open automatically otherwise visit `http://localhost:3000/?target=http://localhost:3301/` to see your project in the browser

### fx(hash) snippet / fx(snippet)

fxhash requires you to use a javascript code snippet so that the platform can inject some code when tokens will be generated from your Generative Token. The code snippet is already in the `index.html` file of this boilerplate, so you don't have to add it yourself.

**During the development stages, the snippet will generate a random hash each time the page is refreshed**. This way, it helps you reproduce the conditions in which your token will be executed on fxhash.

The code snippet exposes the `$fx` object with the following structure:

```typescript
{
  hash: String, // a random 64 characters hexadecimal string. This particular variable will be hardcoded with a static hash when someone mints a token from your GT
  rand: () => Number, // a PRNG function seeded with the hash, that generates deterministic PRN between 0 and 1
  minter: String, // The string of the wallet address of the minter injected into the iteration
  randminter: () => Number, // a PRNG function seeded with the minter address that generates deterministic PRN between 0 and 1
  preview: () => void, // trigger for capture module
  isPreview: Boolean, // is TRUE when capture module is running the project
  params: (definitions) => void, // sets your projects fx(params) definitions
  getParam: (id: String) => any, // get transformed fx(params) value by id
  getParams: () => any, // get all transformed fx(params) values
  getRawParam: (id: String) => any, // get raw fx(params) value by id
  getRawParams: () => any, // get all raw fx(params) values
  getDefinitions: () => any, // get all fx(params) definitions
  features: (features) => void, // sets your projects features
  getFeature: (id: String) => any, // get feature by id
  getFeatures: () => any, // get all features
  stringifyParams: (definitions) => string, // JSON.stringify that can handle bigint
}
```

_The index.js of this boilerplate quickly demonstrates how to use the whole "SDK"_.

### How do Generative Tokens work

This is how Generative Tokens work on fxhash:

- you upload your project to the platform (see next section)
- you mint your project
- when a collector will mint its unique token from your Generative Token, a random hash will be hard-coded in the fxhash code snippet
- the token will now have its own index.html file, with a static hash, ensuring its immutability

The [Guide to mint a Generative Token](https://www.fxhash.xyz/doc/artist/guide-publish-generative-token) give in-depth details about this process.

## fx(params) types

The following fx(params) types are available. All types share the same attributes but have different options available to e.g. constrain your parameters to your needs.

The available fx(params) types are:

- `number`: `Number` aka float64
- `bigint`: `BigInt` aka int64
- `boolean`: `boolean`
- `color`: Color in 8-hexdigit and abbreviations
- `string`: String with max 64 characters
- `select`: Selection of provided options options

_The index.js of this boilerplate quickly demonstrates a meaningfull configuration for each fx(params) type_.

### Base Attributes

All param share a few base attributes and have each param has a type specific options attribute to adjust the param to your needs.

```typescript
{
  id: string, // required
  name?: string, // optional, if not defined name == id
  type: "number" | "bigint" | "boolean" | "color" | "string" | "select", // required
  default?: string | number | bigint | boolean, // optional (see Randomization)
  options: TYPE_SPECIFIC_OPTIONS, // different options per type (see below)
}
```

### Randomization

The fxhash snippet generates a random value for each parameter. The random value generation happens within the defined constrains of the parameter definition. Each parameter has the possibility to define a `default` value. Setting the default will prevent the parameter to be initialised with a random value. This can be relevant during the development stage but is also relevant to consider for the final minting flow, when the user will define the final parameter configuration for the uniquely minted token.

### Type specific options

#### `number`

All options are optional.

Options:

```typescript
{
  min?: number,
  max?: number,
  step?: number,
}
```

#### `bigint`

All options are optional.

Options:

```typescript
{
  min?: number | bigint,
  max?: number | bigint,
}
```

#### `boolean`

No options.

Options:

```typescript
undefined;
```

#### `color`

No options.

Options:

```typescript
undefined;
```

#### `string`

All options are optional.

Options:

```typescript
{
  minLength?: number,
  maxLength?: number,
}
```

#### `select`

Options are required. They define the options of the select

Options:

```typescript
{
  options: string[],
}
```

### Transformation

For ease of usage the fx(params) are being transformed into their type specific representation.

#### `number`

[getFloat64](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/getFloat64)

#### `bigint`

[getBigInt64](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/getBigInt64)

#### `boolean`

_not transformed_

#### `string`

_not transformed_

#### `color`

```typescript
{
 hex: {
  rgb: '#ff0000',
  rgba: '#ff0000ff',
 },
 obj: {
  rgb: { r, g, b},
  rgba: { r, g, b, a },
 },
 arr: {
  rgb: [r,g,b],
  rgba: [r,g,b,a],
 },
}
```

The fx(snippet) exposes two different way to retrieve fx(params) values:

- `getParam` and `getParams` will return the transformed values as described above
- `getRawParam` and `getRawParams` will return the raw values after being serialized from the bytestring and without any transformation

## Start your project with fx(lens)

The fx(lens) offers an interactive environment to tweak and develop your generative token project.

- `npm start`: Starts two local http server
  - `localhost:3301` serves your project with live reloading
  - `localhost:3300` serves fx(lens) you can connect to a token
- Visìt `http://localhost:3300/?target=http://localhost:3301` to see your local project within fx(lens)

## Publish your project

> **⚠️ Disclaimer**: Sandbox is not yet compatible with fx(params).

- `npm run build`: Will create `dist-zipped/project.zip` file

Go to https://fxhash.xyz/sandbox/ and upload the project.zip file in there to see if it works properly. If your token does not work properly, you can iterate easily by updating your files, running $ npm run build again, and upload the zip file again.

Finally, you can mint your token using the same `project.zip` file.
