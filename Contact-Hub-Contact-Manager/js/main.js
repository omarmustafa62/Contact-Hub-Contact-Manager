var contactModal = document.getElementById("contactModal");
var totalContacts = document.getElementById("totalContacts");
var totalFavContacts = document.getElementById("totalFavContacts");
var totalEmergencyContacts = document.getElementById("totalEmergencyContacts");
var totalContactsSpan = document.getElementById("totalContactsSpan");
var addContactBtn = document.getElementById("addContactBtn");
var searchInput = document.getElementById("searchInput");
var callBtn = document.getElementById("callBtn");
var emailBtn = document.getElementById("emailBtn");
var favBtn = document.getElementById("favBtn");
var emergencyBtn = document.getElementById("emergencyBtn");
var editBtn = document.getElementById("editBtn");
var deleteBtn = document.getElementById("deleteBtn");
var emptyStateFav = document.getElementById("emptyStateFav");
var emptyStateEmergency = document.getElementById("emptyStateEmergency");
var smallEmergncyItem = document.getElementById("smallEmergncyItem");
var bigEmergencyItem = document.getElementById("bigEmergencyItem");
var smallFavItem = document.getElementById("smallFavItem");
var bigFavItem = document.getElementById("bigFavItem");
var submitModalBtn = document.getElementById("submitModalBtn");
var updateModalBtn = document.getElementById("updateModalBtn");
var closeModalBtn = document.getElementById("closeModalBtn");
var cancelModalBtn = document.getElementById("cancelModalBtn");
var noContacts = document.getElementById("noContacts")
var favIcon = document.querySelector(".fav-icon")
var emeIcon = document.querySelector(".eme-icon")
//user data
var contactForm = document.getElementById("contactForm");
var avatarPreview = document.getElementById("avatarPreview");
var avatarInput = document.getElementById("avatarInput");
var avatarPath = document.getElementById("avatarPath");
var contactName = document.getElementById("contactName");
var contactPhone = document.getElementById("contactPhone");
var contactEmail = document.getElementById("contactEmail");
var contactAddress = document.getElementById("contactAddress");
var contactGroup = document.getElementById("contactGroup");
var contactNotes = document.getElementById("contactNotes");
var contactFavorite = document.getElementById("contactFavorite");
var contactEmergency = document.getElementById("contactEmergency");
var contactCardContainer = document.getElementById("contactCardContainer");
//validation
var nameError = document.getElementById("contactNameError");
var phoneError = document.getElementById("contactPhoneError");
var emailError = document.getElementById("contactEmailError");
var contactList;

closeModalBtn.addEventListener("click", clearInputs)
cancelModalBtn.addEventListener("click", clearInputs)

avatarInput.addEventListener("change", function () {
    var file = avatarInput.files[0]
    console.log(file);

    if (!file) return
    avatarPath.value = file.name;
    avatarPreview.innerHTML = `<img src="../Images/${file.name}" alt="avatar preview " class="w-100 h-100 object-fit-cover rounded-circle">
`
})




function addContact() {
    var contacts = {
        userName: contactName.value,
        userPhone: contactPhone.value,
        userEmail: contactEmail.value,
        userAddress: contactAddress.value,
        userGroup: contactGroup.value,
        userNotes: contactNotes.value,
        userFav: contactFavorite.checked,
        userEmergency: contactEmergency.checked,
        userImage: avatarPath.value ? `../Images/${avatarPath.value}` : ""
    };
    contactList.push(contacts)
    console.log(contactList)
    updateContactCount()
    updateFavSidebar()
    updateEmergencySidebar()
    displayContact();
    clearInputs();
    localStorage.setItem("contactList", JSON.stringify(contactList))
}

var localSS = localStorage.getItem("contactList")
if (localSS) {
    contactList = JSON.parse(localSS);
    displayContact();
} else {
    contactList = [];
}



