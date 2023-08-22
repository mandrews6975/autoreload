import { reload } from "./reload";

test("invalid port", async () => {
  let actual: any;
  console.log = (message: any) => {
    actual = message;
  };

  await reload("nonsense");
  expect(actual).toBe('port "nonsense" is not an integer');
});
