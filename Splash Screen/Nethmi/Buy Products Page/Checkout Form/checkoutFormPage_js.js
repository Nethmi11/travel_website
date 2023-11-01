// getting total from the previous page
let cartpageTotal =localStorage.getItem('checkoutTotal');
console.log('checkoutTotal', cartpageTotal);

let subtotal = document.getElementById('total');
subtotal.textContent = cartpageTotal;

let subtotal$remove = parseInt(cartpageTotal.replace('$',''));
console.log(subtotal$remove);

let shipping = document.getElementById('shipping');
let ship = shipping.textContent.replace('$','');

let finaltot = (subtotal$remove) + parseInt(ship);
console.log(finaltot);
let tot = document.getElementById("tot");
tot.textContent = '$' +finaltot;


//For validating inputs in form
const name = document.getElementById('name');
const namecard = document.getElementById('namecard');
const email = document.getElementById('email');
const zip = document.getElementById('zip');
const creditCard = document.getElementById('creditcardnum');
const cvv = document.getElementById('cvv');
const address = document.getElementById('address');
const month = document.getElementById('month');
const year = document.getElementById('year');
const country = document.getElementById('country');
const submitBtn = document.getElementById('submit-button');


//when the submit-button is clicked
submitBtn.addEventListener('click', e => {
    console.log('here')
    e.preventDefault();
    if (inputValidation()) {
        resetForms();
        alert('Thank you! Your order has been placed');
        window.location.href="../Product Page.html";
    }
});

function setError(element,message){
    const inputBox = element.parentElement;
    const errorMessage = inputBox.querySelector('.errorMsg');
    console.log(element)
    console.log(errorMessage)


    errorMessage.innerText = message;
    inputBox.classList.add('error');
    inputBox.classList.remove('success');
};

function setSuccess(element){
    const inputBox = element.parentElement;
    const errorMessage = inputBox.querySelector('.errorMsg');

    errorMessage.innerText = '';
    inputBox.classList.add('success');
    inputBox.classList.remove('error');
};

function ValidEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

//validating inputs function
function inputValidation(){
    const nameValue = name.value;
    const namecardValue = namecard.value;
    const emailValue = email.value.trim();
    const zipValue = zip.value.trim();
    const creditCardValue = creditCard.value.trim();
    const cvvValue = cvv.value.trim();
    const addressValue = address.value;
    const yearValue = year.value.trim();
    const monthValue = month.value.trim();
    const countryValue = country.value;

    let valid = true;

    if (nameValue === ""){
        setError(name, 'Cannot be blank');
        valid = false;
    }else if (!/^[a-zA-Z\s]*$/.test(nameValue)) {
        setError(name, 'Invalid');
        valid = false;
    } else {
        setSuccess(name);
    }

    if (namecardValue === ""){
        setError(namecard, 'Cannot be blank');
        valid = false;
    } else if (!/^[a-zA-Z\s]*$/.test(namecardValue)) {
        setError(namecard, 'Invalid');
        valid = false;
    } else {
        setSuccess(namecard);
    }


    if (emailValue === ""){
        setError(email, 'Cannot be blank');
        valid = false;
    }else if (!ValidEmail(emailValue)) {
        setError(email, 'Invalid,provide a valid email address');
        valid = false;
    } else {
        setSuccess(email);
    }


    if (zipValue === ""){
        setError(zip, 'Cannot be blank');
        valid = false;
    }else if (!/^\d{5}$/.test(zipValue)) {
        setError(zip, 'Invalid, enter 5-digit zip code');
        valid = false;
    } else {
        setSuccess(zip);
    }


    if (creditCardValue === ""){
        setError(creditCard, 'Cannot be blank');
        valid = false;
    }else if (!/^\d{16}$/.test(creditCardValue)) {
        setError(creditCard, 'Invalid, enter 16-digit credit card number');
        valid = false;
    } else {
        setSuccess(creditCard);
    }


    if (cvvValue === ""){
        setError(cvv, 'Cannot be blank');
        valid = false;
    }else if (!/^\d{3}$/.test(cvvValue)) {
        setError(cvv, 'Invalid, enter 3-digit cvv code');
        valid = false;
    } else {
        setSuccess(cvv);
    }

    if (addressValue === ""){
        setError(address, 'Cannot be blank');
        valid = false;
    }else{
        setSuccess(address);
    }


    if (yearValue === ""){
        setError(year, 'Cannot be blank');
        valid = false;
    }else if (!/^(202[3-9])$/.test(yearValue)){
        setError(year, 'Invalid');
        valid = false;
    }else {
        setSuccess(year);
    }


    if (monthValue === ""){
        setError(month, 'Cannot be blank');
        valid = false;
    }else if (!/^(0?[1-9]|1[0-2])$/.test(monthValue)) {
        setError(month, 'Invalid, enter number (1 - 12)');
        valid = false;
    } else {
        setSuccess(month);
    }

    if (countryValue === ""){
        setError(country, 'Cannot be blank');
        valid = false;
    }else{
        setSuccess(country);
    }

    if (valid) {
        return true;
    }

};



function resetForms() {
    let forms = document.getElementsByTagName("form");
    for (let i = 0; i < forms.length; i++) {
        forms[i].reset();
        let inputBoxes = forms[i].getElementsByClassName('inputBox');
        for(let j= 0; j< inputBoxes.length;j++){
            console.log('inputBoxes[j]');
            inputBoxes[j].classList.remove('success');
        }
    }    

    const totRemove=document.getElementById('tot');
    totRemove.textContent='$0';
    const subtotalRemove = document.getElementById('total');
    subtotalRemove.textContent='$0';
    const shippingRemove = document.getElementById('shipping');
    shippingRemove.textContent = '$0';
    
} 

