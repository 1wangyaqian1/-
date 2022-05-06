const boxObj = document.querySelector('#box'),
smallObj = boxObj.firstElementChild,
maskObj = smallObj.lastElementChild,
bigObj = document.querySelector('#big'),
bigImg = bigObj.lastElementChild;

// 2 绑定鼠标移入事件

smallObj.onmouseenter = function () {
// 2-1 显示小黄块和大图
maskObj.style.display = 'block';
bigObj.style.display = 'block';
}

// 3 绑定鼠标移出事件
smallObj.onmouseleave = function () {
maskObj.style.display = 'none';
bigObj.style.display = 'none';
}
// 获取box相对于body的left和top值
let boxT = boxObj.offsetTop;
let boxL = boxObj.offsetLeft;


// 4 鼠标移动事件,设置mask跟随鼠标移动
smallObj.onmousemove = function (eve) {
// console.log(eve);
/*
  mask 父级 small 具有定位属性
  设置的left和top值,就是相对于small的,不能使用clientX

  当我们将mask的位置设置到鼠标的位置,此时鼠标再移动获取的在元素神圣值,就是相对于mask
  此时不能使用offsetX/Y 直接设置 
*/

// 4-1 获取鼠标相对于可视区的坐标
// let cX = eve.clientX;
// let cY = eve.clientY;
let cX = eve.pageX;
let cY = eve.pageY;
// console.log(cX, cY);
// 默认mask的属性是display为none,获取不到.获取mask的宽度和高度
let maskW = maskObj.offsetWidth;
let maskH = maskObj.offsetHeight;
// console.log(maskH, maskW);
// 4-2 计算mask的坐标
let maskL = cX - boxL - maskW / 2;
let maskT = cY - boxT - maskH / 2;
// console.log(maskL, maskT);
// 4-3 计算mask的边框
// 判断是否超出上和左边界
if (maskL < 0) maskL = 0
if (maskT < 0) maskT = 0

// 计算最大值,不能从右边和下边出去
let maxMaskL = smallObj.offsetWidth - maskW;
let maxMaskT = smallObj.offsetHeight - maskH;
// console.log(maxMaskL, maxMaskT);
if (maskL > maxMaskL) { maskL = maxMaskL }
if (maskT > maxMaskT) maskT = maxMaskT

// 将值 设置给 mask
maskObj.style.left = maskL + 'px'
maskObj.style.top = maskT + 'px'

/*
 小黄块和大图的关系

 小黄块的实时left/小黄块移动的最大left  = 大图的实时位置left/ 大图能移动的最大left值

*/

//5 计算大图能够移动的最大left和top值
let bigMaxLeft = bigImg.offsetWidth - bigObj.offsetWidth;
let bigMaxTop = bigImg.offsetHeight - bigObj.offsetHeight;

// 5-1 计算大图的实时位置
let tmpBigImgLeft = maskL / maxMaskL * bigMaxLeft;
let tmpBigImgTop = maskT / maxMaskT * bigMaxTop;

// 5-2 设置大图的位置
bigImg.style.left = -tmpBigImgLeft + 'px';
bigImg.style.top = -tmpBigImgTop + 'px';
}