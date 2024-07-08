import { addNutritionInfo  } from "../src/index.js";


document.getElementById('food-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const quantityValue = document.getElementById('quantity-number').value;
    const quantityType = document.getElementById('quantity-select').value;
    const quantity = quantityValue + ' ' + quantityType
    const foodItem = document.getElementById('food-select').value;
    const query = `${quantity} ${foodItem}`;
    const appId = '63fcc3e2'; 
    const appKey = '83674bb4d6f5e806d5e3b4132685e11d'; 

    fetch(`https://api.edamam.com/api/nutrition-data?app_id=${appId}&app_key=${appKey}&ingr=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
            if (data.totalNutrients) {
                displayNutritionInfo(data);
                document.getElementById('addNutritionInfo').addEventListener('click', function(event){
                    event.preventDefault();
                
                    addNutritionData(data)
                
                });
            } else {
                document.getElementById('nutrition-info').innerHTML = '<p>No nutritional information found.</p>';
            }
        })
        .catch(error => console.error('Error:', error));
});



function addNutritionData(data){
    const nutrients = data.totalNutrients;

    const calories = data.calories ? Math.round(data.calories) : 'N/A';
    const fat = nutrients.FAT ? `${Math.round(nutrients.FAT.quantity)}` : 'N/A';
    const carbs = nutrients.CHOCDF ? `${Math.round(nutrients.CHOCDF.quantity)}` : 'N/A';
    const protein = nutrients.PROCNT ? `${Math.round(nutrients.PROCNT.quantity)}` : 'N/A';


    const info = {
        ingredient: data.ingredients[0].text,
        calories: calories,
        fat: fat,
        carbs: carbs,
        protein: protein
    };

    addNutritionInfo(info);
    alert("Successfully added");

}

function displayNutritionInfo(data) {
    const nutrients = data.totalNutrients;

    const calories = data.calories ? Math.round(data.calories) : 'N/A';
    const fat = nutrients.FAT ? `${Math.round(nutrients.FAT.quantity)} ${nutrients.FAT.unit}` : 'N/A';
    const carbs = nutrients.CHOCDF ? `${Math.round(nutrients.CHOCDF.quantity)} ${nutrients.CHOCDF.unit}` : 'N/A';
    const protein = nutrients.PROCNT ? `${Math.round(nutrients.PROCNT.quantity)} ${nutrients.PROCNT.unit}` : 'N/A';


    const info = `
        <h2>Nutrition Information for ${data.ingredients[0].text}</h2>
        <p>Calories: ${calories}</p>
        <p>Fat: ${fat}</p>
        <p>Carbs: ${carbs}</p>
        <p>Protein: ${protein}</p>
    `;
    document.getElementById('nutrition-info').innerHTML = info;
}
