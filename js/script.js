
/*.............ChatGPT Function..........*/
const apiKey = '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';
const apiUrl = 'https://api.openai.com/v1/chat/completions';

  let input = document.getElementById("bname");
  input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("myBtn").click();
  }
});

// Function to call the ChatGPT API
function callChatGPT() {
    let userdata = document.getElementById("bname").value;
    let prompt = "Key Takeaways from" + userdata;
    if (userdata.length > 3) {
    reqChatGPT(prompt);
} else {
  alert("Please Enter Valid Book Name");
}
}

async function reqChatGPT(prompt) {
  displayLoading();
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo', 
      messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: prompt }],
    }),
  };

  const response = await fetch(apiUrl, requestOptions);
  const data = await response.json(); 
  const paragraph = data.choices[0].message.content; 
  hideLoading();
  
  let userdata = document.getElementById("bname").value;
  let uservalue = userdata.bold().toUpperCase();
  const preprompt = `The Key-Takeaways from ${uservalue} are:`;
  document.getElementById("result").innerHTML = preprompt + "<br><br>" + paragraph;
  document.getElementById("result").style.display = "block";
}

function display(paragraph) {
  let userdata = document.getElementById("bname").value;
  let uservalue = userdata.bold().toUpperCase();
  const preprompt = `The Key-Takeaways from ${uservalue} are:`;
  bname.value = " "
  let len = paragraph.length;
  const sentences = [];
  let start = 0
  for (let i = 0; i < len; i++) {
      if (paragraph[i] == ".") {
          const sentence = paragraph.substring(start, i + 1).trim()
          sentences.push(sentence)
          start = i + 1
      }
  }
  let output = ""
  sentences.forEach(myfunction);
  function myfunction(value) {
    if (value.length>=5) {
      output += value + "<br>"
    } else {
  output += value + " "
    }
  }
  document.getElementById("result").style.textAlign = "justify";
  document.getElementById("result").innerHTML = preprompt + "<br><br>" + output; 

}

//............Loader.........

const loader = document.querySelector("#loading");

function displayLoading() {
  loader.classList.add("display");
}
  
function hideLoading() {
  loader.classList.remove("display");
}
//............Carousel.........

$(document).ready(function () {
    $(".c-3d-carousel__item").on("click", function () {
      $(this).prop("class", "c-3d-carousel__item c-3d-carousel__item-active");
      let activeSlide = $(this).data("slide");
      $(this)
        .siblings()
        .each(function () {
          let slideNumber = $(this).data("slide");
  
          if (slideNumber <= activeSlide) {
            $(this).attr(
              "class",
              "c-3d-carousel__item c-3d-carousel__item-before c-3d-carousel__item-before--" +
                (activeSlide - slideNumber)
            );
          } else {
            $(this).prop(
              "class",
              "c-3d-carousel__item c-3d-carousel__item-after c-3d-carousel__item-after--" +
                (slideNumber - activeSlide)
            );
          }
        });
    });
  
    $(".next").on("click", function (i) {
      $(".c-3d-carousel__item-active").next().click();
    });
  
    $(".prev").on("click", function (i) {
      $(".c-3d-carousel__item-active").prev().click();
    });
  });
  
//..............sidebarwrapper.........

window.addEventListener('DOMContentLoaded', event => {

    const sidebarWrapper = document.getElementById('sidebar-wrapper');
    let scrollToTopVisible = false;
    // Closes the sidebar menu
    const menuToggle = document.body.querySelector('.menu-toggle');
    menuToggle.addEventListener('click', event => {
        event.preventDefault();
        sidebarWrapper.classList.toggle('active');
        _toggleMenuIcon();
        menuToggle.classList.toggle('active');
    })

    // Closes responsive menu when a scroll trigger link is clicked
    var scrollTriggerList = [].slice.call(document.querySelectorAll('#sidebar-wrapper .js-scroll-trigger'));
    scrollTriggerList.map(scrollTrigger => {
        scrollTrigger.addEventListener('click', () => {
            sidebarWrapper.classList.remove('active');
            menuToggle.classList.remove('active');
            _toggleMenuIcon();
        })
    });

    function _toggleMenuIcon() {
        const menuToggleBars = document.body.querySelector('.menu-toggle > .fa-bars');
        const menuToggleTimes = document.body.querySelector('.menu-toggle > .fa-xmark');
        if (menuToggleBars) {
            menuToggleBars.classList.remove('fa-bars');
            menuToggleBars.classList.add('fa-xmark');
        }
        if (menuToggleTimes) {
            menuToggleTimes.classList.remove('fa-xmark');
            menuToggleTimes.classList.add('fa-bars');
        }
    }

    //.................. Scroll to top button appear...............
    document.addEventListener('scroll', () => {
        const scrollToTop = document.body.querySelector('.scroll-to-top');
        if (document.documentElement.scrollTop > 2000) {
            if (!scrollToTopVisible) {
                fadeIn(scrollToTop);
                scrollToTopVisible = true;
            }
        } else {
            if (scrollToTopVisible) {
                fadeOut(scrollToTop);
                scrollToTopVisible = false;
            }
        }
    })
})

