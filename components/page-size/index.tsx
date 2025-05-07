import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface PageSizeSelectorProps {
  value: number;
  onChange: (value: number) => void;
  options?: number[];
  className?: string;
}

const PageSizeSelector = ({
  value,
  onChange,
  options = [25, 50, 100],
  className
}: PageSizeSelectorProps) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-500">Rows per page</span>
      <Select
        value={value.toString()}
        onValueChange={(value) => onChange(Number(value))}
      >
        <SelectTrigger className={`w-[70px] ${className}`}>
          <SelectValue placeholder={value.toString()} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option}
              value={option.toString()}
              className="text-zinc-950 dark:text-zinc-400"
            >
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default PageSizeSelector;
