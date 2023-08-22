import { validateInt } from "./utils";

test("int", () => {
  expect(validateInt(4, "name")).toBeNull();
});

test("null", () => {
  expect(validateInt(null, "value1")).toStrictEqual(
    new Error('value1 "null" is not an integer')
  );
});

test("string", () => {
  expect(validateInt("nonsense", "value2")).toStrictEqual(
    new Error('value2 "nonsense" is not an integer')
  );
});
