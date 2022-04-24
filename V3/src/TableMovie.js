import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Table } from "antd";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { arrayMoveImmutable } from "array-move";
// import { ReactDragListView } from 'react-drag-listview';

const DragHandle = SortableHandle(() => (
  <AiOutlineMenuUnfold style={{ cursor: "grab", color: "#999" }} />
));

const TableMovie = ({moviesFull}) => {

  // const [moviesData, setmoviesData] = useState(moviesFull);

  const columns = [
    {
      title: "Drag",
      dataIndex: "key",
      key: "key",
      className: "drag-visible",
      render: () => <DragHandle />,
    },
    {
      title: "index",
      dataIndex: "index",
      key: "index",
      className: "drag-visible",
    },
    {
      title: "name",
      dataIndex: "name",
      key: "name",
      className: "drag-visible",
    },
    {
      title: "rate",
      dataIndex: "rate",
      key: "rate",
      className: "drag-visible",
    },
    {
      title: "vote",
      dataIndex: "vote",
      key: "vote",
      className: "drag-visible",
    },
  ];

  const MovieData = moviesFull.map((data) => {
    return {
      drag: data.id,
      index: data.id,
      name: data.original_title,
      rate: data.vote_average,
      vote: data.vote_count,
    };
  });
  console.log("table", moviesFull);

  const [moviesData, setmoviesData] = useState(MovieData);
  
  useEffect(() => {
    setmoviesData(MovieData);
  }, []);

  const SortableItem = SortableElement((props) => <tr {...props} />);
  const SortableBody = SortableContainer((props) => <tbody {...props} />);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    
    console.log("oldIndex", oldIndex);
    console.log("newIndex", newIndex);

    setmoviesData(MovieData);
    if (oldIndex !== newIndex) {
      const newData = arrayMoveImmutable([].concat(moviesData),oldIndex, newIndex).filter((element) => !!element);
      console.log("Sorted items: ", newData);
     
      setmoviesData(newData);
      console.log(" New ",newData);
    }
    
  };

  const DraggableContainer = props => (
    <SortableBody
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={onSortEnd}
      {...props}
    />
  );

  const DraggableBodyRow = ({ ...restProps }) => {

    const index = moviesData.findIndex(x => x.index === restProps['data-row-key']);
    return <SortableItem index={index} {...restProps} />;
  };

  // const dragProps = {
  //   onDragEnd(fromIndex, lastindex){
  //     const data = [ ...moviesData]
  //     const item = data.splice(fromIndex, 1)[0];
  //     data.splice(lastindex, 0, item)
  //     setmoviesData(data)
  //   },
  //   handleSelector: "DragHandle"
  // }


  return (
    <div>
      {/* <h1>TableMovie</h1> */}
      {/* <ReactDragListView {...dragProps}> */}
      <Table
        dataSource={moviesData}
        pagination={false}
        style={{ color: "white" }}
        columns={columns}
        rowKey="index"
        components={{
          body: {
            wrapper: DraggableContainer,
            row: DraggableBodyRow,
          },
        }}
      ></Table>
      {/* </ReactDragListView> */}
    </div>
  );
};

export default TableMovie;