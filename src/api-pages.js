const getAllContacts = async (search,page) => {
  try {
    
    let response = await fetch(`https://contact.mediusware.com/api/contacts/?search=`+search+`&page=`+page, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};


const getContactsByCountry = async (country,search,page) => {
  try {
    let response = await fetch(`https://contact.mediusware.com/api/country-contacts/`+country+'/?search='+search+`&page=`+page, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};


export {getAllContacts,getContactsByCountry}