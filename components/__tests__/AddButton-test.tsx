import * as React from "react";
import renderer from "react-test-renderer";

import AddButton from "../addButton";

it(`renders correctly`, () => {
  const tree = renderer.create(<AddButton/>).toJSON();

  expect(tree).toMatchSnapshot();
});
