console.log('connecteed');
const loadPhone = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone');
    const data = await res.json();
    const phones = data.data;
    // const phones = data.data;
    // console.log(phones);
    displayPhones(phones);
}
const displayPhones = phones_p => {
    // console.log(parameter);
    const phoneContainerElement = document.getElementById('phone-container');
    phones_p.forEach(phone => {
        console.log(phone)
        // s-2: create div
        const phoneCard = document.createElement('div');
        phoneCard.classList = 'card w-96 bg-gray-200 shadow-xl';
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
loadPhone()