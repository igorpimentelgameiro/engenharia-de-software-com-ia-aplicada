importScripts('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest');

self.onmessage = async({ data }) => {
  if (data.type !== 'predict') return;

  postMessage({
    type: 'prediction',
    x: 400,
    y: 400,
    score: 0
  });
};
