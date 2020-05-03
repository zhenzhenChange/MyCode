/**
 * 适配器模式：解决两个软件实体间的接口不兼容的问题
 * 亡羊补牢的模式
 */

// 接口不匹配问题
const googleMap = {
  show() {
    console.log('GoogleMap');
  },
};

const baiduMap = {
  display() {
    console.log('BaiduMap');
  },
};

function renderMap(map) {
  map.show();
}

const baiduMapAdapter = {
  show() {
    baiduMap.display();
  },
};

renderMap(googleMap);
renderMap(baiduMapAdapter);

// 数据格式转换问题
function cityData() {
  return [
    { id: 11, name: 'shenzhen' },
    { id: 12, name: 'guangzhou' },
  ];
}

function renderData(fn) {
  console.log('render Data');
  console.log(JSON.stringify(fn()));
}

renderData(cityData);

// 新数据格式
const newCityData = {
  shenzhen: 11,
  guangzhou: 12,
  zhuhai: 13,
};

// 转换旧的数据格式
function newDataAdapter(oldDataFn) {
  const data = {};
  const result = oldDataFn();

  result.forEach((item) => (data[item.name] = item.id));

  return () => data;
}

renderData(newDataAdapter(cityData));
