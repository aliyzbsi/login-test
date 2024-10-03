import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import Success from "../success/Success";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";

const base_url = "http://localhost:3100";

const errorMessages = {
  email: "Geçersiz e-posta adresi",
  password: "Şifre en az 4 karakter olmalıdır",
  terms: "Kullanım şartlarını kabul etmelisiniz",
};

function Login() {
  const history = useHistory();
  const [isValid, setIsValid] = useState(true);
  const [hata, setHata] = useState(errorMessages);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    terms: false,
  });
  const [user, setUser] = useState(null); // Kullanıcı durumunu tanımladık

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
      setLoginForm({ ...loginForm, [name]: checked });
    } else {
      setLoginForm({ ...loginForm, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isValid) {
      return; // Eğer form geçerli değilse çık
    }

    try {
      const response = await axios.get(base_url + "/users");
      const foundUser = response.data.find(
        (user) =>
          user.email === loginForm.email && user.password === loginForm.password
      );

      if (foundUser) {
        setUser(foundUser); // Kullanıcı bilgilerini duruma kaydediyoruz
        history.push("/success");
      } else {
        console.log("Hatalı Giriş");
        setHata({ ...hata, email: "", password: "Hatalı giriş" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const emailCheck = validateEmail(loginForm.email);
    const passwordCheck = loginForm.password.length >= 4;
    const termsCheck = loginForm.terms;

    setIsValid(emailCheck && passwordCheck && termsCheck);

    setHata({
      email: emailCheck ? "" : errorMessages.email,
      password: passwordCheck ? "" : errorMessages.password,
      terms: termsCheck ? "" : errorMessages.terms,
    });
  }, [loginForm]);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
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
            data-cy="email"
            placeholder="Email Adresinizi Giriniz !"
            value={loginForm.email}
            onChange={handleChange}
            invalid={!!hata.email}
          />
          {hata.email && <FormFeedback>{hata.email}</FormFeedback>}
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
            invalid={!!hata.password}
          />
          {hata.password && <FormFeedback>{hata.password}</FormFeedback>}
        </FormGroup>
        <FormGroup>
          <Input
            type="checkbox"
            name="terms"
            id="terms"
            checked={loginForm.terms}
            onChange={handleChange}
            invalid={!!hata.terms}
          />
          <Label htmlFor="terms">
            I agree to terms of service and privacy policy
          </Label>
          {hata.terms && <FormFeedback>{hata.terms}</FormFeedback>}
        </FormGroup>
        <Button
          disabled={!isValid}
          name="loginbtn"
          type="submit"
          color="primary"
        >
          Kaydet
        </Button>
      </Form>
      {user ? <Success /> : <p>Hatalı Giriş!</p>}{" "}
    </div>
  );
}

export default Login;