function scrollToTop() {
  window.scrollTo(0, 0);
}

function fadeOut(el) {
    el.style.opacity = 1;
    (function fade() {
        if ((el.style.opacity -= .1) < 0) {
            el.style.display = "none";
        } else {
            requestAnimationFrame(fade);
        }
    })();
};

function fadeIn(el, display) {
    el.style.opacity = 0;
    el.style.display = display || "block";
    (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += .1) > 1)) {
            el.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
};

//-----------------Display Categories----------------


async function displayNovels() {
  document.getElementById("novels").style.display = "block";
  document.getElementById("lifelesson").style.display = "none";
  document.getElementById("biography").style.display = "none";
  document.getElementById("motivation").style.display = "none";
  document.getElementById("stockmarket").style.display = "none";
  document.getElementById("finance").style.display = "none";
  
  const response = await fetch('Category1.json');
  const data = await response.json();
  document.getElementById("novel1").innerHTML = data.noveltopic1;
  document.getElementById("novel2").innerHTML = data.noveltopic2;
  document.getElementById("novel3").innerHTML = data.noveltopic3;
  document.getElementById("novel4").innerHTML = data.noveltopic4;
  document.getElementById("novel5").innerHTML = data.noveltopic5;
  document.getElementById("novel6").innerHTML = data.noveltopic6;
  document.getElementById("novel7").innerHTML = data.noveltopic7;
  document.getElementById("novel8").innerHTML = data.noveltopic8;
  document.getElementById("novel9").innerHTML = data.noveltopic9;
  document.getElementById("novel10").innerHTML = data.noveltopic10;
}

async function displayLifelesson() {
  document.getElementById("novels").style.display = "none";
  document.getElementById("lifelesson").style.display = "block";
  document.getElementById("biography").style.display = "none";
  document.getElementById("motivation").style.display = "none";
  document.getElementById("stockmarket").style.display = "none";
  document.getElementById("finance").style.display = "none";
  
  const response = await fetch('Category1.json');
  const data = await response.json();
  document.getElementById("lifelesson1").innerHTML = data.lifelessontopic1;
  document.getElementById("lifelesson2").innerHTML = data.lifelessontopic2;
  document.getElementById("lifelesson3").innerHTML = data.lifelessontopic3;
  document.getElementById("lifelesson4").innerHTML = data.lifelessontopic4;
  document.getElementById("lifelesson5").innerHTML = data.lifelessontopic5;
  document.getElementById("lifelesson6").innerHTML = data.lifelessontopic6;
  document.getElementById("lifelesson7").innerHTML = data.lifelessontopic7;
  document.getElementById("lifelesson8").innerHTML = data.lifelessontopic8;
  document.getElementById("lifelesson9").innerHTML = data.lifelessontopic9;
  document.getElementById("lifelesson10").innerHTML = data.lifelessontopic10;
}


