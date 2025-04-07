let circles = [];

function setup() {
  // 產生一個全視窗的畫布
  createCanvas(windowWidth, windowHeight);
  // 設定畫布背景顏色為 #f9eae1
  background('#f9eae1');

  // 生成 40 個圓的初始資料
  for (let i = 0; i < 40; i++) {
    circles.push({
      x: random(width),
      y: random(height),
      size: random(30, 50),
      color: color(random(255), random(255), random(255))
    });
  }

  // 建立選單
  createMenu();
}

function draw() {
  // 清除畫布
  background('#f9eae1');

  // 根據滑鼠的 X 位置調整圓的大小
  let sizeFactor = map(mouseX, 0, width, 20, 80);

  // 繪製所有圓
  for (let circle of circles) {
    fill(circle.color);
    noStroke();
    ellipse(circle.x, circle.y, circle.size * sizeFactor / 50);
  }
}

function createMenu() {
  // 建立選單容器
  let menu = createElement('ul');
  menu.style('position', 'fixed'); // 固定位置，隨滾動保持在視窗內
  menu.style('top', '-100px'); // 初始位置設置為隱藏
  menu.style('right', '10px');
  menu.style('list-style', 'none');
  menu.style('padding', '10px 20px');
  menu.style('background', 'linear-gradient(135deg, #ff9a9e, #fad0c4)');
  menu.style('border', '1px solid #e0e0e0');
  menu.style('border-radius', '15px');
  menu.style('box-shadow', '0 8px 15px rgba(0, 0, 0, 0.3)');
  menu.style('display', 'flex'); // 設定為橫向排列
  menu.style('gap', '20px'); // 增加選項之間的間距
  menu.style('align-items', 'center'); // 垂直置中
  menu.style('z-index', '3000'); // 確保選單在最上層
  menu.style('transition', 'top 0.5s ease'); // 加入平滑過渡效果

  // 新增選單項目
  let items = ['首頁', '自我介紹', '作品集', '測驗卷', '教學影片'];
  for (let item of items) {
    let li = createElement('li', item);
    li.style('cursor', 'pointer');
    li.style('padding', '15px 25px'); // 增加內邊距，讓文字與邊框距離更大
    li.style('background', '#ffffff');
    li.style('border', '1px solid #ddd');
    li.style('border-radius', '10px');
    li.style('text-align', 'center');
    li.style('font-family', 'Arial, sans-serif');
    li.style('font-size', '16px');
    li.style('color', '#333');
    li.style('transition', 'all 0.4s ease, transform 0.2s ease');
    li.style('box-shadow', '0 4px 6px rgba(0, 0, 0, 0.1)');

    // 滑鼠懸停動畫
    li.mouseOver(() => {
      li.style('background', 'linear-gradient(135deg, #fad0c4, #ff9a9e)');
      li.style('color', '#fff');
      li.style('transform', 'scale(1.2) rotate(3deg)');
      li.style('box-shadow', '0 6px 10px rgba(0, 0, 0, 0.2)');
    });

    // 滑鼠移出動畫
    li.mouseOut(() => {
      li.style('background', '#ffffff');
      li.style('color', '#333');
      li.style('transform', 'scale(1) rotate(0deg)');
      li.style('box-shadow', '0 4px 6px rgba(0, 0, 0, 0.1)');
    });

    // 點擊事件
    if (item === '首頁') {
      li.mousePressed(() => hideIframe());
    } else if (item === '作品集') {
      li.mousePressed(() => toggleSubMenu(li));
    } else {
      li.mousePressed(() => alert(`${item} 被點擊了!`));
    }

    menu.child(li);
  }

  // 監聽滑鼠移動事件
  window.addEventListener('mousemove', (event) => {
    if (event.clientY >= 0 && event.clientY <= 200) {
      // 滑鼠在 Y 座標 0-200 範圍內時顯示選單
      menu.style('top', '10px');
    } else {
      // 滑鼠超出範圍時隱藏選單
      menu.style('top', '-100px');
    }
  });
}

