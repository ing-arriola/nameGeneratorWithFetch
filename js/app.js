document.querySelector('#generar-nombre').addEventListener('submit', cargarNombres);
//Getting the DOM element to render the results
const result=document.getElementById('resultado')

// Llamado a Ajax e imprimir resultados
function cargarNombres(e) {
     e.preventDefault();

     // Leer las variables

     const origen = document.getElementById('origen');
     const origenSeleccionado = origen.options[origen.selectedIndex].value;

     const genero = document.getElementById('genero');
     const generoSeleccionado = genero.options[genero.selectedIndex].value;

     const cantidad = document.getElementById('numero').value;

    

     let url = '';
     url += 'http://uinames.com/api/?';
     // Si hay origen agregarlo a la URL
     if(origenSeleccionado !== '') {
          url += `region=${origenSeleccionado}&`;
     }
     // Si hay un genero agregarlo a la URL
     if(generoSeleccionado !== '') {
          url += `gender=${generoSeleccionado}&`;
     }
     // Si hay una cantidad agregarlo a la URL
     if(cantidad !== '') {
          url += `amount=${cantidad}&`;
     }

     // Código de FETCH API HERE!!
     fetch(url)
          .then((connection)=>{
               
               return connection.json()
          })
          .then((answer)=>{
               console.log(answer)
                 //Getting the data
               let state=checkNames(answer)
               //a header for results :)
               let headerOfResults=document.createElement('h3')
               
               headerOfResults.innerHTML='Generated Names'
               
               //If the result sectio has any child.. remove it all of them :)
               while(result.hasChildNodes()){
                    result.removeChild(result.firstChild)
               }
               //Adding the header :)
               result.appendChild(headerOfResults)
               result.appendChild(state)
               result.appendChild(document.createElement('br'))//This only for a good looking :)
               answer.forEach(element => {
                    if(element.name !== ''){
                         let nombre=document.createElement('h6')
                         nombre.classList.add('lista')
                         nombre.innerHTML=`${element.name}`
                         result.appendChild(nombre)
                    }
                    
               });
          })
}

//This function checks if the response array has the same number of names as the user aks for
//If the requested number of names are equal to the generated names then... print the results 
//and add a success message... otherwise show a error message
function checkNames(jsonarray){
     let cuenta=0
     let message=document.createElement('div')
     
     jsonarray.forEach(element => {
         if(element.name !== ''){
             cuenta+=1
         }
         
     })
     console.log("array es: " + jsonarray.length + "y cuenta es:"+cuenta)
     if(cuenta >0 && cuenta === jsonarray.length){
         message.innerHTML='Success'
         message.classList.add('success')
     }else{
         message.innerHTML='At this moment the API DB has not enogth data'
         message.classList.add('danger')
     }
     return message
 }