let userList = []
var db = new Dexie("musik");
db.version(1).stores({
    users: 'id,name.first,name.last,name.title,gender,location.street,location.city,location.state,location.postcode,location.coordinates.latitude,location.coordinates.longitude,timezone.offset,timezone.description,email,login.username,login.password,dob.date,dob.age,registered.date,registered.age,phone,cell,picture.large,picture.medium,picture.thumbnail,nat'
});

fetch('https://randomuser.me/api/?results=6').then(res => res.json()).then(res => {
    for (const [i,x] of res.results.entries()){
        x.id = i
    }
    db.users.bulkPut(res.results).then(() => {
        console.log(res)
        $('#fbBtn').show()
        db.users.each(user => {
            $('#userList').append(`
            <div class="row">
                <label class="col-3 col-sm-2 profile-label" for="userN${user.id}">User</label>
                <p id="userN${user.id}" class="col-9 col-sm-4">${user.login.username}</p>
                <label class="col-3 col-sm-3 profile-label" for="userP${user.id}">Password</label>
                <p id="userP${user.id}" class="col-9 col-sm-3">${user.login.password}</p>
            </div>
            `)
        })

    }).catch(Dexie.BulkError, function (e) {
        // Explicitely catching the bulkAdd() operation makes those successful
        // additions commit despite that there were errors.
        console.error (e);
    });
}).catch(err => {
    console.log(err)
    db.users.each(user =>{
        $('#userList').append(`
            <div class="row">
                <label class="col-3 col-sm-2 profile-label" for="userN${user.id}">User</label>
                <p id="userN${user.id}" class="col-9 col-sm-4">${user.login.username}</p>
                <label class="col-3 col-sm-3 profile-label" for="userP${user.id}">Password</label>
                <p id="userP${user.id}" class="col-9 col-sm-3">${user.login.password}</p>
            </div>
            `)
    })

})



    // let db = new Dexie('musikDb');
    
    // db.version(1).stores({
    //     users: 'usrId,usrName,pass,fname,lname,email,favSong',
    //     chats: 'msg, usrId'
    // });
    
    // // Put some data into it
    // db.users.put({usrId: 1, usrName: "Supreme", pass: 'Dream1', fname: 'Tykki', lname: 'Mikki', email: 'tykki@mikki.com', favSong: 'Costa Rica by Dreamville'});

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