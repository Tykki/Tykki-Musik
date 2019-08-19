$(document).ready(function() {
    const navOpts = ['Profile', 'Chat', 'Map', 'Install Me?']
    const srcOpts = ['https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js', 'https://unpkg.com/popper.js@1.12.6/dist/umd/popper.js', 'https://unpkg.com/bootstrap-material-design@4.1.1/dist/js/bootstrap-material-design.js']
    const appName = 'Chat & Listen'
    let auth = true
    $('.navbar-toggler').hide()
    
    async function init() {
        buildScreens()
      window.addEventListener('hashchange', hashHandler, false);
      if (!auth) {
          location.assign(`#Login`)
          $('#Login').show()
          console.log(auth)
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
                auth = true
                // console.log(auth) 
                init()
                // login(email, password)
                
              });
            console.log( "Load was performed." );
        });
        $( "#Profile" ).load( "profile.html", function() {
            // $.getScript("scripts.html")
            console.log( "Load was performed." );
        });
        $( "#Chat" ).load( "chat.html", function() {
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
    
    function hashHandler() {
        console.log('The hash has changed!')
        if (location.hash === '') {
            return
        }
        if (location.hash === '#Map') {
            
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
    
    var socket = new WebSocket('wss://localhost:8000');
    
    socket.onopen = function (event) {
        socket.send("Here's some text that the server is urgently awaiting!"); 
      };

    init()


});
