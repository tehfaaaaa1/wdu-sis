import { mergeProps, withCtx, unref, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./AppLayout-wXEz5-tl.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "ProfileClient",
  __ssrInlineRender: true,
  setup(__props) {
    const { props } = usePage();
    const client = props.client;
    const projects = props.project;
    const clientSlug = client.slug;
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      return date.toLocaleDateString(void 0, options);
    };
    console.log(client);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ title: "Profile Client" }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-semibold text-xl text-gray-800 leading-tight"${_scopeId}> Profile Client - ${ssrInterpolate(unref(client).client_name)}</h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-semibold text-xl text-gray-800 leading-tight" }, " Profile Client - " + toDisplayString(unref(client).client_name), 1)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-12"${_scopeId}><div class="max-w-7xl mx-auto sm:px-6 lg:px-8"${_scopeId}><div class="py-12 bg-white overflow-hidden shadow-xl sm:rounded-lg h-auto flex flex-col items-center"${_scopeId}><img${ssrRenderAttr("src", `/img/${unref(client).image}`)} alt="" class="h-60 w-full object-scale-down border-b-1 border-gray-400"${_scopeId}><div class="mx-4 px-4 mt-3 py-5"${_scopeId}><p class="text-base text-justify line-clamp-3 leading-5 tracking-wide"${_scopeId}>${ssrInterpolate(unref(client).desc)}</p><div class="mt-5 grid grid-cols-2 gap-2"${_scopeId}><div${_scopeId}>Instansi</div><div class="font-bold"${_scopeId}>${ssrInterpolate(unref(client).client_name)}</div><div${_scopeId}>Alamat</div><div class="font-bold"${_scopeId}>${ssrInterpolate(unref(client).alamat)}</div><div${_scopeId}>Kontak</div><div class="font-bold"${_scopeId}>${ssrInterpolate(unref(client).phone)}</div><div${_scopeId}>Tanggal Tender</div><div class="font-bold"${_scopeId}>${ssrInterpolate(formatDate(unref(client).date))}</div><div${_scopeId}>Project</div><ul class="list-decimal mx-4"${_scopeId}><!--[-->`);
            ssrRenderList(unref(projects), (project) => {
              _push2(`<li class="mb-2"${_scopeId}><div class="flex items-center"${_scopeId}><strong${_scopeId}>${ssrInterpolate(project.project_name)}</strong>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                href: _ctx.route("listsurvey", [unref(clientSlug), project.slug]),
                class: "w-half flex"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"${_scopeId2}></path></svg>`);
                  } else {
                    return [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        "stroke-width": "1.5",
                        stroke: "currentColor",
                        class: "size-5"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                        })
                      ]))
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div><div class="text-sm text-gray-600"${_scopeId}>${ssrInterpolate(project.desc)}</div><div class="text-sm text-gray-500"${_scopeId}> Tanggal: ${ssrInterpolate(formatDate(project.created_at))}</div></li>`);
            });
            _push2(`<!--]--></ul></div></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-12" }, [
                createVNode("div", { class: "max-w-7xl mx-auto sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "py-12 bg-white overflow-hidden shadow-xl sm:rounded-lg h-auto flex flex-col items-center" }, [
                    createVNode("img", {
                      src: `/img/${unref(client).image}`,
                      alt: "",
                      class: "h-60 w-full object-scale-down border-b-1 border-gray-400"
                    }, null, 8, ["src"]),
                    createVNode("div", { class: "mx-4 px-4 mt-3 py-5" }, [
                      createVNode("p", { class: "text-base text-justify line-clamp-3 leading-5 tracking-wide" }, toDisplayString(unref(client).desc), 1),
                      createVNode("div", { class: "mt-5 grid grid-cols-2 gap-2" }, [
                        createVNode("div", null, "Instansi"),
                        createVNode("div", { class: "font-bold" }, toDisplayString(unref(client).client_name), 1),
                        createVNode("div", null, "Alamat"),
                        createVNode("div", { class: "font-bold" }, toDisplayString(unref(client).alamat), 1),
                        createVNode("div", null, "Kontak"),
                        createVNode("div", { class: "font-bold" }, toDisplayString(unref(client).phone), 1),
                        createVNode("div", null, "Tanggal Tender"),
                        createVNode("div", { class: "font-bold" }, toDisplayString(formatDate(unref(client).date)), 1),
                        createVNode("div", null, "Project"),
                        createVNode("ul", { class: "list-decimal mx-4" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(projects), (project) => {
                            return openBlock(), createBlock("li", {
                              key: project.id,
                              class: "mb-2"
                            }, [
                              createVNode("div", { class: "flex items-center" }, [
                                createVNode("strong", null, toDisplayString(project.project_name), 1),
                                createVNode(_sfc_main$2, {
                                  href: _ctx.route("listsurvey", [unref(clientSlug), project.slug]),
                                  class: "w-half flex"
                                }, {
                                  default: withCtx(() => [
                                    (openBlock(), createBlock("svg", {
                                      xmlns: "http://www.w3.org/2000/svg",
                                      fill: "none",
                                      viewBox: "0 0 24 24",
                                      "stroke-width": "1.5",
                                      stroke: "currentColor",
                                      class: "size-5"
                                    }, [
                                      createVNode("path", {
                                        "stroke-linecap": "round",
                                        "stroke-linejoin": "round",
                                        d: "M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                                      })
                                    ]))
                                  ]),
                                  _: 2
                                }, 1032, ["href"])
                              ]),
                              createVNode("div", { class: "text-sm text-gray-600" }, toDisplayString(project.desc), 1),
                              createVNode("div", { class: "text-sm text-gray-500" }, " Tanggal: " + toDisplayString(formatDate(project.created_at)), 1)
                            ]);
                          }), 128))
                        ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Client/ProfileClient.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
