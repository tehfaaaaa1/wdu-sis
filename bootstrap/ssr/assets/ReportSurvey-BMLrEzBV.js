import { ref, mergeProps, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, createTextVNode, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./AppLayout-wXEz5-tl.js";
import "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "ReportSurvey",
  __ssrInlineRender: true,
  props: {
    surveys: Object,
    projects: Object,
    clients: Object,
    page: Array,
    responses: Array,
    answer: Array,
    user: Object
  },
  setup(__props) {
    const props = __props;
    props.projects[0];
    props.clients[0];
    const checked = (choice, q) => {
      console.log(q.answer.some((ans) => ans.answer == choice.value));
      return q.answer.some((ans) => ans.answer == choice.value);
    };
    ref([{ soal: [] }]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ title: "Hasil Survey" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<main class="min-h-screen"${_scopeId}><div class="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8"${_scopeId}><!--[-->`);
            ssrRenderList(__props.page, (page, ind) => {
              _push2(`<div class="mb-5"${_scopeId}><div class="text-center text-3xl font-semibold py-5 bg-primary text-white rounded-t-md"${_scopeId}><h2${_scopeId}>${ssrInterpolate(page.page_name)}</h2></div><div class="bg-white rounded-b-md"${_scopeId}><div class="border-b-2 p-5 border-gray-500"${_scopeId}><div class="p-5 mt-2 border-2 border-gray-400"${_scopeId}><h2 class="font-semibold text-lg"${_scopeId}>${ssrInterpolate(props.user.name)}</h2></div></div><div class="p-5 flex w-full"${_scopeId}><form class="w-full"${_scopeId}><!--[-->`);
              ssrRenderList(page.question, (question, index) => {
                _push2(`<div${_scopeId}><div class="block mb-2"${_scopeId}><p class="font-semibold"${_scopeId}>${ssrInterpolate(index + 1)}. <label${_scopeId}>${ssrInterpolate(question.question_text)}</label></p>`);
                if (question.question_type_id == 2) {
                  _push2(`<div${_scopeId}><!--[-->`);
                  ssrRenderList(question.choice, (list, i) => {
                    _push2(`<div${_scopeId}><input type="radio"${ssrRenderAttr("name", "radio" + list.id)}${ssrRenderAttr("id", "radio" + list.id)}${ssrIncludeBooleanAttr(checked(list, question)) ? " checked" : ""} disabled${_scopeId}><label${ssrRenderAttr("for", "radio" + list.id)}${_scopeId}>${ssrInterpolate(list.value)}</label> ${ssrInterpolate(checked(list, question))}</div>`);
                  });
                  _push2(`<!--]--></div>`);
                } else {
                  _push2(`<!---->`);
                }
                if (question.question_type_id === 3) {
                  _push2(`<div class=""${_scopeId}><!--[-->`);
                  ssrRenderList(question.choice, (list, i) => {
                    _push2(`<div class=""${_scopeId}><input type="checkbox"${ssrRenderAttr("name", "checkbox" + list.id)}${ssrRenderAttr("id", "checkbox" + list.id)}${ssrIncludeBooleanAttr(checked(list, question)) ? " checked" : ""} disabled${_scopeId}><label${ssrRenderAttr("for", "checkbox" + list.id)}${_scopeId}>${ssrInterpolate(list.value)}</label></div>`);
                  });
                  _push2(`<!--]--></div>`);
                } else {
                  _push2(`<!---->`);
                }
                if (question.question_type_id == 1) {
                  _push2(`<div${_scopeId}><!--[-->`);
                  ssrRenderList(question.answer, (answe) => {
                    _push2(`<div class="ps-5"${_scopeId}><input type="text"${ssrRenderAttr("value", answe.answer)} disabled${_scopeId}></div>`);
                  });
                  _push2(`<!--]--></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div>`);
              });
              _push2(`<!--]--></form></div></div></div>`);
            });
            _push2(`<!--]--></div></main>`);
          } else {
            return [
              createVNode("main", { class: "min-h-screen" }, [
                createVNode("div", { class: "mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.page, (page, ind) => {
                    return openBlock(), createBlock("div", {
                      class: "mb-5",
                      key: ind
                    }, [
                      createVNode("div", { class: "text-center text-3xl font-semibold py-5 bg-primary text-white rounded-t-md" }, [
                        createVNode("h2", null, toDisplayString(page.page_name), 1)
                      ]),
                      createVNode("div", { class: "bg-white rounded-b-md" }, [
                        createVNode("div", { class: "border-b-2 p-5 border-gray-500" }, [
                          createVNode("div", { class: "p-5 mt-2 border-2 border-gray-400" }, [
                            createVNode("h2", { class: "font-semibold text-lg" }, toDisplayString(props.user.name), 1)
                          ])
                        ]),
                        createVNode("div", { class: "p-5 flex w-full" }, [
                          createVNode("form", { class: "w-full" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(page.question, (question, index) => {
                              return openBlock(), createBlock("div", { key: index }, [
                                createVNode("div", { class: "block mb-2" }, [
                                  createVNode("p", { class: "font-semibold" }, [
                                    createTextVNode(toDisplayString(index + 1) + ". ", 1),
                                    createVNode("label", null, toDisplayString(question.question_text), 1)
                                  ]),
                                  question.question_type_id == 2 ? (openBlock(), createBlock("div", { key: 0 }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(question.choice, (list, i) => {
                                      return openBlock(), createBlock("div", { key: i }, [
                                        createVNode("input", {
                                          type: "radio",
                                          name: "radio" + list.id,
                                          id: "radio" + list.id,
                                          checked: checked(list, question),
                                          disabled: ""
                                        }, null, 8, ["name", "id", "checked"]),
                                        createVNode("label", {
                                          for: "radio" + list.id
                                        }, toDisplayString(list.value), 9, ["for"]),
                                        createTextVNode(" " + toDisplayString(checked(list, question)), 1)
                                      ]);
                                    }), 128))
                                  ])) : createCommentVNode("", true),
                                  question.question_type_id === 3 ? (openBlock(), createBlock("div", {
                                    key: 1,
                                    class: ""
                                  }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(question.choice, (list, i) => {
                                      return openBlock(), createBlock("div", {
                                        class: "",
                                        key: i
                                      }, [
                                        createVNode("input", {
                                          type: "checkbox",
                                          name: "checkbox" + list.id,
                                          id: "checkbox" + list.id,
                                          checked: checked(list, question),
                                          disabled: ""
                                        }, null, 8, ["name", "id", "checked"]),
                                        createVNode("label", {
                                          for: "checkbox" + list.id
                                        }, toDisplayString(list.value), 9, ["for"])
                                      ]);
                                    }), 128))
                                  ])) : createCommentVNode("", true),
                                  question.question_type_id == 1 ? (openBlock(), createBlock("div", { key: 2 }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(question.answer, (answe) => {
                                      return openBlock(), createBlock("div", { class: "ps-5" }, [
                                        createVNode("input", {
                                          type: "text",
                                          value: answe.answer,
                                          disabled: ""
                                        }, null, 8, ["value"])
                                      ]);
                                    }), 256))
                                  ])) : createCommentVNode("", true)
                                ])
                              ]);
                            }), 128))
                          ])
                        ])
                      ])
                    ]);
                  }), 128))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Client/Projects/Surveys/ReportSurvey.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
