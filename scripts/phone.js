console.log('connecteed');
const loadPhone = async (SearchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${SearchText}`);
    const data = await res.json();
    const phones = data.data;
    // const phones = data.data;
    // console.log(phones);
    displayPhones(phones);
}
const displayPhones = phones_p => {
    // console.log(parameter);
    const phoneContainerElement = document.getElementById('phone-container');

    //s-5: clear phone container cards before
    phoneContainerElement.textContent='';
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




// loadPhone()