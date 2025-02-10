import { Row, Col, Divider } from "antd";
import { Login } from "../Login";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <>
      <Row align="middle">
        <Col span={9} offset={3}>
          <Link to="/">
            <div style={{ display: "flex" }}>
              <h1>Video App</h1>
            </div>
          </Link>
        </Col>
        <Col span={9} offset={1}>
          <Login />
        </Col>
      </Row>
      <Divider style={{ marginTop: 5 }} />
    </>
  );
};

export default Header;
