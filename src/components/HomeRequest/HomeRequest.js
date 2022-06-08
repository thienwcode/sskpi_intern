import React,{useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Breadcrumb, Input, Select, Spin, Table, Layout} from "antd";
import { SearchOutlined} from "@ant-design/icons";
import Header from "../Header/Header";
import style from "./HomeRequest.module.scss";
import axios from "axios";

const { Option } = Select;
const {Content} = Layout;


const options = [
  {
    value: "",
    label: "Tất cả",
  },
  {
    value: true,
    label: "Kích hoạt",
  },
  {
    value: false,
    label: "Chưa kích hoạt",
  },
];

const columns = [
  {
    title: "Tên đề xuất",
    dataIndex: "name",
  },
  {
    title: "Danh mục",
    dataIndex: "cate",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
  },
  {
    title: "Ngày tạo",
    dataIndex: "created",
  },
  {
    title: "Cập nhật lần cuối",
    dataIndex: "updated",
  },
];

function HomeRequest() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [data, setData] = useState([]);
  const [cateData, setCateData] = useState([]);
  const [condition, setCondition] = useState({});
  // const [initialData, setInitialData] = useState([]);
  const [load, setLoad] = useState(false);

  // const start = () => {
  //     setLoading(true);

  //     setTimeout(() => {
  //         setSelectedRowKeys([]);
  //         setLoading(false);
  //     }, 500);
  // };

  const onSelectChange = (newSelectedRowKeys) => {
    // console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length;

  let api =
    "https://5n725p3wkl.execute-api.ap-southeast-1.amazonaws.com/test/templates?page=1&limit=10";
  let apiCategory =
    "https://5n725p3wkl.execute-api.ap-southeast-1.amazonaws.com/test/categories";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjBhMDE3NDgyNTBlMmRiN2E3MThmZmQiLCJpYXQiOjE2NTM1NTUwNDYsImV4cCI6MTY2OTEwNzA0Nn0.RV92mUISnWXPbCexMtk6kmwC7jDwnY3V_Reafvz1JTg";

  useEffect(() => {
    getAPIfull();
  }, [condition]);

  const getAPIfull = async () => {
    try {
      setLoad(true);
      const res = await axios.post(
        api,
        { filter: condition },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newData = res.data.items;

      const pushData = newData.map((item) => ({
        name: `${item.name}`,
        cate: item.categories?.map((e) => e.name)?.toString(),
        status: item.isActive === true ? "Kích hoạt" : "Chưa kích hoạt",
        created: `${item.created.slice(0, 10)}`,
        updated: `${item.updated.slice(0, 10)}`,
        key: item._id,
      }));

      setData(pushData);
      setLoad(false);

      // setInitialData(pushData);
      // console.log(condition);
    } catch (e) {
      console.log(e);
    }
  };
  // console.log(initial);
  const getApiCate = async () => {
    try {
      const res = await axios.get(apiCategory, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const getCateData = res.data.map((e) => {
        return e;
      });
      // setLoad(null)
      setCateData(getCateData);
      // console.log(getCateData);
      setLoad(getCateData);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getApiCate();
  }, []);

  // function handleFilter(val) {
  //     const filteredData = data.filter(e => {
  //         return e.name.toLowerCase().includes(val.toLowerCase());
  //     })
  //     val === "" ? setData(initialData) : setData(filteredData)
  //     // console.log(data);

  // }

  // function handleFilterCate(val) {
  //     const filteredData = data.filter(e => {
  //         return e?.cate?.includes(val);
  //     })
  //     val.toString() === "" ? setData(initialData) : setData(filteredData)
  //     console.log(val.toString());
  // }

  // useEffect(() => {
  //     handleFilter()
  // }, [])

  // console.log(data.map(e => e.status));

  // function getOptionValue(e) {
  //     console.log(e);
  // }

  // function handleFilterStatus(val) {
  //     const filteredStatus = data.filter(e => {
  //         return e.status.includes(val)
  //     })
  //     val.toString() === "Tất cả" ? setData(initialData) : setData(filteredStatus)
  //     console.log(val.toString());
  // }
  // useEffect ( () => {
  //     handleFilterStatus()
  // }, [valueChange])

  // console.log(data);

  return (
    <div>
      <Header />
      <Content>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/home-request" className={style.homeLink}>
              Home
            </Link>
          </Breadcrumb.Item>

          <Breadcrumb.Item>Quản lí đề xuất</Breadcrumb.Item>
        </Breadcrumb>
        <div className="wrap-input">
          <div className="box-search">
            <div className={style.wrapBoxSearch}>
              <div className={style.boxLeft}>
                <div className={style.wrapBoxLeft}>
                  <SearchOutlined />
                  {/* {search} */}
                  <Input
                      placeholder="Nhập tên đề xuất"
                      // value={search}

                      onChange={(event) => {
                        setCondition({ ...condition, name: event.target.value });
                      }}
                  ></Input>
                </div>
              </div>
              <div className={style.boxCenter}>
                <div>
                  <Input.Group compact>
                    <span className={style.prefix}>Category: </span>

                    <Select
                        mode="multiple"
                        // allowClear = "false"
                        placeholder="Chọn category"
                        maxTagCount="responsive"
                        onChange={(val) =>
                            setCondition({ ...condition, categories: val })
                        }
                    >
                      {cateData.map((cate, index) => {
                        return (
                            <Option key={index} value={cate._id}>
                              {cate.name}
                            </Option>
                        );
                      })}
                    </Select>
                  </Input.Group>
                </div>
              </div>
              <div className={style.boxRight}>
                <div>
                  <Input.Group compact bordered={false}>
                    <span className={style.prefix}>Trạng thái: </span>
                    <Select
                        allowClear={false}
                        options={options}
                        placeholder="Chọn trạng thái"
                        onChange={(val) =>
                            setCondition({ ...condition, status: val[0] })
                        }
                    ></Select>
                  </Input.Group>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={style.wrapTable}>
          <div>
            <div
                style={{
                  marginBottom: 16,
                }}
            >
            <span>
              {hasSelected ? (
                  <span>
                  {" "}
                    Đã chọn:
                  <strong style={{ color: "rgb(26, 148, 255)" }}>
                    {" "}
                    {`${selectedRowKeys.length}`}
                  </strong>
                </span>
              ) : (
                  ""
              )}
            </span>
              {/* {hasSelected && <Button type="primary" onClick={start} disabled={!hasSelected}  style = {{'margin-left' : '10px'}}>
                            Reload
                        </Button>} */}
            </div>
            {load ? (
                <div className = {style.spinner}>
                  <Spin />
                </div>
            ) : (
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={data}
                />
            )}
          </div>
        </div>
      </Content>
    </div>
  );
}

export default HomeRequest;
