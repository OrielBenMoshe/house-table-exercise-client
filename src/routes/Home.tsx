/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Form, Input, InputNumber, Modal, Spin } from "antd";
import { useState } from "react";
import { createHouse } from "../services/api/house";
import { useMutation } from "@tanstack/react-query";
import { CheckCircleFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { House } from "../services/types";

export interface IHomeProps {}

export default function Home(props: IHomeProps) {
  const [form] = Form.useForm();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [message, setMessage] = useState<string>();
  const [houseId, setHouseId] = useState();
  const [currentValue, setCurrentValue] = useState<number>(0);

  const { isLoading, mutate } = useMutation({
    mutationFn: (newHouse: House) => {
      return createHouse(newHouse);
    },
    onSuccess(res) {
      console.log("res:", res);
      if (res?.success) {
        console.log("success");
        setHouseId(res.data.id);
        setMessage(res.msg);
      } else {
        console.log("fail");
        setMessage(res.response.data.msg);
      }
      setOpenModal(true);
    },
  });

  const onFinish = (values: House) => {
    console.log(values);
    mutate(values);
  };

  return (
    <div className="container">
      <div className="head-line">
        <h3>
          Mini version of the home appraisal system <br /> which includes a risk
          calculation model for potential loans.
        </h3>
      </div>
      <Form
        form={form}
        name="house-new"
        onFinish={onFinish}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        labelAlign="left"
      >
        <Form.Item
          label="Address"
          name="address"
          rules={[
            {
              required: true,
              type: "string",
              message: "Please enter an address",
            },
          ]}
        >
          <Input type="string" />
        </Form.Item>
        <Form.Item
          label="Current Value"
          name="currentValue"
          rules={[
            {
              required: true,
              message: "Please enter an value",
            },
          ]}
        >
          <InputNumber
            formatter={(value: any) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value: any) => value?.replace(/\$\s?|(,*)/g, "")}
            onChange={(value) => setCurrentValue(value)}
          />
        </Form.Item>
        <Form.Item
          label="Loan Amount"
          name="loanAmount"
          rules={[
            {
              required: true,
              message: "Please enter an amount",
            },
          ]}
        >
          <InputNumber
            formatter={(value: any) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value: any) => value?.replace(/\$\s?|(,*)/g, "")}
            max={currentValue}
          />
        </Form.Item>
        <Form.Item style={{ textAlign: "right" }} wrapperCol={{ span: 24 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Modal
        title={
          <>
            <CheckCircleFilled style={{ color: "#1677ff" }} />
            <div>{message}</div>
          </>
        }
        open={openModal}
        centered={true}
        okText={"Show house details"}
        cancelText={"close"}
        onCancel={() => setOpenModal(false)}
        okButtonProps={{ style: { display: "none" } }}
      >
        <p>
          {`To get to the house details page ID number ${houseId}, `}
          <Link to={`house/${houseId}`}>Click here →</Link>
        </p>
      </Modal>
    </div>
  );
}
