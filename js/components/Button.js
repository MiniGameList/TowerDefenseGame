/**
 * 
 * @param {*} obj Phaser object
 * @param {() => void} callback 点击回调
 */
export function Button(obj, callback) {
  obj.inputEnabled=true;
  let scaleX = obj.scale.x;
  let scaleY = obj.scale.y;
  obj.events.onInputUp.add(() => {
    obj.scale.set(scaleX, scaleY);
    setTimeout(() => {
      callback();
    }, 100);
  });
  obj.events.onInputDown.add(() => {
      obj.scale.set(scaleX * 0.9, scaleY * 0.9);
  });
}