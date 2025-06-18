import { useState, useEffect, memo } from "react";
import { Menu, Moon, Sun, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { useLogin } from "@/context/LoginContext";
import LazyImage from "./LazyImage";

const Navbar = ({ loggedIn }: { loggedIn?: boolean }) => {
  const navigate = useNavigate();
  const { logout } = useLogin();
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
      if (!loggedIn) {
        const currentScrollY = window.scrollY;
        setShowNavbar(currentScrollY < lastScrollY);
        setLastScrollY(currentScrollY);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { name: "Home", url: "/" },
    { name: "Create Property", url: "/create-property" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <aside
        className={` ${
          loggedIn ? "hidden md:flex" : "hidden"
        } fixed top-0 left-0 h-full w-[250px] bg-white dark:bg-primary-green-200 shadow-lg flex-col px-3 py-4 z-50`}
      >
        <div className="flex justify-center mb-6">
          <LazyImage
            className={`max-w-[130px] `}
            src="KENNAH_LOGO.png"
            alt="Kennah Logo"
            invertColor={theme === "dark" ? true : false}
            hideLoading={true}
          />
        </div>
        <ul className="flex flex-col gap-4 text-[18px] text-black dark:text-white font-medium">
          {navLinks.map((item) => (
            <li
              onClick={() => {
                navigate(item.url);
              }}
              key={item.name}
            >
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
        <div className="mt-auto space-y-3">
          <Button
            onClick={toggleTheme}
            className="w-full !bg-primary-green text-white"
          >
            {mounted && theme === "dark" ? (
              <Sun size={20} />
            ) : (
              <Moon size={20} />
            )}
          </Button>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full border-red-500 text-red-600 hover:bg-red-50 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-900/20"
          >
            <LogOut size={20} className="mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      <nav
        className={`
        ${loggedIn ? "md:hidden" : "fixed"}
         fixed top-0 z-50 w-full bg-white dark:bg-primary-green py-4 px-6 shadow-lg transition-transform duration-300 ${
           showNavbar ? "translate-y-0" : "-translate-y-full"
         }`}
      >
        <div className="flex items-center justify-between">
          <LazyImage
            className={`max-w-[120px] `}
            src="KENNAH_LOGO.png"
            alt="Kennah Logo"
            invertColor={theme === "dark" && true}
            hideLoading={true}
          />

          <div className="flex items-center gap-2">
            <Button
              onClick={toggleTheme}
              className="!bg-primary-green  dark:!bg-primary-green-100 text-white dark:text-primary-green"
              size="icon"
            >
              {mounted && theme === "dark" ? (
                <Sun size={20} />
              ) : (
                <Moon size={20} />
              )}
            </Button>
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              {loggedIn && (
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    className="!bg-primary-green dark:!bg-primary-green-100 dark:text-primary-green text-white"
                    size="icon"
                  >
                    <Menu size={26} />
                  </Button>
                </SheetTrigger>
              )}
              <SheetContent
                side="left"
                className="bg-white dark:bg-black w-[250px] px-3 py-4"
              >
                <div className="flex justify-center mb-6">
                  <LazyImage
                    className={`max-w-[120px] ${theme === "dark" && "invert"}`}
                    src="KENNAH_LOGO.png"
                    alt="Kennah Logo"
                    hideLoading={true}
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
                <div className="mt-auto space-y-3 pt-6">
                  <Button
                    onClick={toggleTheme}
                    className="w-full !bg-primary-green text-white"
                  >
                    {mounted && theme === "dark" ? (
                      <Sun size={20} />
                    ) : (
                      <Moon size={20} />
                    )}
                  </Button>
                  {loggedIn && (
                    <Button
                      onClick={handleLogout}
                      variant="outline"
                      className="w-full border-red-500 text-red-600 hover:bg-red-50 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-900/20"
                    >
                      <LogOut size={20} className="mr-2" />
                      Logout
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </>
  );
};

export default memo(Navbar);
