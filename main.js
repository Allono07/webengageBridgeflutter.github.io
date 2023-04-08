
function loadFromLocalStorage(){
    const cuidFromStorage = sessionStorage.getItem("cuid");
    if(cuidFromStorage !== null && cuidFromStorage!== ""){
        document.getElementById("cuid").value = cuidFromStorage;
        setWebEngageCUID(cuidFromStorage)
        document.getElementById("login_button").disabled = true;
        document.getElementById("logout_button").disabled = false;
        document.getElementById("cuid").disabled = true;
        if(sessionStorage .getItem("fname") !== ""){
            document.getElementById("fname").value = sessionStorage.getItem("fname");
        }
        if(sessionStorage.getItem("sname") !== ""){
            document.getElementById("sname").value = sessionStorage.getItem("sname");
        }
        if(sessionStorage.getItem("phone") !== ""){
            document.getElementById("phone").value = sessionStorage.getItem("phone");
        }
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
        storeInSessionStorage("cuid",cuid)
    }
    if(fname != ""){
        setWebEngageAttributes("we_first_name",fname);
        storeInSessionStorage("fname",fname)
    }
    if(sname !== ""){
        setWebEngageAttributes("we_second_name",sname);
        storeInSessionStorage("sname",sname)
    }
    if(phone !== ""){
        setWebEngageAttributes("we_phone",phone);
        storeInSessionStorage("phone",phone)
    }
}

function validate(cuid){
    if(cuid !== ""){
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
    clearSessionStorage();
}

function clearSessionStorage(){
    sessionStorage.removeItem("cuid");
    sessionStorage.removeItem("fname");
    sessionStorage.removeItem("sname");
    sessionStorage.removeItem("phone");
}

function storeInSessionStorage(key, value){
    console.log("storing ",key," with value ",value," in local storage")
    sessionStorage.setItem(key, value);
}

