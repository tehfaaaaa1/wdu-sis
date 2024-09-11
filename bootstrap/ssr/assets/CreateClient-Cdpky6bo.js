import { mergeProps, withCtx, createVNode, unref, createTextVNode, withModifiers, withDirectives, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { useForm } from "@inertiajs/vue3";
import { A as AuthenticationCard } from "./AuthenticationCard-3q45n6AV.js";
import { _ as _sfc_main$2 } from "./AuthenticationCardLogo-DcwaY1SR.js";
import "./Checkbox-DncvTmae.js";
import { _ as _sfc_main$5 } from "./InputError-R5JGcBaq.js";
import { _ as _sfc_main$3 } from "./InputLabel-Do1v5jZF.js";
import { _ as _sfc_main$6 } from "./PrimaryButton-CZ4pYQi_.js";
import { _ as _sfc_main$4 } from "./TextInput-CTvmmegX.js";
import { _ as _sfc_main$1 } from "./AppLayout-wXEz5-tl.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "CreateClient",
  __ssrInlineRender: true,
  setup(__props) {
    const form = useForm({
      client_name: "",
      alamat: "",
      phone: "",
      desc: "",
      image: ""
    });
    const submit = () => {
      form.post(route("create_client"));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ title: "Create Client" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mt-6 sm:mt-0 px-4" data-v-a60fedce${_scopeId}>`);
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
                  _push3(`<h2 class="text-primary font-semibold text-2xl text-center mb-4" data-v-a60fedce${_scopeId2}>Create New Client</h2><form data-v-a60fedce${_scopeId2}><div class="relative" data-v-a60fedce${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$3, { for: "client_name" }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    id: "client_name",
                    modelValue: unref(form).client_name,
                    "onUpdate:modelValue": ($event) => unref(form).client_name = $event,
                    type: "text",
                    placeholder: "Client Name",
                    required: "",
                    autofocus: "",
                    autocomplete: "client_name"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    class: "mt-2",
                    message: unref(form).errors.client_name
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="mt-4 relative" data-v-a60fedce${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$3, { for: "alamat" }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    id: "alamat",
                    modelValue: unref(form).alamat,
                    "onUpdate:modelValue": ($event) => unref(form).alamat = $event,
                    type: "text",
                    placeholder: "Alamat",
                    required: "",
                    autofocus: "",
                    autocomplete: "alamat"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    class: "mt-2",
                    message: unref(form).errors.alamat
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="mt-4 relative" data-v-a60fedce${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$3, { for: "phone" }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    id: "phone",
                    modelValue: unref(form).phone,
                    "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                    type: "number",
                    placeholder: "Contact Person",
                    required: "",
                    autofocus: "",
                    autocomplete: "phone"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    class: "mt-2",
                    message: unref(form).errors.phone
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="mt-4 relative" data-v-a60fedce${_scopeId2}><textarea id="desc" placeholder="Description" class="block w-full h-32 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 text-gray-700" required autocomplete="desc" data-v-a60fedce${_scopeId2}>${ssrInterpolate(unref(form).desc)}</textarea>`);
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    class: "mt-2",
                    message: unref(form).errors.desc
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="mt-4 relative" data-v-a60fedce${_scopeId2}><label class="block mb-2 text-base font-medium text-primary" for="file_input" data-v-a60fedce${_scopeId2}>Upload photo</label><input class="block w-full text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 rounded-lg focus:outline-none file:py-2 file:px-3 file:mr-2.5 file:rounded-s-lg file:border-0 file:bg-gray-800 file:font-medium file:text-white" id="file_input" type="file" accept=".png, .jpg, .jpeg" data-v-a60fedce${_scopeId2}><p class="mt-1 text-sm text-gray-500" id="file_input_help" data-v-a60fedce${_scopeId2}>PNG, JPG/JPEG (max file size: 2 MB). Transparent Background.</p></div><div class="my-4 text-center" data-v-a60fedce${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$6, {
                    class: ["w-full justify-center mt-2", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Add client `);
                      } else {
                        return [
                          createTextVNode(" Add client ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></form>`);
                } else {
                  return [
                    createVNode("h2", { class: "text-primary font-semibold text-2xl text-center mb-4" }, "Create New Client"),
                    createVNode("form", {
                      onSubmit: withModifiers(submit, ["prevent"])
                    }, [
                      createVNode("div", { class: "relative" }, [
                        createVNode(_sfc_main$3, { for: "client_name" }),
                        createVNode(_sfc_main$4, {
                          id: "client_name",
                          modelValue: unref(form).client_name,
                          "onUpdate:modelValue": ($event) => unref(form).client_name = $event,
                          type: "text",
                          placeholder: "Client Name",
                          required: "",
                          autofocus: "",
                          autocomplete: "client_name"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$5, {
                          class: "mt-2",
                          message: unref(form).errors.client_name
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "mt-4 relative" }, [
                        createVNode(_sfc_main$3, { for: "alamat" }),
                        createVNode(_sfc_main$4, {
                          id: "alamat",
                          modelValue: unref(form).alamat,
                          "onUpdate:modelValue": ($event) => unref(form).alamat = $event,
                          type: "text",
                          placeholder: "Alamat",
                          required: "",
                          autofocus: "",
                          autocomplete: "alamat"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$5, {
                          class: "mt-2",
                          message: unref(form).errors.alamat
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "mt-4 relative" }, [
                        createVNode(_sfc_main$3, { for: "phone" }),
                        createVNode(_sfc_main$4, {
                          id: "phone",
                          modelValue: unref(form).phone,
                          "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                          type: "number",
                          placeholder: "Contact Person",
                          required: "",
                          autofocus: "",
                          autocomplete: "phone"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$5, {
                          class: "mt-2",
                          message: unref(form).errors.phone
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "mt-4 relative" }, [
                        withDirectives(createVNode("textarea", {
                          id: "desc",
                          "onUpdate:modelValue": ($event) => unref(form).desc = $event,
                          placeholder: "Description",
                          class: "block w-full h-32 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 text-gray-700",
                          required: "",
                          autocomplete: "desc"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).desc]
                        ]),
                        createVNode(_sfc_main$5, {
                          class: "mt-2",
                          message: unref(form).errors.desc
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "mt-4 relative" }, [
                        createVNode("label", {
                          class: "block mb-2 text-base font-medium text-primary",
                          for: "file_input"
                        }, "Upload photo"),
                        createVNode("input", {
                          onInput: ($event) => unref(form).image = $event.target.files[0],
                          class: "block w-full text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 rounded-lg focus:outline-none file:py-2 file:px-3 file:mr-2.5 file:rounded-s-lg file:border-0 file:bg-gray-800 file:font-medium file:text-white",
                          id: "file_input",
                          type: "file",
                          accept: ".png, .jpg, .jpeg"
                        }, null, 40, ["onInput"]),
                        createVNode("p", {
                          class: "mt-1 text-sm text-gray-500",
                          id: "file_input_help"
                        }, "PNG, JPG/JPEG (max file size: 2 MB). Transparent Background.")
                      ]),
                      createVNode("div", { class: "my-4 text-center" }, [
                        createVNode(_sfc_main$6, {
                          class: ["w-full justify-center mt-2", { "opacity-25": unref(form).processing }],
                          disabled: unref(form).processing
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Add client ")
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
              createVNode("div", { class: "mt-6 sm:mt-0 px-4" }, [
                createVNode(AuthenticationCard, null, {
                  logo: withCtx(() => [
                    createVNode(_sfc_main$2)
                  ]),
                  default: withCtx(() => [
                    createVNode("h2", { class: "text-primary font-semibold text-2xl text-center mb-4" }, "Create New Client"),
                    createVNode("form", {
                      onSubmit: withModifiers(submit, ["prevent"])
                    }, [
                      createVNode("div", { class: "relative" }, [
                        createVNode(_sfc_main$3, { for: "client_name" }),
                        createVNode(_sfc_main$4, {
                          id: "client_name",
                          modelValue: unref(form).client_name,
                          "onUpdate:modelValue": ($event) => unref(form).client_name = $event,
                          type: "text",
                          placeholder: "Client Name",
                          required: "",
                          autofocus: "",
                          autocomplete: "client_name"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$5, {
                          class: "mt-2",
                          message: unref(form).errors.client_name
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "mt-4 relative" }, [
                        createVNode(_sfc_main$3, { for: "alamat" }),
                        createVNode(_sfc_main$4, {
                          id: "alamat",
                          modelValue: unref(form).alamat,
                          "onUpdate:modelValue": ($event) => unref(form).alamat = $event,
                          type: "text",
                          placeholder: "Alamat",
                          required: "",
                          autofocus: "",
                          autocomplete: "alamat"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$5, {
                          class: "mt-2",
                          message: unref(form).errors.alamat
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "mt-4 relative" }, [
                        createVNode(_sfc_main$3, { for: "phone" }),
                        createVNode(_sfc_main$4, {
                          id: "phone",
                          modelValue: unref(form).phone,
                          "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                          type: "number",
                          placeholder: "Contact Person",
                          required: "",
                          autofocus: "",
                          autocomplete: "phone"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$5, {
                          class: "mt-2",
                          message: unref(form).errors.phone
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "mt-4 relative" }, [
                        withDirectives(createVNode("textarea", {
                          id: "desc",
                          "onUpdate:modelValue": ($event) => unref(form).desc = $event,
                          placeholder: "Description",
                          class: "block w-full h-32 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 text-gray-700",
                          required: "",
                          autocomplete: "desc"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).desc]
                        ]),
                        createVNode(_sfc_main$5, {
                          class: "mt-2",
                          message: unref(form).errors.desc
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "mt-4 relative" }, [
                        createVNode("label", {
                          class: "block mb-2 text-base font-medium text-primary",
                          for: "file_input"
                        }, "Upload photo"),
                        createVNode("input", {
                          onInput: ($event) => unref(form).image = $event.target.files[0],
                          class: "block w-full text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 rounded-lg focus:outline-none file:py-2 file:px-3 file:mr-2.5 file:rounded-s-lg file:border-0 file:bg-gray-800 file:font-medium file:text-white",
                          id: "file_input",
                          type: "file",
                          accept: ".png, .jpg, .jpeg"
                        }, null, 40, ["onInput"]),
                        createVNode("p", {
                          class: "mt-1 text-sm text-gray-500",
                          id: "file_input_help"
                        }, "PNG, JPG/JPEG (max file size: 2 MB). Transparent Background.")
                      ]),
                      createVNode("div", { class: "my-4 text-center" }, [
                        createVNode(_sfc_main$6, {
                          class: ["w-full justify-center mt-2", { "opacity-25": unref(form).processing }],
                          disabled: unref(form).processing
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Add client ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Client/CreateClient.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CreateClient = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a60fedce"]]);
export {
  CreateClient as default
};
