import { useEffect } from "react";
import { Form, Col, Row, message, Select, Button, Card } from "antd";
import { API_METHODS, BIKES } from "../constants";
import useApi from "../hooks/useApi";

function AssembleBike() {
  const [response, request] = useApi("/employee/task", null, API_METHODS.POST);
  const [form] = Form.useForm();
  const onFinish = (values) => {
    request(values, API_METHODS.POST);
  };

  useEffect(() => {
    if (response.isLoading != true && response?.data) {
      form.resetFields();
      message.success("Bike selected for assembly successfully.");
    }
  }, [response]);

  return (
    <Card title="Assemble">
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="bike_id"
              label="Bike"
              rules={[{ required: true, message: "Bike is required." }]}
            >
              <Select
                placeholder="Select Bike"
                allowClear
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {BIKES.map((option) => (
                  <Select.Option key={option.id} value={option.id}>
                    {option.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ float: "right" }}>
              Submit
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </Card>
  );
}

export default AssembleBike;
