// Validaciones simples de formularios (puedes extenderlo)
document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('form[novalidate]');
  forms.forEach(form => {
    form.addEventListener('submit', function(e){
      if(!form.checkValidity()){
        e.preventDefault();
        e.stopPropagation();
  alert("Por favor, completa todos los campos correctamente.");
      }
      form.classList.add('was-validated');
    });
  });
});
