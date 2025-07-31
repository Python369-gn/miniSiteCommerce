// Affichage dynamique de l'année dans le footer
        const year = new Date().getFullYear();
        document.getElementById('copyright').innerHTML =
            `&copy; ${year} <span style="color:#5e8d6a;font-weight:bold">SAHAD STORE</span> - Tous droits réservés.`;
    