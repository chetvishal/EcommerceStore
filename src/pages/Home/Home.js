import React, { useState } from 'react';
import { Card } from '../../components/Card/Card';
import { useDataContext } from '../../context/cartContextProvider';
import './Home.css';

export const Home = ({ input }) => {

    const { state, dispatch, updateServer, fetchResource } = useDataContext();
    const [sliderVal, setSliderVal] = useState(989);
    console.log('ITS INPUT', input);

    const handleDropDownChange = (e) => {
        console.log(e.target.value);
        dispatch({ type: "SORT", payload: e.target.value })
    }

    const handleSlider = (e) => {
        // e.preventDefault();
        setSliderVal(() => e.target.value);
    }

    //Function to sort products array
    const sortData = (itemArr, sort) => {
        if (sort === "ascending") {
            return itemArr.sort((a, b) => b.price - a.price);
        } else if (sort === "descending")
            return itemArr.sort((a, b) => a.price - b.price);
        else return itemArr;
    };

    //Function to filter products array
    const getFilteredData = (itemArr, { showInventoryAll, showFastDelivery }) => {

        let newArr = itemArr;

        if (showFastDelivery) {
            newArr = newArr.filter((item) => item.fastDelivery);
        }
        newArr = newArr.filter((item) => (showInventoryAll ? true : item.inStock));
        return newArr;
    };

    const sortedData = sortData(state.products, state.sort);
    const FilteredData = getFilteredData(sortedData, state);

    console.log(window.location.href);

    return (
        <div className="home">
            <div className="filters">
                {/* SORTING INPUT ELEMENTS */}

                <span className="util-heading-medium">Filters</span>
                
                <span className="util-heading-small">Sort</span>
                <span className="drop-down-container filter-element">
                    <label for="sort-price" class="a-native-dropdown">Sort by:</label>
                    <select name="cars" id="sort-price" onChange={handleDropDownChange}>
                        <option
                            value="ascending"
                            onClick={() => dispatch({ type: "SORT", payload: "ascending" })}
                        >Price: High to Low</option>
                        <option
                            value="descending"
                            onClick={() => dispatch({ type: "SORT", payload: "descending" })}
                        >Price: Low to High</option>
                    </select>
                </span>
                <br />
                <br />
                

                {/* <input
                    type="radio"
                    id="high"
                    name="pricesort"
                    value="SORT_LOW"
                    onChange={() => dispatch({ type: "SORT", payload: "ascending" })}
                />
                <label for="high">Price: High to low</label>

                <input
                    type="radio"
                    id="low"
                    name="pricesort"
                    value="SORT_HIGH"
                    onChange={() => dispatch({ type: "SORT", payload: "descending" })}
                />
                <label for="low">Price: Low to High</label> */}
                <span className="util-heading-small">Range</span>
                <input type="range" min={15} max={989} value={sliderVal} className="slider filter-element" onChange={handleSlider} ></input> ₹{sliderVal}
                

                {/* FILTERING INPUT ELEMENTS */}
                <span className="util-heading-small">Filter by</span>
                <label className="filter-checkbox-container">
                    <input
                        type="checkbox"
                        checked={state.showInventoryAll}
                        onChange={() => dispatch({ type: "TOGGLE_INVENTORY" })}
                    />
             Include out of stock
                </label>
                <label className="filter-checkbox-container filter-element">
                    <input

                        type="checkbox"
                        checked={state.showFastDelivery}
                        onChange={() => dispatch({ type: "TOGGLE_DELIVERY" })}
                    />
                     Fast delivery only
                    </label>
                
            </div>

            <div className="products-list">

                {/* <h2>Purchase Items</h2> */}
                {/* <div> */}
                {FilteredData.map(i => i.name.toLowerCase().includes(input.toLowerCase()) && i.price < Number(sliderVal) ? <Card key={i.id} data={i} /> : null)}
                {/* </div> */}
            </div>
        </div>
    )
}