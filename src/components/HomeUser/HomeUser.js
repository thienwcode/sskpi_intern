import {React, useState} from 'react';
import {AutoComplete, Breadcrumb, Button, Cascader, Input, Select, Table, Typography} from 'antd';
import {AudioOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import Header from "../Header/Header";
import style from "../HomeRequest/HomeRequest.module.scss";

const { Search } = Input;
const { Option } = Select;
const { Text } = Typography;

const suffix = (
    <AudioOutlined
        style={{
            fontSize: 16,
            color: '#1890ff',
        }}
    />
);


const onSearch = (value) => console.log(value);
const options = [
    {
        value: 'all',
        label: 'Tất cả',
    },
    {
        value: 'active',
        label: 'Kích hoạt',
    },
    {
        value: 'unactive',
        label: 'Chưa kích hoạt',
    }
];

const columns = [
    {
        title: 'Tên đề xuất',
        dataIndex: 'name',
    },
    {
        title: 'Danh mục',
        dataIndex: 'age',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'address',
    },
    {
        title: 'Ngày tạo',
        dataIndex: 'address',
    },
    {
        title: 'Cập nhật lần cuối',
        dataIndex: 'address',
    },

];
const data = [];

// for (let i = 0; i <= 49; i++) {
//     data.push({
//         key: i,
//         name: `Edward King ${i}`,
//         age: 32,
//         address: `London, Park Lane no. ${i}`,
//     });
// }





function HomeUser() {

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);

    const start = () => {
        setLoading(true); // ajax request after empty completing

        setTimeout(() => {
            setSelectedRowKeys([]);
            setLoading(false);
        }, 1000);
    };

    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    return (

        <div>
            <Header />
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to="/home-request" className={style.homeLink}>Home</Link>
                </Breadcrumb.Item>

                <Breadcrumb.Item>
                    Quản lí người dùng
                </Breadcrumb.Item>

            </Breadcrumb>
            <div className='wrap-input'>
                <div className='box-search'>
                    <div className={style.wrapBoxSearch}>
                        <div className={style.boxLeft}>
                            <Search placeholder="Nhập tên đề xuất" onSearch={onSearch}  />
                        </div>
                        <div className={style.boxCenter}>
                            <Input.Group compact>
                                <AutoComplete
                                    placeholder="Chọn Category"
                                    options={[{ value: 'Tất cả' },
                                    { value: 'IT' },
                                    { value: 'Hành chính' },
                                    { value: 'Thực tập sinh' },
                                    { value: 'OJT' },
                                    { value: 'Kế Toán' },
                                    { value: 'Nhân sự' },
                                    { value: 'Nghỉ đi học' },
                                    { value: 'Covid-19' }


                                    ]}
                                >

                                </AutoComplete>


                            </Input.Group>
                        </div>
                        <div className={style.boxRight}>
                            <Input.Group compact>
                                <Cascader

                                    options={options}
                                    placeholder="Chọn trạng thái"
                                />

                            </Input.Group>
                        </div>
                    </div>
                </div>
            </div>
            <div className='wrap-table'>
                <div>
                    <div
                        style={{
                            marginBottom: 16,
                        }}
                    >
                        <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
                            Reload
                        </Button>
                        <span
                            style={{
                                marginLeft: 8,
                            }}
                        >
                            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                        </span>
                    </div>
                    <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
                </div>
            </div>
        </div>
    );
}



export default HomeUser;
