// components/ModalPickSize/ModalPickSize.jsx
import { Modal, Table } from "antd";

const ModalPickSize = ({ isModalOpen, setIsModalOpen }) => {
  const columns = [
    { title: "Size", dataIndex: "size", key: "size", align: "center" },
    { title: "Ngực (cm)", dataIndex: "chest", key: "chest", align: "center" },
    { title: "Eo (cm)", dataIndex: "waist", key: "waist", align: "center" },
    { title: "Hông (cm)", dataIndex: "hip", key: "hip", align: "center" },
    {
      title: "Chiều cao (cm)",
      dataIndex: "height",
      key: "height",
      align: "center",
    },
  ];

  const sizeChartData = [
    {
      key: "1",
      size: "S",
      chest: "88-92",
      waist: "73-77",
      hip: "88-92",
      height: "155-160",
    },
    {
      key: "2",
      size: "M",
      chest: "92-96",
      waist: "77-81",
      hip: "92-96",
      height: "160-165",
    },
    {
      key: "3",
      size: "L",
      chest: "96-100",
      waist: "81-85",
      hip: "96-100",
      height: "165-170",
    },
    {
      key: "4",
      size: "XL",
      chest: "100-104",
      waist: "85-89",
      hip: "100-104",
      height: "170-175",
    },
  ];

  return (
    <Modal
      title={<div className="text-lg font-bold">Bảng hướng dẫn chọn size</div>}
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
      width={800}
    >
      <Table
        dataSource={sizeChartData}
        columns={columns}
        pagination={false}
        bordered
      />
      <div className="mt-4 text-sm text-gray-600 space-y-2">
        <p>* Bảng size chỉ mang tính chất tham khảo, có thể sai lệch 1–2cm</p>
        <p>* Nếu phân vân giữa 2 size, nên chọn size lớn hơn để thoải mái</p>
      </div>
    </Modal>
  );
};

export default ModalPickSize;