function toggleSubMenu(parentLi) {
  // 如果子選單已存在，則移除
  let existingSubMenu = document.querySelector('.sub-menu');
  if (existingSubMenu) {
    existingSubMenu.remove();
    return;
  }

  // 建立子選單
  let subMenu = createElement('ul');
  subMenu.class('sub-menu');
  subMenu.style('position', 'absolute');
  subMenu.style('top', '100%');
  subMenu.style('left', '0');
  subMenu.style('list-style', 'none');
  subMenu.style('padding', '15px 20px');
  subMenu.style('background', 'linear-gradient(135deg, #ffffff, #f0f0f0)');
  subMenu.style('border', '1px solid #ccc');
  subMenu.style('border-radius', '10px');
  subMenu.style('box-shadow', '0 8px 15px rgba(0, 0, 0, 0.2)');
  subMenu.style('z-index', '3000'); // 確保子選單在最上層
  subMenu.style('display', 'block'); // 設定為垂直排列

  let subItems = [
    { name: '第一周作業', url: 'https://yiwen115.github.io/20250303/' },
    { name: '第二周作業', url: 'https://yiwen115.github.io/20250317/' },
    { name: '第三周作業', url: 'https://www.tku.edu.tw/' },
    { name: '第四周作業', url: 'https://www.et.tku.edu.tw/' }
  ];

  for (let subItem of subItems) {
    let li = createElement('li', subItem.name);
    li.style('cursor', 'pointer');
    li.style('padding', '12px 20px');
    li.style('background', '#ffffff');
    li.style('border', '1px solid #ddd');
    li.style('border-radius', '8px');
    li.style('margin-bottom', '10px'); // 增加選項之間的垂直間距
    li.style('text-align', 'center');
    li.style('font-family', 'Arial, sans-serif');
    li.style('font-size', '15px');
    li.style('color', '#333');
    li.style('transition', 'all 0.3s ease');
    li.style('writing-mode', 'horizontal-tb'); // 確保文字橫向排列
    li.style('transform', 'rotate(0deg)'); // 確保文字方向正常
    li.style('box-shadow', '0 4px 6px rgba(0, 0, 0, 0.1)');

    // 滑鼠懸停動畫
    li.mouseOver(() => {
      li.style('background', 'linear-gradient(135deg, #f9f9f9, #e0e0e0)');
      li.style('box-shadow', '0 6px 10px rgba(0, 0, 0, 0.2)');
    });
    li.mouseOut(() => {
      li.style('background', '#ffffff');
      li.style('box-shadow', '0 4px 6px rgba(0, 0, 0, 0.1)');
    });

    // 點擊事件
    li.mousePressed(() => loadIframe(subItem.url));
    subMenu.child(li);
  }

  parentLi.child(subMenu);
}

function loadIframe(url) {
  // 清除畫布並嵌入 iframe
  clear();
  let iframe = createElement('iframe');
  iframe.attribute('src', url);

  // 設定 iframe 的寬度和高度
  let iframeWidth = windowWidth * 0.8; // 寬度為視窗的 80%
  let iframeHeight = windowHeight * 0.8; // 高度為視窗的 80%

  // 計算置中位置
  let iframeTop = (windowHeight - iframeHeight) / 2; // 垂直置中
  let iframeLeft = (windowWidth - iframeWidth) / 2; // 水平置中

  iframe.style('position', 'absolute');
  iframe.style('top', `${iframeTop}px`);
  iframe.style('left', `${iframeLeft}px`);
  iframe.style('width', `${iframeWidth}px`);
  iframe.style('height', `${iframeHeight}px`);
  iframe.style('border', 'none');
  iframe.style('border-radius', '10px'); // 增加圓角
  iframe.style('box-shadow', '0 8px 15px rgba(0, 0, 0, 0.3)'); // 增加陰影
  iframe.style('z-index', '2000'); // 確保 iframe 在子選單下方
  document.body.appendChild(iframe.elt);
}

function hideIframe() {
  // 隱藏 iframe
  let iframe = document.querySelector('iframe');
  if (iframe) {
    iframe.remove(); // 移除 iframe 元素
  }
}
