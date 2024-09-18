import { mergeProps, withCtx, unref, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AppLayout-wXEz5-tl.js";
import "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "ListResponse",
  __ssrInlineRender: true,
  props: {
    surveys: Object,
    projects: Object,
    clients: Object,
    response: Object,
    totalres: Object,
    biodata: Object
  },
  setup(__props) {
    const props = __props;
    const project = props.projects[0];
    const client = props.clients[0];
    const clientSlug = client.slug;
    const projectSlug = project.slug;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ title: "Isi Survey" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<main class="min-h-screen"${_scopeId}><div class="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8"${_scopeId}><div class="text-center text-3xl font-semibold py-5 bg-ijo-terang text-white rounded-t-md"${_scopeId}><h2${_scopeId}>${ssrInterpolate(props.surveys.title)}</h2></div><div class="bg-white rounded-b-md"${_scopeId}><div class="border-b-2 p-5 border-gray-500"${_scopeId}><p class="text-base text-justify line-clamp-3"${_scopeId}></p><div class="p-5 mt-2 border-2 border-gray-400"${_scopeId}><h2 class="font-semibold text-lg"${_scopeId}>Summary</h2><p class="font-medium"${_scopeId}>${ssrInterpolate(props.totalres)} Response</p></div></div><div class="relative overflow-x-auto shadow-md mt-4"${_scopeId}><h3 class="text-center mb-3 text-xl font-semibold"${_scopeId}>List Respon</h3><table class="w-full text-sm text-left rtl:text-right text-gray-500 sm:table-auto"${_scopeId}><thead class="text-xs text-white uppercase bg-primary"${_scopeId}><tr${_scopeId}><th scope="col" class="px-6 py-3 w-1/12"${_scopeId}>No.</th><th scope="col" class="px-6 py-3"${_scopeId}>Nama</th><th scope="col" class="px-6 py-3"${_scopeId}>Email</th><th scope="col" class="px-6 py-3"${_scopeId}>Wilayah/Daerah</th><th scope="col" class="px-6 py-3 md:w-1/6"${_scopeId}>Action</th></tr></thead><tbody${_scopeId}><!--[-->`);
            ssrRenderList(__props.response, (responses, index) => {
              _push2(`<tr class="bg-white border-b hover:bg-gray-50"${_scopeId}><td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"${_scopeId}>${ssrInterpolate(index + 1)}</td><td class="px-6 py-4 font-medium text-gray-900 sm:text-gray-500"${_scopeId}>${ssrInterpolate(responses.user.name)}</td><td class="px-6 py-4"${_scopeId}>${ssrInterpolate(responses.user.email)}</td><td class="px-6 py-4"${_scopeId}><!--[-->`);
              ssrRenderList(__props.biodata, (bio) => {
                _push2(`<div class=""${_scopeId}>`);
                if (bio.user_id === responses.user_id) {
                  _push2(`<div class=""${_scopeId}>${ssrInterpolate(bio.alamat)}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              });
              _push2(`<!--]--></td><td class="px-6 py-4"${_scopeId}><a${ssrRenderAttr("href", _ctx.route("report_surveys", [unref(clientSlug), unref(projectSlug), props.surveys.id, responses.id]))} class="font-medium text-blue-600 hover:underline mr-4"${_scopeId}>Lihat Hasil</a></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div></div></div></main>`);
          } else {
            return [
              createVNode("main", { class: "min-h-screen" }, [
                createVNode("div", { class: "mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "text-center text-3xl font-semibold py-5 bg-ijo-terang text-white rounded-t-md" }, [
                    createVNode("h2", null, toDisplayString(props.surveys.title), 1)
                  ]),
                  createVNode("div", { class: "bg-white rounded-b-md" }, [
                    createVNode("div", { class: "border-b-2 p-5 border-gray-500" }, [
                      createVNode("p", { class: "text-base text-justify line-clamp-3" }),
                      createVNode("div", { class: "p-5 mt-2 border-2 border-gray-400" }, [
                        createVNode("h2", { class: "font-semibold text-lg" }, "Summary"),
                        createVNode("p", { class: "font-medium" }, toDisplayString(props.totalres) + " Response", 1)
                      ])
                    ]),
                    createVNode("div", { class: "relative overflow-x-auto shadow-md mt-4" }, [
                      createVNode("h3", { class: "text-center mb-3 text-xl font-semibold" }, "List Respon"),
                      createVNode("table", { class: "w-full text-sm text-left rtl:text-right text-gray-500 sm:table-auto" }, [
                        createVNode("thead", { class: "text-xs text-white uppercase bg-primary" }, [
                          createVNode("tr", null, [
                            createVNode("th", {
                              scope: "col",
                              class: "px-6 py-3 w-1/12"
                            }, "No."),
                            createVNode("th", {
                              scope: "col",
                              class: "px-6 py-3"
                            }, "Nama"),
                            createVNode("th", {
                              scope: "col",
                              class: "px-6 py-3"
                            }, "Email"),
                            createVNode("th", {
                              scope: "col",
                              class: "px-6 py-3"
                            }, "Wilayah/Daerah"),
                            createVNode("th", {
                              scope: "col",
                              class: "px-6 py-3 md:w-1/6"
                            }, "Action")
                          ])
                        ]),
                        createVNode("tbody", null, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.response, (responses, index) => {
                            return openBlock(), createBlock("tr", {
                              key: index,
                              class: "bg-white border-b hover:bg-gray-50"
                            }, [
                              createVNode("td", {
                                scope: "row",
                                class: "px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                              }, toDisplayString(index + 1), 1),
                              createVNode("td", { class: "px-6 py-4 font-medium text-gray-900 sm:text-gray-500" }, toDisplayString(responses.user.name), 1),
                              createVNode("td", { class: "px-6 py-4" }, toDisplayString(responses.user.email), 1),
                              createVNode("td", { class: "px-6 py-4" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.biodata, (bio) => {
                                  return openBlock(), createBlock("div", { class: "" }, [
                                    bio.user_id === responses.user_id ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: ""
                                    }, toDisplayString(bio.alamat), 1)) : createCommentVNode("", true)
                                  ]);
                                }), 256))
                              ]),
                              createVNode("td", { class: "px-6 py-4" }, [
                                createVNode("a", {
                                  href: _ctx.route("report_surveys", [unref(clientSlug), unref(projectSlug), props.surveys.id, responses.id]),
                                  class: "font-medium text-blue-600 hover:underline mr-4"
                                }, "Lihat Hasil", 8, ["href"])
                              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Client/Projects/Surveys/ListResponse.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
