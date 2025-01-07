import { isObject } from "../utils/isObject";
import { track, trigger } from "./effect";
const handler = {
  get(target, prop, receiver) {
    const res = Reflect.get(target, prop, receiver);
    track(target, prop);
    return res;
  },
  set(target, prop, value, receiver) {
    const res = Reflect.set(target, prop, value, receiver);
    trigger(target, prop);
    return res;
  },
};
const proxyMap = new WeakMap();
export function reactive(target) {
  // 检测是否传入对象
  if (!isObject(target)) {
    return target;
  }
  // 检测二次代理
  const isProxy = proxyMap.get(target);
  if (isProxy) {
    return isProxy;
  }
  const proxy = new Proxy(target, handler);
  proxyMap.set(target, proxy);
  return proxy;
}
