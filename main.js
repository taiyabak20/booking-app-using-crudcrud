const btn = document.querySelector('.btn');
const URL = `http://localhost:3000/user`;
btn.addEventListener('click', (e) => {
  e.preventDefault();

  const nameInput = document.querySelector('#name').value;
  const emailInput = document.querySelector('#email').value;

  const objInput = {
    name: nameInput,
    email: emailInput,
  };

  axios
    .post(`${URL}`, objInput)
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

    document.getElementById('users').innerHTML+=`<p class="${res.id}">&bull; ${res.name} - ${res.email}
    <button class="dlt-button" data-id="${res.id}">delete</button>
    <button class="edit-button" data-id="${res.id}">edit</button></p>`;

  const deleteButtons = document.querySelectorAll('.dlt-button');
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener('click', () => {
      const userId = deleteButton.getAttribute('data-id');
      deleteOutput(userId);
    });
  });

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
    .get(`${URL}`)
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
    .delete(`${URL}/${userId}`)

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