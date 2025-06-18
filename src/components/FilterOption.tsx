import { ArrowDown } from "lucide-react";
import {
  useState,
  forwardRef,
  useEffect,
  useRef,
  useImperativeHandle,
} from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  handleSearch: (value: string) => void;
  options: string[];
  text: string;
  selected?: string;
}

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ handleSearch, options, text, selected }, ref) => {
    const [query, setQuery] = useState<string>("");
    useImperativeHandle(ref, () => searchInputRef.current!);
    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.ctrlKey && event.key.toLowerCase() === "k") {
          event.preventDefault();

          setTimeout(() => {
            if (searchInputRef.current) {
              searchInputRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
              requestAnimationFrame(() => {
                searchInputRef.current?.focus();
              });
            }
          }, 0);
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, []);

    useEffect(() => {}, [query]);
    return (
      <div className="">
        <DropdownMenu>
          <DropdownMenuTrigger className="items-center ms-auto gap-x-2 justify-center flex bg-primary-green-100 h-[100%] px-[50px] font-bold  dark:bg-primary-green dark:text-white dark:backdrop-blur-xl dark:shadow-lg dark:border dark:border-white/20  card-shadow backdrop-blur-lg border border-transparent rounded-2xl p-4 w-fit text-primary-green text-center transition-all">
            {text}
            <ArrowDown size={18} strokeWidth={3} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="relative  bg-primary-green-100  dark:bg-primary-green dark:backdrop-blur-xl dark:shadow-lg dark:border dark:border-white/20  card-shadow backdrop-blur-lg border border-transparent rounded-2xl p-4 w-auto text-black text-center transition-all">
            <DropdownMenuLabel className="dark:text-white font-semibold text-primary-green">
              Filter By
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            {options.map((item) => (
              <DropdownMenuItem
                key={item}
                onClick={() => {
                  setQuery(item);
                  handleSearch(item);
                }}
                className={`dark:text-white justify-center ${
                  item === selected &&
                  "!bg-primary-green !text-primary-green-100 dark:!bg-primary-green-100 dark:!text-primary-green"
                } cursor-pointer font-semibold text-black transition-all duration-300`}
              >
                {item}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }
);

export default SearchBar;
