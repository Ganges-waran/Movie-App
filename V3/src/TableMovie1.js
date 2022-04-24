import React, { useState } from "react";
// import "antd/dist/antd.css";
import { Table } from "antd";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc";
const ReactDragListView = require('react-drag-listview');

const TableMovie1 = () => {

    const [moviesData, setmoviesData] = useState([
        {
            key: "1",
            name: "Boran",
            gender: "male",
            age: "12",
            address: "New York"
        },
        {
            key: "2",
            name: "JayChou",
            gender: "male",
            age: "38",
            address: "TaiWan"
        },
        {
            key: "3",
            name: "Lee",
            gender: "female",
            age: "22",
            address: "BeiJing"
        },
        {
            key: "4",
            name: "ChouTan",
            gender: "male",
            age: "31",
            address: "HangZhou"
        },
        {
            key: "5",
            name: "AiTing",
            gender: "female",
            age: "22",
            address: "Xi’An"
        }
]);

  const DragHandle = SortableHandle(() => (
    <AiOutlineMenuUnfold style={{ cursor: "grab", color: "#999" }} />
  ));

  const columns = [
    {
        title: "Key",
        dataIndex: "key"
    },
    {
        title: "Name",
        dataIndex: "name"
    },
    {
        title: "Gender",
        dataIndex: "gender"
    },
    {
        title: "Age",
        dataIndex: "age"
    },
    {
        title: "Address",
        dataIndex: "address"
    },
    {
        title: "Operates",
        key: "operate",
        render:() => <DragHandle />,
    }
  ];

  const dragProps = {
    onDragEnd(fromIndex, toIndex) {
        const data = [...moviesData];
        const item = data.splice(fromIndex, 1)[0];
        data.splice(toIndex, 0, item);
        setmoviesData(data)
    },
    handleSelector: {DragHandle},
};
  

//   const SortableItem = SortableElement((props) => <tr {...props} />);
//   const SortableBody = SortableContainer((props) => <tbody {...props} />);

  return (
    <div style={{ margin: 20 }}>
                <h2>Table row with dragging</h2>
                <ReactDragListView {...dragProps}>
                    <Table
                        columns={columns}
                        pagination={false}
                        dataSource={moviesData}
                    />
                </ReactDragListView>
            </div>
  );
};

export default TableMovie1;
