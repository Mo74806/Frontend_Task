import {
  ArrowDown,
  LucideAArrowDown,
  LucideArrowDownNarrowWide,
  LucideMoveDown,
  MoveDownIcon,
  Search,
} from "lucide-react";
import {
  useState,
  forwardRef,
  useEffect,
  useRef,
  useImperativeHandle,
  memo,
} from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { text } from "stream/consumers";
// import { useDebounce } from "use-debounce";

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  handleSearch: (value: string) => void; // Function prop to handle search
  options: string[];
  text: string;
}

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ handleSearch, options, text }, ref) => {
    const [query, setQuery] = useState<string>("");
    // const [debouncedValue] = useDebounce(query, 1000); //debounce value to avoid too many requests
    useImperativeHandle(ref, () => searchInputRef.current!);
    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.ctrlKey && event.key.toLowerCase() === "k") {
          event.preventDefault(); // Prevent browser's default search behavior

          // Delay execution slightly to ensure smooth scrolling across pages
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

    // useEffect(() => {
    //   handleSearch(debouncedValue);
    // }, [debouncedValue]);

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
                  handleSearch(item.toLocaleLowerCase());
                }}
                className="dark:text-white justify-center !bg-primary-green-200 cursor-pointer font-semibold text-black transition-all duration-300"
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

export default memo(SearchBar);
