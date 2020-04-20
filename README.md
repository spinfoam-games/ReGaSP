# ReGaSP - React / Redux Game Starter Pack

## What Is This?

This repository contains boilerplate code for web-based games built on top of React and Redux. It emerged from
the desire to be able to quickly get started on new prototypes or ideas as well as to have a code base to start
from when porting some older Flash-based games to JavaScript.

If you are looking to build something like a clicker or incremental game, or perhaps a role-playing game or even
a visual novel sort of thing this might be a useful jumping-off point.

On the other hand if you are building a faster paced arcade or action game you probably want something
from [this list of JavaScript game engines](https://github.com/collections/javascript-game-engines) instead.

## How Do I Use It?

1. Clone the repo (or download a packaged copy)
2. If applicable, setup your own git remotes or otherwise tidy up the repo
3. Update the `package.json` file to reflect your project information (name, version, author, etc.); if there are any packages you know you don't want in your project feel free to trim them out now too
4. Run `npm install` to get all the dependencies in place
5. Run `npm run start` to kick off the Webpack dev server
6. Navigate to `localhost:8080` in your browser
7. You should see a little demo game with a simple layout

You can now modify and expand on the sample game.

## Sample Game Structure

The sample game is basically a clone of Tyler Glaiel's "Number".

You could absolutely remove or restructure the entire thing if you wanted to, but if you want to get
something up and running quickly hopefully the sample code will help you hit the ground running.

### Page Layout

The assumption is that the project will be a single page app, with bits of data that should always
be visible and a main content area that changes based on the current state of the game.

The sample app includes one top menu bar and one bottom menu bar, but it should be trivial to add
additional menu or status bars above or below the main content.

The center of the page is reserved for whatever the appropriate content for the current game state
is; this is the only area that scrolls -- the top and bottom menu bars are pinned in place.

### Modules / Subsystems

The logic for the game is broken out into "subsystems", which are intended to be bundles of
reducers, action creators, support functions and tick functions (see the next section for a bit more
on tick functions).

In the sample game there are two subsystems: `core` which handles updating and resetting the game
and `upgrade` which processes requests to upgrade the number-go-up rate.

The `index.js` file imports the files for the subsystems and combines their `reducerMap`s into a
single object for use by the actual Redux reducer function.

> There are lots of other ways to approach organizing logic, but
> I've had good luck with this approach so far. It keeps big
> conceptual parts of the game organized without necessarily
> breaking things up into a huge number of files.

### Ticks

The `core` subsystem provides a reducer for the `core/majorTick` action. The `index.js` file uses
`setInterval` to dispatch this action every 250ms.

This is more or less analogous to a `tick` or `update` function in many game engines and is intended to drive any logic in the game that should act in "real time".

If you're working on something that is entirely driven by player input, you could probably just
rip out the `core/majorTick` reducer and the `setInterval` call.

> For the sample game the tick function is very straightforward, but
> for more complex projects I've had good luck adding a `tick` property
> to the objects that represent the game's subsystems and then having
> a central tick reducer call each of the subsystem tick functions in
> turn.

### Components

The sample game just includes a single component file, but it is organized into the `components`
directory to help lay out the structure for additional components.

The naming convention used for components in the sample game is to call the actual React
component class `FooElement` and the Redux-connected component `Foo`. If there isn't a
connected component for a given React component, I'd just name the component `Bar` directly.

> My goal with this convention is to always just write `Foo` or `Bar`
> in my JSX (as opposed to something more verbose like `FooWrapper`
> or `ConnectedBar`).

### Redux Reducer

The reducer function for Redux is created in `index.js`. It is in charge
of creating a default state if necessary (by calling the `createDefaultState` function), and then looking up an appropriate reducer
function for the given action type.

If it finds a matching reducer function it will call it with the current state and the payload from the action.

If the function for the action returns something truthy that result is
passed out of the main reducer and becomes the new Redux state.

If the function returns something falsey the main reducer will log
an error to the console and return the previous state. This is something
of a sanity check / emergency valve in case something like a tick
function (which is called automatically and often) returns a null
value while you are working on things with the server running (the
normal result of this is that the entire state is clobbered, which is ...
annoying if you are in the middle of testing something that required a
whole bunch of careful setup).

#### Action format

The boilerplate code is setup with [Flux standard actions](https://github.com/redux-utilities/flux-standard-action)
in mind, so the reducer expects every action to have properties
named `type` and `payload`.

The reducer uses the `type` property to look for a function
in the set of reducers provided by the game subsystems and invokes
reducer functions with the current Redux state and the `payload`
property of the action.

## What's Included?

### Front End Libraries

#### React

https://github.com/facebook/react/

For all your dynamic UI needs.

#### Redux (with developer tools)

https://github.com/reduxjs/redux

I really like the flow of data with Redux layered on top of React,
and I think it works well for incremental / clicker style games. I
haven't built one myself yet, but I can see it being a nice fit for
text adventures or visual novels too. RPGs and management or 4X type
games would probably also align with React + Redux fairly well,
depending on how intricate a UI was required.

The sample game code creates the Redux store in `index.js`, with the
[Redux development tools](https://github.com/reduxjs/redux-devtools)
enabled.

[Reselect](https://github.com/reduxjs/reselect) is also included in
the dependencies, but is not used in the sample game.

#### Fomantic-UI

https://github.com/fomantic/fomantic-ui/

The community fork of Semantic UI. I really like this UI library as
a starting point -- it is a little more robust (in my opinion) than 
Bootstrap or most Material based UI kits, but doesn't have a
particularly imposing visual style. 

#### Semantic-UI-React

https://github.com/Semantic-Org/Semantic-UI-React

Fomantic UI doesn't have its own set of React bindings, so it
piggy-backs on the this package of standard Semantic UI React
components.

### Game-Specific Libraries

#### Break Infinity

https://github.com/Razenpok/BreakInfinity.cs

Since this boilerplate code was partly born out of a desire to build
and test incremental style games I've included this library to enable
working with outrageously big numbers. I've found break_infinity.js
a bit smoother to work with than decimal.js, and it handles values more
than big enough for any project I've planned to tackle.

#### Swarm Number Format

https://github.com/erosson/swarm-numberformat

The number formatting library original written for SwarmSim. It does a
nice job of formatting numbers of just about any scale right out of
the box, and it is compatible with break_infinity.js with no special
effort.

### General Tools

#### Ramda

https://github.com/ramda/ramda

Ramda provides a lot of helpful functional-programming style utilities for JavaScript. I find it more intuitive than Lodash
for many things, and think it works particularly well for simple reducer functions since it takes an immutable approach
to data modification.

> I use Ramda so frequently that it is included in the Provide
> plugin in the Webpack configuration file so there is no need
> to `require` it in individual files -- it is exposed as `R` by
> default.

#### Lodash

https://github.com/lodash/lodash

In some cases the overhead of immutability can feel a bit heavy, especially in game development, so I tend to use Lodash's
utilities when I know I will be making many modifications to data one right after another. Again, this really comes up
in reducer functions (though in this case, especially very complex ones); my pattern is normally to make a copy of the
current state object once, then mutate the copy via Lodash's `set` function, and finally return the modified copy.

> Like Ramda I use Lodash often enough that I have it configured
> via Webpack's Provide plugin. It is exposed as `_`.

#### UUID

https://github.com/uuidjs/uuid

RFC4122 UUID generator. Ideal for generating identifiers that you want
to be certain are going to stay unique, even if they wind up being mixed
together at some point.

> I generally favor UUIDs for things like player or user IDs,
> session IDs, or character IDs; things that already are or might
> someday be stored on a server or shared database of some kind. YMMV.
  
#### Short ID

https://github.com/dylang/shortid

This package generates unique ID values that are much shorter than UUIDs.
I find it handy for generating IDs for things like randomly generated
items or player generated content, especially if that content is going
to exist in the Redux store. The shorter IDs are much easier to work
with when trying to browse through the store in the Redux developer
tools, are simpler to copy / paste, and are easier to recognize
when looking at lists of items.

#### Moment

https://github.com/moment/moment/

No one should ever attempt to do anything with dates or times
themselves unless you are explicitly dedicating your life to writing a 
date-time library of some kind. The human concept of time is a total
disaster.

Moment is included to handle any formatting of dates and times (it does
a nice job formatting both absolute and relative times). Moment Timezone
is not included, but could always be added if you need timezone support.

#### AWS SDK



I use bits and pieces of Amazon Web Services for lots of projects and
experiments, so I have the AWS SDK included in this boilerplate. Even
if I'm not planning to use AWS directly in a game, I often find it
useful to take advantage of things like S3 for backups or hosting or
DynamoDB for storing data that I export to JS or JSON files to package
with a release.

### Build Support

#### Webpack

Webpack is included and its configuration files are tucked away in
the `webpack` directory. The `commong.config.js` file includes
settings that are shared between development and production builds,
with a `dev.config.js` and `prod.config.js` file supplying the
environment specific adjustments.

[Webpack-merge](https://github.com/survivejs/webpack-merge) is used
for smashing config files together.

#### Babel

https://github.com/babel/babel

Babel is included to support JSX (and generally modern JavaScript) with
a basic `.babelrc` and appropriate Webpack loader configurations.

#### Less

https://github.com/less/less.js

I get a pretty long runway from Fomantic UI's styles and a little bit
of raw CSS here and there, but Less is super helpful when things start
to get more complicated.

In addition to the basic `less` package `less-loader` is also included
and configured in the `webpack/common.config.js` file.