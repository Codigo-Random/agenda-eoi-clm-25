const baseUrl = "https://irileofdjkcmspvebnqq.supabase.co"
const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlyaWxlb2ZkamtjbXNwdmVibnFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQyNzk1MDYsImV4cCI6MjA0OTg1NTUwNn0.MZx5Cpcw6aqM7A9Sc8_VC6HWnSKQ0SYkWpTqUAI0-Pg"

function createContact() {
    const userId = localStorage.getItem("userId")
    const accessToken = localStorage.getItem("token")

    const inEmail = document.getElementById("email")
    const inPhone = document.getElementById("phone")
    const inName = document.getElementById("name")
    
    const requestOptions = {
        method: "POST",
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

    const url = baseUrl + "/rest/v1/contacts"

    fetch(url, requestOptions)
        .then((response) => {
            if(response.status == 201) {
                window.location.href = "index.html"
            }
        })
        .catch((error) => {
            console.log(error)
        })
}