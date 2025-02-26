import React, { forwardRef } from "react";
import { Rule } from "antd/es/form";
import _array from "@/untils/_array";
import { Button, Form, Input, InputNumber, Radio, Select } from "antd";

export interface FieldProps {
  name: string;
  type: string;
  disable?: boolean;
  label: string;
  placeholder?: string;
  options?: {
    title: string;
    value: any;
  }[];
  style?: React.CSSProperties;
  rules?: Rule[];
  autoFill?: string;
  onChange?: (name: string, value: any) => void;
}

interface FormCProps {
  onSubmit?: (data: any) => void;
  onFail?: (errors: any) => void;
  fields: FieldProps[];
  chunkSize: number;
  initData?: any;
}

const FormC = forwardRef<HTMLButtonElement, FormCProps>(
  ({ onSubmit, fields, chunkSize, initData }, ref) => {
    const FieldChunks = _array.chunks(fields, chunkSize);

    const handleSubmit = (data: any) => {
      onSubmit?.(data);
    };

    return (
      <div>
        <Form
          layout="vertical"
          initialValues={initData}
          onFinish={handleSubmit}
        >
          {FieldChunks.map((fields, index) => {
            return (
              <div className="row" key={index}>
                {fields?.map((field, index) => {
                  const type = field.type;
                  const rules = field.rules;
                  const placeholder = field.placeholder;
                  return (
                    <div key={index} className={`col-md-${12 / fields.length}`}>
                      <Form.Item
                        rules={rules || []}
                        name={field.name}
                        label={field.label}
                      >
                        {type == "input" && (
                          <Input
                            onChange={(e) => {
                              field?.onChange?.(field.name, e.target.value);
                            }}
                            disabled={field?.disable}
                            placeholder={placeholder}
                          />
                        )}
                        {type == "number" && (
                          <InputNumber
                            onChange={(value) => {
                              field?.onChange?.(field.name, value);
                            }}
                            disabled={field?.disable}
                            placeholder={placeholder}
                          />
                        )}
                        {type == "select" && (
                          <Select
                            filterOption={(input, option) =>
                              (typeof option?.children === "string"
                                ? (option.children as string).toLowerCase()
                                : ""
                              ).includes(input.toLowerCase())
                            }
                            showSearch
                            disabled={field?.disable}
                            onChange={(value) => {
                              field?.onChange?.(field.name, value);
                            }}
                          >
                            {field?.options.map(
                              (option: any, index: number) => (
                                <Select.Option key={index} value={option.value}>
                                  {option.title}
                                </Select.Option>
                              )
                            )}
                          </Select>
                        )}
                        {type == "radio" && (
                          <Radio.Group
                            disabled={field?.disable}
                            onChange={(e) => {
                              field?.onChange?.(field.name, e.target.value);
                            }}
                          >
                            {field.options.map((option: any, index: number) => (
                              <Radio key={index} value={option.value}>
                                {option.title}
                              </Radio>
                            ))}
                          </Radio.Group>
                        )}
                      </Form.Item>
                    </div>
                  );
                })}
              </div>
            );
          })}
          {/* button submit*/}
          <Button className="hidden" ref={ref} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
);

export default FormC;
