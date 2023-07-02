/**
 * @param {string} text
 * @returns {boolean} if input is valid
 */
import { checkUrl } from "../src/client/js/isValidUrl";

describe("Testing valid url", () => {
  test("test url", () => {
    expect(checkUrl).toBeDefined();
  });
});
