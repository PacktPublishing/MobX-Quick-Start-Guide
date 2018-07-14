# MobX-QuickStart-Guide

<img src="./src/core/mobx.png" height="64">

MobX QuickStart Guide, published by Packt

## See it live

Go to [https://packt-mobx.surge.sh](https://packt-mobx.surge.sh) to see the app running live. Source maps have been included so you can browse
the source for the examples in DevTools.

## How to run the examples

-   Install Node
-   Clone this repo using git to a local folder
-   Run `npm install` on the top-level folder
-   Run `npm start` to launch the app on [http://localhost:3000](http://localhost:3000)

### Goodreads API Key

-   Needed to run the example for **Chapter 03: A React App with MobX**.
-   [Register for an API Key](https://www.goodreads.com/api/keys).
-   Create a file called `.env.local` at the top level, as a peer of `.env`
-   Put the following line with your API Key:

```text
REACT_APP_GOODREADS_APIKEY = <API-Key>
```
