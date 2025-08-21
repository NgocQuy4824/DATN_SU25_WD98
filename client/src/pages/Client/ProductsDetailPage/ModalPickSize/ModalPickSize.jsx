/** @jsxImportSource @emotion/react */
import tw from "twin.macro";
import { Modal, Table } from "antd";

const ModalPickSize = ({ isModalOpen, setIsModalOpen }) => {
  const columns = [
    { title: "Size (VN)", dataIndex: "sizeEU", key: "sizeEU", align: "center" },
    { title: "Size (US)", dataIndex: "sizeUS", key: "sizeUS", align: "center" },
    {
      title: "Chiều dài bàn chân (cm)",
      dataIndex: "footLength",
      key: "footLength",
      align: "center",
    },
  ];

  const sizeChartData = [
    { key: "1", sizeEU: "38", sizeUS: "6", footLength: "24.0" },
    { key: "2", sizeEU: "39", sizeUS: "7", footLength: "24.5" },
    { key: "3", sizeEU: "40", sizeUS: "7.5", footLength: "25.0" },
    { key: "4", sizeEU: "41", sizeUS: "8", footLength: "25.5" },
    { key: "5", sizeEU: "42", sizeUS: "8.5", footLength: "26.0" },
    { key: "6", sizeEU: "43", sizeUS: "9", footLength: "26.5" },
    { key: "7", sizeEU: "44", sizeUS: "10", footLength: "27.0" },
    { key: "8", sizeEU: "45", sizeUS: "11", footLength: "27.5" },
  ];

  return (
    <Modal
      title={<div css={tw`text-lg font-bold`}>Bảng hướng dẫn chọn size giày</div>}
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
      width={500} // bảng nhỏ lại
    >
      <Table
        dataSource={sizeChartData}
        columns={columns}
        pagination={false}
        bordered
        size="small" // thu gọn bảng
      />
      <div css={tw`mt-4 text-sm text-red-500 space-y-2`}>
        <p>* Bảng size chỉ mang tính chất tham khảo, có thể sai lệch 0.5cm</p>
        <p>* Khi đo bàn chân, nên đo vào buổi chiều/tối để kết quả chính xác hơn</p>
        <p>* Nếu phân vân giữa 2 size, hãy chọn size lớn hơn để thoải mái hơn</p>
      </div>
    </Modal>
  );
};

export default ModalPickSize;
