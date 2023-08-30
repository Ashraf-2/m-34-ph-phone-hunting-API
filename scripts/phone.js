console.log('connecteed');
const loadPhone = async (SearchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${SearchText}`);
    const data = await res.json();
    const phones = data.data;
    // const phones = data.data;
    // console.log(phones);
    displayPhones(phones,SearchText);
}
const displayPhones = (phones_p,SearchText_p) => {
    // console.log(parameter);
    const phoneContainerElement = document.getElementById('phone-container');
    
    //s-5: clear phone container cards before and search area 
    phoneContainerElement.textContent='';

    console.log(`number of ${SearchText_p}: ${phones_p.length}`);
    //create h2 for showing the number of phones

    //display show all button if there sare more than 12 phones
    const showAllDiv = document.getElementById('show-all-div');
    if(phones_p.length >= 12){
        showAllDiv.classList.remove('hidden');
    }
    else{
        showAllDiv.classList.add('hidden');
    }
    
    //display only first 12 phones
    phones_p = phones_p.slice(0,12);                 //to show the number of arrays of phones.not all the phones 

    phones_p.forEach(phone => {
        console.log(phone)
        // s-2: create div
        const phoneCard = document.createElement('div');
        phoneCard.classList = 'card w-96 bg-gray-200 shadow-xl py-5';
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
                <button class="btn btn-primary">Buy Now</button>
            </div>
        </div>
        `
        //s-4: append child
        phoneContainerElement.appendChild(phoneCard);
    })
    //hide loading toggle
    toggleLoadingSpinner(false);


}

//handle search button
const handleSearch = () =>{
    console.log('handleSearch connected');
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText);
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



// loadPhone()