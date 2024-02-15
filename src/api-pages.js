const getAllContacts = async () => {
  try {
    let response = await fetch(`https://contact.mediusware.com/api/contacts/`, {
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


const getContactsByCountry = async (country) => {
  try {
    let response = await fetch(`https://contact.mediusware.com/api/country-contacts/`+country+'/', {
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