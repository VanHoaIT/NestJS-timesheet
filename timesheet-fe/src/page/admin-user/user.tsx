import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { banks } from "@/data/bank";
import { ChangeUserInfo } from "@/service/api/ChangeUserInfo";
import { useEffect, useState } from "react";
import { UseUser } from "../layouts/UserContext";

type FormDataType = {
  phone: string;
  bank: string;
  bank_account: string;
  current_address: string;
};

const User = () => {
  const { userData, refreshUserData } = UseUser();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<FormDataType>({
    phone: "",
    bank: "",
    bank_account: "",
    current_address: "",
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        phone: userData?.userInfo?.phone || "",
        bank: userData?.userInfo?.bank || "",
        bank_account: userData?.userInfo?.bank_account || "",
        current_address: userData?.userInfo?.current_address || "",
      });
    }
  }, [userData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "phone" && value.length > 10) return;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    console.log("id:", userData?.id);
    console.log("Updated Data:", formData);
    await ChangeUserInfo(userData?.id ?? 0, formData);
    alert("update success");
    setIsDialogOpen(false);
    await refreshUserData();
  };
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mt-3">
        <p className="text-lg font-bold">my profile</p>
        <div className="space-x-2 w-15 h-7">
          <Button className="">Refesh</Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Request change info</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Change personal information
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {[
                  { label: "Phone", name: "phone", type: "input" },
                  { label: "Bank", name: "bank", type: "select" },
                  {
                    label: "Bank Account",
                    name: "bank_account",
                    type: "input",
                  },
                  {
                    label: "Current Address",
                    name: "current_address",
                    type: "input",
                  },
                ].map(({ label, name, type }) => (
                  <div
                    key={name}
                    className="grid grid-cols-4 items-center gap-4"
                  >
                    <Label htmlFor={name} className="text-right">
                      {label}
                    </Label>
                    {type === "input" ? (
                      <Input
                        id={name}
                        name={name}
                        value={formData[name as keyof FormDataType]}
                        onChange={handleChange}
                        className="col-span-3"
                      />
                    ) : (
                      <Select
                        value={formData.bank}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, bank: value }))
                        }
                      >
                        <SelectTrigger className="col-span-3 flex items-center gap-2 border p-2 rounded-md">
                          <SelectValue placeholder="Chọn ngân hàng">
                            {banks.find((b) => b.value === formData.bank)
                              ?.label || "Chọn ngân hàng"}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {banks.map((bank) => (
                            <SelectItem
                              key={bank.value}
                              value={bank.value}
                              className="flex items-center gap-2 p-2"
                            >
                              <img
                                src={bank.logo}
                                alt={bank.label}
                                width={24}
                                height={24}
                                className="w-6 h-6"
                              />
                              {bank.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                ))}
              </div>
              <DialogFooter>
                <Button onClick={handleSave} type="submit">
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="flex justify-between h-[200px]">
        <Card className="w-[37%] shadow-lg p-5 flex flex-col items-center text-center space-y-2">
          <Avatar className="size-14">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p>
            {userData?.lastName} {userData?.firstName}
          </p>
          <p>{userData?.userInfo?.phone}</p>
          <div className="space-x-2">
            <Badge variant="outline">{userData?.branch?.name}</Badge>
            <Badge variant="outline">{userData?.type?.name}</Badge>
            <Badge variant="outline">{userData?.level?.name}</Badge>
            <Badge variant="outline">{userData?.position?.name}</Badge>
          </div>
        </Card>
        <Card className="w-[60%] shadow-lg">
          <div className="grid grid-cols-4 gap-1 p-5">
            <div className="">
              <p>Full Name</p>
              <p>Email</p>
              <p>DOB</p>
              <p>Branch</p>
            </div>
            <div className="">
              <p>
                {userData?.lastName} {userData?.firstName}
              </p>
              <p>{userData?.email}</p>
              <p>1</p>
              <p> {userData?.branch?.displayName}</p>
            </div>
            <div className="">
              <p>Usertype</p>
              <p>Level</p>
              <p>Position</p>
            </div>
            <div className="">
              <p>{userData?.type?.name}</p>
              <p>{userData?.level?.name}</p>
              <p>{userData?.position?.name}</p>
            </div>
          </div>
        </Card>
      </div>
      <div className="">
        <Card className="w-full h-[250px] justify-center shadow-lg"></Card>
      </div>
    </div>
  );
};

export default User;
