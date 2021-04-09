import React, { Component } from 'react'

export default class Food extends Component {

    constructor(props) {
        super(props);

        this.state = {
            foods: [],
            searchedFoods: [],
            currentFood: {
                name: "-",
                calories: 0,
                protein: 0,
                carbs: 0,
                fats: 0,
                fiber: 0,
                weight: 100,
            }
        }
    }

    selectFood(food) {
        this.setState({ currentFood: food });
    }

    calculateChange(weight) {
        console.log(weight);

        let currFood = this.state.currentFood;

        if (weight !== "" && weight !== 0) 
        {
            currFood.calories = Number((currFood.calories * weight) / currFood.weight);
            currFood.carbs = Number((currFood.carbs * weight) / currFood.weight);
            currFood.protein = Number((currFood.protein * weight) / currFood.weight);
            currFood.fats = Number((currFood.fats * weight) / currFood.weight);
            currFood.fibre = Number((currFood.fibre * weight) / currFood.weight);
            currFood.weight = Number(weight);

            console.log(currFood);

            this.setState({currentFood: currFood});
        }
        else {
            this.setState({currentFood: currFood})
        }
    }

    searchFood(value) {

        if (value !== "") 
        {
            let searchedArray = this.state.foods.filter((food, index) => {
                return food.name.toLowerCase().includes(value.toLowerCase());
            })

            this.setState({searchedFoods: searchedArray});
        }

        else {
            this.setState({searchedFoods: [] });
        }
    }

    componentDidMount() {

        fetch("http://localhost:8000/foods")
            .then((response => response.json()))
            .then((foodsResponse) => {
                this.setState({ foods: foodsResponse.foods });
            })
            .catch((err) => {
                console.log(err);
            })

    }

    render() {
        return (
            <div className="container">
                <div className="form-group" style={{ marginTop: "30px" }}>
                    <input className="form-control" onChange={(event) => {
                        this.searchFood(event.target.value)
                    }} placeholder="Search Food" />
                </div>
                <div className="search-result">
                    {
                        this.state.searchedFoods.map((food, index) => (
                            <div className="result" style={{ cursor: "pointer", padding: "10px" }} onClick={() => {
                                this.selectFood(food);
                            }} key={index}>
                                {food.name}
                            </div>
                        ))
                    }
                </div>

                <div className="product-display">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Calories</th>
                                <th>Protein</th>
                                <th>Carbs</th>
                                <th>Fiber</th>
                                <th>Fat</th>
                                <th>Weight</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{this.state.currentFood.name}</td>
                                <td>{this.state.currentFood.calories.toFixed(2)}</td>
                                <td>{this.state.currentFood.protein.toFixed(2)}</td>
                                <td>{this.state.currentFood.carbs.toFixed(2)}</td>
                                <td>{this.state.currentFood.fiber.toFixed(2)}</td>
                                <td>{this.state.currentFood.fats.toFixed(2)}</td>
                                <td>
                                    <input type="text" defaultValue={this.state.currentFood.weight}
                                    onChange={(event) => {
                                        this.calculateChange(Number(event.target.value));
                                    }} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>

        )

    }

}