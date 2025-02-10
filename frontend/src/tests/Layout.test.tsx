import "@testing-library/jest-dom";
import ShallowRenderer from "react-test-renderer/shallow";
import { Layout } from "../components/Layout";

describe("Layout", () => {
  test("should render and match the snapshot", () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(<Layout>Test Content</Layout>);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
  });
});
