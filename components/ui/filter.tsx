import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';
import { MdFilterList } from 'react-icons/md';

interface FilterOption {
  key: string;
  label: string;
  type: 'text' | 'select' | 'date';
  options?: { value: string; label: string }[];
}

interface FilterProps {
  options: FilterOption[];
  onFilterChange: (filters: Record<string, any>) => void;
}

export function Filter({ options, onFilterChange }: FilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<Record<string, any>>({});

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    onFilterChange(filters);
    setIsOpen(false);
  };

  const clearFilters = () => {
    const emptyFilters = Object.keys(filters).reduce((acc, key) => {
      acc[key] = '';
      return acc;
    }, {} as Record<string, any>);
    
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <MdFilterList className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 text-zinc-950 dark:text-white overflow-y-auto">
        <div className="grid gap-4">
          <h4 className="font-medium leading-none">Filters</h4>
          {options.map((option) => (
            <div key={option.key} className="grid gap-2">
              <Label htmlFor={option.key}>{option.label}</Label>
              {option.type === 'text' && (
                <Input
                  id={option.key}
                  value={filters[option.key] || ''}
                  onChange={(e) => handleFilterChange(option.key, e.target.value)}
                />
              )}
              {option.type === 'select' && (
                <Select
                  value={filters[option.key] || ''}
                  onValueChange={(value) => handleFilterChange(option.key, value)}
                >
                  <SelectTrigger id={option.key}>
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent className="text-zinc-950 dark:text-white overflow-y-auto">
                    {option.options?.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              {option.type === 'date' && (
                <DatePicker
                  date={filters[option.key]}
                  onSelect={(date) => handleFilterChange(option.key, date)}
                />
              )}
            </div>
          ))}
          <div className="flex justify-between">
            <Button variant="outline" onClick={clearFilters}>
              Clear
            </Button>
            <Button onClick={applyFilters}>Apply Filters</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

