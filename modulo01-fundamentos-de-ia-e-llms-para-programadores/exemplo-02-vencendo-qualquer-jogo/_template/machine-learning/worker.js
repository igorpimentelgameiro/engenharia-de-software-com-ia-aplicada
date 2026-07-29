importScripts('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.5.0/dist/tf.min.js');

const MODEL_PATH = 'yolov5n_web_model/model.json';
const LABELS_PATH = 'yolov5n_web_model/labels.json';
const INPUT_MODEL_DIMENSIONS = 640;
const MIN_SCORE = 0.25;
const TARGET_LABEL = 'bird';

let labels = [];
let model = null;

async function loadModelAndLabels() {
  await tf.ready();

  labels = await (await fetch(LABELS_PATH)).json();
  model = await tf.loadGraphModel(MODEL_PATH);

  const dummyInput = tf.ones(model.inputs[0].shape);
  const warmupOutput = await model.executeAsync(dummyInput);

  tf.dispose([dummyInput, warmupOutput]);

  postMessage({ type: 'model-loaded' });
}

function preprocessImage(input) {
  return tf.tidy(() => {
    const image = tf.browser.fromPixels(input);

    return tf.image.resizeBilinear(image, [INPUT_MODEL_DIMENSIONS, INPUT_MODEL_DIMENSIONS])
      .div(255)
      .expandDims(0);
  });
}

function getOutputTensor(output, index, name) {
  return Array.isArray(output) ? output[index] : output[name];
}

function boxCenterToImagePoint(box, width, height) {
  const [y1, x1, y2, x2] = box;
  const isNormalized = Math.max(y1, x1, y2, x2) <= 1;
  const scaleX = isNormalized ? width : width / INPUT_MODEL_DIMENSIONS;
  const scaleY = isNormalized ? height : height / INPUT_MODEL_DIMENSIONS;

  return {
    x: ((x1 + x2) / 2) * scaleX,
    y: ((y1 + y2) / 2) * scaleY
  };
}

function findBestPrediction({ boxes, scores, classes, validDetections, width, height }) {
  let bestPrediction = null;

  for (let index = 0; index < validDetections; index++) {
    const score = scores[index];
    const label = labels[Math.round(classes[index])];

    if (label !== TARGET_LABEL || score < MIN_SCORE) {
      continue;
    }

    if (bestPrediction && bestPrediction.score >= score) {
      continue;
    }

    const boxOffset = index * 4;
    const point = boxCenterToImagePoint([
      boxes[boxOffset],
      boxes[boxOffset + 1],
      boxes[boxOffset + 2],
      boxes[boxOffset + 3]
    ], width, height);

    bestPrediction = {
      type: 'prediction',
      label,
      score,
      x: point.x,
      y: point.y
    };
  }

  return bestPrediction;
}

async function runInference(tensor, image) {
  let output;

  try {
    output = await model.executeAsync(tensor);

    const boxesTensor = getOutputTensor(output, 0, 'Identity');
    const scoresTensor = getOutputTensor(output, 1, 'Identity_1');
    const classesTensor = getOutputTensor(output, 2, 'Identity_2');
    const validDetectionsTensor = getOutputTensor(output, 3, 'Identity_3');

    const [boxes, scores, classes, validDetections] = await Promise.all([
      boxesTensor.data(),
      scoresTensor.data(),
      classesTensor.data(),
      validDetectionsTensor.data()
    ]);

    return findBestPrediction({
      boxes,
      scores,
      classes,
      validDetections: Math.min(validDetections[0], scores.length, classes.length, boxes.length / 4),
      width: image.width,
      height: image.height
    });
  } finally {
    tf.dispose([tensor, output]);
  }
}

loadModelAndLabels().catch((error) => {
  postMessage({
    type: 'model-error',
    message: error.message
  });
});

self.onmessage = async({ data }) => {
  if (data.type !== 'predict') return;
  if (!model) return;

  try {
    const prediction = await runInference(preprocessImage(data.image), data.image);

    postMessage(prediction || { type: 'prediction-complete' });
  } catch (error) {
    postMessage({
      type: 'prediction-error',
      message: error.message
    });
  } finally {
    data.image.close();
  }

};