function displayContact() {
    var box = ""
    for (var i = 0; i < contactList.length; i++) {
        var groupColor = getGroupColor(contactList[i].userGroup);
        box += `
                                                <div class="col-12 col-sm-6">
                                            <div class="added-contact-box d-flex flex-column">
                                                <div class="d-flex flex-column">
                                                    <div class="d-flex">
                                                        <div
                                                            class="profile-icon d-flex justify-content-center align-items-center position-relative rounded-4">
                                                            ${renderAvatar(contactList[i].userName, contactList[i].userImage)}
                                                            <div
                                                                class="fav-icon position-absolute ${contactList[i].userFav ? "d-flex" : "d-none"} justify-content-center align-items-center rounded-circle">
                                                                <i class="nav-item fa-solid fa-star"></i>
                                                            </div>
                                                            <div
                                                                class="eme-icon position-absolute ${contactList[i].userEmergency ? "d-flex" : "d-none"} justify-content-center align-items-center rounded-circle">
                                                                <i class="nav-item fa-solid fa-heart-pulse"></i>
                                                            </div>
                                                        </div>
                                                        <div class="d-flex flex-column gap-1">
                                                            <span>${contactList[i].userName}</span>
                                                            <div class="d-flex gap-2 align-items-center">
                                                                <div
                                                                    class="d-flex justify-content-center align-items-center">
                                                                    <i class="nav-item fa-solid fa-phone"
                                                                        style="color: #155DFC;"></i>
                                                                </div>
                                                                <span>${contactList[i].userPhone}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="d-flex flex-column gap-2">
${contactList[i].userEmail ? `
                                                            <div class="d-flex align-items-center">
                                                            <div
                                                                class="email-icon d-flex justify-content-center align-items-center">
                                                                <i class="nav-item fa-solid fa-envelope"
                                                                    style="color: #7f22fe;"></i>
                                                            </div>
                                                            <p>${contactList[i].userEmail}</p>
                                                        </div>
    ` : ""}
${contactList[i].userAddress ? `
                                                            <div class="d-flex align-items-center">
                                                            <div
                                                                class="loc-icon d-flex justify-content-center align-items-center">
                                                                <i class="nav-item fa-solid fa-location-dot"
                                                                    style="color: #009966;"></i>
                                                            </div>
                                                            <p>${contactList[i].userAddress}</p>
                                                        </div>
    ` : ""}
                                                    </div>
                                                    <div class="d-flex">
                                                        ${contactList[i].userGroup != "Select a group" ? `
                                                        <span style="background:${groupColor.bg}; color:${groupColor.text};
                                                        border:1px solid ${groupColor.border};">
                                                        ${contactList[i].userGroup}</span>` : ""}
                                                        ${contactList[i].userEmergency ?
                                                            `<span><i class="nav-item fa-solid fa-heart-pulse"
                                                            style="color:#ec003f;"></i>Emergency</span>` : ""}
                                                    </div>
                                                </div>
                                                <div class="d-flex justify-content-between align-items-center">
                                                    <div class="d-flex">
                                                        <a id="callBtn" href=""
                                                            class="d-flex justify-content-center align-items-center">
                                                            <i class="fa-solid fa-phone"></i>
                                                        </a>
                                                        <button id="emailBtn"
                                                            class="d-flex justify-content-center align-items-center">
                                                            <i class="fa-solid fa-envelope"></i>
                                                        </button>
                                                    </div>
                                                    <div class="d-flex">
                                                        <button id="favBtn" onclick="toggleFavorite(${i})"
                                                            class="d-flex justify-content-center align-items-center" style="${contactList[i].userFav ? "background-color : #FEF3C6;" : ""}">
                                                            <i class="${contactList[i].userFav ? "fa-solid" : "far"} fa-star" style="${contactList[i].userFav ? "color : #ffb900;" : ""}"></i>
                                                        </button>
                                                        <button id="emergencyBtn" onclick="toggleEmergency(${i})"
                                                            class="d-flex justify-content-center align-items-center" style="${contactList[i].userEmergency ? "background-color : #FFE4E6;" : ""}">
                                                            <i class="${contactList[i].userEmergency ? "fas fa-heart-pulse" : "far"} fa-heart" style="${contactList[i].userEmergency ? "color : #ff2056;" : ""}"></i>
                                                        </button>
                                                        <button id="editBtn"
                                                            class="d-flex justify-content-center align-items-center" onclick="updateContacts(${i})" data-bs-toggle="modal" data-bs-target="#contactModal">
                                                            <i class="fa-solid fa-pen"></i>
                                                        </button>
                                                        <button id="deleteBtn"
                                                            class="d-flex justify-content-center align-items-center" onclick="deleteContact(${i})">
                                                            <i class="fa-solid fa-trash"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
        
        `;
    }
    if (contactCardContainer.innerHTML = box) {
        noContacts.classList.remove("d-flex")
        noContacts.classList.add("d-none")
        contactCardContainer.classList.remove("d-none")
        contactCardContainer.classList.add("d-flex")
    }
    if (contactList.length === 0) {
        contactCardContainer.classList.add("d-none")
        contactCardContainer.classList.remove("d-flex")
        noContacts.classList.remove("d-none");
        noContacts.classList.add("d-flex");
    } else {
        contactCardContainer.classList.remove("d-none")
        contactCardContainer.classList.add("d-flex")
        noContacts.classList.remove("d-flex");
        noContacts.classList.add("d-none");
    }
    updateContactCount()
    updateFavSidebar()
    updateEmergencySidebar()

}

