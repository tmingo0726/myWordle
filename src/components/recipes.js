import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { storeCurrentIngredient, clearCurrentIngredient, getCurrentIngredient } from '../auth/utility';


const container = document.getElementById("app");
let query = "";


const Recipes = (props) => {

    console.log("Inside recipes route.");
    const allFoods = props.allFoods;
    const setAllFoods = props.setAllFoods;
        
    useEffect(() => {

        query = getCurrentIngredient();
        if (query) {
            document.getElementById("ingredient").value = query;
        }
        grabFoodProducts2(query);

    }, []);


    const grabFoodProducts2 = async(item) => {

        query = item; 
        console.log("Inside grabFoodProducts and query is", query);
        storeCurrentIngredient(query);

        //API URL
        const API_URL = `https://api.edamam.com/search?q=${query}&app_id=52d2bbc8&app_key=5cbc0ebbb54690e5c3a1cbf22c6d1c06&from=0&to=10`;
        
        fetch(API_URL)
            .then((response) => {
              return response.json();
            })
            .then((result) => {

                setAllFoods(result.hits);
                
            })
            .catch((error) => {
              console.error("Error: ", error);
            });
   
    }

    const saveIngredient = () => {

        

    }

    return (

        <div>

            <label htmlFor="ingredient">Main Ingredient: </label>
            <input
                id="ingredient"
                name="ingredient"
                onBlur={(e) => grabFoodProducts2(e.target.value)}
                type="text"
                placeholder="Enter Main Ingredient"
                required
            ></input>
            <div id="products-wrapper">
            {
                allFoods.map((product, i) => {
                    console.log("PRODUCT", product)
                    return (
                        
                        <div className="product-container" key={i}>
                            <img className="card" src={product.recipe.image}/>
                            <div className="caption">
                                <p>{product.recipe.label}</p>
                                <p><a href={product.recipe.url}>Link to recipe</a></p>
                            </div>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )

   
}

export default Recipes;
