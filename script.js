document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("inscription-form");
    const message = document.getElementById("message");
  
    function emailValide(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }
  
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      message.style.color = "black";
      message.textContent = "Envoi en cours...";
  
      const nom = form.nom.value.trim();
      const prenom = form.prenom.value.trim();
      const email = form.email.value.trim();
  
      if (!nom || !prenom || !email) {
        message.style.color = "red";
        message.textContent = "⚠️ Tous les champs sont obligatoires.";
        return;
      }
  
      if (!emailValide(email)) {
        message.style.color = "red";
        message.textContent = "⚠️ Email invalide.";
        return;
      }
  
      try {
        const endpoint = "https://script.google.com/macros/s/AKfycbzW2h6Tu9YeNJF0raV41ib5ksAI8rmMtw-0yth5w4ow5ZksIbHcCE6ZMgo_tY9jCmMt/exec";
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            nom: nom,
            prenom: prenom,
            email: email})
        });
  
        if (response.ok) {
          message.style.color = "green";
          message.innerHTML = ` LOVE CODE-WHITE PARTY <br> Merci ${prenom} pour l'enregisrement.<br>.La localisation vous sera envoyer via mail (dans spam) dans les jours à venir (juste à l’approche de l’événement).<br>L'entrée est soumise à l'achat d’un BRACELET LUMINEUX.<br>Droit de bouchon 0F ( apporte ta boisson) 

Vivons, profitons ensemble de cette belle ambiance au coeur de Lomé.`;
          form.reset();
        } else {
          message.style.color = "red";
          message.textContent = "❌ Erreur côté serveur.";
        }
      } catch (err) {
        message.style.color = "red";
        message.textContent = "❌ Erreur réseau.";
        console.error(err);
      }
    });
  });
  