async function displayBiography() {
  document.getElementById("novels").style.display = "none";
  document.getElementById("lifelesson").style.display = "none";
  document.getElementById("biography").style.display = "block";
  document.getElementById("motivation").style.display = "none";
  document.getElementById("stockmarket").style.display = "none";
  document.getElementById("finance").style.display = "none";
  
  const response = await fetch('Category1.json');
  const data = await response.json();
  document.getElementById("biography1").innerHTML = data.biographytopic1;
  document.getElementById("biography2").innerHTML = data.biographytopic2;
  document.getElementById("biography3").innerHTML = data.biographytopic3;
  document.getElementById("biography4").innerHTML = data.biographytopic4;
  document.getElementById("biography5").innerHTML = data.biographytopic5;
  document.getElementById("biography6").innerHTML = data.biographytopic6;
  document.getElementById("biography7").innerHTML = data.biographytopic7;
  document.getElementById("biography8").innerHTML = data.biographytopic8;
  document.getElementById("biography9").innerHTML = data.biographytopic9;
  document.getElementById("biography10").innerHTML = data.biographytopic10;

}

async function displayMotivation() {
  document.getElementById("novels").style.display = "none";
  document.getElementById("lifelesson").style.display = "none";
  document.getElementById("biography").style.display = "none";
  document.getElementById("motivation").style.display = "block";
  document.getElementById("stockmarket").style.display = "none";
  document.getElementById("finance").style.display = "none";
  
  const response = await fetch('Category1.json');
  const data = await response.json();
  document.getElementById("motivation1").innerHTML = data.motivationtopic1;
  document.getElementById("motivation2").innerHTML = data.motivationtopic2;
  document.getElementById("motivation3").innerHTML = data.motivationtopic3;
  document.getElementById("motivation4").innerHTML = data.motivationtopic4;
  document.getElementById("motivation5").innerHTML = data.motivationtopic5;
  document.getElementById("motivation6").innerHTML = data.motivationtopic6;
  document.getElementById("motivation7").innerHTML = data.motivationtopic7;
  document.getElementById("motivation8").innerHTML = data.motivationtopic8;
  document.getElementById("motivation9").innerHTML = data.motivationtopic9;
  document.getElementById("motivation10").innerHTML = data.motivationtopic10;

}



async function displayStocks() {
  document.getElementById("novels").style.display = "none";
  document.getElementById("lifelesson").style.display = "none";
  document.getElementById("biography").style.display = "none";
  document.getElementById("motivation").style.display = "none";
  document.getElementById("stockmarket").style.display = "block";
  document.getElementById("finance").style.display = "none";
  
  const response = await fetch('Category1.json');
  const data = await response.json();
  document.getElementById("stocks1").innerHTML = data.stockstopic1;
  document.getElementById("stocks2").innerHTML = data.stockstopic2;
  document.getElementById("stocks3").innerHTML = data.stockstopic3;
  document.getElementById("stocks4").innerHTML = data.stockstopic4;
  document.getElementById("stocks5").innerHTML = data.stockstopic5;
  document.getElementById("stocks6").innerHTML = data.stockstopic6;
  document.getElementById("stocks7").innerHTML = data.stockstopic7;
  document.getElementById("stocks8").innerHTML = data.stockstopic8;
  document.getElementById("stocks9").innerHTML = data.stockstopic9;
  document.getElementById("stocks10").innerHTML = data.stockstopic10;

}



async function displayFinance() {
  document.getElementById("novels").style.display = "none";
  document.getElementById("lifelesson").style.display = "none";
  document.getElementById("biography").style.display = "none";
  document.getElementById("motivation").style.display = "none";
  document.getElementById("stockmarket").style.display = "none";
  document.getElementById("finance").style.display = "block";
  
  const response = await fetch('Category1.json');
  const data = await response.json();
  document.getElementById("finance1").innerHTML = data.financetopic1;
  document.getElementById("finance2").innerHTML = data.financetopic2;
  document.getElementById("finance3").innerHTML = data.financetopic3;
  document.getElementById("finance4").innerHTML = data.financetopic4;
  document.getElementById("finance5").innerHTML = data.financetopic5;
  document.getElementById("finance6").innerHTML = data.financetopic6;
  document.getElementById("finance7").innerHTML = data.financetopic7;
  document.getElementById("finance8").innerHTML = data.financetopic8;
  document.getElementById("finance9").innerHTML = data.financetopic9;
  document.getElementById("finance10").innerHTML = data.financetopic10;
} 


async function displaymostviewed(para) {
  const response = await fetch('Category1.json');
  const data = await response.json(); 
  document.getElementById("mostviewed").style.display = "block";
  document.getElementById("mostviewed").innerHTML = data[para]; 
  console.log(data[para])
}  

