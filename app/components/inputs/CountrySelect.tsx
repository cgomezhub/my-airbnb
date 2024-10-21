"use client";

import useCountries from "@/app/hooks/useCountries";
import Select from "react-select";

export type CountrySelectValue = {
  flag: string;
  label: string;
  laylng: number[];
  region: string;
  value: string;
};

interface Props {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

const CountrySelect = ({ onChange, value }: Props) => {
  const { getAll } = useCountries();

  return (
    <div>
      <Select
        placeholder="Selecciona un país"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row items-center gap-3">
            <div> {option.flag}</div>
            <div>
              {option.label},
              <span className="text-neutral-500 ml-1"> {option.region}</span>
            </div>
          </div>
        )}
        classNames={{
            control: () => "p-3 border-2",
            input: () => "text-lg",
            option: () => "text-lg",

        }}
        theme={(theme) => ({
            ...theme,
            borderRadius: 6,
            colors: {
                ...theme.colors,
                primary: "black", // This is the color of the border
                primary25: "#ffe4e6"
            },
        })}
      />
    </div>
  );
};

export default CountrySelect;
