import { useSSRContext, mergeProps, withCtx, createVNode, toDisplayString } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$2 } from "./AppLayout-wXEz5-tl.js";
import "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main$1 = {};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ApplicationLogo.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Dashboard",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$2, mergeProps({ title: "Dashboard" }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-semibold text-xl text-gray-800 leading-tight"${_scopeId}> Dashboard </h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-semibold text-xl text-gray-800 leading-tight" }, " Dashboard ")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="max-w-7xl mx-auto sm:px-6 lg:px-8"${_scopeId}><div class="bg-white overflow-hidden shadow-xl sm:rounded-lg h-auto"${_scopeId}><div class="flex flex-row items-center w-full"${_scopeId}><div class="p-6 basis-full md:basis-1/2"${_scopeId}><h1 class="text-3xl ps-3 font-bold"${_scopeId}>Welcome back, ${ssrInterpolate(_ctx.$page.props.auth.user.name)}</h1><p class="text-gray-500 ps-3"${_scopeId}>Check the latest updates here.</p></div><div class="hidden md:flex justify-end shadow-md m-3 rounded-lg basis-1/2"${_scopeId}><img src="/img/wdu-Building.jpg" alt="" class="rounded-lg"${_scopeId}></div></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "max-w-7xl mx-auto sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "bg-white overflow-hidden shadow-xl sm:rounded-lg h-auto" }, [
                    createVNode("div", { class: "flex flex-row items-center w-full" }, [
                      createVNode("div", { class: "p-6 basis-full md:basis-1/2" }, [
                        createVNode("h1", { class: "text-3xl ps-3 font-bold" }, "Welcome back, " + toDisplayString(_ctx.$page.props.auth.user.name), 1),
                        createVNode("p", { class: "text-gray-500 ps-3" }, "Check the latest updates here.")
                      ]),
                      createVNode("div", { class: "hidden md:flex justify-end shadow-md m-3 rounded-lg basis-1/2" }, [
                        createVNode("img", {
                          src: "/img/wdu-Building.jpg",
                          alt: "",
                          class: "rounded-lg"
                        })
                      ])
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
