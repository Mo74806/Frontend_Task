import { useState, useEffect, memo } from "react";
import { Menu, Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useTheme } from "../context/ThemeContext";

const Navbar = ({ loggedIn }: { loggedIn?: boolean }) => {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowNavbar(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { name: "Home", url: "/" },
    { name: "Create Property", url: "/create-property" },
  ];

  return (
    <>
      {/* Sidebar on Desktop */}
      <aside className="hidden md:flex fixed top-0 left-0 h-full w-[250px] bg-white dark:bg-primary-green-200 shadow-lg flex-col px-3 py-4 z-50">
        <div className="flex justify-center mb-6">
          <img
            className={`max-w-[130px] ${theme === "dark" && "invert"}`}
            src="KENNAH_LOGO.png"
          />
        </div>
        <ul className="flex flex-col gap-4 text-[18px] text-black dark:text-white font-medium">
          {navLinks.map((item) => (
            <li key={item.name}>
              <p
                className={`cursor-pointer rounded-lg px-3 py-2 hover:bg-primary-green hover:text-white ${
                  window.location.pathname === item.url &&
                  "bg-primary-green text-white"
                }`}
              >
                {item.name}
              </p>
            </li>
          ))}
        </ul>
        <Button
          onClick={toggleTheme}
          className="mt-auto w-full !bg-primary-green text-white"
        >
          {mounted && theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </Button>
      </aside>

      {/* Navbar with Hamburger on Mobile */}
      <nav
        className={`md:hidden fixed top-0 z-50 w-full bg-white dark:bg-primary-green py-4 px-6 shadow-lg transition-transform duration-300 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <img
            className={`max-w-[120px] ${theme === "dark" && "invert"}`}
            src="KENNAH_LOGO.png"
          />

          <div className="flex items-center gap-2">
            <Button
              onClick={toggleTheme}
              className="!bg-primary-green text-white"
              size="icon"
            >
              {mounted && theme === "dark" ? (
                <Sun size={20} />
              ) : (
                <Moon size={20} />
              )}
            </Button>
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className="!bg-primary-green"
                  size="icon"
                >
                  <Menu size={26} />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="bg-white dark:bg-black w-[250px] px-3 py-4"
              >
                <div className="flex justify-center mb-6">
                  <img
                    className={`max-w-[120px] ${theme === "dark" && "invert"}`}
                    src="KENNAH_LOGO.png"
                  />
                </div>
                <ul className="flex flex-col gap-4 text-[18px] text-black dark:text-white font-medium">
                  {navLinks.map((item) => (
                    <li key={item.name}>
                      <p
                        className={`cursor-pointer rounded-lg px-3 py-2 hover:bg-primary-green hover:text-white ${
                          window.location.pathname === item.url &&
                          "bg-primary-green text-white"
                        }`}
                      >
                        {item.name}
                      </p>
                    </li>
                  ))}
                </ul>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </>
  );
};

export default memo(Navbar);
