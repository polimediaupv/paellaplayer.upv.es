# Bug track

Bug tracking in previous versions of Paella Player was very simple, as there was only one repository. With `paella-core` we have come a long way in terms of organising the main library, plugins and the creation of third-party plugin libraries, but on the other hand it has become more complicated to report bugs.

To find out in which repository you have to report bugs you can follow these tips:

- If you don't know in which library the bug is: keep in mind that `paella-core` and the rest of the plugins are now independent libraries. To get a video player, you have to use the `paella-core` APIs correctly, as well as configure the plugins correctly, which is why we have put a lot of effort into writing all this documentation. For that reason, if you notice a bug in a player that uses `paella-core` and you are not sure what is causing it, you should report the bug in that specific player repository. You can try downloading our [reference player](https://github.com/polimediaupv/paella-player) to see if you see the same bug, or explore the [demos on this website](/#/demos) to see if you can replicate the bug.
- If your problems are with HLS (m3u8) streams, the vast majority of failures are usually in the configuration of the streaming server, in the encoding of the videos or in the configuration of the HLS plugins. Refer to the documentation for these plugins for more information.: [hls](/#/doc/hls-video-plugin.md), [hlsLive](https://paellaplayer.upv.es/#/doc/hls-live-video-plugin.md).
- If you know specifically where the bug is: generally if this is your case, you are a developer using `paella-core` or one of its plugins and you have been able to track down the bug. In that case, please go to the corresponding repository to report the bug. We'd also appreciate pull requests if you've managed to fix it. Please note that bugs reported in the `paella-core` repositories and its plugins that cannot be replicated in the reference player, or that are not correctly identified, will be marked as invalid and closed.

    * `paella-core` bug track: [https://github.com/polimediaupv/paella-core/issues](https://github.com/polimediaupv/paella-core/issues).
    * `paella-basic-plugins` bug track: [https://github.com/polimediaupv/paella-basic-plugins/issues](https://github.com/polimediaupv/paella-basic-plugins/issues).
    * `paella-slide-plugins` bug track: [https://github.com/polimediaupv/paella-slide-plugins/issues](https://github.com/polimediaupv/paella-slide-plugins/issues).
    * `paella-zoom-plugin` bug track: [https://github.com/polimediaupv/paella-zoom-plugin/issues](https://github.com/polimediaupv/paella-zoom-plugin/issues).
    * `paella-user-tracking` bug track: [https://github.com/polimediaupv/paella-user-tracking/issues](https://github.com/polimediaupv/paella-user-tracking/issues).

# Contributions

We are happy to review any pull request that affects the `paella-core` code or any of the plugins included in our repositories, but we will rarely agree to include new plugins. The plugins we have developed are those we use at the Universidad Politécnica de Valencia, and for that reason we can maintain and update them correctly. Including plugins in our repositories that we do not use in our institution ends up being counterproductive for everyone, because we cannot maintain and update them properly.

If you have a plugin or plugin package that you think would be useful to the community, we recommend that you reference any of our plugin repositories to create a repository of your own. It will be better for you, because your role in your contribution will be more visible, and it will be easier to debug and update the code.
