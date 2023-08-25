const { isEmptyStr } = require("./index");

describe("Utils", () => {
  test("returns true for empty string", () => {
    expect(isEmptyStr()).toBe(true);
    expect(isEmptyStr("")).toBe(true);
  });
});
