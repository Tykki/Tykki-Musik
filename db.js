    let db = new Dexie('musikDb');
    
    db.version(1).stores({
        users: 'usrId,usrName,pass,fname,lname,email,favSong',
        chats: 'msg, usrId'
    });
    
    // Put some data into it
    db.users.put({usrId: 1, usrName: "Supreme", pass: 'Dream1', fname: 'Tykki', lname: 'Mikki', email: 'tykki@mikki.com', favSong: 'Costa Rica by Dreamville'});

// Display Data
// db.foods.each((food) => {
//   console.log(food.name);
//   if (food.mealType === 'breakfast') {
//     document.querySelector('#breakfastList>div.list-group.list-group-flush').innerHTML += `<a href="#${food.name.replace(/ /g,'')}" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">${food.name}
//       <span class="badge badge-primary badge-pill">${food.amount}</span>
//       </a>`
//   }
//   if (food.mealType === 'lunch/dinner') {
//     document.querySelector('#lunDinList>div.list-group.list-group-flush').innerHTML += `<a href="#${food.name.replace(/ /g,'')}" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">${food.name}
//       <span class="badge badge-primary badge-pill">${food.amount}</span>
//       </a>`
//   }
//   if (food.mealType === 'snack') {
//     document.querySelector('#snacksList>div.list-group.list-group-flush').innerHTML += `<a href="#${food.name.replace(/ /g,'')}" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">${food.name}
//     <span class="badge badge-primary badge-pill">${food.amount}</span>
//     </a>`
//   }
//   document.getElementById("allFoodsList").innerHTML += `<a href="#${food.name.replace(/ /g,'')}" class="list-group-item list-group-item-action">${food.name} - ${food.foodType}</a>`
// });

// db.drinks.each((drink) => {
//   console.log(drink.name);
//   document.querySelector('#drinksList>div.list-group.list-group-flush').innerHTML += `<a href="#${drink.name.replace(/ /g,'')}" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">${drink.name}
//     <span class="badge badge-primary badge-pill">${drink.amount}</span>
//     </a>`        
//   document.getElementById("allDrinksList").innerHTML += `<a href="#${drink.name.replace(/ /g,'')}" class="list-group-item list-group-item-action">${drink.name} - ${drink.alcoholic === 'true' ? 'alcoholic' : 'non-alcoholic'}</a>`
// });