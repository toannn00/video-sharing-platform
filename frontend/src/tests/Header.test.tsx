import "@testing-library/jest-dom";
import ShallowRenderer from "react-test-renderer/shallow";
import Header from "../components/Header";

describe("Header", () => {
  test("should render and match the snapshot", () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(<Header />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
