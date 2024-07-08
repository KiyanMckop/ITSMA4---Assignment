import { getAllItems } from "../src/index.js"

document.addEventListener('DOMContentLoaded', async () => {
    try {
      const items = await getAllItems();

      const dates = []
      const ids = []

      const viewDataContainer = document.getElementById('viewDataContainer');

      for (let b = 0; b < items.length; b++){

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


        const lastDate = items.length - 1;
        console.log(lastDate)

        const category = Object.keys(items[lastDate]);
        for (let i = 1; i < category.length; i++){
            ids.push(category[i]);
        }

        let totalCalories = 0
        let totalCarbs = 0;
        let totalFats = 0
        let totalProtein = 0;

        //all entries for a specific date
        for (let a = 0; a < ids.length; a++){

            totalCalories = totalCalories + Number(items[lastDate][ids[a]].calories);
            totalCarbs = totalCarbs + Number(items[lastDate][ids[a]].carbs);
            totalFats = totalFats + items[lastDate][ids[a]].fat;
            totalProtein = totalProtein + items[lastDate][ids[a]].protein;

        }

        console.log(totalFats);


        // Chart 3: Doughnut Chart
        var ctx3 = document.getElementById('chart1').getContext('2d');
        var chart3 = new Chart(ctx3, {
            type: 'doughnut',
            data: {
                labels: ['Calories', 'Carbs', 'Fats', 'Protein'],
                datasets: [{
                    data: [totalCalories, totalCarbs, totalFats, totalProtein],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {}
        });

    } catch (error) {
        console.error('Error getting items:', error);
    }
});