import { Button, Card, Col, Form, Input, Row } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_METHODS } from "../constants";
import { isEmpty } from "../generalFunctions";
import useApi from "../hooks/useApi";

function Login() {
  const [response, request] = useApi("/login", null, API_METHODS.POST);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const LoginClicked = () => {
    form.validateFields().then((values) => {
      request(values, API_METHODS.POST, `/login`);
    });
  };

  useEffect(() => {
    if (!isEmpty(response) && !isEmpty(response.data) && !response.isLoading) {
      if (response.data.authToken) {
        localStorage.setItem("authToken", response.data.authToken);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        if (response.data.user.role === "admin") {
          navigate("/portal/dashboard");
        } else {
          navigate("/portal/assemble-bike");
        }
      }
    }
  }, [response]);
  useEffect(() => {
    let authToken = localStorage.getItem("authToken");
    let user = JSON.parse(localStorage.getItem("user"));
    if (authToken) {
      if (user.role === "admin") {
        navigate("/portal/dashboard");
      } else {
        navigate("/portal/assemble-bike");
      }
    }
  }, []);
  return (
    <>
      {/* {!isEmpty(response) ? ( */}
      <Row
        type="flex"
        justify="center"
        align="middle"
        style={{ minHeight: "100vh" }}
      >
        <Col xs={20} sm={16} md={12} lg={10} xl={8}>
          <Card title={"Login"}>
            <Form layout="vertical" onFinish={LoginClicked} form={form}>
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                  { max: 20 },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                  { max: 15 },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ float: "right" }}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
      {/* // ) : (
      //   <ServerDownResult />
      // )
      
      } */}
    </>
  );
}

export default Login;
