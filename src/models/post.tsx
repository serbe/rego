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
    name="postgo"
    label="Должность ГО"
    listName="PostGoSelect"
    id={properties.id}
    icon="tag"
    setter={properties.setter}
  />
);
