console.log('connecteed');
const loadPhone = async (SearchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${SearchText}`);
    const data = await res.json();
    const phones = data.data;
    // const phones = data.data;
    // console.log(phones);
    displayPhones(phones,isShowAll);
}
const displayPhones = (phones_data,isShowAll) => {
    // console.log(parameter);
    const phoneContainerElement = document.getElementById('phone-container');
    
    //s-5: clear phone container cards before and search area 
    phoneContainerElement.textContent='';

    // console.log(`number of ${SearchText_p}: ${phones_p.length}`);
    //create h2 for showing the number of phones

    //display show all button if there are more than 12 phones
    const showAllDiv = document.getElementById('show-all-button-div');
    if(phones_data.length >= 12 && !isShowAll){
        showAllDiv.classList.remove('hidden');
    }
    else{
        showAllDiv.classList.add('hidden');
    }
    
    //display only first 12 phones if not 12phones
    if(!isShowAll){
        phones_data = phones_data.slice(0,12);                 //to show the number of arrays of phones.not all the phones 
    }
    phones_data.forEach(phone => {
        console.log(phone)
        // s-2: create div-creating div for phones-card
        const phoneCard = document.createElement('div');
        phoneCard.classList = 'card w-96 bg-sky-100 shadow-xl py-5';
        //s-3: set inner html
        phoneCard.innerHTML = `
        <figure>
            <img src="${phone.image}" alt="Shoes" />
        </figure>
        <div class="card-body">
            <h2 class="card-title text-2xl">${phone.phone_name}</h2>
            <h3 class="card-title text-xl">${phone.brand}</h3>
            <p>${phone.slug}</p>
            <div class="card-actions justify-center">
                <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `
        //s-4: append child
        phoneContainerElement.appendChild(phoneCard);
    })
    //hide loading toggle
    toggleLoadingSpinner(false);
}

//
const handleShowDetail = async (id)=>{
    console.log('clicked show details',id);
    //load individual single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    console.log(data);

    showPhoneDetetails(phone);
}

const showPhoneDetetails = (phone_p) =>{
    console.log(phone_p);
    const phoneNameElement = document.getElementById('phn_name');
    phoneNameElement.innerText = phone_p.name;
    
    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
    <img src="${phone_p.image}" alt="${phone_p.name}"/>
    <p><span>Storage: </span>${phone_p.mainFeatures.storage}</p>
    <p><span>Display Size: </span>${phone_p.mainFeatures.displaySize}</p>
    <p><span>GPS: </span>${phone_p.others?.GPS? phone_p.others.GPS: 'No GPS Available in this Device'}</p>

    `
    show_details_modal.showModal()
}

//handle search button
const handleSearch = (isShowAll) =>{
    console.log('handleSearch connected');
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    console.log('isShowALL: ',isShowAll);
    loadPhone(searchText, isShowAll);

    // searchText='';
}
//handle search recap (2)
const handleSearch2 = () =>{
    toggleLoadingSpinner(true);
    const searchField2 = document.getElementById('search-field2');
    const searchText2 = searchField2.value;
    loadPhone(searchText2);
}
const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinnerElement = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinnerElement.classList.remove('hidden');
    }
    else{
        loadingSpinnerElement.classList.add('hidden');
    }
}

//handle show all
const handleShowAll = () =>{
    handleSearch(true);
}

// loadPhone()