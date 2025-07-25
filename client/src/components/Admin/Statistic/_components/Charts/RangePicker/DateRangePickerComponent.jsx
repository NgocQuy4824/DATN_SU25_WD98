import { DatePicker } from 'antd';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;



const DateRangePickerComponent = ({ onDateRangeChange, value }) => {
    const disabledDate = (current) => {
        return current && current > dayjs().endOf('day');
    };

    return (
        <RangePicker
            disabledDate={disabledDate}
            format='DD-MM-YYYY'
            onChange={onDateRangeChange}
            value={value}
        />
    );
};

export default DateRangePickerComponent;
