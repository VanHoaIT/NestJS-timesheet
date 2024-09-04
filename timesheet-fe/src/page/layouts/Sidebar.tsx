import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { UseUser } from "./UserContext";

const Sidebar = () => {
  const { userData } = UseUser();
  return (
    <aside className="fixed top-20 left-0 w-[250px] h-[calc(100vh-80px)] flex flex-col shadow-lg">
      <div className="flex-none p-4 bg-[#66d1a8] flex items-center">
        <Avatar className="size-14">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col ml-8">
          <p className="">
            {userData?.firstName}.{userData?.lastName}
          </p>
          <p className="">{userData?.email}</p>
        </div>
      </div>
      <div className="flex-1 overflow-auto text-sm">
        <Menu>
          <MenuItem>
            <Link to="/user">My Information</Link>
          </MenuItem>
          <SubMenu label="Admin">
            <MenuItem>Users</MenuItem>
            <MenuItem>Roles</MenuItem>
            <MenuItem>Clients</MenuItem>
            <MenuItem>Tasks</MenuItem>
            <MenuItem>Branches</MenuItem>
            <MenuItem>Position</MenuItem>
          </SubMenu>
          <SubMenu label="Personal timesheet">
            <MenuItem>My timesheet</MenuItem>
            <MenuItem>My off/remote/onstie requests</MenuItem>
          </SubMenu>
          <SubMenu label="Management">
            <MenuItem>Review interns</MenuItem>
          </SubMenu>
        </Menu>
      </div>

      <div className="flex-none p-4 bg-gray-700 text-xs text-center text-white">
        <p>
          © 2024 Timesheet. <strong>Version</strong> 4.3.0.0
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
