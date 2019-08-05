import React from 'react';

import { Body, Item, Title } from './styles';

const Post = ({
  body,
  title
}) => (
  <Item>
    <Title>{title}</Title>
    <Body>{body}</Body>
  </Item>
);

export default Post;
