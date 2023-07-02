import { handleSubmit } from "../src/client/js/formHandler";

describe("Testing handle submit", () => {
  test("test submit", () => {
    expect(handleSubmit).toBeDefined();
  });
});
