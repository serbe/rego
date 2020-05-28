import React from 'react';
import { Select, SelectValues } from '../components/select';

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

export const PostIdSelect = (values: SelectValues): JSX.Element => {
  const { id, callback } = values;
  return (
    <Select
      name="post"
      label="Должность"
      listName="PostSelect"
      id={id}
      icon="tag"
      callback={callback}
    />
  );
};

export const PostGoIdSelect = (values: SelectValues): JSX.Element => {
  const { id, callback } = values;
  return (
    <Select
      name="postgo"
      label="Должность ГО"
      listName="PostGoSelect"
      id={id}
      icon="tag"
      callback={callback}
    />
  );
};
