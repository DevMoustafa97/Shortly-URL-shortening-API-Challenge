// mobile nav 

let mobileNav = document.querySelector('.mobile-nav');
let menuBtn = document.querySelector('#menu')
mobileNav.style.display = "none"
function toggleMenu (){
}

menuBtn.addEventListener('click',()=>{
    if(mobileNav.style.display == 'none'){
        mobileNav.style.display = "flex";

    }else {
        mobileNav.style.display = 'none'
    }

})


  var httpRequest;
  var form = document.getElementById("short-form")
  form.addEventListener('submit', (e)=>{makeRequest(e)});

  function makeRequest(e) {
    e.preventDefault()
    httpRequest = new XMLHttpRequest();
    
    if (!httpRequest) {
        alert('Giving up :( Cannot create an XMLHTTP instance');
        return false;
    }
    httpRequest.onreadystatechange = alertContents;
    var url = e.target.url.value + "";
    httpRequest.open('POST', 'https://rel.ink/api/links/' ,true);
    httpRequest.setRequestHeader('content-Type','application/json')
    var st = JSON.stringify({'url':url})
    httpRequest.send(st);
  }

  let hashids = []
  function alertContents() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        response = JSON.parse(httpRequest.responseText)
        if (hashids.includes(response.hashid)){alert('This URL is already shorted !')}else {

            let template = `<div>
            <p>${response.url}</p>
            <div>
            <a href="${response.url}" target="_blank" class="res-link">https://rel.ink/${response.hashid}</a>
            <button class="btn-copy">Copy</button>
            </div>
            </div>`
            document.querySelector('.result').innerHTML += template
            hashids.push(response.hashid)
            let copybtns = document.querySelectorAll('.btn-copy')
            copybtns.forEach(btn =>{
                btn.addEventListener('click',(e)=>{ copy(e) })
            })
        }
    }
  }

  function copy(e) {
    /* Get the text field */

    var copyText = e.target.parentNode.querySelector('.res-link').innerHTML;

  /* Select the text field */
    
    var dummy = document.createElement("textarea");
    // to avoid breaking orgain page when copying more words
    // cant copy when adding below this code
    // dummy.style.display = 'none'
    document.body.appendChild(dummy);
    //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
    dummy.value = copyText;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  /* Copy the text inside the text field */

  /* Alert the copied text */
  alert("Copied the text: " + copyText);
    e.target.style.backgroundColor = "#3b3054"
    e.target.innerHTML = "Copied!"
    
  }
  
