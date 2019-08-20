$(document).ready(function() {
    const navOpts = ['Profile', 'Chat', 'Map', 'Install Me?']
    const srcOpts = ['https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js', 'https://unpkg.com/popper.js@1.12.6/dist/umd/popper.js', 'https://unpkg.com/bootstrap-material-design@4.1.1/dist/js/bootstrap-material-design.js']
    const appName = 'Chat & Listen'
    window.auth = false
    $('.navbar-toggler').hide()
    
    window.init = async function init() {
        // if already logined in, Skip to Profile
        // checkLoginStatus()
        buildScreens()
      window.addEventListener('hashchange', hashHandler, false);
      if (!window.auth) {
          location.assign(`#Login`)
          $('#Login').show()
          console.log(window.auth)
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
        console.log(brand)
        for (x of brand) {
            $(x).text(appName)
        }
        for (x of nav) {
            for (y of navOpts) {
                if (y === 'Install Me?') {
                    $(x).append(`
                    <li class="nav-item">
                        <a id="btnAdd" class="nav-link" href="#">${y}</a>
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
    }

    
    function hideScreens() {
        $(".content").hide();
        $('#navbarNav').collapse("hide")
    }
    
    function buildScreens() {
        $( "#Login" ).load( "login.html", function() {
            $("#loginForm").submit((e) => {
                e.preventDefault()
                let email = $('#emailInput').val()
                let password = $('#passwordInput').val()
                console.log(email, password)
                login(email, password)
              });
            console.log( "Load was performed." );
        });
        $( "#Profile" ).load( "profile.html", function() {
            if (window.auth) {
                console.log('should work')
                fetch('https://randomuser.me/api/').then(res => res.json()).then(res => {
                    console.log(res)
                    $('#pFName').text(res.results[0].name.first)
                    $('#pLName').text(res.results[0].name.last)
                    $('#pEmail').text(res.results[0].email)
                    $('#pUName').text(res.results[0].login.username)
                    $('#pAvi').attr('src', res.results[0].picture.large)
            }) 
        } if (window.fb.log) {
            $('#welcome').text(`Welcome, ${window.fb.res.name}`)                
            } else {
                $('#welcome').text(`Welcome, ${res.results[0].name.first}`)
            }
            console.log( "Load was performed." );
        });
        $( "#Chat" ).load( "chat.html", function() {
            // let users = []
            fetch('https://randomuser.me/api/?results=6').then(res => res.json()).then(res => {
            console.log(res)
                for (let x of res.results) {
                    $('#contactContainer').append(`
                    <li class="row mb-2">
                        <div class="col-sm-4">
                        <img src="${x.picture.medium}" class="avi-thumbnail" alt="thumbnail">
                        </div>
                        <p class="col-sm-8"><b>${x.name.first} ${x.name.last}</b>
                            <br>
                            <small class="${x.gender === 'female' ? 'text-success' : 'text-danger'}">${x.gender === 'female' ? 'online' : 'offline'}</small>
                        </p>
                    </li>
                    `)
                }
            })
            console.log( "Load was performed." );
          });
          $( "#Map" ).load( "map.html", function() {
            console.log( "Load was performed." );
        });

        // due to .load() not being able to run scripts, I added a loop to re-add them for loaded in pages. (Due to time constraints this was not opitimized to better approach.)

        for (let [i, x] of srcOpts.entries()) {
            // console.log(i, x)
            let script = document.createElement('script')
            script.src = x
            document.body.appendChild(script)
        }
        let test = document.createElement('script')
        test.append(`$(document).ready(function() { $('body').bootstrapMaterialDesign(); });`)
        document.body.appendChild(test)
        // $("body").append('thatAzz')
    }

    function login(email, password) {
        if (!email || !password) {
            return alert('please enter email and password')
        } 
        else {
            db.users.where('email').equalsIgnoreCase(email).each(user => {
                console.log(user)
                if (user.pass === password) {
                    console.log('wining')
                    window.auth = true
                    window.init()
                } else {alert('Email or password is not in  database')}
            })
        }
    }
    
    function hashHandler() {
        console.log('The hash has changed!')
        if (location.hash === '') {
            return
        }
        if (location.hash === '#Map') {
            
        }
        if (location.hash === '#Login') {
            if (window.auth) {
                location.replace('#Profile')
            }
            // console.log(window.auth)
        } 
        hideScreens()
        $(location.hash).show()        
    }
    // window.init = init()    
    window.init()

});
