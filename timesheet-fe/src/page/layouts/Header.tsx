import { ModeToggle } from "@/components/mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full h-20 bg-[#25942e] flex items-center justify-between px-4 text-white z-10 shadow-lg">
      <div className="flex items-center space-x-2">
        <img src="src/assets/Timesheet.png" alt="Logo" className="w-8 h-8" />
        <h1 className="text-xl font-medium">Timesheet</h1>
      </div>
      <div className="flex items-center space-x-2">
        <p className="font-medium">Setting</p>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <ModeToggle />
        </ThemeProvider>
      </div>
    </header>
  );
};

export default Header;
