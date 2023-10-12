const btn = document.querySelector('.btn');

btn.addEventListener('click', (e) => {
  e.preventDefault();

  const nameInput = document.querySelector('#name').value;
  const emailInput = document.querySelector('#email').value;

  const objInput = {
    name: nameInput,
    email: emailInput,
  };

  axios
    .post(`https://crudcrud.com/api/724e0e080acc49fea4ca53567d0f23d8/appointmentData`, objInput)
    .then((res) => {
      showOutput(res.data);
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });

  document.querySelector('#name').value = '';
  document.querySelector('#email').value = '';
});

 showOutput= (res)=> {
    // here i named class as red._id so that i can delete the whole user using that class

    document.getElementById('users').innerHTML+=`<p class="${res._id}">&bull; ${res.name} - ${res.email}
    <button class="dlt-button" data-id="${res._id}">delete</button>
    <button class="edit-button" >edit</button></p>`;
    // here i used data-id res._id to identify which users delete buttonn is clicked

  const deleteButtons = document.querySelectorAll('.dlt-button');
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener('click', () => {
      const userId = deleteButton.getAttribute('data-id');
      deleteOutput(userId);
    });
  });
}

getUser = () => {
  axios
    .get(`https://crudcrud.com/api/724e0e080acc49fea4ca53567d0f23d8/appointmentData`)
    .then((res) => {
      res.data.forEach((entry) => {
        showOutput(entry);
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

getUser();

 deleteOutput = (userId) => {
  axios
    .delete(`https://crudcrud.com/api/724e0e080acc49fea4ca53567d0f23d8/appointmentData/${userId}`)

    .then(() => {
      // using userId to remove the element from screen
      let elementToDelete = document.querySelector(`[class="${userId}"]`);
        elementToDelete.parentElement.removeChild(elementToDelete);
      
    })
    .catch((err) => {
      console.error(err);
    });
}


