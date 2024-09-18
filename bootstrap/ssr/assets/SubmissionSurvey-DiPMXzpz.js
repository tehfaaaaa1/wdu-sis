import { mergeProps, withCtx, unref, createTextVNode, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, withModifiers, withDirectives, vModelRadio, createCommentVNode, vModelCheckbox, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseEqual, ssrLooseContain } from "vue/server-renderer";
import { useForm } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./AppLayout-wXEz5-tl.js";
import { _ as _sfc_main$2 } from "./PrimaryButton-CZ4pYQi_.js";
import "./Checkbox-DncvTmae.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "SubmissionSurvey",
  __ssrInlineRender: true,
  props: {
    surveys: Object,
    projects: Object,
    clients: Object,
    page: Array
  },
  setup(__props) {
    const props = __props;
    const project = props.projects[0];
    const client = props.clients[0];
    const form = useForm({
      page: props.page.map((page) => ({
        question: page.question,
        answer: page.question.map(() => ({
          texts: "",
          radios: [],
          checkboxes: []
        }))
      })),
      project_slug: project["slug"],
      client_slug: client["slug"]
    });
    const submit = () => {
      form.post(route("submit_survey", [form.client_slug, form.project_slug, props.surveys.id]), { preserveState: true });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ title: "Isi Survey" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<main class="min-h-screen"${_scopeId}><div class="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8"${_scopeId}><!--[-->`);
            ssrRenderList(__props.page, (page, ind) => {
              _push2(`<div class=""${_scopeId}><div class="text-center text-3xl font-semibold py-5 bg-primary text-white rounded-t-md select-none"${_scopeId}><h2${_scopeId}>${ssrInterpolate(page.page_name)}</h2></div><div class="bg-white rounded-b-md"${_scopeId}><div class="border-b-2 p-5 border-gray-500"${_scopeId}><p class="text-base text-justify select-none"${_scopeId}>${ssrInterpolate(props.surveys.desc)}</p></div><div class="p-5 flex w-full"${_scopeId}><form class="w-full"${_scopeId}><!--[-->`);
              ssrRenderList(page.question, (question, index) => {
                _push2(`<div class="block mb-4"${_scopeId}><p${_scopeId}>${ssrInterpolate(index + 1)}. <label${_scopeId}>${ssrInterpolate(question.question_text)}</label></p>`);
                if (question.question_type_id == 2) {
                  _push2(`<div${_scopeId}><!--[-->`);
                  ssrRenderList(question.choice, (list, i) => {
                    _push2(`<div${_scopeId}>`);
                    if (list.question_id === question.id) {
                      _push2(`<input type="radio"${ssrRenderAttr("id", "qradio" + list.question_id + "-option" + (i + 1))}${ssrRenderAttr("value", list.value)}${ssrIncludeBooleanAttr(ssrLooseEqual(unref(form).page[ind].answer[index].radios, list.value)) ? " checked" : ""}${_scopeId}>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    if (list.question_id === question.id) {
                      _push2(`<label class="px-3"${ssrRenderAttr("for", "qradio" + list.question_id + "-option" + (i + 1))}${_scopeId}>${ssrInterpolate(list.value)}</label>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`</div>`);
                  });
                  _push2(`<!--]--></div>`);
                } else {
                  _push2(`<!---->`);
                }
                if (question.question_type_id == 3) {
                  _push2(`<div${_scopeId}><!--[-->`);
                  ssrRenderList(question.choice, (list, i) => {
                    _push2(`<div${_scopeId}>`);
                    if (list.question_id === question.id) {
                      _push2(`<input type="checkbox"${ssrRenderAttr("id", "qcheck" + list.question_id + "-option" + (i + 1))}${ssrRenderAttr("value", list.value)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).page[ind].answer[index].checkboxes) ? ssrLooseContain(unref(form).page[ind].answer[index].checkboxes, list.value) : unref(form).page[ind].answer[index].checkboxes) ? " checked" : ""}${_scopeId}>`);
                    } else {
                      _push2(`<!---->`);
                    }
                    _push2(`<label class="px-3"${ssrRenderAttr("for", "qcheck" + list.question_id + "-option" + (i + 1))}${_scopeId}>${ssrInterpolate(list.value)}</label></div>`);
                  });
                  _push2(`<!--]--></div>`);
                } else {
                  _push2(`<!---->`);
                }
                if (question.question_type_id == 1) {
                  _push2(`<div${_scopeId}><textarea title="Answer" placeholder="Jawaban open-ended" class="w-full h-20"${_scopeId}>${ssrInterpolate(unref(form).page[ind].answer[index].texts)}</textarea></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              });
              _push2(`<!--]-->`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                class: ["flex justify-center md:mb-6 text-center", { "opacity-25": unref(form).processing }],
                disabled: unref(form).processing
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Submit Survey `);
                  } else {
                    return [
                      createTextVNode(" Submit Survey ")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</form></div></div></div>`);
            });
            _push2(`<!--]--></div></main>`);
          } else {
            return [
              createVNode("main", { class: "min-h-screen" }, [
                createVNode("div", { class: "mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.page, (page, ind) => {
                    return openBlock(), createBlock("div", {
                      class: "",
                      key: ind
                    }, [
                      createVNode("div", { class: "text-center text-3xl font-semibold py-5 bg-primary text-white rounded-t-md select-none" }, [
                        createVNode("h2", null, toDisplayString(page.page_name), 1)
                      ]),
                      createVNode("div", { class: "bg-white rounded-b-md" }, [
                        createVNode("div", { class: "border-b-2 p-5 border-gray-500" }, [
                          createVNode("p", { class: "text-base text-justify select-none" }, toDisplayString(props.surveys.desc), 1)
                        ]),
                        createVNode("div", { class: "p-5 flex w-full" }, [
                          createVNode("form", {
                            onSubmit: withModifiers(submit, ["prevent"]),
                            class: "w-full"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(page.question, (question, index) => {
                              return openBlock(), createBlock("div", {
                                key: index,
                                class: "block mb-4"
                              }, [
                                createVNode("p", null, [
                                  createTextVNode(toDisplayString(index + 1) + ". ", 1),
                                  createVNode("label", null, toDisplayString(question.question_text), 1)
                                ]),
                                question.question_type_id == 2 ? (openBlock(), createBlock("div", { key: 0 }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(question.choice, (list, i) => {
                                    return openBlock(), createBlock("div", { key: i }, [
                                      list.question_id === question.id ? withDirectives((openBlock(), createBlock("input", {
                                        key: 0,
                                        type: "radio",
                                        id: "qradio" + list.question_id + "-option" + (i + 1),
                                        value: list.value,
                                        "onUpdate:modelValue": ($event) => unref(form).page[ind].answer[index].radios = $event
                                      }, null, 8, ["id", "value", "onUpdate:modelValue"])), [
                                        [vModelRadio, unref(form).page[ind].answer[index].radios]
                                      ]) : createCommentVNode("", true),
                                      list.question_id === question.id ? (openBlock(), createBlock("label", {
                                        key: 1,
                                        class: "px-3",
                                        for: "qradio" + list.question_id + "-option" + (i + 1)
                                      }, toDisplayString(list.value), 9, ["for"])) : createCommentVNode("", true)
                                    ]);
                                  }), 128))
                                ])) : createCommentVNode("", true),
                                question.question_type_id == 3 ? (openBlock(), createBlock("div", { key: 1 }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(question.choice, (list, i) => {
                                    return openBlock(), createBlock("div", { key: i }, [
                                      list.question_id === question.id ? withDirectives((openBlock(), createBlock("input", {
                                        key: 0,
                                        type: "checkbox",
                                        id: "qcheck" + list.question_id + "-option" + (i + 1),
                                        value: list.value,
                                        "onUpdate:modelValue": ($event) => unref(form).page[ind].answer[index].checkboxes = $event
                                      }, null, 8, ["id", "value", "onUpdate:modelValue"])), [
                                        [vModelCheckbox, unref(form).page[ind].answer[index].checkboxes]
                                      ]) : createCommentVNode("", true),
                                      createVNode("label", {
                                        class: "px-3",
                                        for: "qcheck" + list.question_id + "-option" + (i + 1)
                                      }, toDisplayString(list.value), 9, ["for"])
                                    ]);
                                  }), 128))
                                ])) : createCommentVNode("", true),
                                question.question_type_id == 1 ? (openBlock(), createBlock("div", { key: 2 }, [
                                  withDirectives(createVNode("textarea", {
                                    title: "Answer",
                                    placeholder: "Jawaban open-ended",
                                    class: "w-full h-20",
                                    "onUpdate:modelValue": ($event) => unref(form).page[ind].answer[index].texts = $event
                                  }, null, 8, ["onUpdate:modelValue"]), [
                                    [vModelText, unref(form).page[ind].answer[index].texts]
                                  ])
                                ])) : createCommentVNode("", true)
                              ]);
                            }), 128)),
                            createVNode(_sfc_main$2, {
                              class: ["flex justify-center md:mb-6 text-center", { "opacity-25": unref(form).processing }],
                              disabled: unref(form).processing
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Submit Survey ")
                              ]),
                              _: 1
                            }, 8, ["class", "disabled"])
                          ], 32)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Client/Projects/Surveys/SubmissionSurvey.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
