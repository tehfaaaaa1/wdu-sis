import { ref, watch, mergeProps, withCtx, unref, createTextVNode, createVNode, withModifiers, withDirectives, vModelCheckbox, openBlock, createBlock, Fragment, renderList, vModelRadio, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderList, ssrRenderAttr, ssrLooseEqual, ssrInterpolate } from "vue/server-renderer";
import { useForm } from "@inertiajs/vue3";
import { A as AuthenticationCard } from "./AuthenticationCard-3q45n6AV.js";
import "./AuthenticationCardLogo-DcwaY1SR.js";
import { _ as _sfc_main$3 } from "./InputError-R5JGcBaq.js";
import { _ as _sfc_main$4 } from "./PrimaryButton-CZ4pYQi_.js";
import { _ as _sfc_main$2 } from "./TextInput-CTvmmegX.js";
import { _ as _sfc_main$1 } from "./AppLayout-wXEz5-tl.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "CreateUsers",
  __ssrInlineRender: true,
  props: {
    teams: Array,
    client: Array
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      usertype: "user",
      team_id: null,
      client_id: ""
    });
    const isAdmin = ref(false);
    watch(isAdmin, (newVal) => {
      form.usertype = newVal ? "admin" : "user";
    });
    const submit = () => {
      form.post(route("create_user"), {
        onFinish: () => form.reset("password", "password_confirmation")
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ title: "Create User" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mt-6 sm:-mt-4 px-4"${_scopeId}>`);
            _push2(ssrRenderComponent(AuthenticationCard, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h2 class="text-primary font-semibold text-2xl text-center mb-4"${_scopeId2}>Create New User</h2><form${_scopeId2}><div class="relative"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$2, {
                    id: "name",
                    modelValue: unref(form).name,
                    "onUpdate:modelValue": ($event) => unref(form).name = $event,
                    type: "text",
                    placeholder: "Name",
                    class: "block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pr-10",
                    required: "",
                    autofocus: "",
                    autocomplete: "name"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$3, {
                    class: "mt-2",
                    message: unref(form).errors.name
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="mt-4 relative"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$2, {
                    id: "email",
                    modelValue: unref(form).email,
                    "onUpdate:modelValue": ($event) => unref(form).email = $event,
                    type: "email",
                    placeholder: "Email",
                    class: "block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pr-10",
                    required: "",
                    autocomplete: "username"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$3, {
                    class: "mt-2",
                    message: unref(form).errors.email
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="mt-4 relative"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$2, {
                    id: "password",
                    modelValue: unref(form).password,
                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                    type: "password",
                    placeholder: "Password",
                    class: "block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pr-10",
                    required: "",
                    autocomplete: "new-password"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$3, {
                    class: "mt-2",
                    message: unref(form).errors.password
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="mt-4 relative"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$2, {
                    id: "password_confirmation",
                    modelValue: unref(form).password_confirmation,
                    "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                    type: "password",
                    placeholder: "Confirm Password",
                    class: "block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pr-10",
                    required: "",
                    autocomplete: "new-password"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_sfc_main$3, {
                    class: "mt-2",
                    message: unref(form).errors.password_confirmation
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="mt-4 relative"${_scopeId2}><h2 class="text-primary font-semibold text-2xl text-center mb-4"${_scopeId2}>Team Select</h2><div class="items-center mb-4"${_scopeId2}><input type="checkbox" id="make-admin" class="checked:text-primary"${ssrIncludeBooleanAttr(Array.isArray(isAdmin.value) ? ssrLooseContain(isAdmin.value, null) : isAdmin.value) ? " checked" : ""}${_scopeId2}><label for="make-admin" class="pl-1.5"${_scopeId2}>Make an admin?</label></div><div class="w-full grid grid-cols-2 gap-2 text-gray-700"${_scopeId2}><!--[-->`);
                  ssrRenderList(props.teams, (team) => {
                    _push3(`<div class="flex items-center"${_scopeId2}><input type="radio"${ssrRenderAttr("id", "team_" + team.id)} name="team_id" class="checked:text-primary"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(form).team_id, team.id)) ? " checked" : ""}${ssrRenderAttr("value", team.id)}${_scopeId2}><label${ssrRenderAttr("for", "team_" + team.id)} class="pl-1.5"${_scopeId2}>${ssrInterpolate(team.name)}</label></div>`);
                  });
                  _push3(`<!--]--></div>`);
                  _push3(ssrRenderComponent(_sfc_main$3, {
                    class: "mt-2",
                    message: unref(form).errors.team_id
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="mt-4 relative"${_scopeId2}><h2 class="text-primary font-semibold text-lg mb-4"${_scopeId2}>Client Select</h2><!--[-->`);
                  ssrRenderList(__props.client, (c) => {
                    _push3(`<div class="py-1"${_scopeId2}><input type="radio"${ssrRenderAttr("id", "client_" + c.id)} name="client_id" class="checked:text-primary"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(form).client_id, c.id)) ? " checked" : ""}${ssrRenderAttr("value", c.id)}${_scopeId2}><label${ssrRenderAttr("for", "client_" + c.id)} class="ml-2"${_scopeId2}>${ssrInterpolate(c.client_name)}</label></div>`);
                  });
                  _push3(`<!--]--></div><div class="my-4 text-center"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_sfc_main$4, {
                    class: ["w-full justify-center mt-2", { "opacity-25": unref(form).processing }],
                    disabled: unref(form).processing
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Create User `);
                      } else {
                        return [
                          createTextVNode(" Create User ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></form>`);
                } else {
                  return [
                    createVNode("h2", { class: "text-primary font-semibold text-2xl text-center mb-4" }, "Create New User"),
                    createVNode("form", {
                      onSubmit: withModifiers(submit, ["prevent"])
                    }, [
                      createVNode("div", { class: "relative" }, [
                        createVNode(_sfc_main$2, {
                          id: "name",
                          modelValue: unref(form).name,
                          "onUpdate:modelValue": ($event) => unref(form).name = $event,
                          type: "text",
                          placeholder: "Name",
                          class: "block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pr-10",
                          required: "",
                          autofocus: "",
                          autocomplete: "name"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$3, {
                          class: "mt-2",
                          message: unref(form).errors.name
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "mt-4 relative" }, [
                        createVNode(_sfc_main$2, {
                          id: "email",
                          modelValue: unref(form).email,
                          "onUpdate:modelValue": ($event) => unref(form).email = $event,
                          type: "email",
                          placeholder: "Email",
                          class: "block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pr-10",
                          required: "",
                          autocomplete: "username"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$3, {
                          class: "mt-2",
                          message: unref(form).errors.email
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "mt-4 relative" }, [
                        createVNode(_sfc_main$2, {
                          id: "password",
                          modelValue: unref(form).password,
                          "onUpdate:modelValue": ($event) => unref(form).password = $event,
                          type: "password",
                          placeholder: "Password",
                          class: "block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pr-10",
                          required: "",
                          autocomplete: "new-password"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$3, {
                          class: "mt-2",
                          message: unref(form).errors.password
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "mt-4 relative" }, [
                        createVNode(_sfc_main$2, {
                          id: "password_confirmation",
                          modelValue: unref(form).password_confirmation,
                          "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                          type: "password",
                          placeholder: "Confirm Password",
                          class: "block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pr-10",
                          required: "",
                          autocomplete: "new-password"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$3, {
                          class: "mt-2",
                          message: unref(form).errors.password_confirmation
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "mt-4 relative" }, [
                        createVNode("h2", { class: "text-primary font-semibold text-2xl text-center mb-4" }, "Team Select"),
                        createVNode("div", { class: "items-center mb-4" }, [
                          withDirectives(createVNode("input", {
                            type: "checkbox",
                            id: "make-admin",
                            class: "checked:text-primary",
                            "onUpdate:modelValue": ($event) => isAdmin.value = $event
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelCheckbox, isAdmin.value]
                          ]),
                          createVNode("label", {
                            for: "make-admin",
                            class: "pl-1.5"
                          }, "Make an admin?")
                        ]),
                        createVNode("div", { class: "w-full grid grid-cols-2 gap-2 text-gray-700" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(props.teams, (team) => {
                            return openBlock(), createBlock("div", {
                              key: team.id,
                              class: "flex items-center"
                            }, [
                              withDirectives(createVNode("input", {
                                type: "radio",
                                id: "team_" + team.id,
                                name: "team_id",
                                class: "checked:text-primary",
                                "onUpdate:modelValue": ($event) => unref(form).team_id = $event,
                                value: team.id
                              }, null, 8, ["id", "onUpdate:modelValue", "value"]), [
                                [vModelRadio, unref(form).team_id]
                              ]),
                              createVNode("label", {
                                for: "team_" + team.id,
                                class: "pl-1.5"
                              }, toDisplayString(team.name), 9, ["for"])
                            ]);
                          }), 128))
                        ]),
                        createVNode(_sfc_main$3, {
                          class: "mt-2",
                          message: unref(form).errors.team_id
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "mt-4 relative" }, [
                        createVNode("h2", { class: "text-primary font-semibold text-lg mb-4" }, "Client Select"),
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.client, (c) => {
                          return openBlock(), createBlock("div", { class: "py-1" }, [
                            withDirectives(createVNode("input", {
                              type: "radio",
                              id: "client_" + c.id,
                              name: "client_id",
                              class: "checked:text-primary",
                              "onUpdate:modelValue": ($event) => unref(form).client_id = $event,
                              value: c.id
                            }, null, 8, ["id", "onUpdate:modelValue", "value"]), [
                              [vModelRadio, unref(form).client_id]
                            ]),
                            createVNode("label", {
                              for: "client_" + c.id,
                              class: "ml-2"
                            }, toDisplayString(c.client_name), 9, ["for"])
                          ]);
                        }), 256))
                      ]),
                      createVNode("div", { class: "my-4 text-center" }, [
                        createVNode(_sfc_main$4, {
                          class: ["w-full justify-center mt-2", { "opacity-25": unref(form).processing }],
                          disabled: unref(form).processing
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Create User ")
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
              createVNode("div", { class: "mt-6 sm:-mt-4 px-4" }, [
                createVNode(AuthenticationCard, null, {
                  default: withCtx(() => [
                    createVNode("h2", { class: "text-primary font-semibold text-2xl text-center mb-4" }, "Create New User"),
                    createVNode("form", {
                      onSubmit: withModifiers(submit, ["prevent"])
                    }, [
                      createVNode("div", { class: "relative" }, [
                        createVNode(_sfc_main$2, {
                          id: "name",
                          modelValue: unref(form).name,
                          "onUpdate:modelValue": ($event) => unref(form).name = $event,
                          type: "text",
                          placeholder: "Name",
                          class: "block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pr-10",
                          required: "",
                          autofocus: "",
                          autocomplete: "name"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$3, {
                          class: "mt-2",
                          message: unref(form).errors.name
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "mt-4 relative" }, [
                        createVNode(_sfc_main$2, {
                          id: "email",
                          modelValue: unref(form).email,
                          "onUpdate:modelValue": ($event) => unref(form).email = $event,
                          type: "email",
                          placeholder: "Email",
                          class: "block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pr-10",
                          required: "",
                          autocomplete: "username"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$3, {
                          class: "mt-2",
                          message: unref(form).errors.email
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "mt-4 relative" }, [
                        createVNode(_sfc_main$2, {
                          id: "password",
                          modelValue: unref(form).password,
                          "onUpdate:modelValue": ($event) => unref(form).password = $event,
                          type: "password",
                          placeholder: "Password",
                          class: "block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pr-10",
                          required: "",
                          autocomplete: "new-password"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$3, {
                          class: "mt-2",
                          message: unref(form).errors.password
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "mt-4 relative" }, [
                        createVNode(_sfc_main$2, {
                          id: "password_confirmation",
                          modelValue: unref(form).password_confirmation,
                          "onUpdate:modelValue": ($event) => unref(form).password_confirmation = $event,
                          type: "password",
                          placeholder: "Confirm Password",
                          class: "block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-primary focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pr-10",
                          required: "",
                          autocomplete: "new-password"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(_sfc_main$3, {
                          class: "mt-2",
                          message: unref(form).errors.password_confirmation
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "mt-4 relative" }, [
                        createVNode("h2", { class: "text-primary font-semibold text-2xl text-center mb-4" }, "Team Select"),
                        createVNode("div", { class: "items-center mb-4" }, [
                          withDirectives(createVNode("input", {
                            type: "checkbox",
                            id: "make-admin",
                            class: "checked:text-primary",
                            "onUpdate:modelValue": ($event) => isAdmin.value = $event
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelCheckbox, isAdmin.value]
                          ]),
                          createVNode("label", {
                            for: "make-admin",
                            class: "pl-1.5"
                          }, "Make an admin?")
                        ]),
                        createVNode("div", { class: "w-full grid grid-cols-2 gap-2 text-gray-700" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(props.teams, (team) => {
                            return openBlock(), createBlock("div", {
                              key: team.id,
                              class: "flex items-center"
                            }, [
                              withDirectives(createVNode("input", {
                                type: "radio",
                                id: "team_" + team.id,
                                name: "team_id",
                                class: "checked:text-primary",
                                "onUpdate:modelValue": ($event) => unref(form).team_id = $event,
                                value: team.id
                              }, null, 8, ["id", "onUpdate:modelValue", "value"]), [
                                [vModelRadio, unref(form).team_id]
                              ]),
                              createVNode("label", {
                                for: "team_" + team.id,
                                class: "pl-1.5"
                              }, toDisplayString(team.name), 9, ["for"])
                            ]);
                          }), 128))
                        ]),
                        createVNode(_sfc_main$3, {
                          class: "mt-2",
                          message: unref(form).errors.team_id
                        }, null, 8, ["message"])
                      ]),
                      createVNode("div", { class: "mt-4 relative" }, [
                        createVNode("h2", { class: "text-primary font-semibold text-lg mb-4" }, "Client Select"),
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.client, (c) => {
                          return openBlock(), createBlock("div", { class: "py-1" }, [
                            withDirectives(createVNode("input", {
                              type: "radio",
                              id: "client_" + c.id,
                              name: "client_id",
                              class: "checked:text-primary",
                              "onUpdate:modelValue": ($event) => unref(form).client_id = $event,
                              value: c.id
                            }, null, 8, ["id", "onUpdate:modelValue", "value"]), [
                              [vModelRadio, unref(form).client_id]
                            ]),
                            createVNode("label", {
                              for: "client_" + c.id,
                              class: "ml-2"
                            }, toDisplayString(c.client_name), 9, ["for"])
                          ]);
                        }), 256))
                      ]),
                      createVNode("div", { class: "my-4 text-center" }, [
                        createVNode(_sfc_main$4, {
                          class: ["w-full justify-center mt-2", { "opacity-25": unref(form).processing }],
                          disabled: unref(form).processing
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Create User ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Users/CreateUsers.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
