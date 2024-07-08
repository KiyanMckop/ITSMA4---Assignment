import { getAllItems } from "../src/index.js"

document.addEventListener('DOMContentLoaded', async () => {
    try {
      const items = await getAllItems();

      const dates = []
      const ids = []

      const viewDataContainer = document.getElementById('viewDataContainer');

      for (let b = 0; b < items.length; b++){

        console.log(items[b].id);
        dates.push(items[b].id)

        const dateContainer = document.createElement('div')
        dateContainer.className = 'row'
        dateContainer.style = 'margin-bottom: 10px; '
        const dateLabel = document.createElement('p')
        dateLabel.className = 'label'
        dateLabel.innerText = items[b].id;
        dateContainer.appendChild(dateLabel);

        viewDataContainer.appendChild(dateContainer);


        const category = Object.keys(items[b]);
        for (let i = 1; i < category.length; i++){
            ids.push(category[i]);
        }

        //all entries for a specific date
        for (let a = 0; a < ids.length; a++){
            console.log(items[b][ids[a]].carbs);
            const dataContainer = document.createElement('div');
            dataContainer.className = 'row';

            const ingredientLabel = document.createElement('p');
            ingredientLabel.className = 'label';
            ingredientLabel.innerText = items[b][ids[a]].ingredient;
            
            const caloriesLabel = document.createElement('p');
            caloriesLabel.className = 'label';
            caloriesLabel.innerText = items[b][ids[a]].calories;

            const fatLabel = document.createElement('p');
            fatLabel.className = 'label';
            fatLabel.innerText = items[b][ids[a]].fat;

            const carbsLabel = document.createElement('p');
            carbsLabel.className = 'label';
            carbsLabel.innerText = items[b][ids[a]].carbs;

            const proteinLabel = document.createElement('p');
            proteinLabel.className = 'label';
            proteinLabel.innerText = items[b][ids[a]].protein;

            dataContainer.append(ingredientLabel,
                                      caloriesLabel, 
                                      fatLabel,
                                      carbsLabel, 
                                      proteinLabel)

            viewDataContainer.appendChild(dataContainer);

        }



    }



    } catch (error) {
        console.error('Error getting items:', error);
    }
});