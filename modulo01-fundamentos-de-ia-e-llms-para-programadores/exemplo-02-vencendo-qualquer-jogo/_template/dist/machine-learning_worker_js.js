/******/ (() => { // webpackBootstrap
/*!************************************!*\
  !*** ./machine-learning/worker.js ***!
  \************************************/
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
importScripts('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.5.0/dist/tf.min.js');
var MODEL_PATH = 'yolov5n_web_model/model.json';
var LABELS_PATH = 'yolov5n_web_model/labels.json';
var INPUT_MODEL_DIMENSIONS = 640;
var MIN_SCORE = 0.25;
var TARGET_LABEL = 'bird';
var labels = [];
var model = null;
function loadModelAndLabels() {
  return _loadModelAndLabels.apply(this, arguments);
}
function _loadModelAndLabels() {
  _loadModelAndLabels = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
    var dummyInput, warmupOutput;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          _context2.n = 1;
          return tf.ready();
        case 1:
          _context2.n = 2;
          return fetch(LABELS_PATH);
        case 2:
          _context2.n = 3;
          return _context2.v.json();
        case 3:
          labels = _context2.v;
          _context2.n = 4;
          return tf.loadGraphModel(MODEL_PATH);
        case 4:
          model = _context2.v;
          dummyInput = tf.ones(model.inputs[0].shape);
          _context2.n = 5;
          return model.executeAsync(dummyInput);
        case 5:
          warmupOutput = _context2.v;
          tf.dispose([dummyInput, warmupOutput]);
          postMessage({
            type: 'model-loaded'
          });
        case 6:
          return _context2.a(2);
      }
    }, _callee2);
  }));
  return _loadModelAndLabels.apply(this, arguments);
}
function preprocessImage(input) {
  return tf.tidy(function () {
    var image = tf.browser.fromPixels(input);
    return tf.image.resizeBilinear(image, [INPUT_MODEL_DIMENSIONS, INPUT_MODEL_DIMENSIONS]).div(255).expandDims(0);
  });
}
function getOutputTensor(output, index, name) {
  return Array.isArray(output) ? output[index] : output[name];
}
function boxCenterToImagePoint(box, width, height) {
  var _box = _slicedToArray(box, 4),
    y1 = _box[0],
    x1 = _box[1],
    y2 = _box[2],
    x2 = _box[3];
  var isNormalized = Math.max(y1, x1, y2, x2) <= 1;
  var scaleX = isNormalized ? width : width / INPUT_MODEL_DIMENSIONS;
  var scaleY = isNormalized ? height : height / INPUT_MODEL_DIMENSIONS;
  return {
    x: (x1 + x2) / 2 * scaleX,
    y: (y1 + y2) / 2 * scaleY
  };
}
function findBestPrediction(_ref) {
  var boxes = _ref.boxes,
    scores = _ref.scores,
    classes = _ref.classes,
    validDetections = _ref.validDetections,
    width = _ref.width,
    height = _ref.height;
  var bestPrediction = null;
  for (var index = 0; index < validDetections; index++) {
    var score = scores[index];
    var label = labels[Math.round(classes[index])];
    if (label !== TARGET_LABEL || score < MIN_SCORE) {
      continue;
    }
    if (bestPrediction && bestPrediction.score >= score) {
      continue;
    }
    var boxOffset = index * 4;
    var point = boxCenterToImagePoint([boxes[boxOffset], boxes[boxOffset + 1], boxes[boxOffset + 2], boxes[boxOffset + 3]], width, height);
    bestPrediction = {
      type: 'prediction',
      label: label,
      score: score,
      x: point.x,
      y: point.y
    };
  }
  return bestPrediction;
}
function runInference(_x, _x2) {
  return _runInference.apply(this, arguments);
}
function _runInference() {
  _runInference = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(tensor, image) {
    var output, boxesTensor, scoresTensor, classesTensor, validDetectionsTensor, _yield$Promise$all, _yield$Promise$all2, boxes, scores, classes, validDetections;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          _context3.p = 0;
          _context3.n = 1;
          return model.executeAsync(tensor);
        case 1:
          output = _context3.v;
          boxesTensor = getOutputTensor(output, 0, 'Identity');
          scoresTensor = getOutputTensor(output, 1, 'Identity_1');
          classesTensor = getOutputTensor(output, 2, 'Identity_2');
          validDetectionsTensor = getOutputTensor(output, 3, 'Identity_3');
          _context3.n = 2;
          return Promise.all([boxesTensor.data(), scoresTensor.data(), classesTensor.data(), validDetectionsTensor.data()]);
        case 2:
          _yield$Promise$all = _context3.v;
          _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 4);
          boxes = _yield$Promise$all2[0];
          scores = _yield$Promise$all2[1];
          classes = _yield$Promise$all2[2];
          validDetections = _yield$Promise$all2[3];
          return _context3.a(2, findBestPrediction({
            boxes: boxes,
            scores: scores,
            classes: classes,
            validDetections: Math.min(validDetections[0], scores.length, classes.length, boxes.length / 4),
            width: image.width,
            height: image.height
          }));
        case 3:
          _context3.p = 3;
          tf.dispose([tensor, output]);
          return _context3.f(3);
        case 4:
          return _context3.a(2);
      }
    }, _callee3, null, [[0,, 3, 4]]);
  }));
  return _runInference.apply(this, arguments);
}
loadModelAndLabels()["catch"](function (error) {
  postMessage({
    type: 'model-error',
    message: error.message
  });
});
self.onmessage = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(_ref2) {
    var data, prediction, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          data = _ref2.data;
          if (!(data.type !== 'predict')) {
            _context.n = 1;
            break;
          }
          return _context.a(2);
        case 1:
          if (model) {
            _context.n = 2;
            break;
          }
          return _context.a(2);
        case 2:
          _context.p = 2;
          _context.n = 3;
          return runInference(preprocessImage(data.image), data.image);
        case 3:
          prediction = _context.v;
          postMessage(prediction || {
            type: 'prediction-complete'
          });
          _context.n = 5;
          break;
        case 4:
          _context.p = 4;
          _t = _context.v;
          postMessage({
            type: 'prediction-error',
            message: _t.message
          });
        case 5:
          _context.p = 5;
          data.image.close();
          return _context.f(5);
        case 6:
          return _context.a(2);
      }
    }, _callee, null, [[2, 4, 5, 6]]);
  }));
  return function (_x3) {
    return _ref3.apply(this, arguments);
  };
}();
/******/ })()
;
//# sourceMappingURL=machine-learning_worker_js.js.map