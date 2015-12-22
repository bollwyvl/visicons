# visicons
> nice icons for showing data about data

So you're building a visualization builder, and want your user
- to be able to create linked scales in two axes
- hover over a part of your visualization and find out what type of thing it is


`visicons` gives you a `font-face` for icons for creating and describing
visualizations, so can use them in buttons, menus, mouseovers, or even in-line
with text.

## Use
> TODO: publish
```shell
npm install visicons
# or
bower install visicons
```

## Icon Roadmap
- [ ] mark
  - [x] axis
    - [x] x-axis
    - [x] y-axis
  - [ ] scale
    - [x] linear
    - [x] log
    - [ ] ordinal
    - [x] color
    - [ ] time
  - [ ] icon
- [ ] layout
  - [x] treemap
  - [x] force-directed
  - [ ] chord
  - [ ] sankey

## Developing

```shell
git submodule update --init
npm install
npm run gulp
```

To request a new icon, create a pull request that adds the new icon
to the [Roadmap](#Icon Roadmap) above. It will probably be merged!

To propose a new icon, create a pull request that implements one of the
missing roadmap icons. New icons are assigned a Unicode code point, like
`uEA01` so that the ordering is consistent across versions: code points will be
handed out in the order they are requested.
