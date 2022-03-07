# Download

## Reference player

You can use our reference player as a base to create your own by [downloading it from our github repository](). 

## Create your own player from scratch

Our reference player uses the base paella-core library, and a number of extra libraries that provide plugins of different types:

- paella-core (%VERSION(paella-core)%): paella player core library ([git](https://github.com/polimediaupv/paella-core), [npm](https://www.npmjs.com/package/paella-core)).
- paella-basic-plugins (%VERSION(paella-basic-plugins)%): most commonly used plugins (volume, subtitle selection, video layout change, playback speed, etc.) ([git](https://github.com/polimediaupv/paella-basic-plugins), [npm](https://www.npmjs.com/package/paella-basic-plugins)).
- paella-slide-plugins  (%VERSION(paella-slide-plugins)%): plugins designed to interact with slide-based presentations ([git](https://github.com/polimediaupv/paella-slide-plugins), [npm](https://www.npmjs.com/package/paella-slide-plugins)).
- paella-zoom-plugin (%VERSION(paella-zoom-plugin)%): allows you to zoom into the video ([git](https://github.com/polimediaupv/paella-zoom-plugin), [npm](https://www.npmjs.com/package/paella-zoom-plugin)).
- paella-user tracking (%VERSION(paella-user-tracking)%): integration with usage analysis tools ([git](https://github.com/polimediaupv/paella-user-tracking), [npm](https://www.npmjs.com/package/paella-user-tracking)).

You can get each of these libraries with npm

```sh
npm install --save paella-core paella-basic-plugins paella-slide-plugins paella-zoom-plugin paella-user-tracking
```

See the documentation to learn how to use `paella-core` and the plugin libraries.
