const express = require("express");
const cors = require("cors");
const Fuse = require("fuse.js");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const faq = [
  {
    q: "Où se trouve Salakta ?",
    r: "Salakta est située sur la côte est de la Tunisie, dans le gouvernorat de Mahdia.",
  },
  {
    q: "Pourquoi Salakta est-elle célèbre ?",
    r: "Elle est célèbre pour son ancien port romain et punique et son patrimoine archéologique.",
  },
  {
    q: "Quand le musée de Salakta a-t-il été fondé ?",
    r: "Le musée a été fondé en 1980.",
  },
  {
    q: "Combien de salles principales comporte le musée ?",
    r: "Le musée comprend trois salles principales.",
  },
  {
    q: "Que trouve-t-on dans la Salle du Tombeau ?",
    r: "On y trouve de la poterie punique et le tombeau d’un guerrier local.",
  },
  {
    q: "Quel est l’objet le plus célèbre de la Salle du Tombeau ?",
    r: "Un bouclier en bronze attribué à Hannibal selon le folklore.",
  },
  {
    q: "Quelles périodes historiques couvre le musée ?",
    r: "De l’époque carthaginoise à l’ère chrétienne primitive.",
  },
  {
    q: "Qu’est-ce que la mosaïque du Lion africain ?",
    r: "Une mosaïque de 30 m² représentant un lion, symbole de protection.",
  },
  {
    q: "De quoi est faite la mosaïque ?",
    r: "De tesselles de pierre naturelle.",
  },
  {
    q: "Que signifie 'Utere felix' ?",
    r: "'Utilise avec bonheur', une formule pour attirer la chance.",
  },

  {
    q: "Que montre la Salle de la Céramique ?",
    r: "Des amphores romaines et de la céramique sigillée africaine.",
  },
  {
    q: "Qu’est-ce que la sigillée africaine ?",
    r: "Une poterie fine romaine à revêtement rouge.",
  },
  {
    q: "À quoi servaient les amphores romaines ?",
    r: "À transporter de l’huile, du vin et de la sauce de poisson.",
  },
  {
    q: "Pourquoi le port de Salakta était-il important ?",
    r: "C’était un centre de commerce méditerranéen majeur.",
  },
  {
    q: "Qui étaient les naviculaires ?",
    r: "Une guilde de propriétaires de navires de Salakta.",
  },
  {
    q: "Où les produits de Salakta étaient-ils exportés ?",
    r: "Vers des ports comme Ostie et dans toute la Méditerranée.",
  },
  {
    q: "Qu’est-ce que le garum ?",
    r: "Une sauce de poisson fermentée très utilisée dans la cuisine romaine.",
  },
  {
    q: "Où les amphores étaient-elles fabriquées ?",
    r: "Dans des ateliers comme El Maklouba et Henchir Ech Chekaf.",
  },
  {
    q: "Qu’est-ce qu’une catacombe ?",
    r: "Des galeries souterraines funéraires utilisées par les premiers chrétiens.",
  },
  {
    q: "Qu’est-ce que Ghar Edhbaa ?",
    r: "Une catacombe chrétienne avec des arcosolia et des épitaphes.",
  },
  {
    q: "Que signifie 'Salakta' en latin ?",
    r: "Cela signifie 'terre bénie'.",
  },
  {
    q: "En quelle année le musée de Salakta a-t-il été fondé ?",
    r: "En 1980.",
  },
  {
    q: "Quel est le thème principal du musée ?",
    r: "Il est consacré à l’histoire et au patrimoine de Salakta et de la Tunisie antique.",
  },
  {
    q: "Combien de salles principales y a-t-il dans le musée ?",
    r: "Il y a trois salles principales.",
  },
  {
    q: "Dans quelle salle trouve-t-on la mosaïque du lion africain ?",
    r: "Dans la Salle du Lion Africain.",
  },
  {
    q: "Quel type de poterie trouve-t-on dans la salle du tombeau ?",
    r: "Des poteries puniques et romaines primitives.",
  },
  {
    q: "Qui serait enterré dans la salle du tombeau selon le folklore ?",
    r: "Un ancien guerrier de Salakta.",
  },
  {
    q: "Que signifie l'expression latine 'Utere felix' ?",
    r: "Cela signifie 'Utilise avec bonheur'.",
  },
  {
    q: "Que symbolise le lion africain dans la mosaïque ?",
    r: "La puissance et la protection.",
  },
  {
    q: "Où la mosaïque du lion africain était-elle placée à l’origine ?",
    r: "Dans les thermes d’une villa romaine.",
  },
  {
    q: "De quelle époque datent les catacombes chrétiennes ?",
    r: "Du IVᵉ au VIᵉ siècle apr. J.-C.",
  },
  {
    q: "Quelle est la longueur estimée des catacombes ?",
    r: "Environ 1 kilomètre.",
  },
  {
    q: "Quelles langues retrouve-t-on dans les épitaphes des catacombes ?",
    r: "Le grec et le latin.",
  },
  {
    q: "Qu’est-ce que le garum ?",
    r: "Une sauce de poisson fermentée utilisée dans la cuisine romaine.",
  },
  {
    q: "Que sont les amphores ?",
    r: "Des jarres en terre cuite servant au stockage et au transport.",
  },
  {
    q: "De quoi est faite la mosaïque du lion ?",
    r: "De tesselles en pierre naturelle.",
  },
  {
    q: "Qui étaient les naviculaires ?",
    r: "Des armateurs ou membres de la guilde maritime.",
  },
  {
    q: "Avec quelle ville Salakta était-elle connectée par le commerce ?",
    r: "Ostie, le port de la Rome antique.",
  },
  {
    q: "Quel est le nom d'une épave qui prouve le commerce de Salakta ?",
    r: "Héliopolis I.",
  },
  {
    q: "Qu'est-ce que la sigillée africaine ?",
    r: "Un type de poterie romaine fine de couleur rouge.",
  },
];

// Initialisation de Fuse.js
const fuse = new Fuse(faq, {
  keys: ["q"],
  threshold: 0.4,
  includeScore: true,
  ignoreLocation: true,
  shouldSort: true,
  // Nouveaux paramètres
  tokenize: true,
  matchAllTokens: true,
  findAllMatches: true,
  normalize: true,
});

// Endpoint pour gérer les questions
app.post("/chatbot", (req, res) => {
  const question = req.body.question.toLowerCase();

  // Recherche floue avec Fuse.js
  const results = fuse.search(question);

  if (results.length > 0) {
    res.send({ response: results[0].item.r }); // Retourne la meilleure correspondance
  } else {
    res.send({
      response: "Je n'ai pas compris votre question. Pouvez-vous reformuler ?.",
    });
  }
});

// Lancement du serveur
app.listen(port, () => {
  console.log(`Chatbot backend running on http://localhost:${port}`);
});
