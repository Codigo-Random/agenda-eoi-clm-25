const baseUrl = "https://irileofdjkcmspvebnqq.supabase.co"
const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlyaWxlb2ZkamtjbXNwdmVibnFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQyNzk1MDYsImV4cCI6MjA0OTg1NTUwNn0.MZx5Cpcw6aqM7A9Sc8_VC6HWnSKQ0SYkWpTqUAI0-Pg"

function loadContacts() {
    const userId = localStorage.getItem("userId")
    const accessToken = localStorage.getItem("token")

    let url = baseUrl + "/rest/v1/contacts"
    url += `?user_id=eq.${userId}`
    
    console.log("Mi url es", url)

    const requestOptions = {
        method: "GET",
        headers: {
            "apiKey": apiKey,
            "Authorization": `Bearer ${accessToken}`
        }
    }

    fetch(url, requestOptions)
        .then((res) => res.json())
        .then((data) => {
            console.log("La API ha respondido: ", data)
            printData(data)
        })
        .catch((error) => {
            console.log("Ha ocurrido un error: ", error)
        })
}

function printData(data) {
    console.log("estas en print data: ",data)
    const dataList = document.getElementById("list")
    dataList.innerHTML = ""
    data.forEach(contact => {
        dataList.innerHTML += ` <div class="bg-white shadow rounded-xl px-4 py-2 flex justify-between">
            <div>
                <h1 class="font-bold text-lg text-blue-800">${contact.id} - ${contact.name}</h1>
                <p class="px-2 py-0.5 bg-indigo-700 w-fit rounded-full text-white">${contact.email}</p>
                <p class="text-slate-700">${contact.phone}</p>
            </div>
            <div>
                <button onclick="deleteContact('${contact.id}')" class="bg-red-200 hover:bg-red-500 rounded-lg px-4 py-2">Eliminar</button>
                <a href="/new-contact.html?id=${contact.id}" class="bg-green-200 hover:bg-green-500 rounded-lg px-4 py-2">Editar</a>
            </div>
        </div>`
    });
}

loadContacts()

function deleteContact(id) {
    const url = baseUrl + "/rest/v1/contacts?id=eq." + id
    const accessToken = localStorage.getItem("token")

    const requestOptions =  {
        method: "DELETE",
        headers: {
            "apiKey": apiKey,
            "Authorization": `Bearer ${accessToken}`
        }
    }

    fetch(url, requestOptions)
    .then((res) => {
        if (res.status == 204) {
            alert("El contacto fue eliminado")
            loadContacts()
        }
    })
    .catch((error) => {
        console.log("Ha ocurrido un error: ", error)
    })
}