import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UseUser } from "../layouts/UserContext";

const user = () => {
  const { userData } = UseUser();
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mt-3">
        <p className="text-lg font-bold">my profile</p>
        <div className="space-x-2 w-15 h-7">
          <Button className="">Refesh</Button>
          <Button className="">Request change info</Button>
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
          <p>0987654321</p>
          <div className="space-x-2">
            <Badge variant="outline">QN</Badge>
            <Badge variant="outline">TTS</Badge>
            <Badge variant="outline">Dev</Badge>
            <Badge variant="outline">Level1</Badge>
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
              <p> {userData?.branch?.name}</p>
            </div>
            <div className="">
              <p>Usertype</p>
              <p>Level</p>
              <p>Position</p>
            </div>
            <div className="">
              <p>3</p>
              <p>3</p>
              <p>4</p>
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

export default user;
