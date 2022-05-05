import { gql } from "@apollo/client";

const getAll = gql`
{
  categories{
    name
    products{
      id
      name
      description
      gallery
      inStock
      category
      attributes{
        name
        type
        items{
          value
          displayValue
        }
      }
      prices{
        currency{
          label
          symbol
        }
        amount
      }
      brand
    }
  }
}
`
const getCategoriesQuery = gql`
{
    categories{
        name
    }
}
`
const singleProduct = gql`
  query($id:String!){
    product(id:$id){
      id
      name
      inStock
      gallery
      description
      category
      attributes{
        id
        name
        type
        items{
          displayValue
          value
          id
        }
      }
      prices{
        currency{
          label
          symbol
        }
        amount
      }
      brand
    }
  }
`

const curencies = gql`
{
  currencies{
    label
    symbol
  }
}
`
export {
    getCategoriesQuery,
    getAll,
    singleProduct,
    curencies
}