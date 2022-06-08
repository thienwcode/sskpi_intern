import { Button, Checkbox, Form, Input } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../../Login.scss'


function FormWrap() {
  const navigate = useNavigate();

  // var checkToken = localStorage.getItem('token')
  // if (checkToken != "") {
  //   return navigate('/home-request', { replace: true })
  // } else {
  //   return navigate('/', { replace: true })
  // }

  const onFinish = async (values) => {
    try {
      const payload = { email: values.email, password: values.password };
      const content = await axios.post(
        "https://5n725p3wkl.execute-api.ap-southeast-1.amazonaws.com/test/login",
        payload
      );

      const token = content.data;
      localStorage.setItem("token", token);
      // localStorage.setItem('email', )
      // localStorage.setItem('password', token)

      // var getToken = localStorage.getItem('token')

      return navigate("/home-request", { replace: true });
    } catch (e) {
      alert("Email or password is incorrect");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="box-wrapp">
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Log In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default FormWrap;
