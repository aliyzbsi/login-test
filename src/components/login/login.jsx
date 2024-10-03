import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import Success from "../success/Success";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const base_url = "http://localhost:3100";

function Login() {
  const history = useHistory();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    terms: false,
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
      setLoginForm({ ...loginForm, [name]: checked });
      console.log(value);
    } else {
      setLoginForm({ ...loginForm, [name]: value });
      console.log(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(base_url + "/users");
      const user = response.data.find(
        (user) =>
          user.email === loginForm.email && user.password === loginForm.password
      );

      if (user) {
        history.push("/success");
      } else {
        console.log("Hatalı Giriş");
      }
    } catch (error) {
      console.log(error);
    }

    console.log("submit edildi", loginForm);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="email">E-MAİL</Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Email Adresinizi Giriniz !"
            value={loginForm.email}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">ŞİFRE</Label>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Şifrenizi Giriniz !"
            value={loginForm.password}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="checkbox"
            name="terms"
            id="terms"
            checked={loginForm.terms}
            onChange={handleChange}
          />
          <Label htmlFor="terms">
            I agree to terms of service and privacy policy
          </Label>
        </FormGroup>
        <Button disabled={!loginForm.terms} type="submit" color="primary">
          Kaydet
        </Button>
      </Form>
      <Success />
    </div>
  );
}

export default Login;
