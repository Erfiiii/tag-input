import { describe, it, expect, beforeAll } from "vitest";

import { mount } from "@vue/test-utils";
import TagInput from "../TagInput.vue";
import { initServer } from "../../server";

describe("TagInput", () => {
  beforeAll(() => {
    initServer();
  });
  it("should not show suggestions when input is not focused", async () => {
    const wrapper = mount(TagInput, { props: {} });
    expect(wrapper.get(".list").isVisible()).toBe(false);
  });

  it("should add new tag hitting enter", async () => {
    const wrapper = mount(TagInput, { props: {} });
    const input = wrapper.find(".input");
    await input.setValue("Sample Value");
    await input.trigger("keyup", {
      key: "enter",
    });
    expect(wrapper.text()).toContain("Sample Value");
  });

  it("should close suggestion list when hit esc", async () => {
    const wrapper = mount(TagInput, { props: {} });
    const input = wrapper.find(".input");
    await input.setValue("Sample Value");
    await input.trigger("keyup", {
      key: "esc",
    });
    expect(wrapper.get(".list").isVisible()).toBe(false);
  });
});
