import React, { forwardRef, useEffect, useRef, useState } from "react";
import { DatePicker, Dropdown, Space, Tooltip } from "antd";
import dayjs from "dayjs";
import { CalendarOutlined } from "@ant-design/icons";
import DropDownItem from "./_modules/DropDownItem";
import styled from "styled-components";
import tw from "twin.macro";


const DATE_FIELD = "date-field";
const today = dayjs().format("YYYY-MM-DD");
const dateSevenDayAgo = dayjs().subtract(7, "day").format("YYYY-MM-DD");
const dateThirtyDayAgo = dayjs().subtract(30, "day").format("YYYY-MM-DD");

const { RangePicker } = DatePicker;

const Picker = {
  DateTime: "date",
  Month: "month",
  Year: "year",
};

const Wrapper = styled.div`
  ${tw`inline-block`}
`;
const PickerContainer = styled.span`
  ${tw`flex items-center gap-3 rounded-md border border-transparent bg-white p-3 py-1 text-sm text-black hover:border-blue-500 hover:text-blue-500`};
  font-family: Roboto, sans-serif;
`;
const Label = styled.span`
  ${tw`cursor-pointer border-e pe-2 capitalize hover:underline`}
`;
const StaticLabel = styled.span`
  ${tw`cursor-default`}
`;
const DateText = styled.span`
  ${tw`w-40 cursor-default truncate`}
`;
const StyledRangePicker = styled(RangePicker)`
  ${tw`cursor-default border border-transparent focus:border-transparent`}
`;

const DateRangePickerCard = ({ onDateChange, initialDate }) => {
  const [datePickerType, setDatePickerType] = useState(Picker.DateTime);
  const [picked, setPicked] = useState(initialDate);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [hoveredDate, setHoveredDate] = useState(null);
  const dropdownRef = useRef(null);

  const generateUniqueId = (prefix) =>
    `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  const dateRangeId = generateUniqueId("date-range-ee");
  const monthId = generateUniqueId("monthhhh");
  const yearId = generateUniqueId("yearhhh");
  const weekId = generateUniqueId("week1hhh");
  const monthLastID = generateUniqueId("monthLasthhhh");

  useEffect(() => setPicked(initialDate), [initialDate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
        setOpenCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePickerDate = (dates) => {
    setOpenCalendar(false);
    setOpenDropdown(false);
    let pickedValue;
    switch (datePickerType) {
      case Picker.Year:
        pickedValue = { type: "yearly", year: dates[0].year() };
        break;
      case Picker.Month:
        pickedValue = {
          type: "monthly",
          year: dates[0].year(),
          month: dates[0].month() + 1,
        };
        break;
      default:
        pickedValue = {
          type: "range",
          start: dates[0].format("YYYY-MM-DD"),
          end: dates[1].format("YYYY-MM-DD"),
        };
    }
    setPicked(pickedValue);
    onDateChange(pickedValue);
  };

  const onChange = (dates, dateStrings) => dates && handlePickerDate(dates);

  const handlePickerType = (type) => {
    setDatePickerType(type);
    setOpenCalendar(true);
  };

  const CustomInput = forwardRef((props, ref) => (
    <input
      ref={ref}
      className="fixed cursor-default opacity-0"
      {...props}
      id={generateUniqueId(DATE_FIELD)}
    />
  ));
  CustomInput.displayName = "CustomInput";

  const renderDateRange = (date) => {
    switch (date.type) {
      case "range":
        return `${date.start} - ${date.end}`;
      case "monthly":
        return `${date.year}-${String(date.month).padStart(2, "0")}`;
      case "yearly":
        return date.year.toString();
      default:
        return "Invalid date";
    }
  };

  const getDatePickerValue = () => {
    switch (picked.type) {
      case "range":
        return [dayjs(picked.start), dayjs(picked.end)];
      case "monthly": {
        const start = dayjs(`${picked.year}-${picked.month}`, "YYYY-M").startOf(
          "month"
        );
        return [start, start.endOf("month")];
      }
      case "yearly": {
        const yearStart = dayjs(picked.year.toString(), "YYYY").startOf("year");
        return [yearStart, yearStart.endOf("year")];
      }
      default:
        console.error("Invalid date input type");
        return null;
    }
  };

  const items = [
    {
      label: (
        <Space direction="vertical" className="border-r p-4">
          {/* <div>
            <DropDownItem
              labelId={weekId}
              title="7 ngày trước"
              handleClick={() => {
                const range = {
                  type: "range",
                  start: dateSevenDayAgo,
                  end: today,
                };
                setPicked(range);
                onDateChange(range);
                setOpenDropdown(false);
              }}
              onMouseEnter={() =>
                setHoveredDate(`${dateSevenDayAgo} - ${today}`)
              }
              onMouseLeave={() => setHoveredDate(null)}
            />
            <DropDownItem
              labelId={monthLastID}
              title="30 ngày trước"
              handleClick={() => {
                const range = {
                  type: "range",
                  start: dateThirtyDayAgo,
                  end: today,
                };
                setPicked(range);
                onDateChange(range);
                setOpenDropdown(false);
              }}
              onMouseEnter={() =>
                setHoveredDate(`${dateThirtyDayAgo} - ${today}`)
              }
              onMouseLeave={() => setHoveredDate(null)}
            />
          </div>
          <hr /> */}
          <div>
            <DropDownItem
              labelId={dateRangeId}
              title="Khoảng thời gian theo ngày"
              handleClick={() => {
                handlePickerType(Picker.DateTime);
                setOpenDropdown(false);
              }}
            />
            <DropDownItem
              labelId={monthId}
              title="Khoảng thời gian theo tháng"
              handleClick={() => {
                handlePickerType(Picker.Month);
                setOpenDropdown(false);
              }}
            />
            <DropDownItem
              labelId={yearId}
              title="Khoảng thời gian theo năm"
              handleClick={() => {
                handlePickerType(Picker.Year);
                setOpenDropdown(false);
              }}
            />
          </div>
        </Space>
      ),
      onClick: (e) => e.domEvent.stopPropagation(),
      key: "0",
    },
  ];

  return (
    <Dropdown open={openDropdown} menu={{ items }} trigger={["click"]} className="remove-bg">
      <Wrapper>
        <PickerContainer>
          <Label onClick={() => setOpenDropdown(!openDropdown)}>
            Khoảng thời gian
          </Label>
          <StaticLabel>Từ:</StaticLabel>
          <Tooltip title={hoveredDate || renderDateRange(picked)}>
            <DateText>{hoveredDate || renderDateRange(picked)}</DateText>
          </Tooltip>
          <StyledRangePicker
            open={openCalendar}
            disabledDate={(current) =>
              current && current > dayjs().endOf("day")
            }
            picker={datePickerType}
            inputReadOnly
            allowClear={false}
            components={{ input: CustomInput }}
            suffixIcon={<CalendarOutlined />}
            placement="bottomLeft"
            onChange={(dates, dateStrings) => {
              if (dates) {
                onChange(dates, dateStrings);
                setOpenCalendar(false);
              }
            }}
            onOpenChange={(open) => !open && setOpenCalendar(false)}
            popupClassName="absolute pt-3"
            value={getDatePickerValue()}
          />
        </PickerContainer>
      </Wrapper>
    </Dropdown>
  );
};

export default DateRangePickerCard;
