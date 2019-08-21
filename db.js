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
        // console.log(res)
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
    // console.log(err)
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
