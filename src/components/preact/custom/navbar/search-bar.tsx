/** @jsxImportSource preact */

// Types
import type { Signal } from "@preact/signals";
import { useCallback } from "preact/hooks";

export const SearchBar = ({
  onSearch,
  searchParam,
}: {
  clearFilters?: () => void;
  filter?: string | undefined;
  onSearch: (v: string) => void;
  searchParam: Signal<string>;
}) => {
  const onChange = useCallback<(e: Event) => void>(
    (e) => {
      const { value } = e.target as HTMLInputElement;
      searchParam.value = value;
      onSearch(value);
    },
    [searchParam, onSearch]
  );

  return (
    <div>
      <div className="text-lg font-semibold flex gap-4 items-start content-start px-6">
        <label className="mb-2 leading-none">Search</label>
      </div>
      <input
        value={searchParam.value}
        onChange={onChange}
        className="px-6 py-2 rounded-3xl text-xs bg-neutral-200 dark:bg-neutral-800 md:bg-neutral-800 w-full outline-none border-transparent focus:border-neutral-600 transition-colors border"
        placeholder="Button"
      />
    </div>
  );
};
