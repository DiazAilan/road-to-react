import { FormEvent } from "react";
import { Button } from "./Button";
import { InputWithLabel } from "./InputLabel";

interface SearchFormProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  searchInput: string;
  onInputChange: (query: string) => void;
}

export const SearchForm = ({ onSubmit, searchInput, onInputChange }: SearchFormProps) => (
  <form onSubmit={onSubmit}>
    <InputWithLabel
      id='serach'
      value={searchInput}
      isFocused
      onInputChange={onInputChange}
    >
      <strong>Search: </strong>
    </InputWithLabel>

    <Button type='submit' disabled={!searchInput}>Submit</Button>
  </form>
)