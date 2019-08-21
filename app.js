$(document).ready(function() {
    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1)
      }
    const navOpts = ['Profile', 'Chat', 'Map', 'Logout']
    const srcOpts = ['https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js', 'https://unpkg.com/popper.js@1.12.6/dist/umd/popper.js', 'https://unpkg.com/bootstrap-material-design@4.1.1/dist/js/bootstrap-material-design.js']
    const appName = 'Chat & Listen'
    let auth = false
    $('.navbar-toggler').hide()
    
    init = async function init(user=null, fb=false, logout=false) {
        // if already logined in, Skip to Profile
        // checkLoginStatus()
        // console.log(fb)
        if (fb) {
            auth = true
            // console.log(user)
        }
        if (!logout) {
            buildScreens(user, fb)
        }
      window.addEventListener('hashchange', hashHandler, false);
      if (!auth) {
          if (logout) {
              $('.nav-item').hide()
          }
        location.assign(`#Login`)
        hideScreens()
        $('#Login').show()
        // console.log(auth)
      } else {
        if (location.hash === '' || location.hash === '#Login') {
            location.hash = '#Profile'
            $(location.hash).show()
        } else { $(location.hash).show() }
        $('.navbar-toggler').show()
        setNavOpts()

      }
    }

    function setNavOpts() {
        let nav = $('nav ul')
        let brand = $('.navbar-brand')
        // console.log(brand)
        for (x of brand) {
            $(x).text(appName)
        }
        if(nav[0].children.length){
            return $('.nav-item').show()
        }
        for (x of nav) {
            // console.log(x.children)
            for (y of navOpts) {
                // if (y === 'Install Me?') {
                //     $(x).append(`
                //     <li class="nav-item">
                //         <a id="btnAdd" class="nav-link" href="#Profile">${y}</a>
                //     </li>
                //     `)    
                // } else
                if (y === 'Logout') {
                    $(x).append(`
                    <li class="nav-item">
                        <a id="" class="nav-link logout" href="#Login">${y}</a>
                    </li>
                    `) 
                } else {
                    $(x).append(`
                    <li class="nav-item">
                        <a class="nav-link" href="#${y}">${y}</a>
                    </li>
                    `)
                }
            }
        }
        $('.navbar-nav .nav-link').on('click', () => {
            $('.navbar-toggler').click()
        })
        $('.logout').on('click', () => {
            auth = false
            // console.log(auth)
            init(null, false, true)
        })   
    }

    
    function hideScreens() {
        $(".content").hide();
        $('#navbarNav').collapse("hide")
    }
    
    function buildScreens(user, fb) {
        // console.log(user, fb)
        if (!user) {
        $( "#Login" ).load( "views/login.html", function() {
            $("#loginForm").submit((e) => {
                e.preventDefault()
                let user = $('#userInput').val()
                let password = $('#passwordInput').val()
                // console.log(user, password)
                login(user, password)
                $("#loginForm")[0].reset()
              });
            // console.log( "Load was performed." );
        });
    } else
         {
            $( "#Profile" ).load( "views/profile.html", function() {
                if (fb) {
                    $('#welcome').text(`Welcome, ${user.name}`)
                    $('#pFName').text(user.first_name)
                    $('#pLName').text(user.last_name)
                    $('#pEmail').text(user.email)
                    $('#pUName').text(user.name)
                    $('#pAvi').attr('src', user.picture.data.url)
                } else if (user) {
                    $('#welcome').text(`Welcome, ${user.name.first.capitalize()}`)
                    $('#pFName').text(user.name.first.capitalize())
                    $('#pLName').text(user.name.last.capitalize())
                    $('#pEmail').text(user.email)
                    $('#pUName').text(user.login.username.capitalize())
                    $('#pAvi').attr('src', user.picture.large)
                }
                $('#messBtn').on('click', () => {
                    alert('This Function is for Premium Members only')
                })
                $('#fwBtn').on('click', () => {
                    alert('This Function is for Premium Members only')
                })
    // console.log( "Load was performed." );
            });
            $( "#Chat" ).load( "views/chat.html", function() {
                // let users = []
                db.users.each(x => {
                    if (!(x.id === user.id)) {
                        $('#contactContainer').append(`
                        <li class="row mb-2">
                            <div class="col-sm-4">
                            <img src="${x.picture.medium}" class="avi-thumbnail" alt="thumbnail">
                            </div>
                            <p class="col-sm-8"><b>${x.name.first.capitalize()} ${x.name.last.capitalize()}</b>
                                <br>
                                <small class="${x.gender === 'female' ? 'text-success' : 'text-danger'}">${x.gender === 'female' ? 'online' : 'offline'}</small>
                            </p>
                        </li>
                        `)
                    } else {
                        $('#contactContainer').append(`
                        <li class="row mb-2">
                            <div class="col-sm-4">
                            <img src="${x.picture.medium}" class="avi-thumbnail" alt="thumbnail">
                            </div>
                            <p class="col-sm-8"><b>You</b>
                                <br>
                                <small class="text-success">online</small>
                            </p>
                        </li>
                        `)
                    }
                })
    // console.log( "Load was performed." );
              });
              $( "#Map" ).load( "views/map.html", function() {
                db.users.each(x => {
                    if (!(x.id === user.id)) {
                        $('#userListMap').append(`
                            <hr/>
                            <div class="row">
                                <label class="col-3 col-sm-2 profile-label my-auto" for="userN${x.id}">User</label>
                                <p id="userN${x.id}" class="col-9 col-sm-4 my-auto">${x.login.username.capitalize()}</p>
                                <label class="col-3 col-sm-2 profile-label my-auto" for="userL${x.id}">Location</label>
                                <a href="#" id="userL${x.id}" class="col-9 col-sm-4 my-auto">${x.location.street.capitalize()+', '+x.location.city.capitalize()+', '+x.location.state.capitalize()}</a>
                            </div>
                        `)
                    } else {
                        $('#userListMap').append(`
                            <hr/>
                            <div class="row">
                                <label class="col-3 col-sm-2 profile-label my-auto" for="userN${user.id}">User</label>
                                <p id="userN${user.id}" class="col-9 col-sm-4 my-auto">${user.login.username.capitalize()}</p>
                                <label class="col-3 col-sm-2 profile-label my-auto" for="userL${user.id}">Location</label>
                                <a href="#" id="userL${user.id}" class="col-9 col-sm-4 my-auto">${user.location.street.capitalize()+', '+user.location.city.capitalize()+', '+user.location.state.capitalize()}</a>
                            </div>
                        `)
                    }
                    $(`#userL${x.id}`).on('click', () => {
                        let userPos = { lat: parseInt(x.location.coordinates.latitude), lng: parseInt(x.location.coordinates.longitude) }
                        // console.log(userPos)
                        let map = new google.maps.Map(document.getElementById('map'), {
                            center: userPos,
                            zoom: 12,
                        });
                        let marker = new google.maps.Marker({position: userPos, title: `${x.login.username}`, map: map})
                    })
                })
    // console.log( "Load was performed." );
            });
    
            // due to .loadviews/() not being able to run scripts, I added a loop to re-add them for loaded in pages. (Due to time constraints this was not opitimized to better approach.)
    
            // for (let [i, x] of srcOpts.entries()) {
                // console.log(i, x)
            //     let script = document.createElement('script')
            //     script.src = x
            //     document.body.appendChild(script)
            // }
            // let test = document.createElement('script')
            // test.append(`$(document).ready(function() { $('body').bootstrapMaterialDesign(); });`)
            // document.body.appendChild(test)
            
        }
        // $("body").append('thatAzz')
    }

    function login(user, password) {
        if (!user || !password) {
            return alert('please enter user name and password')
            // fetch('https://randomuser.me/api/').then(res => res.json()).then(res => {
            //     auth = true    
            //     init(res.results[0])
            // })
        } 
        else {
            db.users.where('login.username').equalsIgnoreCase(user).each(user => {
                // console.log(user)
                if (user.login.password === password) {
                    // console.log('wining')
                    auth = true
                    return init(user)
                }
            })
            return alert('User Name or password is not in  database')
        }
    }
    
    function hashHandler() {
        // console.log('The hash has changed!')
        if (location.hash === '') {
            return
        }
        if (location.hash === '#Chat') {
            if (!auth) {
                location.replace('#Login')
            }
        }
        if (location.hash === '#Profile') {
            if (!auth) {
                location.replace('#Login')
            }
        }
        if (location.hash === '#Map') {
            if (!auth) {
                location.replace('#Login')
            }
        }
        if (location.hash === '#Login') {
            if (auth) {
                location.replace('#Profile')
            }
            // console.log(auth)
        } 
        hideScreens()
        $(location.hash).show()        
    }

    
    // PWA Prompt Handling
    let deferredPrompt;
    let btnAdd = document.querySelector('#btnAdd')
    window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI notify the user they can add to home screen
    btnAdd.style.display = 'block';
  });
  
  btnAdd.addEventListener('click', (e) => {
    // hide our user interface that shows our A2HS button
    btnAdd.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
        //   console.log('User accepted the A2HS prompt');
        } else {
        //   console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });
  });

    init()

});
