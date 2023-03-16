import React from 'react';
import styled from 'styled-components';
import CategoryItem from './CategoryItem';
import { categories } from './data';
import { mobile } from '../responsive';

const Conatiner = styled.div`
display: flex;
padding:20px;
justify-content:Space-between;
${mobile({padding:"0px",flexDirection:"column"})}
`;

const Categories = () => {
    return ( 
        <Conatiner>
            {categories.map(item=>(
                <CategoryItem item={item} key={item.id}/>
            ))}
        </Conatiner>
     );
}
 
export default Categories;