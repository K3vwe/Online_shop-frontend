import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Styled from "styled-components";

import { perPage } from "../config";

// Components
import Item from "./Item";
import Pagination from "./Pagination";

export const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    items(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

const Center = Styled.div`
  text-align: center;
`;

const ItemsList = Styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 60px;
  max-width: ${(props) => props.theme.maxWidth};
  margin: 0 auto;
  @media (max-width: 850px) {
    min-width: 95%;
    
    grid-gap: 20px;
  }
`;

const Items = ({ page }) => {
  const { data, error, loading } = useQuery(ALL_ITEMS_QUERY, {
    variables: {
      skip: page * perPage - perPage,
      first: perPage,
    },
  });

  if (loading) return <p>Loading ...</p>;

  if (error) return <p>Error:{error.message}</p>;
  return (
    <Center>
      <Pagination page={page} />
      <div>
        <ItemsList>
          {data.items.map((item) => (
            <Item key={item.id} item={item} />
          ))}
        </ItemsList>
      </div>
      <Pagination page={page} />
    </Center>
  );
};

export default Items;
