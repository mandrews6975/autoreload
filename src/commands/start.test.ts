import { start } from "./start";

test("invalid port", async () => {
  let actual: any;
  console.log = (message: any) => {
    actual = message;
  };

  start("nonsense", "", null);
  expect(actual).toBe('port "nonsense" is not an integer');
});

test("null debounce", async () => {
  let actual: any;
  console.log = (message: any) => {
    actual = message;
  };

  start(8080, "", null);
  expect(actual).toBe("debounce duration is null");
});

test("invalid debounce", async () => {
  let actual: any;
  console.log = (message: any) => {
    actual = message;
  };

  start(8080, "", { debounce: "nonsense" });
  expect(actual).toBe('debounce "nonsense" is not an integer');
});
