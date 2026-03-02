      function calcularTotal() {
          let total = 0;
          
          let checkboxes = document.querySelectorAll('.item-produto');
          let quantidades = document.querySelectorAll('.qtd-produto');
          
          for (let i = 0; i < checkboxes.length; i++) {
              if (checkboxes[i].checked) {
                  total += parseFloat(checkboxes[i].value) * parseInt(quantidades[i].value);
              }
          }
          
          document.getElementById('valor-total').innerText = total.toFixed(2);
      }

      let inputs = document.querySelectorAll('.item-produto, .qtd-produto');

      for (let input of inputs) {
          input.addEventListener('change', calcularTotal);
      }
