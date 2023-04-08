
function loadFromLocalStorage(){
    const cuidFromStorage = localStorage.getItem("cuid");
    if(cuidFromStorage !== null && cuidFromStorage!== ""){
        document.getElementById("cuid").value = cuidFromStorage;
        setWebEngageCUID(cuidFromStorage)
        document.getElementById("cuid").disabled = true;
        if(localStorage.getItem("fname") != ""){
            document.getElementById("fname").value = localStorage.getItem("fname");
        }
        if(localStorage.getItem("sname") != ""){
            document.getElementById("sname").value = localStorage.getItem("sname");
        }
        if(localStorage.getItem("phone") != ""){
            document.getElementById("phone").value = localStorage.getItem("phone");
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
        setWebEngageCUID(cuid);
    }
    if(fname != ""){
        setWebEngageAttributes("we_first_name",fname);
    }
    if(sname != ""){
        setWebEngageAttributes("we_second_name",sname);
    }
    if(phone != ""){
        setWebEngageAttributes("we_phone",phone);
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

function logout(){
    webengage.user.logout();
    clearLocalStorage();
}

function clearLocalStorage(){
    localStorage.removeItem("cuid");
    localStorage.removeItem("fname");
    localStorage.removeItem("sname");
    localStorage.removeItem("phone");
}

function storeInLocalStorage(key, value){
    localStorage.setItem(key, value);
}