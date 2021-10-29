import { ChangeEvent } from 'react';

import { FormField } from '../components/formfield';
import { BooleanInputProperties, StringInputProperties } from '../components/input';
import { Select, SelectValues } from '../components/select';

export type Post = {
  id: number;
  name?: string;
  go?: boolean;
  note?: string;
};

export const PostEmpty: Post = {
  id: 0,
};

export type PostList = {
  id: number;
  name?: string;
  go?: boolean;
  note?: string;
};

export const PostIDSelect = ({ id, setter }: SelectValues): JSX.Element => (
  <Select name="post" label="Должность" listName="PostSelect" id={id} icon="tag" setter={setter} />
);

export const PostGoIDSelect = ({ id, setter }: SelectValues): JSX.Element => (
  <Select
    name="post-go"
    label="Должность ГО ЧС"
    listName="PostGoSelect"
    id={id}
    icon="tag"
    setter={setter}
  />
);

export const PostNameInput = ({ value, setter }: StringInputProperties): JSX.Element => (
  <FormField
    name="post-name"
    value={value}
    onChange={(event: ChangeEvent<HTMLInputElement>): void =>
      setter(event.target.value === '' ? undefined : event.target.value)
    }
    label="Наименование должности"
    icon="tag"
    autocomplete="off"
  />
);

export const PostGOSwitch = ({ value, setter }: BooleanInputProperties): JSX.Element => (
  <div className="field">
    <div className="control">
      <label className="checkbox" htmlFor="post-go">
        <input
          className="checkbox"
          type="checkbox"
          name="post-go"
          id="post-go"
          checked={value}
          onClick={() => setter(!value)}
        />
        Должность по гражданской обороне
      </label>
    </div>
  </div>
);
