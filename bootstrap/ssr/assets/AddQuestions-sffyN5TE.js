import { ref, onMounted, onBeforeUnmount, mergeProps, withCtx, unref, openBlock, createBlock, Fragment, renderList, createVNode, toDisplayString, withDirectives, vModelCheckbox, vModelText, createCommentVNode, createTextVNode, withModifiers, Transition, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseEqual } from "vue/server-renderer";
import { useForm } from "@inertiajs/vue3";
import { _ as _sfc_main$1, b as _sfc_main$2 } from "./AppLayout-wXEz5-tl.js";
import { VueDraggable } from "vue-draggable-plus";
import { D as DeleteConfirmation } from "./DeleteConfirmation-CF7YIQrQ.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const MAX_RADIO_CHOICES = 5;
const _sfc_main = {
  __name: "AddQuestions",
  __ssrInlineRender: true,
  props: {
    surveys: Object,
    projects: Object,
    clients: Object,
    page: Object
  },
  setup(__props) {
    const props = __props;
    const project = props.projects[0];
    const client = props.clients[0];
    let question;
    const showAddPage = ref(false);
    const showDeleteModal = ref(false);
    const pages = ref(props.page.map((page) => {
      question = page.question.map((item) => {
        let tipe = [];
        let text = [];
        let choice = [];
        let lastCindex = "";
        if (item.question_type_id == 2) {
          tipe = ["Radio"];
          choice = item.choice.map((isi) => {
            return { pilih: isi.value, cId: isi.id, c_order: isi.order };
          });
          lastCindex = choice.length - 1;
        } else if (item.question_type_id == 3) {
          tipe = ["Checkbox"];
          choice = item.choice.map((isi) => {
            return { pilih: isi.value, cId: isi.id, c_order: isi.order };
          });
          lastCindex = choice.length - 1;
        } else if (item.question_type_id == 1) {
          tipe = ["Text"];
          text = [{ isi: "" }];
        }
        return { id: item.id, soal: item.question_text, order: item.order, texts: text, types: tipe, required: item.required, choices: choice, lastChoiceIndex: lastCindex };
      });
      return { id: page.id, name: page.page_name, question };
    }));
    if (pages.value.length == 0) {
      pages.value.push({ name: "title", question: [] });
    }
    const questionsType = ref([
      { types: "Text", name: "Text", texts: "" },
      { types: "Radio", name: "Single Choice", choices: "" },
      { types: "Checkbox", name: "Multiple Choice", choices: "" },
      { types: "Radio", name: "Yes / No", choices: "" }
    ]);
    function clone(element) {
      let texts = [];
      let choice = [];
      let required = 0;
      let lastCindex = "";
      switch (element.name) {
        case "Text":
          texts = [{ isi: "" }];
          break;
        case "Single Choice":
          choice = [{ pilih: "" }];
          lastCindex = choice.length - 1;
          break;
        case "Yes / No":
          choice = [{ pilih: "Yes" }, { pilih: "No" }];
          lastCindex = choice.length - 1;
          break;
        case "Multiple Choice":
          choice = [{ pilih: "" }];
          lastCindex = choice.length - 1;
          break;
      }
      return {
        soal: "",
        texts,
        choices: choice,
        types: [element.types],
        required,
        lastChoiceIndex: lastCindex
      };
    }
    function addNewPage() {
      pages.value.push({ name: form.page_name, question: [] });
      form.reset("page_name");
    }
    const deletePageId = ref(null);
    const hapus = (index) => {
      deletePageId.value = index;
      showDeleteModal.value = true;
    };
    const confirmDeletion = (page) => {
      page.splice(deletePageId.value, 1);
      showDeleteModal.value = false;
      p(pages);
    };
    const p = (page) => {
      if (page.value.length == 0) {
        pages.value.push({ name: "title", question: [] });
      }
    };
    const cancelDeletion = () => showDeleteModal.value = false;
    function textQuestion(question2) {
      if (question2.types.length > 0 && !question2.types.includes("Text")) {
        clearQuestionType(question2);
      }
      if (!question2.types.includes("Text")) {
        const text = { isi: "" };
        question2.texts.push(text);
        question2.types.push("Text");
      }
    }
    function radioQuestion(question2) {
      if (question2.types.length > 0 && !question2.types.includes("Radio")) {
        clearQuestionType(question2);
      }
      if (!question2.types.includes("Radio")) {
        if (!question2.choices.length) {
          const checkbox = { pilih: "" };
          question2.choices.push(checkbox);
        }
        question2.types.push("Radio");
      }
    }
    function checkboxQuestion(question2) {
      if (question2.types.length > 0 && !question2.types.includes("Checkbox")) {
        clearQuestionType(question2);
      }
      if (!question2.types.includes("Checkbox")) {
        if (!question2.choices.length) {
          const checkbox = { pilih: "" };
          question2.choices.push(checkbox);
        }
        question2.types.push("Checkbox");
        question2.lastChoiceIndex = question2.choices.length - 1;
      }
    }
    function AddRadioOption(question2) {
      const radio = { pilih: "" };
      question2.choices.push(radio);
      question2.lastChoiceIndex = question2.choices.length - 1;
    }
    function AddCheckboxOption(question2) {
      const checkbox = { pilih: "" };
      question2.choices.push(checkbox);
      question2.lastChoiceIndex = question2.choices.length - 1;
    }
    function deleteRadio(question2, index) {
      if (question2.lastChoiceIndex >= 1) {
        question2.choices.splice(index, 1);
        question2.lastChoiceIndex = question2.choices.length - 1;
      }
    }
    function deleteCheckbox(question2, index) {
      if (question2.lastChoiceIndex >= 1) {
        question2.choices.splice(index, 1);
        question2.lastChoiceIndex = question2.choices.length - 1;
      }
    }
    function clearQuestionType(question2) {
      if (question2.types.includes("Text")) {
        question2.texts = [];
      } else if (question2.types.includes("Radio") || question2.types.includes("Checkbox")) {
        question2.choices = question2.choices;
      }
      question2.types = [];
    }
    function remove(page, index) {
      page.question.splice(index, 1);
    }
    const form = useForm({
      page_name: "",
      project_slug: project["slug"],
      client_slug: client["slug"]
    });
    const savingStatus = ref("");
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };
    const submitForm = () => {
      savingStatus.value = "saving";
      form.transform(() => ({
        data: pages.value,
        survey: props.surveys.id,
        project_slug: project["slug"],
        client_slug: client["slug"]
      })).post(route("manual-save-question", [props.surveys.id, form.client_slug, form.project_slug]), {
        preserveState: true,
        preserveScroll: true,
        onSuccess: () => {
          setTimeout(() => {
            savingStatus.value = "";
          }, 3e3);
          console.log("success");
          savingStatus.value = "saved";
          window.removeEventListener("beforeunload", handleBeforeUnload);
        },
        onError: (error) => {
          setTimeout(() => {
            savingStatus.value = "";
          }, 3e3);
          console.error("Error saving:", error);
          savingStatus.value = "error";
        }
      });
    };
    const status = () => {
      form.transform(() => ({
        surveyId: props.surveys.id,
        surveyStatus: props.surveys.status
      })).patch(route("changeStatus", [form.client_slug, form.project_slug, props.surveys.id]));
    };
    onMounted(() => {
      window.addEventListener("beforeunload", handleBeforeUnload);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(_sfc_main$1, mergeProps({ title: "Tambah Pertanyaan Survey" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<main class="min-h-screen relative" data-v-8999ed3b${_scopeId}><header class="bg-white flex justify-between items-center border-b border-gray-300 sticky top-0 z-50" data-v-8999ed3b${_scopeId}><a${ssrRenderAttr("href", _ctx.route("listsurvey", [unref(client)["slug"], unref(project)["slug"]]))} class="flex justify-center items-center font-semibold text-white bg-red-500 py-2.5 ps-4 pe-8 gap-1 hover:bg-red-600 transition" data-v-8999ed3b${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-4" data-v-8999ed3b${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" data-v-8999ed3b${_scopeId}></path></svg> Back </a><h2 class="text-center font-semibold text-xl" data-v-8999ed3b${_scopeId}>${ssrInterpolate(props.surveys.title)}</h2><form action="" data-v-8999ed3b${_scopeId}><button type="submit" class="py-2.5 px-8 gap-1 flex justify-center items-center font-semibold text-white bg-secondary hover:bg-[#016094] transition" data-v-8999ed3b${_scopeId}>${ssrInterpolate(props.surveys.status == 0 ? "Publish" : "Unpublish")}</button></form></header>`);
            if (props.surveys.status == 1) {
              _push2(`<div class="absolute h-[96.5%] w-full bg-white opacity-50 z-40" data-v-8999ed3b${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<aside class="sticky bg-gray-200 min-h-full top-11 z-30" data-v-8999ed3b${_scopeId}><div class="absolute lg:w-1/5" data-v-8999ed3b${_scopeId}><h1 class="bg-white text-center text-lg font-semibold py-2.5 border-b-2 border-ijo-terang select-none" data-v-8999ed3b${_scopeId}> Add Questions </h1>`);
            _push2(ssrRenderComponent(unref(VueDraggable), {
              modelValue: questionsType.value,
              "onUpdate:modelValue": ($event) => questionsType.value = $event,
              group: { name: "questions", pull: "clone", put: false },
              animation: 150,
              clone,
              sort: false,
              class: "list-qtype"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(questionsType.value, (item) => {
                    _push3(`<div class="list-qtype-item bg-white border-b border-gray-300 py-2 px-4 flex justify-between items-center cursor-move hover:font-semibold" data-v-8999ed3b${_scopeId2}><span data-v-8999ed3b${_scopeId2}>${ssrInterpolate(item.name)}</span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-gray-500" data-v-8999ed3b${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" data-v-8999ed3b${_scopeId2}></path></svg></div>`);
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(questionsType.value, (item) => {
                      return openBlock(), createBlock("div", {
                        key: item.types,
                        class: "list-qtype-item bg-white border-b border-gray-300 py-2 px-4 flex justify-between items-center cursor-move hover:font-semibold"
                      }, [
                        createVNode("span", null, toDisplayString(item.name), 1),
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          "stroke-width": "1.5",
                          stroke: "currentColor",
                          class: "size-6 text-gray-500"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          })
                        ]))
                      ]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<button type="button" class="${ssrRenderClass([!showAddPage.value ? "border-b" : "", "bg-white border-gray-300 py-2 px-4 flex justify-between items-center w-full hover:font-semibold"])}" data-v-8999ed3b${_scopeId}> Add Page <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-gray-500" data-v-8999ed3b${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" data-v-8999ed3b${_scopeId}></path></svg></button>`);
            if (showAddPage.value) {
              _push2(`<form action="" class="w-full flex justify-between items-center bg-white border-b border-gray-300 px-4" data-v-8999ed3b${_scopeId}><input type="text" id="showAddPage"${ssrRenderAttr("value", unref(form).page_name)} class="text-sm w-full -ms-1 me-4 mb-2 border-0 border-b-2 border-gray-400 focus:ring-0 focus:border-gray-600" placeholder="Enter page name" data-v-8999ed3b${_scopeId}><button type="submit" data-v-8999ed3b${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 transition hover:text-sky-500" data-v-8999ed3b${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" data-v-8999ed3b${_scopeId}></path></svg></button></form>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<form class="bg-white" data-v-8999ed3b${_scopeId}><button type="submit" class="px-4 py-2 w-full text-sky-500 hover:text-sky-600 font-semibold flex justify-center items-center gap-2 transition" data-v-8999ed3b${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-5" data-v-8999ed3b${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" data-v-8999ed3b${_scopeId}></path></svg> Save Questions </button>`);
            if (savingStatus.value === "saving") {
              _push2(`<p class="text-center" data-v-8999ed3b${_scopeId}>Saving...</p>`);
            } else {
              _push2(`<!---->`);
            }
            if (savingStatus.value === "saved") {
              _push2(`<p class="text-center font-semibold" data-v-8999ed3b${_scopeId}>All changes saved.</p>`);
            } else {
              _push2(`<!---->`);
            }
            if (savingStatus.value === "error") {
              _push2(`<p class="text-center font-semibold" data-v-8999ed3b${_scopeId}>Error saving data.</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</form></div></aside><form class="mx-auto max-w-xl lg:max-w-2xl xl:max-w-3xl px-4 py-6 sm:px-6 lg:px-8" data-v-8999ed3b${_scopeId}><!--[-->`);
            ssrRenderList(pages.value, (page, page_index) => {
              _push2(`<div class="pb-6 rounded-md" data-v-8999ed3b${_scopeId}><div class="p-5 rounded-t-md border-b border-gray-300 bg-primary flex items-center relative" data-v-8999ed3b${_scopeId}><input type="text"${ssrRenderAttr("id", "page-name-" + page_index)}${ssrRenderAttr("value", page.name)} placeholder="Title" class="w-full bg-transparent text-white border-0 border-b border-white placeholder:font-normal placeholder-gray-100 focus:ring-0 focus:border-b-2 focus:border-white transition" data-v-8999ed3b${_scopeId}><div class="cursor-pointer absolute -right-16 bg-white p-3 rounded-full border border-gray-300 shadow-md" data-v-8999ed3b${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-red-500" data-v-8999ed3b${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" data-v-8999ed3b${_scopeId}></path></svg></div>`);
              if (showDeleteModal.value) {
                _push2(ssrRenderComponent(DeleteConfirmation, {
                  show: showDeleteModal.value,
                  onConfirm: ($event) => confirmDeletion(pages.value),
                  onCancel: cancelDeletion
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
              _push2(ssrRenderComponent(unref(VueDraggable), {
                modelValue: page.question,
                "onUpdate:modelValue": ($event) => page.question = $event,
                group: "questions",
                animation: 150,
                class: ["list-questions", "bg-white pb-8 rounded-md"],
                handle: ".handle"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    ssrRenderList(page.question, (item, index) => {
                      _push3(`<div class="list-questions-item" data-v-8999ed3b${_scopeId2}><div class="p-5 gap-2 flex items-center" data-v-8999ed3b${_scopeId2}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-10 cursor-grab handle border-2 rounded-md border-gray-800" data-v-8999ed3b${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" data-v-8999ed3b${_scopeId2}></path></svg><p class="ml-2" data-v-8999ed3b${_scopeId2}>${ssrInterpolate(index + 1)}.</p><input${ssrRenderAttr("value", item.soal)} type="text" placeholder="Insert question here" class="text-sm w-full mx-1 rounded-md" data-v-8999ed3b${_scopeId2}>`);
                      _push3(ssrRenderComponent(_sfc_main$2, {
                        align: "right",
                        width: "48"
                      }, {
                        trigger: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<button type="button" class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none focus:bg-gray-50 active:bg-gray-50 transition ease-in-out duration-150" data-v-8999ed3b${_scopeId3}><!--[-->`);
                            ssrRenderList(item.types, (type) => {
                              _push4(`<p data-v-8999ed3b${_scopeId3}>${ssrInterpolate(type ?? "Question Type")}</p>`);
                            });
                            _push4(`<!--]--><svg class="ms-2 -me-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" data-v-8999ed3b${_scopeId3}><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" data-v-8999ed3b${_scopeId3}></path></svg></button>`);
                          } else {
                            return [
                              createVNode("button", {
                                type: "button",
                                class: "inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none focus:bg-gray-50 active:bg-gray-50 transition ease-in-out duration-150"
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(item.types, (type) => {
                                  return openBlock(), createBlock("p", null, toDisplayString(type ?? "Question Type"), 1);
                                }), 256)),
                                (openBlock(), createBlock("svg", {
                                  class: "ms-2 -me-0.5 h-4 w-4",
                                  xmlns: "http://www.w3.org/2000/svg",
                                  fill: "none",
                                  viewBox: "0 0 24 24",
                                  "stroke-width": "1.5",
                                  stroke: "currentColor"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    d: "M19.5 8.25l-7.5 7.5-7.5-7.5"
                                  })
                                ]))
                              ])
                            ];
                          }
                        }),
                        content: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<div class="block px-4 py-2 text-sm cursor-pointer" data-v-8999ed3b${_scopeId3}> Text </div><div class="block px-4 py-2 text-sm cursor-pointer" data-v-8999ed3b${_scopeId3}> Single Choice </div><div class="block px-4 py-2 text-sm cursor-pointer" data-v-8999ed3b${_scopeId3}> Multiple Choice </div><div class="block border-t border-gray-300 py-2 text-center" data-v-8999ed3b${_scopeId3}><input type="checkbox"${ssrIncludeBooleanAttr(ssrLooseEqual(item.required, "1")) ? " checked" : ""}${ssrRenderAttr("id", "q" + index + "-required")} class="cursor-pointer" data-v-8999ed3b${_scopeId3}><label${ssrRenderAttr("for", "q" + index + "-required")} class="pl-2 cursor-pointer select-none w-full" data-v-8999ed3b${_scopeId3}>Required</label></div>`);
                          } else {
                            return [
                              createVNode("div", {
                                onClick: ($event) => textQuestion(item),
                                class: "block px-4 py-2 text-sm cursor-pointer"
                              }, " Text ", 8, ["onClick"]),
                              createVNode("div", {
                                onClick: ($event) => radioQuestion(item),
                                class: "block px-4 py-2 text-sm cursor-pointer"
                              }, " Single Choice ", 8, ["onClick"]),
                              createVNode("div", {
                                onClick: ($event) => checkboxQuestion(item),
                                class: "block px-4 py-2 text-sm cursor-pointer"
                              }, " Multiple Choice ", 8, ["onClick"]),
                              createVNode("div", { class: "block border-t border-gray-300 py-2 text-center" }, [
                                withDirectives(createVNode("input", {
                                  type: "checkbox",
                                  "onUpdate:modelValue": ($event) => item.required = $event,
                                  "true-value": "1",
                                  "false-value": "0",
                                  id: "q" + index + "-required",
                                  class: "cursor-pointer"
                                }, null, 8, ["onUpdate:modelValue", "id"]), [
                                  [vModelCheckbox, item.required]
                                ]),
                                createVNode("label", {
                                  for: "q" + index + "-required",
                                  class: "pl-2 cursor-pointer select-none w-full"
                                }, "Required", 8, ["for"])
                              ])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-10 text-red-600 cursor-pointer" data-v-8999ed3b${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" data-v-8999ed3b${_scopeId2}></path></svg></div>`);
                      if (item.required == 1) {
                        _push3(`<div class="px-5 mb-2 text-red-500" data-v-8999ed3b${_scopeId2}>* Required</div>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`<!--[-->`);
                      ssrRenderList(item.texts, (text, index2) => {
                        _push3(`<div class="px-5" data-v-8999ed3b${_scopeId2}><textarea${ssrRenderAttr("name", "text-" + item.id)}${ssrRenderAttr("id", "text-" + item.id)} placeholder="Jawaban" class="w-full text-sm rounded-md bg-gray-200" disabled data-v-8999ed3b${_scopeId2}>${ssrInterpolate(text.isi)}</textarea></div>`);
                      });
                      _push3(`<!--]-->`);
                      if (item.types.includes("Radio")) {
                        _push3(`<!--[-->`);
                        ssrRenderList(item.choices, (radio, index2) => {
                          _push3(`<div class="px-5" data-v-8999ed3b${_scopeId2}><div class="flex items-center mb-2" data-v-8999ed3b${_scopeId2}><span class="select-none" data-v-8999ed3b${_scopeId2}>O</span><input type="text"${ssrRenderAttr("value", radio.pilih)}${ssrRenderAttr("name", "radio-" + item.id)}${ssrRenderAttr("id", "radio" + (index2 + 1) + "-q" + item.id)} placeholder="Insert single choice" class="text-sm mx-4 block w-1/4 border-0 border-b-2 border-gray-400 focus:ring-0 focus:border-gray-600" data-v-8999ed3b${_scopeId2}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-red-600 cursor-pointer" data-v-8999ed3b${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" data-v-8999ed3b${_scopeId2}></path></svg></div>`);
                          if (index2 === item.choices.length - 1 && item.choices.length < MAX_RADIO_CHOICES) {
                            _push3(`<div class="ml-7" data-v-8999ed3b${_scopeId2}><a class="w-1/4 flex justify-center py-2.5 my-0 text-white !bg-primary rounded-md text-sm hover:!bg-transparent hover:text-primary hover:outline hover:outline-primary transition hover:duration-200 cursor-pointer" data-v-8999ed3b${_scopeId2}> Add Options </a></div>`);
                          } else {
                            _push3(`<!---->`);
                          }
                          _push3(`</div>`);
                        });
                        _push3(`<!--]-->`);
                      } else {
                        _push3(`<!---->`);
                      }
                      if (item.types.includes("Checkbox")) {
                        _push3(`<!--[-->`);
                        ssrRenderList(item.choices, (checkbox, index2) => {
                          _push3(`<div class="px-5" data-v-8999ed3b${_scopeId2}><div class="flex items-center mb-2" data-v-8999ed3b${_scopeId2}><span class="select-none" data-v-8999ed3b${_scopeId2}>▢</span><input type="text"${ssrRenderAttr("value", checkbox.pilih)}${ssrRenderAttr("name", "checkbox-" + item.id)}${ssrRenderAttr("id", "checkbox" + (index2 + 1) + "-q" + item.id)} placeholder="Insert multiple choice here" class="text-sm mx-4 rounded-md block w-1/4" data-v-8999ed3b${_scopeId2}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-red-600 cursor-pointer" data-v-8999ed3b${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" data-v-8999ed3b${_scopeId2}></path></svg></div>`);
                          if (index2 === item.choices.length - 1 && item.choices.length < MAX_RADIO_CHOICES) {
                            _push3(`<div class="ml-7" data-v-8999ed3b${_scopeId2}><a class="w-1/4 flex justify-center py-2.5 my-0 text-white !bg-primary rounded-md text-sm hover:!bg-transparent hover:text-primary hover:outline hover:outline-primary transition hover:duration-200 cursor-pointer" data-v-8999ed3b${_scopeId2}> Add Options </a></div>`);
                          } else {
                            _push3(`<!---->`);
                          }
                          _push3(`</div>`);
                        });
                        _push3(`<!--]-->`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div>`);
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList(page.question, (item, index) => {
                        return openBlock(), createBlock("div", {
                          key: item.id,
                          class: "list-questions-item"
                        }, [
                          createVNode("div", { class: "p-5 gap-2 flex items-center" }, [
                            (openBlock(), createBlock("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              "stroke-width": "1.5",
                              stroke: "currentColor",
                              class: "size-10 cursor-grab handle border-2 rounded-md border-gray-800"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                d: "M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                              })
                            ])),
                            createVNode("p", { class: "ml-2" }, toDisplayString(index + 1) + ".", 1),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => item.soal = $event,
                              type: "text",
                              placeholder: "Insert question here",
                              class: "text-sm w-full mx-1 rounded-md"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, item.soal]
                            ]),
                            createVNode(_sfc_main$2, {
                              align: "right",
                              width: "48"
                            }, {
                              trigger: withCtx(() => [
                                createVNode("button", {
                                  type: "button",
                                  class: "inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none focus:bg-gray-50 active:bg-gray-50 transition ease-in-out duration-150"
                                }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(item.types, (type) => {
                                    return openBlock(), createBlock("p", null, toDisplayString(type ?? "Question Type"), 1);
                                  }), 256)),
                                  (openBlock(), createBlock("svg", {
                                    class: "ms-2 -me-0.5 h-4 w-4",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    "stroke-width": "1.5",
                                    stroke: "currentColor"
                                  }, [
                                    createVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      d: "M19.5 8.25l-7.5 7.5-7.5-7.5"
                                    })
                                  ]))
                                ])
                              ]),
                              content: withCtx(() => [
                                createVNode("div", {
                                  onClick: ($event) => textQuestion(item),
                                  class: "block px-4 py-2 text-sm cursor-pointer"
                                }, " Text ", 8, ["onClick"]),
                                createVNode("div", {
                                  onClick: ($event) => radioQuestion(item),
                                  class: "block px-4 py-2 text-sm cursor-pointer"
                                }, " Single Choice ", 8, ["onClick"]),
                                createVNode("div", {
                                  onClick: ($event) => checkboxQuestion(item),
                                  class: "block px-4 py-2 text-sm cursor-pointer"
                                }, " Multiple Choice ", 8, ["onClick"]),
                                createVNode("div", { class: "block border-t border-gray-300 py-2 text-center" }, [
                                  withDirectives(createVNode("input", {
                                    type: "checkbox",
                                    "onUpdate:modelValue": ($event) => item.required = $event,
                                    "true-value": "1",
                                    "false-value": "0",
                                    id: "q" + index + "-required",
                                    class: "cursor-pointer"
                                  }, null, 8, ["onUpdate:modelValue", "id"]), [
                                    [vModelCheckbox, item.required]
                                  ]),
                                  createVNode("label", {
                                    for: "q" + index + "-required",
                                    class: "pl-2 cursor-pointer select-none w-full"
                                  }, "Required", 8, ["for"])
                                ])
                              ]),
                              _: 2
                            }, 1024),
                            (openBlock(), createBlock("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              "stroke-width": "1.5",
                              stroke: "currentColor",
                              onClick: ($event) => remove(page, index),
                              class: "size-10 text-red-600 cursor-pointer"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                d: "m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                              })
                            ], 8, ["onClick"]))
                          ]),
                          item.required == 1 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "px-5 mb-2 text-red-500"
                          }, "* Required")) : createCommentVNode("", true),
                          (openBlock(true), createBlock(Fragment, null, renderList(item.texts, (text, index2) => {
                            return openBlock(), createBlock("div", {
                              class: "px-5",
                              key: index2
                            }, [
                              withDirectives(createVNode("textarea", {
                                "onUpdate:modelValue": ($event) => text.isi = $event,
                                name: "text-" + item.id,
                                id: "text-" + item.id,
                                placeholder: "Jawaban",
                                class: "w-full text-sm rounded-md bg-gray-200",
                                disabled: ""
                              }, null, 8, ["onUpdate:modelValue", "name", "id"]), [
                                [vModelText, text.isi]
                              ])
                            ]);
                          }), 128)),
                          item.types.includes("Radio") ? (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(item.choices, (radio, index2) => {
                            return openBlock(), createBlock("div", {
                              class: "px-5",
                              key: index2
                            }, [
                              createVNode("div", { class: "flex items-center mb-2" }, [
                                createVNode("span", { class: "select-none" }, "O"),
                                withDirectives(createVNode("input", {
                                  type: "text",
                                  "onUpdate:modelValue": ($event) => radio.pilih = $event,
                                  name: "radio-" + item.id,
                                  id: "radio" + (index2 + 1) + "-q" + item.id,
                                  placeholder: "Insert single choice",
                                  class: "text-sm mx-4 block w-1/4 border-0 border-b-2 border-gray-400 focus:ring-0 focus:border-gray-600"
                                }, null, 8, ["onUpdate:modelValue", "name", "id"]), [
                                  [vModelText, radio.pilih]
                                ]),
                                (openBlock(), createBlock("svg", {
                                  xmlns: "http://www.w3.org/2000/svg",
                                  fill: "none",
                                  viewBox: "0 0 24 24",
                                  "stroke-width": "1.5",
                                  stroke: "currentColor",
                                  class: "size-6 text-red-600 cursor-pointer",
                                  onClick: ($event) => deleteRadio(item, index2)
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    d: "M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                  })
                                ], 8, ["onClick"]))
                              ]),
                              index2 === item.choices.length - 1 && item.choices.length < MAX_RADIO_CHOICES ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "ml-7"
                              }, [
                                createVNode("a", {
                                  class: "w-1/4 flex justify-center py-2.5 my-0 text-white !bg-primary rounded-md text-sm hover:!bg-transparent hover:text-primary hover:outline hover:outline-primary transition hover:duration-200 cursor-pointer",
                                  onClick: ($event) => AddRadioOption(item)
                                }, " Add Options ", 8, ["onClick"])
                              ])) : createCommentVNode("", true)
                            ]);
                          }), 128)) : createCommentVNode("", true),
                          item.types.includes("Checkbox") ? (openBlock(true), createBlock(Fragment, { key: 2 }, renderList(item.choices, (checkbox, index2) => {
                            return openBlock(), createBlock("div", {
                              class: "px-5",
                              key: index2
                            }, [
                              createVNode("div", { class: "flex items-center mb-2" }, [
                                createVNode("span", { class: "select-none" }, "▢"),
                                withDirectives(createVNode("input", {
                                  type: "text",
                                  "onUpdate:modelValue": ($event) => checkbox.pilih = $event,
                                  name: "checkbox-" + item.id,
                                  id: "checkbox" + (index2 + 1) + "-q" + item.id,
                                  placeholder: "Insert multiple choice here",
                                  class: "text-sm mx-4 rounded-md block w-1/4"
                                }, null, 8, ["onUpdate:modelValue", "name", "id"]), [
                                  [vModelText, checkbox.pilih]
                                ]),
                                (openBlock(), createBlock("svg", {
                                  xmlns: "http://www.w3.org/2000/svg",
                                  fill: "none",
                                  viewBox: "0 0 24 24",
                                  "stroke-width": "1.5",
                                  stroke: "currentColor",
                                  class: "size-6 text-red-600 cursor-pointer",
                                  onClick: ($event) => deleteCheckbox(item, index2)
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    d: "M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                  })
                                ], 8, ["onClick"]))
                              ]),
                              index2 === item.choices.length - 1 && item.choices.length < MAX_RADIO_CHOICES ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "ml-7"
                              }, [
                                createVNode("a", {
                                  class: "w-1/4 flex justify-center py-2.5 my-0 text-white !bg-primary rounded-md text-sm hover:!bg-transparent hover:text-primary hover:outline hover:outline-primary transition hover:duration-200 cursor-pointer",
                                  onClick: ($event) => AddCheckboxOption(item)
                                }, " Add Options ", 8, ["onClick"])
                              ])) : createCommentVNode("", true)
                            ]);
                          }), 128)) : createCommentVNode("", true)
                        ]);
                      }), 128))
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              if (pages.value.length > 1 && page_index != pages.value.length - 1) {
                _push2(`<div class="border border-gray-500 mt-8 mb-3" data-v-8999ed3b${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            });
            _push2(`<!--]--></form></main>`);
          } else {
            return [
              createVNode("main", { class: "min-h-screen relative" }, [
                createVNode("header", { class: "bg-white flex justify-between items-center border-b border-gray-300 sticky top-0 z-50" }, [
                  createVNode("a", {
                    href: _ctx.route("listsurvey", [unref(client)["slug"], unref(project)["slug"]]),
                    class: "flex justify-center items-center font-semibold text-white bg-red-500 py-2.5 ps-4 pe-8 gap-1 hover:bg-red-600 transition"
                  }, [
                    (openBlock(), createBlock("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      "stroke-width": "2",
                      stroke: "currentColor",
                      class: "size-4"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        d: "M15.75 19.5 8.25 12l7.5-7.5"
                      })
                    ])),
                    createTextVNode(" Back ")
                  ], 8, ["href"]),
                  createVNode("h2", { class: "text-center font-semibold text-xl" }, toDisplayString(props.surveys.title), 1),
                  createVNode("form", {
                    action: "",
                    onSubmit: withModifiers(status, ["prevent"])
                  }, [
                    createVNode("button", {
                      type: "submit",
                      class: "py-2.5 px-8 gap-1 flex justify-center items-center font-semibold text-white bg-secondary hover:bg-[#016094] transition"
                    }, toDisplayString(props.surveys.status == 0 ? "Publish" : "Unpublish"), 1)
                  ], 32)
                ]),
                props.surveys.status == 1 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "absolute h-[96.5%] w-full bg-white opacity-50 z-40"
                })) : createCommentVNode("", true),
                createVNode("aside", { class: "sticky bg-gray-200 min-h-full top-11 z-30" }, [
                  createVNode("div", { class: "absolute lg:w-1/5" }, [
                    createVNode("h1", { class: "bg-white text-center text-lg font-semibold py-2.5 border-b-2 border-ijo-terang select-none" }, " Add Questions "),
                    createVNode(unref(VueDraggable), {
                      modelValue: questionsType.value,
                      "onUpdate:modelValue": ($event) => questionsType.value = $event,
                      group: { name: "questions", pull: "clone", put: false },
                      animation: 150,
                      clone,
                      sort: false,
                      class: "list-qtype"
                    }, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(questionsType.value, (item) => {
                          return openBlock(), createBlock("div", {
                            key: item.types,
                            class: "list-qtype-item bg-white border-b border-gray-300 py-2 px-4 flex justify-between items-center cursor-move hover:font-semibold"
                          }, [
                            createVNode("span", null, toDisplayString(item.name), 1),
                            (openBlock(), createBlock("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              "stroke-width": "1.5",
                              stroke: "currentColor",
                              class: "size-6 text-gray-500"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                d: "M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                              })
                            ]))
                          ]);
                        }), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"]),
                    createVNode("button", {
                      type: "button",
                      class: ["bg-white border-gray-300 py-2 px-4 flex justify-between items-center w-full hover:font-semibold", !showAddPage.value ? "border-b" : ""],
                      onClick: ($event) => showAddPage.value = !showAddPage.value
                    }, [
                      createTextVNode(" Add Page "),
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        "stroke-width": "1.5",
                        stroke: "currentColor",
                        class: "size-6 text-gray-500"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          d: "m19.5 8.25-7.5 7.5-7.5-7.5"
                        })
                      ]))
                    ], 10, ["onClick"]),
                    createVNode(Transition, {
                      "enter-active-class": "transition ease-out duration-200",
                      "enter-from-class": "transform scale-95",
                      "enter-to-class": "transform opacity-100 scale-100",
                      "leave-active-class": "transition ease-in duration-75",
                      "leave-from-class": "transform opacity-100 scale-100",
                      "leave-to-class": "transform scale-95"
                    }, {
                      default: withCtx(() => [
                        showAddPage.value ? (openBlock(), createBlock("form", {
                          key: 0,
                          action: "",
                          onSubmit: withModifiers(($event) => addNewPage(), ["prevent"]),
                          class: "w-full flex justify-between items-center bg-white border-b border-gray-300 px-4"
                        }, [
                          withDirectives(createVNode("input", {
                            type: "text",
                            id: "showAddPage",
                            "onUpdate:modelValue": ($event) => unref(form).page_name = $event,
                            class: "text-sm w-full -ms-1 me-4 mb-2 border-0 border-b-2 border-gray-400 focus:ring-0 focus:border-gray-600",
                            placeholder: "Enter page name"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).page_name]
                          ]),
                          createVNode("button", { type: "submit" }, [
                            (openBlock(), createBlock("svg", {
                              xmlns: "http://www.w3.org/2000/svg",
                              fill: "none",
                              viewBox: "0 0 24 24",
                              "stroke-width": "1.5",
                              stroke: "currentColor",
                              class: "size-6 transition hover:text-sky-500"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                d: "M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                              })
                            ]))
                          ])
                        ], 40, ["onSubmit"])) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }),
                    createVNode("form", {
                      class: "bg-white",
                      onSubmit: withModifiers(submitForm, ["prevent"])
                    }, [
                      createVNode("button", {
                        type: "submit",
                        class: "px-4 py-2 w-full text-sky-500 hover:text-sky-600 font-semibold flex justify-center items-center gap-2 transition"
                      }, [
                        (openBlock(), createBlock("svg", {
                          xmlns: "http://www.w3.org/2000/svg",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          "stroke-width": "2",
                          stroke: "currentColor",
                          class: "size-5"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                          })
                        ])),
                        createTextVNode(" Save Questions ")
                      ]),
                      savingStatus.value === "saving" ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-center"
                      }, "Saving...")) : createCommentVNode("", true),
                      savingStatus.value === "saved" ? (openBlock(), createBlock("p", {
                        key: 1,
                        class: "text-center font-semibold"
                      }, "All changes saved.")) : createCommentVNode("", true),
                      savingStatus.value === "error" ? (openBlock(), createBlock("p", {
                        key: 2,
                        class: "text-center font-semibold"
                      }, "Error saving data.")) : createCommentVNode("", true)
                    ], 32)
                  ])
                ]),
                createVNode("form", { class: "mx-auto max-w-xl lg:max-w-2xl xl:max-w-3xl px-4 py-6 sm:px-6 lg:px-8" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(pages.value, (page, page_index) => {
                    return openBlock(), createBlock("div", {
                      class: "pb-6 rounded-md",
                      key: page_index
                    }, [
                      createVNode("div", { class: "p-5 rounded-t-md border-b border-gray-300 bg-primary flex items-center relative" }, [
                        withDirectives(createVNode("input", {
                          type: "text",
                          id: "page-name-" + page_index,
                          "onUpdate:modelValue": ($event) => page.name = $event,
                          placeholder: "Title",
                          class: "w-full bg-transparent text-white border-0 border-b border-white placeholder:font-normal placeholder-gray-100 focus:ring-0 focus:border-b-2 focus:border-white transition"
                        }, null, 8, ["id", "onUpdate:modelValue"]), [
                          [vModelText, page.name]
                        ]),
                        createVNode("div", {
                          onClick: ($event) => hapus(page_index),
                          class: "cursor-pointer absolute -right-16 bg-white p-3 rounded-full border border-gray-300 shadow-md"
                        }, [
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            "stroke-width": "1.5",
                            stroke: "currentColor",
                            class: "size-6 text-red-500"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            })
                          ]))
                        ], 8, ["onClick"]),
                        showDeleteModal.value ? (openBlock(), createBlock(DeleteConfirmation, {
                          key: 0,
                          show: showDeleteModal.value,
                          onConfirm: ($event) => confirmDeletion(pages.value),
                          onCancel: cancelDeletion
                        }, null, 8, ["show", "onConfirm"])) : createCommentVNode("", true)
                      ]),
                      createVNode(unref(VueDraggable), {
                        modelValue: page.question,
                        "onUpdate:modelValue": ($event) => page.question = $event,
                        group: "questions",
                        animation: 150,
                        class: ["list-questions", "bg-white pb-8 rounded-md"],
                        handle: ".handle"
                      }, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(page.question, (item, index) => {
                            return openBlock(), createBlock("div", {
                              key: item.id,
                              class: "list-questions-item"
                            }, [
                              createVNode("div", { class: "p-5 gap-2 flex items-center" }, [
                                (openBlock(), createBlock("svg", {
                                  xmlns: "http://www.w3.org/2000/svg",
                                  fill: "none",
                                  viewBox: "0 0 24 24",
                                  "stroke-width": "1.5",
                                  stroke: "currentColor",
                                  class: "size-10 cursor-grab handle border-2 rounded-md border-gray-800"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    d: "M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                                  })
                                ])),
                                createVNode("p", { class: "ml-2" }, toDisplayString(index + 1) + ".", 1),
                                withDirectives(createVNode("input", {
                                  "onUpdate:modelValue": ($event) => item.soal = $event,
                                  type: "text",
                                  placeholder: "Insert question here",
                                  class: "text-sm w-full mx-1 rounded-md"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, item.soal]
                                ]),
                                createVNode(_sfc_main$2, {
                                  align: "right",
                                  width: "48"
                                }, {
                                  trigger: withCtx(() => [
                                    createVNode("button", {
                                      type: "button",
                                      class: "inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none focus:bg-gray-50 active:bg-gray-50 transition ease-in-out duration-150"
                                    }, [
                                      (openBlock(true), createBlock(Fragment, null, renderList(item.types, (type) => {
                                        return openBlock(), createBlock("p", null, toDisplayString(type ?? "Question Type"), 1);
                                      }), 256)),
                                      (openBlock(), createBlock("svg", {
                                        class: "ms-2 -me-0.5 h-4 w-4",
                                        xmlns: "http://www.w3.org/2000/svg",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        "stroke-width": "1.5",
                                        stroke: "currentColor"
                                      }, [
                                        createVNode("path", {
                                          "stroke-linecap": "round",
                                          "stroke-linejoin": "round",
                                          d: "M19.5 8.25l-7.5 7.5-7.5-7.5"
                                        })
                                      ]))
                                    ])
                                  ]),
                                  content: withCtx(() => [
                                    createVNode("div", {
                                      onClick: ($event) => textQuestion(item),
                                      class: "block px-4 py-2 text-sm cursor-pointer"
                                    }, " Text ", 8, ["onClick"]),
                                    createVNode("div", {
                                      onClick: ($event) => radioQuestion(item),
                                      class: "block px-4 py-2 text-sm cursor-pointer"
                                    }, " Single Choice ", 8, ["onClick"]),
                                    createVNode("div", {
                                      onClick: ($event) => checkboxQuestion(item),
                                      class: "block px-4 py-2 text-sm cursor-pointer"
                                    }, " Multiple Choice ", 8, ["onClick"]),
                                    createVNode("div", { class: "block border-t border-gray-300 py-2 text-center" }, [
                                      withDirectives(createVNode("input", {
                                        type: "checkbox",
                                        "onUpdate:modelValue": ($event) => item.required = $event,
                                        "true-value": "1",
                                        "false-value": "0",
                                        id: "q" + index + "-required",
                                        class: "cursor-pointer"
                                      }, null, 8, ["onUpdate:modelValue", "id"]), [
                                        [vModelCheckbox, item.required]
                                      ]),
                                      createVNode("label", {
                                        for: "q" + index + "-required",
                                        class: "pl-2 cursor-pointer select-none w-full"
                                      }, "Required", 8, ["for"])
                                    ])
                                  ]),
                                  _: 2
                                }, 1024),
                                (openBlock(), createBlock("svg", {
                                  xmlns: "http://www.w3.org/2000/svg",
                                  fill: "none",
                                  viewBox: "0 0 24 24",
                                  "stroke-width": "1.5",
                                  stroke: "currentColor",
                                  onClick: ($event) => remove(page, index),
                                  class: "size-10 text-red-600 cursor-pointer"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    d: "m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                  })
                                ], 8, ["onClick"]))
                              ]),
                              item.required == 1 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "px-5 mb-2 text-red-500"
                              }, "* Required")) : createCommentVNode("", true),
                              (openBlock(true), createBlock(Fragment, null, renderList(item.texts, (text, index2) => {
                                return openBlock(), createBlock("div", {
                                  class: "px-5",
                                  key: index2
                                }, [
                                  withDirectives(createVNode("textarea", {
                                    "onUpdate:modelValue": ($event) => text.isi = $event,
                                    name: "text-" + item.id,
                                    id: "text-" + item.id,
                                    placeholder: "Jawaban",
                                    class: "w-full text-sm rounded-md bg-gray-200",
                                    disabled: ""
                                  }, null, 8, ["onUpdate:modelValue", "name", "id"]), [
                                    [vModelText, text.isi]
                                  ])
                                ]);
                              }), 128)),
                              item.types.includes("Radio") ? (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(item.choices, (radio, index2) => {
                                return openBlock(), createBlock("div", {
                                  class: "px-5",
                                  key: index2
                                }, [
                                  createVNode("div", { class: "flex items-center mb-2" }, [
                                    createVNode("span", { class: "select-none" }, "O"),
                                    withDirectives(createVNode("input", {
                                      type: "text",
                                      "onUpdate:modelValue": ($event) => radio.pilih = $event,
                                      name: "radio-" + item.id,
                                      id: "radio" + (index2 + 1) + "-q" + item.id,
                                      placeholder: "Insert single choice",
                                      class: "text-sm mx-4 block w-1/4 border-0 border-b-2 border-gray-400 focus:ring-0 focus:border-gray-600"
                                    }, null, 8, ["onUpdate:modelValue", "name", "id"]), [
                                      [vModelText, radio.pilih]
                                    ]),
                                    (openBlock(), createBlock("svg", {
                                      xmlns: "http://www.w3.org/2000/svg",
                                      fill: "none",
                                      viewBox: "0 0 24 24",
                                      "stroke-width": "1.5",
                                      stroke: "currentColor",
                                      class: "size-6 text-red-600 cursor-pointer",
                                      onClick: ($event) => deleteRadio(item, index2)
                                    }, [
                                      createVNode("path", {
                                        "stroke-linecap": "round",
                                        "stroke-linejoin": "round",
                                        d: "M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                      })
                                    ], 8, ["onClick"]))
                                  ]),
                                  index2 === item.choices.length - 1 && item.choices.length < MAX_RADIO_CHOICES ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "ml-7"
                                  }, [
                                    createVNode("a", {
                                      class: "w-1/4 flex justify-center py-2.5 my-0 text-white !bg-primary rounded-md text-sm hover:!bg-transparent hover:text-primary hover:outline hover:outline-primary transition hover:duration-200 cursor-pointer",
                                      onClick: ($event) => AddRadioOption(item)
                                    }, " Add Options ", 8, ["onClick"])
                                  ])) : createCommentVNode("", true)
                                ]);
                              }), 128)) : createCommentVNode("", true),
                              item.types.includes("Checkbox") ? (openBlock(true), createBlock(Fragment, { key: 2 }, renderList(item.choices, (checkbox, index2) => {
                                return openBlock(), createBlock("div", {
                                  class: "px-5",
                                  key: index2
                                }, [
                                  createVNode("div", { class: "flex items-center mb-2" }, [
                                    createVNode("span", { class: "select-none" }, "▢"),
                                    withDirectives(createVNode("input", {
                                      type: "text",
                                      "onUpdate:modelValue": ($event) => checkbox.pilih = $event,
                                      name: "checkbox-" + item.id,
                                      id: "checkbox" + (index2 + 1) + "-q" + item.id,
                                      placeholder: "Insert multiple choice here",
                                      class: "text-sm mx-4 rounded-md block w-1/4"
                                    }, null, 8, ["onUpdate:modelValue", "name", "id"]), [
                                      [vModelText, checkbox.pilih]
                                    ]),
                                    (openBlock(), createBlock("svg", {
                                      xmlns: "http://www.w3.org/2000/svg",
                                      fill: "none",
                                      viewBox: "0 0 24 24",
                                      "stroke-width": "1.5",
                                      stroke: "currentColor",
                                      class: "size-6 text-red-600 cursor-pointer",
                                      onClick: ($event) => deleteCheckbox(item, index2)
                                    }, [
                                      createVNode("path", {
                                        "stroke-linecap": "round",
                                        "stroke-linejoin": "round",
                                        d: "M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                      })
                                    ], 8, ["onClick"]))
                                  ]),
                                  index2 === item.choices.length - 1 && item.choices.length < MAX_RADIO_CHOICES ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "ml-7"
                                  }, [
                                    createVNode("a", {
                                      class: "w-1/4 flex justify-center py-2.5 my-0 text-white !bg-primary rounded-md text-sm hover:!bg-transparent hover:text-primary hover:outline hover:outline-primary transition hover:duration-200 cursor-pointer",
                                      onClick: ($event) => AddCheckboxOption(item)
                                    }, " Add Options ", 8, ["onClick"])
                                  ])) : createCommentVNode("", true)
                                ]);
                              }), 128)) : createCommentVNode("", true)
                            ]);
                          }), 128))
                        ]),
                        _: 2
                      }, 1032, ["modelValue", "onUpdate:modelValue"]),
                      pages.value.length > 1 && page_index != pages.value.length - 1 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "border border-gray-500 mt-8 mb-3"
                      })) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Client/Projects/Surveys/AddQuestions.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AddQuestions = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8999ed3b"]]);
export {
  AddQuestions as default
};
