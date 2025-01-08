let activeEffectFn;
export function effect(fn) {
  const effectFn = () => {
    try {
      activeEffectFn = fn;
      return fn();
    } finally {
      // todo
      // fn函数调用完后，依赖收集完成，activeEffectFn可设置为undefined
      activeEffectFn = undefined
    }
  };
  effectFn();
  return effectFn; // 不知道为啥要return
}
const targetMap = new WeakMap();
// targetMap中键是代理的响应式对象，值是一个Map
// Map中键是对象的属性，值时一个Set，里面收集依赖该属性的函数。当该属性变化时，重新触发所有函数。
// 依赖收集
export function track(target, prop) {
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }
  let deps = depsMap.get(prop);
  if (!deps) {
    depsMap.set(prop, (deps = new Set()));
  }
  deps.add(activeEffectFn);
}
// 依赖触发
export function trigger(target, prop) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  const deps = depsMap.get(prop);
  if (!deps) {
    return;
  }
  deps.forEach((effect) => {
    effect();
  });
}
