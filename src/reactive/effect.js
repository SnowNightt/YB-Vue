let activeEffectFn;
export function effect(fn) {
  const effectFn = () => {
    try {
      activeEffectFn = fn;
      return fn();
    } finally {
      // todo
    }
  };
  effectFn();
  return effectFn; // 不知道为啥要return
}
const targetMap = new WeakMap();
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
