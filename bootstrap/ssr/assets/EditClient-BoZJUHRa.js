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
  __name: "EditClient",
  __ssrInlineRender: true,
  props: { clients: Object },
  setup(__props) {
    const props = __props;
    const form = useForm({
      client_name: props.clients.client_name,
      alamat: props.clients.alamat,
      phone: props.clients.phone,
      desc: props.clients.desc
      // image: null, // Ensure this is null initially
    });
    const submit = () => {
      form.put(route("update_client", props.clients.id), {
        preserveScroll: true,
        onSuccess: () => form.reset("image")
        // Reset only the image field
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ title: "Edit Client" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mt-6 sm:mt-0 px-4" data-v-2fff48e7${_scopeId}>`);
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
                  _push3(`<h2 class="text-primary font-semibold text-2xl text-center mb-4" data-v-2fff48e7${_scopeId2}>Edit Client</h2><form data-v-2fff48e7${_scopeId2}><div class="relative" data-v-2fff48e7${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$3, { for: "client_name" }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    id: "client_name",
                    modelValue: unref(form).client_name,
                    "onUpdate:modelValue": ($event) => unref(form).client_name = $event,
                    type: "text",
                    placeholder: "Client Name",
                    class: "",
                    required: "",
                    autofocus: "",
                    autocomplete: "client_name"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    class: "mt-2",
                    message: unref(form).errors.client_name
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="mt-4 relative" data-v-2fff48e7${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$3, {
                    for: "alamat",
                    value: "Alamat"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    id: "alamat",
                    modelValue: unref(form).alamat,
                    "onUpdate:modelValue": ($event) => unref(form).alamat = $event,
                    type: "text",
                    placeholder: "Alamat",
                    class: "",
                    required: "",
                    autofocus: "",
                    autocomplete: "alamat"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    class: "mt-2",
                    message: unref(form).errors.alamat
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="mt-4 relative" data-v-2fff48e7${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$3, {
                    for: "phone",
                    value: "Phone"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    id: "phone",
                    modelValue: unref(form).phone,
                    "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                    type: "number",
                    placeholder: "Phone",
                    class: "",
                    required: "",
                    autofocus: "",
                    autocomplete: "phone"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    class: "mt-2",
                    message: unref(form).errors.phone
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="mt-4 relative" data-v-2fff48e7${_scopeId2}><textarea id="desc" placeholder="Description" class="block w-full h-32 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 text-gray-700" required autocomplete="desc" data-v-2fff48e7${_scopeId2}>${ssrInterpolate(unref(form).desc)}</textarea>`);
                  _push3(ssrRenderComponent(_sfc_main$5, {
                    class: "mt-2",
                    message: unref(form).errors.desc
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="my-4 text-center" data-v-2fff48e7${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$6, {
                    class: ["w-full justify-center mt-2", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Edit Client `);
                      } else {
                        return [
                          createTextVNode(" Edit Client ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></form>`);
                } else {
                  return [
                    createVNode("h2", { class: "text-primary font-semibold text-2xl text-center mb-4" }, "Edit Client"),
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
                          class: "",
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
                        createVNode(_sfc_main$3, {
                          for: "alamat",
                          value: "Alamat"
                        }),
                        createVNode(_sfc_main$4, {
                          id: "alamat",
                          modelValue: unref(form).alamat,
                          "onUpdate:modelValue": ($event) => unref(form).alamat = $event,
                          type: "text",
                          placeholder: "Alamat",
                          class: "",
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
                        createVNode(_sfc_main$3, {
                          for: "phone",
                          value: "Phone"
                        }),
                        createVNode(_sfc_main$4, {
                          id: "phone",
                          modelValue: unref(form).phone,
                          "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                          type: "number",
                          placeholder: "Phone",
                          class: "",
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
                      createVNode("div", { class: "my-4 text-center" }, [
                        createVNode(_sfc_main$6, {
                          class: ["w-full justify-center mt-2", { "opacity-25": unref(form).processing }],
                          disabled: unref(form).processing
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Edit Client ")
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
                    createVNode("h2", { class: "text-primary font-semibold text-2xl text-center mb-4" }, "Edit Client"),
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
                          class: "",
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
                        createVNode(_sfc_main$3, {
                          for: "alamat",
                          value: "Alamat"
                        }),
                        createVNode(_sfc_main$4, {
                          id: "alamat",
                          modelValue: unref(form).alamat,
                          "onUpdate:modelValue": ($event) => unref(form).alamat = $event,
                          type: "text",
                          placeholder: "Alamat",
                          class: "",
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
                        createVNode(_sfc_main$3, {
                          for: "phone",
                          value: "Phone"
                        }),
                        createVNode(_sfc_main$4, {
                          id: "phone",
                          modelValue: unref(form).phone,
                          "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                          type: "number",
                          placeholder: "Phone",
                          class: "",
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
                      createVNode("div", { class: "my-4 text-center" }, [
                        createVNode(_sfc_main$6, {
                          class: ["w-full justify-center mt-2", { "opacity-25": unref(form).processing }],
                          disabled: unref(form).processing
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Edit Client ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Client/EditClient.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const EditClient = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2fff48e7"]]);
export {
  EditClient as default
};
