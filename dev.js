const fetchUsers = async () => {
    const URL = `https://script.google.com/macros/s/AKfycbxU7DiQzwp7kgT1FB2BAXCAGNSGEt9ZdXPvxFg5K3xkBbaPuaKJnTtKmMIdpXSurxq_/exec`;
    const response = await fetch(URL);
    const data = await response.json();
    return data;
}
   
fetchUsers().then(data => {
    console.log(data);
});