import { ref, computed, mergeProps, withCtx, unref, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, withDirectives, vModelText, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { useForm } from "@inertiajs/vue3";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./AppLayout-wXEz5-tl.js";
import { D as DeleteConfirmation } from "./DeleteConfirmation-CF7YIQrQ.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "ListSurveys",
  __ssrInlineRender: true,
  props: {
    surveys: Array,
    projects: Array,
    clients: Array,
    user: Object,
    userTarget: Array,
    provinces: Array,
    cities: Array,
    regencies: Array
  },
  setup(__props) {
    const props = __props;
    const form = useForm({ search: "" });
    ref(null);
    const selectedSurveyId = ref(null);
    const showDeleteModal = ref(false);
    const client = props.clients[0];
    const clientSlug = client.slug;
    const project = props.projects[0];
    const projectSlug = project.slug;
    const hapus = (cliSlug, proSlug, id) => {
      selectedSurveyId.value = id;
      showDeleteModal.value = true;
    };
    const confirmDeletion = () => {
      form.get(route("delete_surveys", [clientSlug, projectSlug, selectedSurveyId.value]), {
        onFinish: () => showDeleteModal.value = false
      });
    };
    const cancelDeletion = () => showDeleteModal.value = false;
    const searchQuery = ref("");
    const filteredSurveys = computed(() => {
      return props.surveys.filter((survey) => {
        return survey.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || survey.desc.toLowerCase().includes(searchQuery.value.toLowerCase());
      });
    });
    const hasFilledSurvey = (survey) => {
      return survey.response.some((res) => res.user_id === props.user.id);
    };
    const hasPubllish = (survey) => {
      return survey.status == 0;
    };
    const getProvinceName = (provinceId) => {
      const province = props.provinces.find((p) => p.id === provinceId);
      return province ? province.name : "Unknown Province";
    };
    const getSurveySubmissions = (surveyId) => {
      return props.userTarget[surveyId] || 0;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ title: "List Survey" }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, {
              href: _ctx.route("projects", unref(clientSlug)),
              class: "!p-0 focus:!border-0 !m-0 !font-semibold !text-lg text-ijo-terang"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="text-black"${_scopeId2}>Project </span> ${ssrInterpolate(unref(project).project_name)}`);
                } else {
                  return [
                    createVNode("span", { class: "text-black" }, "Project "),
                    createTextVNode(" " + toDisplayString(unref(project).project_name), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, {
                href: _ctx.route("projects", unref(clientSlug)),
                class: "!p-0 focus:!border-0 !m-0 !font-semibold !text-lg text-ijo-terang"
              }, {
                default: withCtx(() => [
                  createVNode("span", { class: "text-black" }, "Project "),
                  createTextVNode(" " + toDisplayString(unref(project).project_name), 1)
                ]),
                _: 1
              }, 8, ["href"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<main class="min-h-screen bg-repeat bg-[(&#39;/img/bg-dashboard.png&#39;)]"${_scopeId}><div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8"${_scopeId}>`);
            if (_ctx.$page.props.flash.question_added) {
              _push2(`<div class="fixed z-50 bottom-10 right-10 bg-ijo-terang hover:bg-primary w-1/4 h-20 flex justify-center items-center rounded-lg cursor-pointer"${_scopeId}><p class="text-center text-white font-medium text-lg"${_scopeId}>${ssrInterpolate(_ctx.$page.props.flash.question_added)}</p><svg class="ml-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="flex justify-between items-center mb-5"${_scopeId}><div class="w-1/2 sm:w-full"${_scopeId}>`);
            if (_ctx.$page.props.auth.user.usertype === "superadmin") {
              _push2(ssrRenderComponent(_sfc_main$2, {
                href: _ctx.route("create_surveys", [unref(clientSlug), unref(projectSlug)]),
                class: "bg-primary text-white font-medium text-sm px-6 mr-5 py-2 rounded-md border-2 hover:bg-white hover:text-primary hover:border-primary transition"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Add Survey `);
                  } else {
                    return [
                      createTextVNode(" Add Survey ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_sfc_main$2, {
              href: _ctx.route("projects", [unref(clientSlug)]),
              class: "bg-primary text-white font-medium text-sm px-6 py-2 rounded-md border-2 hover:bg-white hover:text-primary hover:border-primary transition"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Back to Project `);
                } else {
                  return [
                    createTextVNode(" Back to Project ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="flex items-center px-4 py-2 text-sm w-60"${_scopeId}><input type="text"${ssrRenderAttr("value", searchQuery.value)} class="w-full border-primary rounded-md text-sm placeholder:text-center placeholder:font-thin focus:ring focus:ring-primary focus:border-primary" placeholder="Search"${_scopeId}></div></div><div class="relative overflow-x-auto shadow-md sm:rounded-lg"${_scopeId}><table class="w-full text-sm text-left rtl:text-right text-gray-500"${_scopeId}><caption class="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white"${_scopeId}><div class="flex justify-between w-full"${_scopeId}><div${_scopeId}>${ssrInterpolate(unref(project)["project_name"])} <p class="mt-1 mb-4 text-sm font-normal text-gray-500"${_scopeId}>${ssrInterpolate(unref(project)["desc"])}</p></div></div><div class="border-b-2 border-gray-300"${_scopeId}></div></caption><thead class="text-xs text-white uppercase bg-primary"${_scopeId}><tr${_scopeId}><th scope="col" class="px-6 py-3 w-1/5"${_scopeId}>Survey Title</th><th scope="col" class="px-6 py-3 w-1/4"${_scopeId}>Description</th><th scope="col" class="px-6 py-3"${_scopeId}>Target</th><th scope="col" class="px-6 py-3"${_scopeId}>Status</th><th scope="col" class="px-6 py-3 md:w-1/4 text-center"${_scopeId}>Action</th></tr></thead><tbody${_scopeId}><!--[-->`);
            ssrRenderList(filteredSurveys.value, (survey) => {
              _push2(`<tr class="bg-white border-b hover:bg-gray-50"${_scopeId}><td scope="row" class="px-6 py-4 font-medium text-gray-900"${_scopeId}>${ssrInterpolate(survey.title)}</td><td class="px-6 py-4 font-medium text-gray-900 sm:text-gray-500"${_scopeId}>${ssrInterpolate(survey.desc)}</td><td class="px-6 py-4"${_scopeId}>${ssrInterpolate(getSurveySubmissions(survey.id))} / ${ssrInterpolate(survey.target_response)}<br${_scopeId}> Target Lokasi: <span${_scopeId}>${ssrInterpolate(getProvinceName(survey.province_id))}</span></td><td class="px-6 py-4"${_scopeId}>`);
              if (survey.status == 0) {
                _push2(`<p${_scopeId}> Ditutup</p>`);
              } else {
                _push2(`<!---->`);
              }
              if (survey.status == 1) {
                _push2(`<p${_scopeId}> Dibuka</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</td><td class="px-6 py-6"${_scopeId}><div class="grid grid-cols-2 gap-x-2 justify-center content-center"${_scopeId}>`);
              if (hasFilledSurvey(survey)) {
                _push2(`<div class="${ssrRenderClass(props.user.current_team_id == 1 && props.user.usertype == "user" ? "col-span-2" : "")}"${_scopeId}><p class="text-center mt-3"${_scopeId}>Anda Sudah Mengisi Survey Ini</p></div>`);
              } else if (hasPubllish(survey) && !hasFilledSurvey(survey)) {
                _push2(`<div class="${ssrRenderClass([props.user.current_team_id == 1 && props.user.usertype == "user" ? "col-span-2" : "", "m-auto"])}"${_scopeId}><p class="text-center"${_scopeId}>Survey Ditutup</p></div>`);
              } else {
                _push2(ssrRenderComponent(_sfc_main$2, {
                  href: props.user.biodata_id == null ? _ctx.route("biodata", [unref(clientSlug), unref(projectSlug), survey.id, _ctx.$page.props.auth.user.id]) : _ctx.route("edit_bio", [unref(clientSlug), unref(projectSlug), survey.id, _ctx.$page.props.auth.user.id]),
                  class: ["w-full flex justify-center py-2.5 text-white bg-secondary rounded-md text-sm hover:bg-transparent hover:!text-primary hover:outline hover:outline-primary transition", props.user.current_team_id == 1 && props.user.usertype == "user" ? "col-span-2" : ""]
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` Isi Survey `);
                    } else {
                      return [
                        createTextVNode(" Isi Survey ")
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              }
              if (_ctx.$page.props.auth.user.current_team_id != 1 || props.user.usertype == "superadmin") {
                _push2(ssrRenderComponent(_sfc_main$2, {
                  href: _ctx.route("response", [unref(clientSlug), unref(projectSlug), survey.id]),
                  class: "w-full flex justify-center py-2.5 text-white bg-secondary rounded-md text-sm hover:bg-transparent hover:!text-primary hover:outline hover:outline-primary transition"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` Cek Respon `);
                    } else {
                      return [
                        createTextVNode(" Cek Respon ")
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (_ctx.$page.props.auth.user.usertype === "admin" || _ctx.$page.props.auth.user.usertype === "superadmin") {
                _push2(ssrRenderComponent(_sfc_main$2, {
                  href: _ctx.route("question_surveys", [unref(clientSlug), unref(projectSlug), survey.id]),
                  class: "col-span-2 w-full flex justify-center py-2.5 text-white bg-primary rounded-md text-sm hover:bg-transparent hover:!text-primary hover:outline hover:outline-primary transition"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` Tambah pertanyaan `);
                    } else {
                      return [
                        createTextVNode(" Tambah pertanyaan ")
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (_ctx.$page.props.auth.user.usertype === "admin" || _ctx.$page.props.auth.user.usertype === "superadmin") {
                _push2(`<div class="mt-5 text-center col-span-2"${_scopeId}><a${ssrRenderAttr("href", _ctx.route("edit_surveys", [unref(clientSlug), unref(projectSlug), survey.id]))} class="font-medium text-blue-600 hover:underline mr-4"${_scopeId}>Edit</a><a class="font-medium text-red-600 hover:underline cursor-pointer"${_scopeId}>Delete</a></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></td></tr>`);
            });
            _push2(`<!--]--></tbody></table>`);
            if (showDeleteModal.value) {
              _push2(ssrRenderComponent(DeleteConfirmation, {
                show: showDeleteModal.value,
                onConfirm: confirmDeletion,
                onCancel: cancelDeletion
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></main>`);
          } else {
            return [
              createVNode("main", { class: "min-h-screen bg-repeat bg-[('/img/bg-dashboard.png')]" }, [
                createVNode("div", { class: "mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8" }, [
                  _ctx.$page.props.flash.question_added ? (openBlock(), createBlock("div", {
                    key: 0,
                    onClick: ($event) => _ctx.$page.props.flash.question_added = false,
                    class: "fixed z-50 bottom-10 right-10 bg-ijo-terang hover:bg-primary w-1/4 h-20 flex justify-center items-center rounded-lg cursor-pointer"
                  }, [
                    createVNode("p", { class: "text-center text-white font-medium text-lg" }, toDisplayString(_ctx.$page.props.flash.question_added), 1),
                    (openBlock(), createBlock("svg", {
                      class: "ml-2 h-5 w-5 text-white",
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      "stroke-width": "1.5",
                      stroke: "currentColor"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        d: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      })
                    ]))
                  ], 8, ["onClick"])) : createCommentVNode("", true),
                  createVNode("div", { class: "flex justify-between items-center mb-5" }, [
                    createVNode("div", { class: "w-1/2 sm:w-full" }, [
                      _ctx.$page.props.auth.user.usertype === "superadmin" ? (openBlock(), createBlock(_sfc_main$2, {
                        key: 0,
                        href: _ctx.route("create_surveys", [unref(clientSlug), unref(projectSlug)]),
                        class: "bg-primary text-white font-medium text-sm px-6 mr-5 py-2 rounded-md border-2 hover:bg-white hover:text-primary hover:border-primary transition"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Add Survey ")
                        ]),
                        _: 1
                      }, 8, ["href"])) : createCommentVNode("", true),
                      createVNode(_sfc_main$2, {
                        href: _ctx.route("projects", [unref(clientSlug)]),
                        class: "bg-primary text-white font-medium text-sm px-6 py-2 rounded-md border-2 hover:bg-white hover:text-primary hover:border-primary transition"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Back to Project ")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ]),
                    createVNode("div", { class: "flex items-center px-4 py-2 text-sm w-60" }, [
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
                    createVNode("table", { class: "w-full text-sm text-left rtl:text-right text-gray-500" }, [
                      createVNode("caption", { class: "p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white" }, [
                        createVNode("div", { class: "flex justify-between w-full" }, [
                          createVNode("div", null, [
                            createTextVNode(toDisplayString(unref(project)["project_name"]) + " ", 1),
                            createVNode("p", { class: "mt-1 mb-4 text-sm font-normal text-gray-500" }, toDisplayString(unref(project)["desc"]), 1)
                          ])
                        ]),
                        createVNode("div", { class: "border-b-2 border-gray-300" })
                      ]),
                      createVNode("thead", { class: "text-xs text-white uppercase bg-primary" }, [
                        createVNode("tr", null, [
                          createVNode("th", {
                            scope: "col",
                            class: "px-6 py-3 w-1/5"
                          }, "Survey Title"),
                          createVNode("th", {
                            scope: "col",
                            class: "px-6 py-3 w-1/4"
                          }, "Description"),
                          createVNode("th", {
                            scope: "col",
                            class: "px-6 py-3"
                          }, "Target"),
                          createVNode("th", {
                            scope: "col",
                            class: "px-6 py-3"
                          }, "Status"),
                          createVNode("th", {
                            scope: "col",
                            class: "px-6 py-3 md:w-1/4 text-center"
                          }, "Action")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        (openBlock(true), createBlock(Fragment, null, renderList(filteredSurveys.value, (survey) => {
                          return openBlock(), createBlock("tr", {
                            key: survey.id,
                            class: "bg-white border-b hover:bg-gray-50"
                          }, [
                            createVNode("td", {
                              scope: "row",
                              class: "px-6 py-4 font-medium text-gray-900"
                            }, toDisplayString(survey.title), 1),
                            createVNode("td", { class: "px-6 py-4 font-medium text-gray-900 sm:text-gray-500" }, toDisplayString(survey.desc), 1),
                            createVNode("td", { class: "px-6 py-4" }, [
                              createTextVNode(toDisplayString(getSurveySubmissions(survey.id)) + " / " + toDisplayString(survey.target_response), 1),
                              createVNode("br"),
                              createTextVNode(" Target Lokasi: "),
                              createVNode("span", null, toDisplayString(getProvinceName(survey.province_id)), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4" }, [
                              survey.status == 0 ? (openBlock(), createBlock("p", { key: 0 }, " Ditutup")) : createCommentVNode("", true),
                              survey.status == 1 ? (openBlock(), createBlock("p", { key: 1 }, " Dibuka")) : createCommentVNode("", true)
                            ]),
                            createVNode("td", { class: "px-6 py-6" }, [
                              createVNode("div", { class: "grid grid-cols-2 gap-x-2 justify-center content-center" }, [
                                hasFilledSurvey(survey) ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: props.user.current_team_id == 1 && props.user.usertype == "user" ? "col-span-2" : ""
                                }, [
                                  createVNode("p", { class: "text-center mt-3" }, "Anda Sudah Mengisi Survey Ini")
                                ], 2)) : hasPubllish(survey) && !hasFilledSurvey(survey) ? (openBlock(), createBlock("div", {
                                  key: 1,
                                  class: ["m-auto", props.user.current_team_id == 1 && props.user.usertype == "user" ? "col-span-2" : ""]
                                }, [
                                  createVNode("p", { class: "text-center" }, "Survey Ditutup")
                                ], 2)) : (openBlock(), createBlock(_sfc_main$2, {
                                  key: 2,
                                  href: props.user.biodata_id == null ? _ctx.route("biodata", [unref(clientSlug), unref(projectSlug), survey.id, _ctx.$page.props.auth.user.id]) : _ctx.route("edit_bio", [unref(clientSlug), unref(projectSlug), survey.id, _ctx.$page.props.auth.user.id]),
                                  class: ["w-full flex justify-center py-2.5 text-white bg-secondary rounded-md text-sm hover:bg-transparent hover:!text-primary hover:outline hover:outline-primary transition", props.user.current_team_id == 1 && props.user.usertype == "user" ? "col-span-2" : ""]
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Isi Survey ")
                                  ]),
                                  _: 2
                                }, 1032, ["href", "class"])),
                                _ctx.$page.props.auth.user.current_team_id != 1 || props.user.usertype == "superadmin" ? (openBlock(), createBlock(_sfc_main$2, {
                                  key: 3,
                                  href: _ctx.route("response", [unref(clientSlug), unref(projectSlug), survey.id]),
                                  class: "w-full flex justify-center py-2.5 text-white bg-secondary rounded-md text-sm hover:bg-transparent hover:!text-primary hover:outline hover:outline-primary transition"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Cek Respon ")
                                  ]),
                                  _: 2
                                }, 1032, ["href"])) : createCommentVNode("", true),
                                _ctx.$page.props.auth.user.usertype === "admin" || _ctx.$page.props.auth.user.usertype === "superadmin" ? (openBlock(), createBlock(_sfc_main$2, {
                                  key: 4,
                                  href: _ctx.route("question_surveys", [unref(clientSlug), unref(projectSlug), survey.id]),
                                  class: "col-span-2 w-full flex justify-center py-2.5 text-white bg-primary rounded-md text-sm hover:bg-transparent hover:!text-primary hover:outline hover:outline-primary transition"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Tambah pertanyaan ")
                                  ]),
                                  _: 2
                                }, 1032, ["href"])) : createCommentVNode("", true),
                                _ctx.$page.props.auth.user.usertype === "admin" || _ctx.$page.props.auth.user.usertype === "superadmin" ? (openBlock(), createBlock("div", {
                                  key: 5,
                                  class: "mt-5 text-center col-span-2"
                                }, [
                                  createVNode("a", {
                                    href: _ctx.route("edit_surveys", [unref(clientSlug), unref(projectSlug), survey.id]),
                                    class: "font-medium text-blue-600 hover:underline mr-4"
                                  }, "Edit", 8, ["href"]),
                                  createVNode("a", {
                                    onClick: ($event) => hapus(unref(clientSlug), unref(projectSlug), survey.id),
                                    class: "font-medium text-red-600 hover:underline cursor-pointer"
                                  }, "Delete", 8, ["onClick"])
                                ])) : createCommentVNode("", true)
                              ])
                            ])
                          ]);
                        }), 128))
                      ])
                    ]),
                    showDeleteModal.value ? (openBlock(), createBlock(DeleteConfirmation, {
                      key: 0,
                      show: showDeleteModal.value,
                      onConfirm: confirmDeletion,
                      onCancel: cancelDeletion
                    }, null, 8, ["show"])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Client/Projects/Surveys/ListSurveys.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