function clearInputs() {
    contactName.value = ""
    contactPhone.value = ""
    contactEmail.value = ""
    contactAddress.value = ""
    contactGroup.value = "Select a group"
    contactNotes.value = ""
    contactFavorite.checked = false
    contactEmergency.checked = false
    avatarPath.value = ""
    avatarPreview.innerHTML = `<i class="fa-solid fa-user" style="color: #ffffff;"></i>`
}

// deleting a card
// deleteBtn.addEventListener("click",deleteContact(i)
function deleteContact(index) {
    Swal.fire({
        title: "Delete Contact?",
        text: `Are you sure you want to delete ${contactList[index].userName}? This action cannot be undone.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "rgb(221, 26, 26)",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            contactList.splice(index, 1);
            localStorage.setItem("contactList", JSON.stringify(contactList));
            displayContact();
            Swal.fire({
                title: "Deleted!",
                text: "Contact has been deleted.",
                icon: "success",
                showConfirmButton: false,
                timer: 1500
            });
        }
    });
}

// updating data 
var updateIndex = 0;

function updateContacts(index) {
    updateIndex = index;
    var contacts = contactList[index]
    contactName.value = contacts.userName
    contactEmail.value = contacts.userEmail
    contactPhone.value = contacts.userPhone
    contactAddress.value = contacts.userAddress
    contactGroup.value = contacts.userGroup
    contactNotes.value = contacts.userNotes
    contactFavorite.checked = contacts.userFav
    contactEmergency.checked = contacts.userEmergency
    if (contacts.userImage != "") {
    avatarPath.value = contacts.userImage.replace("../Images/", "");
    } else {
    avatarPath.value = "";
    }
    if (contacts.userImage) {
        avatarPreview.innerHTML = `
        <img src="${contacts.userImage}" alt="" class="w-100 h-100 object-fit-cover rounded-4">
        `
    } else {
        avatarPreview.innerHTML = `
        <i class="fa-solid fa-user" style="color: #ffffff;"></i>
        `
    }

    document.getElementById("updateModalBtn").classList.remove("d-none")
    document.getElementById("submitModalBtn").classList.add("d-none")
    document.getElementById("submitModalBtn").classList.remove("d-flex")
}

function afterUpdateProduct() {
    var contacts = {
        userName: contactName.value,
        userPhone: contactPhone.value,
        userEmail: contactEmail.value,
        userAddress: contactAddress.value,
        userGroup: contactGroup.value,
        userNotes: contactNotes.value,
        userFav: contactFavorite.checked,
        userEmergency: contactEmergency.checked,
        userImage: avatarPath.value ? "../Images/" + avatarPath.value : ""
    };

    contactList.splice(updateIndex, 1, contacts)
    localStorage.setItem("contactList", JSON.stringify(contactList))
    displayContact()
    updateFavSidebar()
    updateEmergencySidebar()
    clearInputs()
    bootstrap.Modal.getInstance(contactModal).hide();
    Swal.fire({
        title: "Updated",
        text: "Contact has been updated successfully.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500
    });
    document.getElementById("updateModalBtn").classList.add("d-none")
    document.getElementById("submitModalBtn").classList.remove("d-none")
    document.getElementById("submitModalBtn").classList.add("d-flex")
}

submitModalBtn.addEventListener("click", function () {
    if (!validateContact(false)) {
        return;
    }
    addContact();
    bootstrap.Modal.getInstance(contactModal).hide();
    Swal.fire({
        title: "Added",
        text: "Contact has been added successfully.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500
    });
});

updateModalBtn.addEventListener("click", function () {

    console.log("before validate");
    console.log(contactName.value);

    if (!validateContact(true)) {
        return;
    }

    afterUpdateProduct();
});

//  count of total cards and their fav and eme count and the span
function updateContactCount() {
    totalContacts.innerHTML = contactList.length
    totalContactsSpan.innerHTML = contactList.length
}

//  favorite card button
function updateFavSidebar() {
    bigFavItem.innerHTML = "";
    var favCount = 0;
    var hasFav = false;
    for (var i = 0; i < contactList.length; i++) {
        var contact = contactList[i];
        if (contact.userFav) {
            hasFav = true;
            favCount++;
            var contactHTML = `
                                        <div id="smallFavItem" class="d-flex align-items-center w-100 mb-2">
                                            <div class="d-flex align-items-center justify-content-center rounded-4">
                                                ${renderAvatar(contact.userName,contact.userImage)}
                                            </div>
                                            <div class="d-flex flex-column">
                                                <span>${contact.userName}</span>
                                                <span>${contact.userPhone}</span>
                                            </div>
                                            <div class="ms-auto">
                                                <a href="tel:${contact.userPhone}" class="d-flex justify-content-center align-items-center">
                                                    <i class="nav-item fa-solid fa-phone"></i>
                                                </a>
                                            </div>
                                        </div>
            `;
            bigFavItem.innerHTML += contactHTML
        }
    }
    totalFavContacts.innerHTML = favCount
    if (hasFav === false) {
        bigFavItem.innerHTML = `<p id="emptyStateFav" class="text-center">No favorites yet</p>`
    }
}

//  emergency card button
function updateEmergencySidebar() {
    bigEmergencyItem.innerHTML = "";
    var EmergencyCount = 0;
    var hasEmergency = false;
    for (var i = 0; i < contactList.length; i++) {
        var contact = contactList[i];
        if (contact.userEmergency) {
            hasEmergency = true;
            EmergencyCount++;
            var contactHTML = `
                                        <div id="smallEmergencyItem" class="d-flex align-items-center w-100 mb-2">
                                            <div class="d-flex align-items-center justify-content-center rounded-4">
                                                ${renderAvatar(contact.userName,contact.userImage)}
                                            </div>
                                            <div class="d-flex flex-column">
                                                <span>${contact.userName}</span>
                                                <span>${contact.userPhone}</span>
                                            </div>
                                            <div class="ms-auto">
                                                <a href="tel:${contact.userPhone}"
                                                    class="d-flex justify-content-center align-items-center eme-a">
                                                    <i class="nav-item fa-solid fa-phone"></i>
                                                </a>
                                            </div>
                                        </div>
            `;
            bigEmergencyItem.innerHTML += contactHTML
        }
    }
    totalEmergencyContacts.innerHTML = EmergencyCount
    if (hasEmergency === false) {
        bigEmergencyItem.innerHTML = `<p id="emptyStateEmergency" class="text-center">No emergency contacts</p>`
    }
}

//  favorite card button
function toggleFavorite(index) {
    contactList[index].userFav = !contactList[index].userFav;
    localStorage.setItem("contactList", JSON.stringify(contactList))
    displayContact();
}

//  emergency card button
function toggleEmergency(index) {
    contactList[index].userEmergency = !contactList[index].userEmergency;
    localStorage.setItem("contactList", JSON.stringify(contactList))
    displayContact();
}

// Search input
searchInput.addEventListener("input", function () {
    var userTextSearch = searchInput.value
    var box = ""
    var found = 0;
    for (var i = 0; i < contactList.length; i++) {

        if (contactList[i].userName.toLowerCase().includes(userTextSearch.toLowerCase())) {
            found++;
            box += `
                                                <div class="col-12 col-sm-6">
                                            <div class="added-contact-box d-flex flex-column">
                                                <div class="d-flex flex-column">
                                                    <div class="d-flex">
                                                        <div
                                                            class="profile-icon d-flex justify-content-center align-items-center position-relative rounded-4">
                                                            ${renderAvatar(contactList[i].userName,contactList[i].userImage)}
                                                            
                                                            <div
                                                                class="fav-icon position-absolute ${contactList[i].userFav ? "d-flex" : "d-none"} justify-content-center align-items-center rounded-circle">
                                                                <i class="nav-item fa-solid fa-star"></i>
                                                            </div>
                                                            <div
                                                                class="eme-icon position-absolute ${contactList[i].userEmergency ? "d-flex" : "d-none"} justify-content-center align-items-center rounded-circle">
                                                                <i class="nav-item fa-solid fa-heart-pulse"></i>
                                                            </div>
                                                        </div>
                                                        <div class="d-flex flex-column gap-1">
                                                            <span>${contactList[i].userName}</span>
                                                            <div class="d-flex gap-2 align-items-center">
                                                                <div
                                                                    class="d-flex justify-content-center align-items-center">
                                                                    <i class="nav-item fa-solid fa-phone"
                                                                        style="color: #155DFC;"></i>
                                                                </div>
                                                                <span>${contactList[i].userPhone}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="d-flex flex-column gap-2">
${contactList[i].userEmail ? `
                                                            <div class="d-flex align-items-center">
                                                            <div
                                                                class="email-icon d-flex justify-content-center align-items-center">
                                                                <i class="nav-item fa-solid fa-envelope"
                                                                    style="color: #7f22fe;"></i>
                                                            </div>
                                                            <p>${contactList[i].userEmail}</p>
                                                        </div>
    ` : ""}
${contactList[i].userAddress ? `
                                                            <div class="d-flex align-items-center">
                                                            <div
                                                                class="loc-icon d-flex justify-content-center align-items-center">
                                                                <i class="nav-item fa-solid fa-location-dot"
                                                                    style="color: #009966;"></i>
                                                            </div>
                                                            <p>${contactList[i].userAddress}</p>
                                                        </div>
    ` : ""}
                                                    </div>
                                                    <div class="d-flex">
                                                        ${contactList[i].userGroup != "Select a group" ? `
                                                        <span style="background:${groupColor.bg}; color:${groupColor.text};
                                                        border:1px solid ${groupColor.border};">
                                                        ${contactList[i].userGroup}</span>` : ""}
                                                        <span><i class="nav-item fa-solid fa-heart-pulse"
                                                                style="color: #ec003f;"></i>
                                                            Emergency</span>
                                                    </div>
                                                </div>
                                                <div class="d-flex justify-content-between align-items-center">
                                                    <div class="d-flex">
                                                        <a id="callBtn" href=""
                                                            class="d-flex justify-content-center align-items-center">
                                                            <i class="fa-solid fa-phone"></i>
                                                        </a>
                                                        <button id="emailBtn"
                                                            class="d-flex justify-content-center align-items-center">
                                                            <i class="fa-solid fa-envelope"></i>
                                                        </button>
                                                    </div>
                                                    <div class="d-flex">
                                                        <button id="favBtn" onclick="toggleFavorite(${i})"
                                                            class="d-flex justify-content-center align-items-center" style="${contactList[i].userFav ? "background-color : #FEF3C6;" : ""}">
                                                            <i class="${contactList[i].userFav ? "fa-solid" : "far"} fa-star"></i>
                                                        </button>
                                                        <button id="emergencyBtn" onclick="toggleEmergency(${i})"
                                                            class="d-flex justify-content-center align-items-center" style="${contactList[i].userEmergency ? "background-color : #FFE4E6;" : ""}">
                                                            <i class="${contactList[i].userEmergency ? "fas fa-heart-pulse" : "far"} fa-heart"  style="${contactList[i].userEmergency ? "color : #ff2056;" : ""}"></i>
                                                        </button>
                                                        <button id="editBtn"
                                                            class="d-flex justify-content-center align-items-center" onclick="updateContacts(${i})" data-bs-toggle="modal" data-bs-target="#contactModal">
                                                            <i class="fa-solid fa-pen"></i>
                                                        </button>
                                                        <button id="deleteBtn"
                                                            class="d-flex justify-content-center align-items-center" onclick="deleteContact(${i})">
                                                            <i class="fa-solid fa-trash"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
        
        `

        }
    }
    contactCardContainer.innerHTML = box
    if (found === 0) {
        contactCardContainer.classList.add("d-none");
        contactCardContainer.classList.remove("d-flex");

        noContacts.classList.remove("d-none");
        noContacts.classList.add("d-flex");
    } else {
        contactCardContainer.classList.remove("d-none");
        contactCardContainer.classList.add("d-flex");

        noContacts.classList.remove("d-flex");
        noContacts.classList.add("d-none");
    }
})

// validation part

contactName.addEventListener("input", function () {
    var regexName = /^[A-Za-z\u0600-\u06FF\s]{2,50}$/
    var userName = contactName.value

    if (userName === "") {
        document.getElementById("warningName").classList.add("d-none");
        document.getElementById("contactName").classList.remove("border", "border-1", "border-danger");
        return true;
    }
    else if (!regexName.test(userName)) {
        document.getElementById("warningName").classList.remove("d-none");
        document.getElementById("contactName").classList.add("border", "border-1", "border-danger");
        return false
    }
    else {
        document.getElementById("warningName").classList.add("d-none");
        document.getElementById("contactName").classList.remove("border", "border-1", "border-danger");
        return true
    }
})

contactPhone.addEventListener("input", function () {
    var regexPhone = /^(?:\+20|0)1[0125]\d{8}$/;
    var userPhone = contactPhone.value;

    if (userPhone === "") {
        document.getElementById("warningPhone").classList.add("d-none");
        document.getElementById("contactPhone").classList.remove("border", "border-1", "border-danger");
        return true;
    }
    else if (!regexPhone.test(userPhone)) {
        document.getElementById("warningPhone").classList.remove("d-none");
        document.getElementById("contactPhone").classList.add("border", "border-1", "border-danger");
        return false
    }
    else {
        document.getElementById("warningPhone").classList.add("d-none");
        document.getElementById("contactPhone").classList.remove("border", "border-1", "border-danger");
        return true
    }
});

contactEmail.addEventListener("input", function () {
    var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    var userEmail = contactEmail.value

    if (userEmail === "") {
        document.getElementById("warningEmail").classList.add("d-none");
        document.getElementById("contactEmail").classList.remove("border", "border-1", "border-danger");
        return true;
    }
    else if (!regexEmail.test(userEmail)) {
        document.getElementById("warningEmail").classList.remove("d-none");
        document.getElementById("contactEmail").classList.add("border", "border-1", "border-danger");
        return false
    }
    else {
        document.getElementById("warningEmail").classList.add("d-none");
        document.getElementById("contactEmail").classList.remove("border", "border-1", "border-danger");
        return true
    }
})

function validateContact(isUpdate) {
    if (contactName.value.trim() == "") {
        Swal.fire({
            icon: "error",
            title: "Missing Name",
            text: "Please enter a name for the contact!"
        });
        return false;
    }
    var regexName = /^[A-Za-z\u0600-\u06FF\s]{2,50}$/;
    if (!regexName.test(contactName.value)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Name",
            text: "Name should contain only letters and spaces (2-50 characters)."
        });
        return false;
    }
    if (contactPhone.value.trim() == "") {
        Swal.fire({
            icon: "error",
            title: "Missing Phone",
            text: "Please enter a phone number!"
        });
        return false;
    }
    var regexPhone = /^(?:\+20|0)1[0125]\d{8}$/;
    if (!regexPhone.test(contactPhone.value)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Phone",
            text: "Please enter a valid Egyptian phone number (e.g. 01012345678 or +201012345678)."
        });
        return false;
    }
    for (var i = 0; i < contactList.length; i++) {
        if (
            contactPhone.value == contactList[i].userPhone &&
            (!isUpdate || i != updateIndex)
        ) {
            Swal.fire({
                icon: "error",
                title: "Duplicate Phone Number",
                text: `A contact with this phone number already exists: ${contactList[i].userName}`
            });
            return false;
        }
    }
    return true;
}


// first letter from the full name
function getAvatarColors() {
    return [
        { from: "#3b82f6", to: "#2563eb" }, // Blue
        { from: "#8b5cf6", to: "#6d28d9" }, // Violet
        { from: "#10b981", to: "#0d9488" }, // Emerald
        { from: "#f43f5e", to: "#db2777" }, // Rose
        { from: "#f59e0b", to: "#ea580c" }, // Amber
        { from: "#06b6d4", to: "#2563eb" }, // Cyan
        { from: "#6366f1", to: "#8b5cf6" }, // Indigo
        { from: "#d946ef", to: "#ec4899" }, // Fuchsia
    ];
}

function getColorByName(name) {
    var colors = getAvatarColors();
    var IndexColorName = name.trim().replace(/\s/g, "").length % colors.length;
    return colors[IndexColorName];
}
function getInitials(name) {
    name = name.trim();
    var parts = name.trim().split(/\s+/);;
    if (parts.length == 1) {
        return parts[0][0].toUpperCase();
    }
    return (parts[0][0] + parts[1][0]).toUpperCase();
}

function renderAvatar(name, imagePath) {
    if (imagePath != "") {
        return `
        <img src="${imagePath}" class="w-100 h-100 object-fit-cover rounded-4">
    `;
    }
    if (name != "") {
        var initials = getInitials(name);
        var color = getColorByName(name);
        return `
    <div class="d-flex align-items-center justify-content-center w-100 h-100 rounded-4 
    text-white fw-bold" style="background-image: linear-gradient(135deg , ${color.from} , ${color.to});">
    ${initials}
    </div>`;
    }
    return `
<div class="w-100 h-100 rounded-4 d-flex justify-content-center align-items-center bg-secondary">
<i class="fa-solid fa-user"></i>
</div>
`
}
// 
// 
// 
function getGroupColors() {
    return {
        Family: {
            bg: "#cfe8ff",
            text: "#1e40af",
            border: "#93c5fd"
        },
        Friends: {
            bg: "#d1fae5",
            text: "#065f46",
            border: "#6ee7b7"
        },
        Work: {
            bg: "#ede9fe",
            text: "#5b21b6",
            border: "#c4b5fd"
        },
        School: {
            bg: "#fef3c7",
            text: "#b45309",
            border: "#fde68a"
        },
        Other: {
            bg: "#f3f4f6",
            text: "#374151",
            border: "#d1d5db"
        }
    };
}

function getGroupColor(group) {
    var groups = getGroupColors();

    return groups[group] || {
        bg: "#f3f4f6",
        text: "#374151",
        border: "#d1d5db"
    };
}


