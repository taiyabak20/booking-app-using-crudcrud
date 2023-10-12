
const btn = document.querySelector('.btn');

btn.addEventListener('click', e => {

  e.preventDefault();

let nameInput = document.querySelector('#name').value;
let emailInput= document.querySelector('#email').value;


  const objInput = {
    name: nameInput ,
    email: emailInput
  };

axios.post(`https://crudcrud.com/api/1c5b2d767b394f5abba752fe5ef821dc
/appointmentData`, objInput)

.then((res)=>{
    showOutput(res.data)
    console.log(res)
})
.catch((err)=> {
    console.error(err)
})

document.querySelector('#name').value = '';
document.querySelector('#email').value = '';
});

  showOutput = (res)=>{
    document.getElementById('users').innerHTML+=`&bull; ${res.name} - ${res.email} <button class="dlt-button">delete</button> <button class="edit-button">edit </button><br>`
  }

  //console.log(objInput);

  getData = ()=> {
    axios.get(`https://crudcrud.com/api/1c5b2d767b394f5abba752fe5ef821dc
/appointmentData`)
      .then((res) => {
        res.data.forEach(entry => {
          showOutput(entry);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }
  
  getData()

