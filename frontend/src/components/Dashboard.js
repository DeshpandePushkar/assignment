import { useEffect, useState } from "react";
import {
  Form,
  Col,
  Row,
  message,
  Select,
  Button,
  Card,
  Space,
  DatePicker,
} from "antd";
import { API_METHODS, BLANK_VALUE } from "../constants";
import useApi from "../hooks/useApi";
import { disableFutureDates, isEmpty } from "../generalFunctions";
import dayjs from "dayjs";
import BarChart from "./BarChart";

function Dashboard() {
  const [getEmployeeResponse, getEmployeeRequest] = useApi(
    "/admin/dashboard/employees",
    null,
    API_METHODS.GET
  );
  const [getEmployeeProductionResponse, getEmployeeProductionRequest] = useApi(
    "/admin/dashboard/employee-prod",
    null,
    API_METHODS.GET
  );
  const [getNumberOfBikesAssembledResponse, getNumberOfBikesAssembledRequest] =
    useApi("/admin/dashboard/number-of-bikes", null, API_METHODS.GET);

  const [employees, setEmployees] = useState();
  const [numberOfBikesAssembledData, setNumberOfBikesAssembledData] =
    useState(null);
  const [employeeProdData, setEmployeeProdData] = useState(null);
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  useEffect(() => {
    getEmployeeRequest();
  }, []);

  useEffect(() => {
    const data =
      getEmployeeResponse.data !== BLANK_VALUE ? getEmployeeResponse.data : [];
    setEmployees(data);
  }, [getEmployeeResponse]);

  const getEmployeeReport = () => {
    form
      .validateFields()
      .then((values) => {
        let date = dayjs(values.date).format("YYYY-MM-DD");

        getEmployeeProductionRequest(
          null,
          API_METHODS.GET,
          `/admin/dashboard/employee-prod?date=${date}`
        );
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (
      !isEmpty(getEmployeeProductionResponse.data) &&
      !getEmployeeProductionResponse.isLoading
    ) {
      if (getEmployeeProductionResponse.data.length > 0) {
        setEmployeeProdData(getEmployeeProductionResponse.data);
      } else {
        setEmployeeProdData(null);
      }
    }
  }, [getEmployeeProductionResponse]);

  const getAssemblyReport = () => {
    form1
      .validateFields()
      .then((values) => {
        getNumberOfBikesAssembledRequest(
          null,
          API_METHODS.GET,
          `/admin/dashboard/number-of-bikes?from=${values.from}&to=${values.to}`
        );
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (
      !isEmpty(getNumberOfBikesAssembledResponse.data) &&
      !getNumberOfBikesAssembledResponse.isLoading
    ) {
      if (getNumberOfBikesAssembledResponse.data.length > 0) {
        setNumberOfBikesAssembledData(getNumberOfBikesAssembledResponse.data);
      } else {
        setNumberOfBikesAssembledData(null);
      }
    }
  }, [getNumberOfBikesAssembledResponse]);

  return (
    <div>
      <Card title="Employee production" style={{ margin: "10px" }}>
        <Form form={form}>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                name="date"
                label={<strong>For Date</strong>}
                rules={[{ required: true }]}
              >
                <DatePicker
                  allowClear
                  format={"DD-MM-YYYY"}
                  disabledDate={disableFutureDates}
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Space>
                <Button type="primary" onClick={getEmployeeReport}>
                  Search
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    form.resetFields();
                  }}
                >
                  Reset
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
        {employeeProdData && (
          <BarChart
            data={employeeProdData}
            xField="employee"
            yField="total_work"
            xTitle="Employee"
            yTitle="Work in Minutes"
            domain={[0, 500]}
          />
        )}
      </Card>
      <Card title="Bike Assembly">
        <Form form={form1}>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                name="from"
                label={<strong>From</strong>}
                rules={[{ required: true }]}
              >
                <DatePicker
                  showTime
                  format={"DD-MM-YYYY HH:mm:ss"}
                  allowClear
                  disabledDate={disableFutureDates}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="to"
                label={<strong>To</strong>}
                rules={[{ required: true }]}
              >
                <DatePicker
                  showTime
                  allowClear
                  format={"DD-MM-YYYY HH:mm:ss"}
                  disabledDate={disableFutureDates}
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Space>
                <Button type="primary" onClick={getAssemblyReport}>
                  Search
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    form1.resetFields();
                  }}
                >
                  Reset
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
        {numberOfBikesAssembledData && (
          <BarChart
            data={numberOfBikesAssembledData}
            xField="day"
            yField="number_of_bikes"
            xTitle="Day"
            yTitle="Number of Bikes"
            domain={[0, 25]}
          />
        )}
      </Card>
    </div>
  );
}

export default Dashboard;
