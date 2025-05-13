const baseUrl = "https://irileofdjkcmspvebnqq.supabase.co"
const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlyaWxlb2ZkamtjbXNwdmVibnFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQyNzk1MDYsImV4cCI6MjA0OTg1NTUwNn0.MZx5Cpcw6aqM7A9Sc8_VC6HWnSKQ0SYkWpTqUAI0-Pg"

let params = new URLSearchParams(document.location.search);
let idEdit = params.get("id");
console.log(idEdit)
if(idEdit) {
    document.getElementById("title").innerText = "Editar contacto"
    document.getElementById("save").innerText = "Actualizar contacto"

    // 1. Obtener el contacto que estoy editando para rellenar los inputs
    getContact()
    // 2. Actualizar el contacto 

}

function createContact() {

    const userId = localStorage.getItem("userId")
    const accessToken = localStorage.getItem("token")

    const inEmail = document.getElementById("email")
    const inPhone = document.getElementById("phone")
    const inName = document.getElementById("name")
    
    const requestOptions = {
        method: idEdit ? "PATCH" : "POST",
        headers: {
            "Content-Type": "application/json",
            "apiKey": apiKey,
            "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            name: inName.value,
            phone: inPhone.value,
            email: inEmail.value,
            user_id: userId
        })
    }

    let url = baseUrl + "/rest/v1/contacts"
    if(idEdit) {
        //url = url + "?id=eq." + idEdit
        url = `${url}?id=eq.${idEdit}`
    }

    fetch(url, requestOptions)
        .then((response) => {
            if(response.status == 201 || response.status == 204) {
                window.location.href = "index.html"
            }
        })
        .catch((error) => {
            console.log(error)
        })
}

function getContact() {
    
    const accessToken = localStorage.getItem("token")
    
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "apiKey": apiKey,
            "Authorization": `Bearer ${accessToken}`
        }
    }

    const url = baseUrl + "/rest/v1/contacts?id=eq." + idEdit

    fetch(url, requestOptions)
        .then((response) => {
            return response.json()
        })
        .then((response) => {
            console.log(response)
            const contact = response[0]
            document.getElementById("email").value = contact.email
            document.getElementById("phone").value = contact.phone
            document.getElementById("name").value = contact.name
        })
        .catch((error) => {
            console.log(error)
        })
}
