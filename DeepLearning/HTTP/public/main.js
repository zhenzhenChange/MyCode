async function start(url) {
  // 等待图片创建完成
  const img = await loadImage(url);

  // 加载图片数据
  const data = loadRgbaDataFromImage(img);

  // 返回附带数据的 Promise
  return data;
}

function loadImage(url) {
  // 返回 Promise
  return new Promise((resolve, reject) => {
    // 创建 img 元素
    const img = new Image();

    // 设置属性
    img.src = url;
    img.crossOrigin = 'anonymous';

    // 设置加载结果回调函数
    img.onerror = reject;
    img.onload = () => resolve(img);
  });
}

function loadRgbaDataFromImage(img) {
  // 创建一个画布元素
  const canvas = document.createElement('canvas');

  // 设置画布的尺寸为图片的大小
  canvas.width = img.width;
  canvas.height = img.height;

  // 创建一个 2D 渲染上下文
  const ctx = canvas.getContext('2d');

  // 渲染图片到画布上下文，位置为 (0, 0, left, top)
  ctx.drawImage(img, 0, 0, img.width, img.height);

  // 提取图片数据
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  // 将图片数据转换成 int32 数组数据类型
  return new Int32Array(imgData.data);
}

function renderImage(el, img) {
  // 将 img 元素追加到 DOM 中
  el.append(img);

  return img;
}

function renderRgbaData(el, data, width, height, smooth) {
  // 创建一个 canvas 元素
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  // 创建一个 2D 渲染上下文
  const ctx = canvas.getContext('2d');

  // 从画布获取图像数据对象
  const img = ctx.getImageData(0, 0, width, height);

  // 转换像素值
  const vals = new Uint8ClampedArray(data);

  // 将值写入图像数据
  img.data.set(vals);

  // 将图像数据写入画布上下文
  ctx.putImageData(img, 0, 0);

  // 启用/禁用自动平滑
  ctx.imageSmoothingEnabled = Boolean(smooth);

  // 将 canvas 元素添加到 DOM
  el.append(canvas);

  return canvas;
}

function renderData(el, data, width, height, smooth) {
  // 创建一个 canvas 元素
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  // 创建一个 2D 渲染上下文
  const ctx = canvas.getContext('2d');

  // 从画布获取图像数据对象
  const img = ctx.getImageData(0, 0, width, height);

  // 转换像素值
  const len = data.length * 4;
  const vals = new Uint8ClampedArray(len);

  for (let x = 0; x < width; ++x) {
    for (let y = 0; y < height; ++y) {
      let ix0 = y * width + x;
      let ix1 = ix0 * 4;
      let val = (1 - data[ix0]) * 255;

      vals[ix1 + 0] = val; // R
      vals[ix1 + 1] = val; // G
      vals[ix1 + 2] = val; // B
      vals[ix1 + 3] = 255; // A
    }
  }

  // 将值写入图像数据
  img.data.set(vals);

  // 将图像数据写入画布上下文
  ctx.putImageData(img, 0, 0);

  // 启用/禁用自动平滑
  ctx.imageSmoothingEnabled = Boolean(smooth);

  // 将 canvas 元素添加到 DOM
  el.append(canvas);

  return canvas;
}

// 插值图像数据
function interpolateRgba(d0, d1, alpha, width, height, channels) {
  const out = new Uint8ClampedArray(d0.length);

  const a0 = 1 - alpha;
  const a1 = alpha;

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      for (let c = 0; c < channels; c++) {
        let ix = (y * width + x) * channels + c;
        out[ix] = d0[ix] * a0 + d1[ix] * a1;
      }
    }
  }

  return out;
}

function addRect(canvas, dims, color) {
  const ctx = canvas.getContext('2d');
  const left = dims[0];
  const top = dims[1];
  const width = dims[2];
  const height = dims[3];

  ctx.strokeStyle = color || 'black';
  ctx.rect(left, top, width, height);
  ctx.stroke();
}

function addCircle(canvas, dims, color) {
  const ctx = canvas.getContext('2d');
  const cx = dims[0];
  const cy = dims[1];
  const outerRadius = dims[2];
  const innerRadius = dims.length > 3 ? dims[3] : 0;
  const arc = dims.length > 4 ? dims[4] : 2 * Math.PI;

  ctx.strokeStyle = color || 'black';
  ctx.beginPath();
  ctx.arc(cx, cy, outerRadius, innerRadius, arc);
  ctx.stroke();
}

async function loadRgbaDataFromUrl(url) {
  const img = await loadImage(url);
  return loadRgbaDataFromImage(img);
}

(async function () {
  // 图片地址
  const url = 'https://storage.googleapis.com/learnjs-data/images/cat.jpeg';
  const ary = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
  ];

  const img = await loadImage(url);
  const data = loadRgbaDataFromImage(img);

  // 输出图片二进制数据
  const binData = await start(url);
  console.log(binData); // Int32Array(2272032)

  // 渲染图片到浏览器
  // renderImage(document.body, img);

  // 使用 canvas 将图片渲染
  // renderRgbaData(document.body, data, img.width, img.height);

  // 可视化任意二进制数据块
  const size = 8;
  const intData = new Int32Array(ary);
  // renderData(document.body, intData, size, size, false);

  // const width = 500;
  // const height = 500;
  // const channels = 4;
  // const canvas = document.getElementById('scene');
  // const pixels = await loadRgbaDataFromUrl(url);
  // const object = await loadRgbaDataFromUrl(url);

  // const layover = interpolateRgba(pixels, object, 0.5, width, height, channels);

  // renderRgbaData(canvas, pixels, width, height);

  // canvas.onmouseover = () => renderRgbaData(canvas, layover, width, height);
  // canvas.onmouseleave = () => renderRgbaData(canvas, pixels, width, height);

  const canvas1 = renderRgbaData(document.body, data, img.width, img.height);

  addRect(canvas1, [70, 20, 100, 100], 'green');

  const canvas2 = renderRgbaData(document.body, data, img.width, img.height);

  addCircle(canvas2, [120, 70, 50], 'red');
})();
