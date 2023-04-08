
function loadFromLocalStorage(){
    const cuidFromStorage = localStorage.getItem("cuid");
    if(cuidFromStorage !== null && cuidFromStorage!== ""){
        document.getElementById("cuid").value = cuidFromStorage;
        setWebEngageCUID(cuidFromStorage)
        document.getElementById("login_button").disabled = true;
        document.getElementById("logout_button").disabled = false;
        document.getElementById("cuid").disabled = true;
        if(localStorage .getItem("fname") !== ""){
            document.getElementById("fname").value = localStorage.getItem("fname");
        }
        if(localStorage.getItem("sname") !== ""){
            document.getElementById("sname").value = localStorage.getItem("sname");
        }
        if(localStorage.getItem("phone") !== ""){
            document.getElementById("phone").value = localStorage.getItem("phone");
        }
    }
    else{
        document.getElementById("login_button").disabled = false;
        document.getElementById("logout_button").disabled = true;
    }
}

function onFormSubmit(){
    const fname = document.getElementById("fname").value;
    const sname = document.getElementById("sname").value;
    const phone = document.getElementById("phone").value;
    const cuid = document.getElementById("cuid").value;
    console.log("fname -> ",fname);
    console.log("sname -> ",sname);
    console.log("phone -> ",phone);
    console.log("cuid -> ",cuid);
    isValid = validate(cuid);
    console.log("isValid -> ",isValid);

    if(isValid===true){
        document.getElementById("login_button").disabled = true;
        document.getElementById("logout_button").disabled = false;
        document.getElementById("cuid").disabled = false;
        setWebEngageCUID(cuid);
        storeInLocalStorage("cuid",cuid)
    }
    if(fname != ""){
        setWebEngageAttributes("we_first_name",fname);
        storeInLocalStorage("fname",fname)
    }
    if(sname !== ""){
        setWebEngageAttributes("we_second_name",sname);
        storeInLocalStorage("sname",sname)
    }
    if(phone !== ""){
        setWebEngageAttributes("we_phone",phone);
        storeInLocalStorage("phone",phone)
    }
}

function validate(string){
    if(string !== ""){
        return true;        
    }
    return false;
}

function setWebEngageAttributes(key, value){
    webengage.user.setAttribute(key, value);
}

function setWebEngageCUID(cuid){
    webengage.user.login(cuid)
}

function onLogout(){
    document.getElementById("logout_button").disabled = true;
    document.getElementById("login_button").disabled = false;
    document.getElementById("cuid").disabled = false;
    webengage.user.logout();
    clearLocalStorage();
}

function clearSessionStorage(){
    localStorage.removeItem("cuid");
    localStorage.removeItem("fname");
    localStorage.removeItem("sname");
    localStorage.removeItem("phone");
}

function storeInLocalStorage(key, value){
    console.log("storing ",key," with value ",value," in local storage")
    localStorage.setItem(key, value);
}

function onEventClick(){
    let eventName = document.getElementById("event_name").value;
    let eventData = document.getElementById("event_data").value;
    if(validate(eventName) === true){
        webengage.analytics.track(eventData, eventData);
    }
}
