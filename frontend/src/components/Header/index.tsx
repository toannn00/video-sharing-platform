import { Row, Col, Divider } from "antd";
import { Login } from "../Login";
import { Link } from "react-router-dom";
import { LogoIcon } from "../LogoIcon";
import { useMediaQuery } from "react-responsive";

export const Header = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <>
      <Row
        align="middle"
        gutter={[0, isMobile ? 16 : 0]}
        style={{
          padding: isMobile ? "16px" : "16px 0",
          flexDirection: isMobile ? "column" : "row",
        }}
      >
        <Col
          xs={24}
          md={{ span: 9, offset: 3 }}
          style={{
            display: "flex",
            justifyContent: isMobile ? "center" : "flex-start",
          }}
        >
          <Link to="/">
            <div style={{ display: "flex" }}>
              <LogoIcon />
            </div>
          </Link>
        </Col>
        <Col
          xs={24}
          md={{ span: 9, offset: 1 }}
          style={{
            display: "flex",
            justifyContent: isMobile ? "center" : "flex-start",
          }}
        >
          <Login />
        </Col>
      </Row>
      <Divider style={{ margin: isMobile ? "0" : "5px 0 0 0" }} />
    </>
  );
};

export default Header;
