/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getHouse, updateHouse } from "../services/api/house";
import { Button, Form, Input, InputNumber, Spin, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { House } from "../services/types";


export default function HousePage() {
  /** Hooks */
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  /** States */
  const [formValues, setFormValues] = useState<any>();
  const [formDisabled, setFormDisabled] = useState<boolean>(true);

  /** TnStack Query */
  const { isLoading, data } = useQuery({
    queryKey: ["GetHouse", id],
    queryFn: async () => (id ? await getHouse(+id) : navigate("/")),
  });

  const setUpdateHouse: any = useMutation({
    mutationFn: async (updatedHouse: House) => {
      return await updateHouse({ id: formValues.id, ...updatedHouse });
    },
    onSuccess(res: any) {
      console.log("res:", res);
      if (res?.success) {
        console.log("success");
        setFormValues(res.data);
        message.success(res.msg);
      } else {
        console.log("fail");
        message.error(res.msg);
      }
    },
  });

  /** Methods */
  const onFinish = (values: House) => {
    if (form.isFieldsTouched()) {
      setUpdateHouse.mutate(values);
    }

    setFormDisabled(!formDisabled);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (data) {
      setFormValues(data.data);
    }
  }, [data]);

  if (isLoading) {
    return <Spin size="large" />;
  }

  return (
    <>
      {formValues ? (
        <div className="container">
          <div className="head-line">
            <h3>House's Details</h3>
            <Form // prettier-ignore
              form={form}
              name="house-details"
              initialValues={{
                remember: true,
                ...formValues,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              labelCol={{ span: 6 }}
              wrapperCol={{span: 12}}
              labelAlign="left"
             
              disabled={formDisabled}
              validateTrigger="onSubmit"
            >
              <Form.Item label="ID Number">
                <p>{formValues?.id}</p>
              </Form.Item>
              <Form.Item
                label="Address"
                name="address"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Current Value"
                name="currentValue"
                rules={[{ required: true }]}
              >
                <InputNumber
                  formatter={(value: any) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value: any) => value?.replace(/\$\s?|(,*)/g, "")}
                />
              </Form.Item>
              <Form.Item
                label="Loan Amount"
                name="loanAmount"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <InputNumber
                  formatter={(value: any) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value: any) => value?.replace(/\$\s?|(,*)/g, "")}
                  max={formValues?.currentValue}
                />
              </Form.Item>
              <Form.Item label="Risk">
                <p>{(formValues?.risk * 100).toFixed(2) + "%"}</p>
              </Form.Item>
              <Form.Item style={{ textAlign: "right" }} wrapperCol={{span: 26}}>
                {!formDisabled ? (
                  <Button type="primary" htmlType="submit">
                    Save changes
                  </Button>
                ) : (
                  <Button
                    type="link"
                    onClick={() => setFormDisabled(!formDisabled)}
                    disabled={false}
                  >
                    Edit
                    <EditOutlined />
                  </Button>
                )}
              </Form.Item>
            </Form>
          </div>
        </div>
      ) : (
        <Spin size="large" />
      )}
    </>
  );
}
