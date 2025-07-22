import { Form, Select } from "antd";
import styled from "styled-components";
import tw from "twin.macro";

const StyledSelect = styled(Select)`
  .ant-select-item-option-content {
    ${tw`whitespace-nowrap overflow-hidden text-ellipsis max-w-[300px]`}
  }
  .ant-select-selection-item {
    ${tw`whitespace-nowrap overflow-hidden text-ellipsis max-w-[85%]`}
  }
`;

const { Option } = Select;

export const AddressSelect = ({
  name,
  label,
  placeholder,
  options,
  disabled,
  onChange,
}) => {
  return (
    <Form.Item
      name={name}
      label={label}
      rules={[{ required: true, message: "" }]}
    >
      <StyledSelect
        showSearch
        placeholder={placeholder}
        optionFilterProp="children"
        allowClear
        disabled={disabled}
        onChange={(value, option) => {
          onChange?.({ name: value, id: option?.key });
        }}
        filterOption={(input, option) =>
          option?.children
            ?.toString()
            .toLowerCase()
            .includes(input.toLowerCase())
        }
      >
        {options?.map((item) => (
          <Option key={item._id} value={item.name}>
            {item.name}
          </Option>
        ))}
      </StyledSelect>
    </Form.Item>
  );
};
