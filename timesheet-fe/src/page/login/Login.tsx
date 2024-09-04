import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GetUser } from "@/service/api/GetUser";
import { LoginApi } from "@/service/api/Login";
import { ChangeEvent, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { UseUser } from "../layouts/UserContext";
import { LoginDto } from "./dto/create-user-dto";
interface FormError {
  email?: string;
  password?: string;
}
const Login = () => {
  useEffect(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }, []);

  const navigate = useNavigate();
  const [logData, setLoginData] = useState<LoginDto>({
    email: "",
    password: "",
  });

  const [formError, setFormError] = useState<FormError>({});
  const { setUserData } = UseUser();
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const errors: FormError = {};

    if (!logData.email) {
      errors.email = "Please enter your email";
      isValid = false;
    } else {
      const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!validEmail.test(logData.email)) {
        errors.email = "Email is not valid";
        isValid = false;
      }
    }

    if (!logData.password) {
      errors.password = "Please enter your password";
      isValid = false;
    }

    setFormError(errors);
    return isValid;
  };

  const onSubmit = async () => {
    console.log(logData);
    if (validateForm()) {
      const response = await LoginApi(logData);
      if (response?.status === 201) {
        console.log("login successful!", response);
        const userRes = await GetUser(logData.email);
        if (userRes?.status === 200) {
          console.log(userRes);
          setUserData(userRes.data.data);
        }
        navigate("/");
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div className="card-login flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-4 pb-20 bg-[#00bcd4]">
      <div className="div-text-timesheet text-2xl flex items-center space-x-2 font-semibold text-white mb-2">
        Timesheet
      </div>
      <Card className="w-[400px] justify-center shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Log in</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2 grid-rows-[auto_1fr] items-center relative mb-2">
            <Label htmlFor="email" className="text-sm font-medium ml-6">
              Email
            </Label>
            <div className="flex items-center space-x-2">
              <FaUser />
              <Input
                id="email"
                type="email"
                onChange={onChange}
                name="email"
                onKeyDown={handleKeyDown}
              />
            </div>
            {formError.email && (
              <p className="absolute text-red-500 text-sm top-full left-0 ml-6">
                {formError.email}
              </p>
            )}
          </div>
          <div className="grid gap-2 grid-rows-[auto_1fr] items-center relative">
            <Label htmlFor="password" className="ml-6">
              Password
            </Label>
            <div className="flex items-center space-x-2">
              <IoMdLock />
              <Input
                id="password"
                type="password"
                onKeyDown={handleKeyDown}
                onChange={onChange}
                name="password"
              />
            </div>
            {formError.password && (
              <p className="absolute text-red-500 text-sm top-full left-0 ml-6">
                {formError.password}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div className="gap-1.5 flex items-center">
            <Checkbox id="terms1" />
            <label
              htmlFor="terms1"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me
            </label>
          </div>
          <div className="flex justify-end">
            <Button className="w-[70px] " onClick={onSubmit}>
              Login
            </Button>
          </div>
        </CardFooter>
        <Button className="w-[90%] mx-auto mb-8 flex justify-center bg-[#222c94] text-white">
          Log In With Google
        </Button>
      </Card>

      <div className="text-white text-xs">
        <p>
          © 2024 Timesheet. <strong>Version</strong> 4.3.0.0 [20240901]
        </p>
      </div>
    </div>
  );
};

export default Login;
