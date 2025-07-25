import { CalendarOutlined } from "@ant-design/icons";
import { DatePicker, Dropdown, Space, Tooltip } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import { forwardRef, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import DropDownItem from "./_modules/DropDownItem";

const { RangePicker } = DatePicker;

const Picker = {
  Date: "date",
  Month: "month",
  Year: "year",
};

const DATE_FIELD = "date-field";
const DATE_FIELDD = "date-fielddd";
const MONTH_FIELD = "month-field";
const YEAR_FIELD = "year-field";
const YTD_FIELD = "yesterday-field";
const DAY_FIELD = "1day-field";
const WEEK_FIELD = "1week-field";
const DAY30_FIELD = "30d-field";

const today = moment().format("YYYY-MM-DD");
const yesterday = moment().subtract(1, "day").format("YYYY-MM-DD");
const dateSevenDayAgo = moment().subtract(7, "day").format("YYYY-MM-DD");
const dateThirtyDayAgo = moment().subtract(30, "day").format("YYYY-MM-DD");

const Wrapper = styled.div`
  ${tw`inline-block`}
`;

const Trigger = styled.span`
  ${tw`flex items-center gap-3 rounded border border-transparent bg-white px-3 py-1 text-sm text-black`}
  &:hover {
    border-color: #3b82f6;
    color: #3b82f6;
  }
`;

const ClickableText = styled.span`
  ${tw`cursor-pointer pr-2 border-r border-gray-300 capitalize`}
  &:hover {
    text-decoration: underline;
  }
`;

const StaticText = styled.span`
  ${tw`cursor-default`}
`;

const TruncatedText = styled.span`
  ${tw`w-40 overflow-hidden text-ellipsis whitespace-nowrap cursor-default`}
`;

const DatePickerCard = ({ onDateChange, initialDate }) => {
  const [datePickerType, setDatePickerType] = useState(Picker.Date);
  const [picked, setPicked] = useState(initialDate);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [hoveredDate, setHoveredDate] = useState(null);

  const dropdownRef = useRef(null);

  const generateUniqueId = (prefix) =>
    `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

  useEffect(() => {
    setPicked(initialDate);
  }, [initialDate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
        setOpenCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePickerDate = (dates) => {
    if (dates && dates[0] && dates[1]) {
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
    }
  };

  const onChange = (dates, dateStrings) => {
    handlePickerDate(dates);
  };

  const handlePickerType = (type) => {
    setDatePickerType(type);
    setOpenCalendar(true);
  };

  const CustomInput = forwardRef((props, ref) => (
    <input
      ref={ref}
      className="fixed cursor-default opacity-0"
      {...props}
      id={generateUniqueId(DATE_FIELDD)}
    />
  ));

  CustomInput.displayName = "CustomInput";

  const renderDateRange = (date) => {
    switch (date.type) {
      case "single":
        return date.date === today ? "Hôm nay" : date.date;
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
      case "single":
        return dayjs(picked.date);
      case "range":
        return dayjs(picked.start);
      case "monthly":
        return dayjs(`${picked.year}-${picked.month}`, "YYYY-M");
      case "yearly":
        return dayjs(picked.year.toString(), "YYYY");
      default:
        console.error("Invalid date input type");
        return null;
    }
  };

  const items = [
    {
      label: (
        <Space direction="vertical" className="border-r p-4">
          <div>
            <DropDownItem
              labelId={generateUniqueId(DAY_FIELD)}
              title="Hôm nay"
              handleClick={() => {
                const todayDate = { type: "single", date: today };
                setPicked(todayDate);
                onDateChange(todayDate);
                setOpenDropdown(false);
              }}
              onMouseEnter={() => setHoveredDate(today)}
              onMouseLeave={() => setHoveredDate(null)}
            />
            <DropDownItem
              labelId={generateUniqueId(YTD_FIELD)}
              title="Hôm qua"
              handleClick={() => {
                const yesterdayDate = { type: "single", date: yesterday };
                setPicked(yesterdayDate);
                onDateChange(yesterdayDate);
                setOpenDropdown(false);
              }}
              onMouseEnter={() => setHoveredDate(yesterday)}
              onMouseLeave={() => setHoveredDate(null)}
            />
            <DropDownItem
              labelId={generateUniqueId(WEEK_FIELD)}
              title="7 ngày trước"
              handleClick={() => {
                const sevenDaysRange = {
                  type: "range",
                  start: dateSevenDayAgo,
                  end: today,
                };
                setPicked(sevenDaysRange);
                onDateChange(sevenDaysRange);
                setOpenDropdown(false);
              }}
              onMouseEnter={() =>
                setHoveredDate(`${dateSevenDayAgo} - ${today}`)
              }
              onMouseLeave={() => setHoveredDate(null)}
            />
            <DropDownItem
              labelId={generateUniqueId(DAY30_FIELD)}
              title="30 ngày trước"
              handleClick={() => {
                const thirtyDaysRange = {
                  type: "range",
                  start: dateThirtyDayAgo,
                  end: today,
                };
                setPicked(thirtyDaysRange);
                onDateChange(thirtyDaysRange);
                setOpenDropdown(false);
              }}
              onMouseEnter={() =>
                setHoveredDate(`${dateThirtyDayAgo} - ${today}`)
              }
              onMouseLeave={() => setHoveredDate(null)}
            />
          </div>
          <hr />
          <div>
            <DropDownItem
              labelId={generateUniqueId(DATE_FIELD)}
              title="Khoảng thời gian theo ngày"
              handleClick={() => {
                handlePickerType(Picker.Date);
                setOpenDropdown(false);
              }}
            />
            <DropDownItem
              labelId={generateUniqueId(MONTH_FIELD)}
              title="Không thời gian theo tháng"
              handleClick={() => {
                handlePickerType(Picker.Month);
                setOpenDropdown(false);
              }}
            />
            <DropDownItem
              labelId={generateUniqueId(YEAR_FIELD)}
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
    <Dropdown open={openDropdown} menu={{ items }} trigger={["click"]}>
      <Wrapper>
        <Trigger>
          <ClickableText onClick={() => setOpenDropdown(!openDropdown)}>
            Khoảng thời gian
          </ClickableText>
          <StaticText>Từ:</StaticText>
          <Tooltip title={hoveredDate || renderDateRange(picked)}>
            <TruncatedText>
              {hoveredDate || renderDateRange(picked)}
            </TruncatedText>
          </Tooltip>
          <span>
            {datePickerType === Picker.Date ? (
              <RangePicker
                open={openCalendar}
                disabledDate={(current) =>
                  current && current > dayjs().endOf("day")
                }
                inputReadOnly
                allowClear={false}
                className="cursor-default border border-transparent focus:border-transparent"
                components={{ input: CustomInput }}
                suffixIcon={<CalendarOutlined />}
                placement="bottomLeft"
                onChange={(dates, dateStrings) => {
                  if (dates) {
                    onChange(dates, dateStrings);
                    setOpenCalendar(false);
                  }
                }}
                onOpenChange={(open) => {
                  if (!open) {
                    setOpenCalendar(false);
                  }
                }}
                popupClassName="absolute pt-3"
                value={
                  picked.type === "range"
                    ? [dayjs(picked.start), dayjs(picked.end)]
                    : null
                }
              />
            ) : (
              <DatePicker
                open={openCalendar}
                disabledDate={(current) =>
                  current && current > dayjs().endOf("day")
                }
                picker={datePickerType}
                inputReadOnly
                allowClear={false}
                className="cursor-default border border-transparent focus:border-transparent"
                components={{ input: CustomInput }}
                suffixIcon={<CalendarOutlined />}
                placement="bottomLeft"
                onChange={(date) =>
                  onChange(
                    [date, date],
                    [
                      date?.format("YYYY-MM-DD") || "",
                      date?.format("YYYY-MM-DD") || "",
                    ]
                  )
                }
                onOpenChange={(open) => {
                  if (!open) {
                    setOpenCalendar(false);
                  }
                }}
                popupClassName="absolute pt-3"
                value={getDatePickerValue()}
              />
            )}
          </span>
        </Trigger>
      </Wrapper>
    </Dropdown>
  );
};

export default DatePickerCard;
