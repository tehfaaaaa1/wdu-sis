import { ref, computed, mergeProps, withCtx, createVNode, createTextVNode, withDirectives, vModelText, openBlock, createBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./AppLayout-wXEz5-tl.js";
import { D as DeleteConfirmation } from "./DeleteConfirmation-CF7YIQrQ.js";
import { useForm } from "@inertiajs/vue3";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Users",
  __ssrInlineRender: true,
  props: {
    users: Array
  },
  setup(__props) {
    const props = __props;
    const form = useForm({});
    const showDeleteModal = ref(false);
    const selectedUserId = ref(null);
    const searchQuery = ref("");
    const hapus = (id) => {
      selectedUserId.value = id;
      showDeleteModal.value = true;
    };
    const confirmDeletion = () => {
      form.get(route("delete_user", selectedUserId.value), {
        onFinish: () => {
          showDeleteModal.value = false;
        }
      });
    };
    const cancelDeletion = () => {
      showDeleteModal.value = false;
    };
    const filteredUsers = computed(() => {
      return props.users.filter((user) => {
        return user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || user.email.toLowerCase().includes(searchQuery.value.toLowerCase()) || user.usertype.toLowerCase().includes(searchQuery.value.toLowerCase()) || user.team.toLowerCase().includes(searchQuery.value.toLowerCase()) || user.client.toLowerCase().includes(searchQuery.value.toLocaleLowerCase());
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ title: "Users" }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="font-semibold text-xl text-gray-800 leading-tight"${_scopeId}> Users </h2>`);
          } else {
            return [
              createVNode("h2", { class: "font-semibold text-xl text-gray-800 leading-tight" }, " Users ")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8"${_scopeId}><div class="flex justify-between items-center mx-3 mb-6"${_scopeId}><div class="w-1/2 sm:w-full"${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              href: _ctx.route("users.create"),
              class: "bg-primary text-white text-sm font-medium px-6 py-2.5 rounded-md border-2 hover:bg-white hover:text-primary hover:border-primary transition"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Add User `);
                } else {
                  return [
                    createTextVNode(" Add User ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="flex items-center px-4 py-2 text-sm"${_scopeId}><input type="text"${ssrRenderAttr("value", searchQuery.value)} class="w-full border-primary rounded-md text-sm placeholder:text-center placeholder:font-thin focus:ring focus:ring-primary focus:border-primary" placeholder="Search"${_scopeId}></div></div><div class="relative overflow-x-auto shadow-md sm:rounded-lg"${_scopeId}><table class="w-full text-sm text-left rtl:text-right text-gray-500 sm:table-fixed"${_scopeId}><thead class="text-xs text-white uppercase bg-primary"${_scopeId}><tr${_scopeId}><th scope="col" class="px-6 py-3"${_scopeId}>Name</th><th scope="col" class="px-6 py-3"${_scopeId}>Email</th><th scope="col" class="px-6 py-3"${_scopeId}>User Type</th><th scope="col" class="px-6 py-3"${_scopeId}>Team</th><th scope="col" class="px-6 py-3"${_scopeId}>Client</th><th scope="col" class="px-6 py-3 md:w-1/6"${_scopeId}>Action</th></tr></thead><tbody${_scopeId}><!--[-->`);
            ssrRenderList(filteredUsers.value, (user) => {
              _push2(`<tr class="bg-white border-b hover:bg-gray-50"${_scopeId}><td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"${_scopeId}>${ssrInterpolate(user.name)}</td><td class="px-6 py-4 font-medium text-gray-900 sm:text-gray-500"${_scopeId}>${ssrInterpolate(user.email)}</td><td class="px-6 py-4"${_scopeId}>${ssrInterpolate(user.usertype)}</td><td class="px-6 py-4"${_scopeId}>${ssrInterpolate(user.team)}</td><td class="px-6 py-4"${_scopeId}>${ssrInterpolate(user.client)}</td><td class="px-6 py-4"${_scopeId}><a${ssrRenderAttr("href", _ctx.route("edit_user", user.id))} class="font-medium text-blue-600 hover:underline mr-4"${_scopeId}>Edit</a><a class="font-medium text-red-600 hover:underline cursor-pointer"${_scopeId}>Delete</a></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div></div>`);
            _push2(ssrRenderComponent(DeleteConfirmation, {
              show: showDeleteModal.value,
              onConfirm: confirmDeletion,
              onCancel: cancelDeletion
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "max-w-7xl mx-auto py-6 sm:px-6 lg:px-8" }, [
                createVNode("div", { class: "flex justify-between items-center mx-3 mb-6" }, [
                  createVNode("div", { class: "w-1/2 sm:w-full" }, [
                    createVNode(_sfc_main$2, {
                      href: _ctx.route("users.create"),
                      class: "bg-primary text-white text-sm font-medium px-6 py-2.5 rounded-md border-2 hover:bg-white hover:text-primary hover:border-primary transition"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Add User ")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ]),
                  createVNode("div", { class: "flex items-center px-4 py-2 text-sm" }, [
                    withDirectives(createVNode("input", {
                      type: "text",
                      "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                      class: "w-full border-primary rounded-md text-sm placeholder:text-center placeholder:font-thin focus:ring focus:ring-primary focus:border-primary",
                      placeholder: "Search"
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, searchQuery.value]
                    ])
                  ])
                ]),
                createVNode("div", { class: "relative overflow-x-auto shadow-md sm:rounded-lg" }, [
                  createVNode("table", { class: "w-full text-sm text-left rtl:text-right text-gray-500 sm:table-fixed" }, [
                    createVNode("thead", { class: "text-xs text-white uppercase bg-primary" }, [
                      createVNode("tr", null, [
                        createVNode("th", {
                          scope: "col",
                          class: "px-6 py-3"
                        }, "Name"),
                        createVNode("th", {
                          scope: "col",
                          class: "px-6 py-3"
                        }, "Email"),
                        createVNode("th", {
                          scope: "col",
                          class: "px-6 py-3"
                        }, "User Type"),
                        createVNode("th", {
                          scope: "col",
                          class: "px-6 py-3"
                        }, "Team"),
                        createVNode("th", {
                          scope: "col",
                          class: "px-6 py-3"
                        }, "Client"),
                        createVNode("th", {
                          scope: "col",
                          class: "px-6 py-3 md:w-1/6"
                        }, "Action")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      (openBlock(true), createBlock(Fragment, null, renderList(filteredUsers.value, (user) => {
                        return openBlock(), createBlock("tr", {
                          key: user.id,
                          class: "bg-white border-b hover:bg-gray-50"
                        }, [
                          createVNode("td", {
                            scope: "row",
                            class: "px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                          }, toDisplayString(user.name), 1),
                          createVNode("td", { class: "px-6 py-4 font-medium text-gray-900 sm:text-gray-500" }, toDisplayString(user.email), 1),
                          createVNode("td", { class: "px-6 py-4" }, toDisplayString(user.usertype), 1),
                          createVNode("td", { class: "px-6 py-4" }, toDisplayString(user.team), 1),
                          createVNode("td", { class: "px-6 py-4" }, toDisplayString(user.client), 1),
                          createVNode("td", { class: "px-6 py-4" }, [
                            createVNode("a", {
                              href: _ctx.route("edit_user", user.id),
                              class: "font-medium text-blue-600 hover:underline mr-4"
                            }, "Edit", 8, ["href"]),
                            createVNode("a", {
                              onClick: ($event) => hapus(user.id),
                              class: "font-medium text-red-600 hover:underline cursor-pointer"
                            }, "Delete", 8, ["onClick"])
                          ])
                        ]);
                      }), 128))
                    ])
                  ])
                ])
              ]),
              createVNode(DeleteConfirmation, {
                show: showDeleteModal.value,
                onConfirm: confirmDeletion,
                onCancel: cancelDeletion
              }, null, 8, ["show"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Users/Users.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
