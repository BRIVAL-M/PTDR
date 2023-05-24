// A FAIRE EN PLUS : 
// Ajouter un btn qui permet de mettre certaines blagues dans le LS pour pouvoir les afficher plus tard...
// Ajouter un btn pour jouer un audio "rires"


// Récupère l'élément du conteneur de la blague
const jokeContainer = document.getElementById('joke-container');

// Récupère le bouton de génération de blague +
// Écouteur d'événement pour le clic sur le bouton
document.getElementById('generate-btn').addEventListener('click', () => {
    // Appelle la fonction pour récupérer une nouvelle blague
    jokeContainer.classList.remove('hidden')
    fetchJoke();
});

// Fonction pour récupérer une blague depuis l'API
function fetchJoke() {
    fetch('https://v2.jokeapi.dev/joke/Any?lang=fr')
        .then(response => response.json())
        .then(data => {
            // Vérifie si une blague a été récupérée
            if (data.setup && data.delivery) {
                // Combinaison des parties de la blague
                const joke = data.setup + ' ' + data.delivery;
                // Cherche le point d'interrogation
                const questionMarkIndex = joke.indexOf('?');
                if (questionMarkIndex !== -1) {
                    // Ajoute la classe "italic" aux mots après le point d'interrogation
                    const formattedJoke = joke.substring(0, questionMarkIndex + 1) + '<br><br> <span class="italic">' + joke.substring(questionMarkIndex + 1) + '</span>';
                    // Affiche la blague dans le conteneur
                    jokeContainer.innerHTML = formattedJoke;
                } else {
                    // Affiche la blague sans mise en italique si aucun point d'interrogation n'est trouvé
                    jokeContainer.textContent = joke;
                }
            } else {
                // Affiche un message d'erreur si aucune blague n'a été trouvée
                jokeContainer.textContent = 'Oops, aucune blague disponible pour le moment !';
            }
        })
        .catch(error => {
            // Gestion des erreurs
            jokeContainer.textContent = 'Oops, une erreur s\'est produite. Réessaie plus tard !';
            console.error(error);
        });
}

// Récupère le bouton de lecture +
// Écouteur d'événement pour le clic sur le bouton de lecture
document.getElementById('read-btn').addEventListener('click', () => {
    // Appelle la fonction pour lire la blague à haute voix
    readJoke();
});

// Fonction pour lire la blague à haute voix
function readJoke() {
    const jokeText = jokeContainer.textContent;
    const utterance = new SpeechSynthesisUtterance(jokeText);
    speechSynthesis.speak(utterance);
}





