import { ref, watch, mergeProps, withCtx, createVNode, unref, createTextVNode, withModifiers, withDirectives, vModelText, openBlock, createBlock, Fragment, renderList, toDisplayString, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { useForm } from "@inertiajs/vue3";
import axios from "axios";
import { A as AuthenticationCard } from "./AuthenticationCard-3q45n6AV.js";
import { _ as _sfc_main$2 } from "./AuthenticationCardLogo-DcwaY1SR.js";
import { _ as _sfc_main$5 } from "./InputError-R5JGcBaq.js";
import { _ as _sfc_main$3 } from "./InputLabel-Do1v5jZF.js";
import { _ as _sfc_main$6 } from "./PrimaryButton-CZ4pYQi_.js";
import { _ as _sfc_main$4 } from "./TextInput-CTvmmegX.js";
import { _ as _sfc_main$1 } from "./AppLayout-wXEz5-tl.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "CreateSurveys",
  __ssrInlineRender: true,
  props: {
    projects: Array,
    clients: Array
  },
  setup(__props) {
    var _a, _b, _c;
    const props = __props;
    const form = useForm({
      title: "",
      desc: "",
      target_response: "",
      project_id: ((_a = props.projects[0]) == null ? void 0 : _a.id) || null,
      project_slug: ((_b = props.projects[0]) == null ? void 0 : _b.slug) || null,
      client_slug: ((_c = props.clients[0]) == null ? void 0 : _c.slug) || null,
      province_id: "",
      city_id: "",
      regency_id: ""
    });
    const provinces = ref([]);
    axios.get(route("provinces.index")).then((response) => {
      provinces.value = response.data;
    });
    watch(() => form.province_id, (newProvinceId) => {
      if (newProvinceId) {
        const selectedProvince = provinces.value.find((province) => province.id === newProvinceId);
        form.target_response = selectedProvince ? selectedProvince.target_response : "";
      }
    });
    const submit = () => {
      form.post(route("create_survey", [form.client_slug, form.project_slug]), {
        data: {
          target_response: form.target_response,
          province_id: form.province_id
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ title: "Create Survey" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mt-6 sm:mt-1 px-1"${_scopeId}>`);
            _push2(ssrRenderComponent(AuthenticationCard, null, {
              logo: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$2, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$2)
                  ];
                }
              }),
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h2 class="text-primary font-semibold text-2xl text-center mb-4"${_scopeId2}>Create New Survey</h2><form${_scopeId2}><div class="relative"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$3, { for: "title" }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    id: "title",
                    modelValue: unref(form).title,
                    "onUpdate:modelValue": ($event) => unref(form).title = $event,
                    type: "text",
                    placeholder: "Title",
                    required: "",
                    autofocus: "",
                    autocomplete: "title"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    class: "mt-2",
                    message: unref(form).errors.title
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="mt-4 relative"${_scopeId2}><textarea id="desc" placeholder="Description" required autocomplete="desc" class="block text-primary placeholder-primary w-full h-28 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"${_scopeId2}>${ssrInterpolate(unref(form).desc)}</textarea>`);
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    class: "mt-2",
                    message: unref(form).errors.desc
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="mt-4 relative"${_scopeId2}><h2 class="text-primary font-semibold text-1xl text-left mb-1"${_scopeId2}>Survey Target:</h2></div><div class="mt-4 relative"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$3, { for: "province_id" }, null, _parent3, _scopeId2));
                  _push3(`<select class="block w-full rounded-md shadow-sm"${_scopeId2}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).province_id) ? ssrLooseContain(unref(form).province_id, "") : ssrLooseEqual(unref(form).province_id, "")) ? " selected" : ""}${_scopeId2}>Select Province</option><!--[-->`);
                  ssrRenderList(provinces.value, (province) => {
                    _push3(`<option${ssrRenderAttr("value", province.id)}${_scopeId2}>${ssrInterpolate(province.name)}</option>`);
                  });
                  _push3(`<!--]--></select>`);
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    class: "mt-2",
                    message: unref(form).errors.province_id
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="mt-4 relative"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$3, { for: "target_response" }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    id: "target_response",
                    modelValue: unref(form).target_response,
                    "onUpdate:modelValue": ($event) => unref(form).target_response = $event,
                    type: "number",
                    placeholder: "Target Response",
                    required: "",
                    autofocus: "",
                    autocomplete: "target_response"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    class: "mt-2",
                    message: unref(form).errors.target_response
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="my-4 text-center"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$6, {
                    class: ["w-full justify-center mt-2", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Add Survey `);
                      } else {
                        return [
                          createTextVNode(" Add Survey ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></form>`);
                } else {
                  return [
                    createVNode("h2", { class: "text-primary font-semibold text-2xl text-center mb-4" }, "Create New Survey"),
                    createVNode("form", {
                      onSubmit: withModifiers(submit, ["prevent"])
                    }, [
                      createVNode("div", { class: "relative" }, [
                        createVNode(_sfc_main$3, { for: "title" }),
                        createVNode(_sfc_main$4, {
                          id: "title",
                          modelValue: unref(form).title,
                          "onUpdate:modelValue": ($event) => unref(form).title = $event,
                          type: "text",
                          placeholder: "Title",
                          required: "",
                          autofocus: "",
                          autocomplete: "title"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$5, {
                          class: "mt-2",
                          message: unref(form).errors.title
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "mt-4 relative" }, [
                        withDirectives(createVNode("textarea", {
                          id: "desc",
                          "onUpdate:modelValue": ($event) => unref(form).desc = $event,
                          placeholder: "Description",
                          required: "",
                          autocomplete: "desc",
                          class: "block text-primary placeholder-primary w-full h-28 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).desc]
                        ]),
                        createVNode(_sfc_main$5, {
                          class: "mt-2",
                          message: unref(form).errors.desc
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "mt-4 relative" }, [
                        createVNode("h2", { class: "text-primary font-semibold text-1xl text-left mb-1" }, "Survey Target:")
                      ]),
                      createVNode("div", { class: "mt-4 relative" }, [
                        createVNode(_sfc_main$3, { for: "province_id" }),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(form).province_id = $event,
                          class: "block w-full rounded-md shadow-sm"
                        }, [
                          createVNode("option", { value: "" }, "Select Province"),
                          (openBlock(true), createBlock(Fragment, null, renderList(provinces.value, (province) => {
                            return openBlock(), createBlock("option", {
                              key: province.id,
                              value: province.id
                            }, toDisplayString(province.name), 9, ["value"]);
                          }), 128))
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(form).province_id]
                        ]),
                        createVNode(_sfc_main$5, {
                          class: "mt-2",
                          message: unref(form).errors.province_id
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "mt-4 relative" }, [
                        createVNode(_sfc_main$3, { for: "target_response" }),
                        createVNode(_sfc_main$4, {
                          id: "target_response",
                          modelValue: unref(form).target_response,
                          "onUpdate:modelValue": ($event) => unref(form).target_response = $event,
                          type: "number",
                          placeholder: "Target Response",
                          required: "",
                          autofocus: "",
                          autocomplete: "target_response"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$5, {
                          class: "mt-2",
                          message: unref(form).errors.target_response
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "my-4 text-center" }, [
                        createVNode(_sfc_main$6, {
                          class: ["w-full justify-center mt-2", { "opacity-25": unref(form).processing }],
                          disabled: unref(form).processing
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Add Survey ")
                          ]),
                          _: 1
                        }, 8, ["class", "disabled"])
                      ])
                    ], 32)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "mt-6 sm:mt-1 px-1" }, [
                createVNode(AuthenticationCard, null, {
                  logo: withCtx(() => [
                    createVNode(_sfc_main$2)
                  ]),
                  default: withCtx(() => [
                    createVNode("h2", { class: "text-primary font-semibold text-2xl text-center mb-4" }, "Create New Survey"),
                    createVNode("form", {
                      onSubmit: withModifiers(submit, ["prevent"])
                    }, [
                      createVNode("div", { class: "relative" }, [
                        createVNode(_sfc_main$3, { for: "title" }),
                        createVNode(_sfc_main$4, {
                          id: "title",
                          modelValue: unref(form).title,
                          "onUpdate:modelValue": ($event) => unref(form).title = $event,
                          type: "text",
                          placeholder: "Title",
                          required: "",
                          autofocus: "",
                          autocomplete: "title"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$5, {
                          class: "mt-2",
                          message: unref(form).errors.title
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "mt-4 relative" }, [
                        withDirectives(createVNode("textarea", {
                          id: "desc",
                          "onUpdate:modelValue": ($event) => unref(form).desc = $event,
                          placeholder: "Description",
                          required: "",
                          autocomplete: "desc",
                          class: "block text-primary placeholder-primary w-full h-28 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).desc]
                        ]),
                        createVNode(_sfc_main$5, {
                          class: "mt-2",
                          message: unref(form).errors.desc
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "mt-4 relative" }, [
                        createVNode("h2", { class: "text-primary font-semibold text-1xl text-left mb-1" }, "Survey Target:")
                      ]),
                      createVNode("div", { class: "mt-4 relative" }, [
                        createVNode(_sfc_main$3, { for: "province_id" }),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(form).province_id = $event,
                          class: "block w-full rounded-md shadow-sm"
                        }, [
                          createVNode("option", { value: "" }, "Select Province"),
                          (openBlock(true), createBlock(Fragment, null, renderList(provinces.value, (province) => {
                            return openBlock(), createBlock("option", {
                              key: province.id,
                              value: province.id
                            }, toDisplayString(province.name), 9, ["value"]);
                          }), 128))
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(form).province_id]
                        ]),
                        createVNode(_sfc_main$5, {
                          class: "mt-2",
                          message: unref(form).errors.province_id
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "mt-4 relative" }, [
                        createVNode(_sfc_main$3, { for: "target_response" }),
                        createVNode(_sfc_main$4, {
                          id: "target_response",
                          modelValue: unref(form).target_response,
                          "onUpdate:modelValue": ($event) => unref(form).target_response = $event,
                          type: "number",
                          placeholder: "Target Response",
                          required: "",
                          autofocus: "",
                          autocomplete: "target_response"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$5, {
                          class: "mt-2",
                          message: unref(form).errors.target_response
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "my-4 text-center" }, [
                        createVNode(_sfc_main$6, {
                          class: ["w-full justify-center mt-2", { "opacity-25": unref(form).processing }],
                          disabled: unref(form).processing
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Add Survey ")
                          ]),
                          _: 1
                        }, 8, ["class", "disabled"])
                      ])
                    ], 32)
                  ]),
                  _: 1
                })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Client/Projects/Surveys/CreateSurveys.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
