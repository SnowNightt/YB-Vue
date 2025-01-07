import { effect } from "./reactive/effect";
import { reactive } from "./reactive/reactive";
console.log(111);

const obj = (window.obj = reactive({
  count: 1,
}));
effect(() => {
  console.log("count:", obj.count);
});
