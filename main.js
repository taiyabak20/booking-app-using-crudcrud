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
    .post(`https://crudcrud.com/api/0741dda395d14ce697a87b129864de56/appointmentData`, objInput)
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
    <button class="edit-button" data-id="${res._id}">edit</button></p>`;
    // here i used data-id res._id to identify which users delete buttonn is clicked

  const deleteButtons = document.querySelectorAll('.dlt-button');
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener('click', () => {
      const userId = deleteButton.getAttribute('data-id');
      deleteOutput(userId);
    });
  });

  // here i  have made an edit button with just adding the data in placeholder and then removing it from the array and then re-entering the data instead of using put/patch

  const editButtons = document.querySelectorAll('.edit-button');
  editButtons.forEach((editButton) => {
    editButton.addEventListener('click', () => {
      const userId = editButton.getAttribute('data-id');
      editOutput(res); 
      deleteOutput(userId);
  
    });
  });

  
}

getUser = () => {
  axios
    .get(`https://crudcrud.com/api/0741dda395d14ce697a87b129864de56/appointmentData`)
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
    .delete(`https://crudcrud.com/api/0741dda395d14ce697a87b129864de56/appointmentData/${userId}`)

    .then(() => {
      // using userId to remove the element from screen
      let elementToDelete = document.querySelector(`[class="${userId}"]`);
        elementToDelete.parentElement.removeChild(elementToDelete);
      
    })
    .catch((err) => {
      console.error(err);
    });
}


 editOutput= (userDetails)=> {
  document.querySelector('#name').value = userDetails.name;
  document.querySelector('#email').value = userDetails.email;
}