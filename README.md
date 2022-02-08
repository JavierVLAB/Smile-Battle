Take from https://www.youtube.com/watch?v=CVClHLwv-4I&ab_channel=WebDevSimplified

In this video we will be setting up real time face detection through a webcam using AI. This AI is so quick that we are able to draw in real time the various faces and expressions of every person in the video without much performance overhead. We will be using the Face API JS library built on Tensor Flow to setup the face detection.

By the end of this video you will have fully functional real time face detection on your site which can be used with any webcam or phone camera. If you want to see a part two of this video make sure to let me know in the comments below.


⭐ Kite is a free AI-powered coding assistant that drastically increases your productivity by providing relevant autocompletion based on your coding habits. It integrates with all popular editors (including VSCode).
https://www.kite.com/get-kite/?utm_me...


📚 Materials/References:

GitHub Code: https://github.com/WebDevSimplified/F...
Face API Library: https://github.com/justadudewhohacks/...
Models Used: https://github.com/WebDevSimplified/F...


🧠 Concepts Covered:

- Streaming a webcam through HTML
- Using Face API to detect faces in real time
- Drawing facial landmarks in real time
- Determining emotion through facial expressions in real time


🌎 Find Me Here:

Twitter: https://twitter.com/DevSimplified
GitHub: https://github.com/WebDevSimplified
CodePen: https://codepen.io/WebDevSimplified


# IMPORTANT: Bug Fixes

## `navigator.getUserMedia`

`navigator.getUserMedia` is now deprecated and is replaced by `navigator.mediaDevices.getUserMedia`. To fix this bug replace all versions of `navigator.getUserMedia` with `navigator.mediaDevices.getUserMedia`

## Low-end Devices Bug

The video eventListener for `play` fires up too early on low-end machines, before the video is fully loaded, which causes errors to pop up from the Face API and terminates the script (tested on Debian [Firefox] and Windows [Chrome, Firefox]). Replaced by `playing` event, which fires up when the media has enough data to start playing.
