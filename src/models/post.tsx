import React, { ChangeEvent } from 'react';
import { FormField } from '../components/formfield';
import { BooleanInputProperties, StringInputProperties } from '../components/input';
import { Select, SelectValues } from '../components/select';

export type PostJsonScheme = {
  name: string;
  object: {
    Post?: Post;
  };
  error?: string;
};

export type PostListJsonScheme = {
  name: string;
  object: {
    PostList?: PostList[];
  };
  error?: string;
};

export type Post = {
  id: number;
  name?: string;
  go?: boolean;
  note?: string;
};

export type PostList = {
  id: number;
  name?: string;
  go?: boolean;
  note?: string;
};

export const PostIDSelect = (properties: SelectValues): JSX.Element => (
  <Select
    name="post"
    label="Должность"
    listName="PostSelect"
    id={properties.id}
    icon="tag"
    setter={properties.setter}
  />
);

export const PostGoIDSelect = (properties: SelectValues): JSX.Element => (
  <Select
    name="post-go"
    label="Должность ГО ЧС"
    listName="PostGoSelect"
    id={properties.id}
    icon="tag"
    setter={properties.setter}
  />
);

export const PostNameInput = (properties: StringInputProperties): JSX.Element => (
  <FormField
    name="post-name"
    value={properties.value}
    onChange={(event: ChangeEvent<HTMLInputElement>): void => properties.setter(event.target.value)}
    label="Наименование должности"
    icon="tag"
  />
);

export const PostGOSwitch = (properties: BooleanInputProperties): JSX.Element => (
  <div className="field">
    <div className="control">
      <label className="checkbox">
        <input
          type="checkbox"
          name="question"
          checked={properties.value}
          onClick={() => properties.setter(!properties.value)}
        />
        Должность по гражданской обороне
      </label>
    </div>
  </div>
);
