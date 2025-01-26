const express = require("express");
const cors = require("cors");
const Fuse = require("fuse.js"); 

const app = express();
const port = 3000;


app.use(cors());
app.use(express.json());


const faq = [
  {
    q: "Quels cours sont disponibles ce semestre ?",
    r: "Vous pouvez consulter la liste des cours disponibles sur la page du catalogue des cours de l'université ou vous renseigner sur des sujets spécifiques.",
  },
  {
    q: "Comment puis-je trouver mes résultats d'examen ?",
    r: "Les résultats d'examen sont généralement publiés sur le portail étudiant. Vous pouvez y consulter ou contacter votre professeur pour plus d'informations.",
  },
  {
    q: "Où puis-je trouver des services de Td?",
    r: "Les services de tutorat sont disponibles à [Lieu] ou via le centre de soutien aux étudiants. Vous pouvez également réserver des séances en ligne.",
  },
  {
    q: "Quelles sont les heures d'ouverture de la bibliothèque ?",
    r: "La bibliothèque est ouverte à partir de 10h. Vous pouvez consulter le site Web de la bibliothèque pour plus de détails.",
  },
  {
    q: "Comment puis-je demander une aide financière ?",
    r: "Vous pouvez demander une aide financière en visitant le bureau d'aide financière ou son site Web pour les formulaires de demande et les directives.",
  },
  {
    q: "Comment puis-je demander mon relevé de notes?",
    r: "Vous pouvez demander votre relevé de notes via le portail étudiant ou en soumettant un formulaire de demande au bureau du registraire.",
  },

  {
    q: "Quels événements se déroulent ce mois-ci?",
    r: "Ce mois-ci, nous avons les événements suivants: iheccodeLab. Vous pouvez trouver plus de détails sur le calendrier des événements.",
  },
  {
    q: "Comment puis-je rejoindre un club étudiant?",
    r: "Pour rejoindre un club étudiant, visitez la page des organisations étudiantes ou participez à la foire des clubs pour plus d'informations.",
  },
  {
    q: "Comment puis-je donner mon avis sur le chatbot?",
    r: "Vous pouvez donner votre avis en évaluant votre expérience à la fin de notre conversation ou en remplissant un formulaire de commentaires lié ici [lien]",
  },
  {
    q: "Qui dois-je contacter en cas d'urgence?",
    r: "En cas d'urgence, veuillez contacter la sécurité du campus au 198 ou vous rendre au service d'assistance le plus proche.",
  },
  {
    q: "What courses are available this semester?",
    r: "You can view the list of available courses on the university's course catalog page or ask about specific subjects.",
  },
  {
    q: "How can I find my exam results?",
    r: "Exam results are typically posted on the student portal. You can check there or contact your professor for more information.",
  },
  {
    q: "How do I enroll in a course?",
    r: "To enroll in a course, please visit the enrollment section of the student portal and follow the instructions provided.",
  },
  {
    q: "What are the library hours?",
    r: "The library is open from 10h. You can check the library's website for more details.",
  },
  {
    q: "What events are happening this month?",
    r: "This month, we have the following events:ihecCodeLab. You can find more details on the events calendar.",
  },
  {
    q: "How do I join a student club?",
    r: "To join a student club, visit the student organizations page or attend the club fair for more information.",
  },
  {
    q: "Who should I contact in case of an emergency?",
    r: "In case of an emergency, please contact campus security at 198 or visit the nearest help desk.",
  },
  {
    q: "Comment m'inscrire à un cours ?",
    r: "Pour vous inscrire à un cours, veuillez visiter la section inscription du portail étudiant et suivre les instructions fournies.",
  },
  {
    q: "Quelles sont les heures d'ouverture de la bibliothèque ?",
    r: "La bibliothèque est ouverte de [Heure] à [Heure]. Consultez le site web pour des détails.",
  },
  {
    q: "Quels programmes sont proposés à l’IHEC Carthage ?",
    r: "L’IHEC Carthage offre des programmes de licence, master et mastère professionnel dans plusieurs domaines comme la gestion, la finance, le marketing, la comptabilité, et l’économie.",
  },
  {
    q: "Où se situe l’IHEC Carthage ?",
    r: "L’IHEC Carthage est située à Carthage Présidence, dans la banlieue nord de Tunis, en Tunisie.",
  },
  {
    q: "Comment puis-je contacter l’administration de l’IHEC Carthage ?",
    r: "Vous pouvez contacter l’administration via téléphone au +216 71 773 144 ou par e-mail à contact@ihec.rnu.tn.",
  },
  {
    q: "Quels sont les critères d’admission pour l’IHEC Carthage ?",
    r: "L’admission se fait principalement via le système national d’orientation universitaire en Tunisie, basé sur les résultats obtenus au baccalauréat.",
  },
  {
    q: "Quelles sont les dates d’inscription pour les nouveaux étudiants ?",
    r: "Les inscriptions pour les nouveaux étudiants commencent généralement en juillet après les résultats du baccalauréat.",
  },
  {
    q: "Quelles spécialisations sont disponibles ?",
    r: "Les spécialisations incluent Licence : Gestion, Marketing, Comptabilité, Économie, Finance.Master : Marketing stratégique, Finance, Comptabilité.Mastères professionnels : Management des ressources humaines, Entrepreneuriat, etc.",
  },

  {
    q: "Y a-t-il des cours en ligne ?",
    r: "L’IHEC Carthage propose des cours en ligne pour certaines matières, en particulier via des plateformes comme Moodle.",
  },
  {
    q: "Comment accéder au calendrier académique ?",
    r: "Le calendrier académique est disponible sur le site officiel de l’IHEC ou peut être obtenu auprès de l’administration.",
  },

  {
    q: "Quels clubs ou associations sont disponibles ?",
    r: "L’IHEC Carthage dispose de plusieurs clubs étudiants tels que Le Club Finance,Le Club Marketing,Le Club Entrepreneurs Et le TIMUN (Model United Nations).",
  },
  {
    q: "Y a-t-il des installations sportives sur le campus ?",
    r: "Oui, il y a des terrains de sport pour le football, le basketball, et le handball, ainsi qu’un gymnase.",
  },
  {
    q: "Quels événements sont organisés sur le campus ?",
    r: "Des conférences, workshops, et compétitions comme le Hackathon de l’IHEC et les Journées de l’Emploi sont organisés régulièrement.             ",
  },
  {
    q: "Comment l’IHEC Carthage aide-t-elle à trouver des stages ?",
    r: "L’IHEC a des partenariats avec des entreprises tunisiennes et internationales. Les étudiants peuvent consulter les offres de stage via l’administration ou le portail universitaire.",
  },
  {
    q: " Existe-t-il un service d’orientation professionnelle ?",
    r: "Oui, un bureau d’insertion professionnelle aide les étudiants dans leur recherche de stages et d’emploi.",
  },
  {
    q: "Y a-t-il des événements de recrutement ?",
    r: "Oui, l’IHEC organise chaque année des forums d’emploi et des rencontres avec des entreprises partenaires.",
  },
  {
    q: "Comment puis-je emprunter des livres à la bibliothèque ?",
    r: "Vous devez vous inscrire auprès de la bibliothèque en présentant votre carte étudiante pour accéder aux ressources.",
  },
  {
    q: "Quels types de ressources numériques sont disponibles ?",
    r: "La bibliothèque propose des accès à des bases de données internationales comme JSTOR et EBSCO pour des recherches académiques.",
  },
  {
    q: "Comment réinitialiser le mot de passe du portail étudiant ?",
    r: "Vous pouvez réinitialiser votre mot de passe en contactant le service informatique à support@ihec.rnu.tn.",
  },
  {
    q: "Comment s’inscrire à un cours spécifique ?",
    r: "Les inscriptions se font en ligne via le portail étudiant ou directement auprès de votre département académique.",
  },
  {
    q: "Comment puis-je donner mon avis sur l’IHEC Carthage ?",
    r: "Vous pouvez soumettre vos retours via l’e-mail officiel de l’administration ou remplir les enquêtes de satisfaction proposées chaque semestre.",
  },
  {
    q: "Quelles sont les perspectives de carrière après une licence à l’IHEC Carthage ?",
    r: "Les diplômés de l’IHEC Carthage travaillent dans des entreprises prestigieuses en Tunisie et à l’international, notamment dans les domaines de la finance, du marketing, de la gestion et de l’entrepreneuriat.",
  },
  {
    q: "Puis-je visiter le campus avant de m’inscrire ?",
    r: "Oui, l’IHEC Carthage organise des journées portes ouvertes où vous pouvez visiter le campus et poser vos questions aux étudiants et enseignants.",
  },
  {
    q: "Quels sont les avantages d’étudier à l’IHEC par rapport à d’autres universités ?",
    r: "L’IHEC Carthage est l’une des meilleures institutions publiques en gestion et offre un excellent rapport qualité-prix, avec des enseignants expérimentés, une localisation prestigieuse à Carthage, et des partenariats avec des entreprises de renom.",
  },
  {
    q: "Comment rejoindre un club étudiant à l’IHEC Carthage ?",
    r: "Vous pouvez vous inscrire aux clubs pendant la Semaine de l’Engagement Étudiant, organisée en début d’année, ou en contactant directement les responsables des clubs via les réseaux sociaux ou leurs événements.",
  },
  {
    q: "À qui dois-je m’adresser si j’ai des difficultés dans un cours ?",
    r: "Vous pouvez contacter directement votre enseignant ou demander un rendez-vous avec le responsable de votre département académique.",
  },
  {
    q: "Y a-t-il des sessions de soutien pour les matières difficiles ?",
    r: "Oui, des séances de soutien sont organisées par les enseignants et les assistants pédagogiques pour les matières techniques comme la comptabilité et la finance.",
  },
  {
    q: "Comment puis-je participer à des programmes d’échange international ?",
    r: "L’IHEC Carthage offre des opportunités d’échange via des programmes comme Erasmus+. Contactez le Bureau des Relations Internationales pour plus d’informations.",
  },
  {
    q: "Comment puis-je rester en contact avec l’IHEC après avoir obtenu mon diplôme ?",
    r: "Vous pouvez rejoindre le réseau des alumni de l’IHEC Carthage en vous inscrivant sur le site officiel et en participant aux événements organisés par l’université.",
  },
  {
    q: "Puis-je revenir pour suivre des formations ou des séminaires ?",
    r: "Absolument ! L’IHEC Carthage propose régulièrement des formations continues et des séminaires pour les anciens étudiants.",
  },
  {
    q: "Comment accéder aux outils pédagogiques en ligne ?",
    r: "Les enseignants peuvent accéder à Moodle et aux outils pédagogiques via leur compte dédié. Pour toute assistance, contactez le service informatique.",
  },
  {
    q: "Y a-t-il des opportunités de formation ou de recherche pour les enseignants ?",
    r: "Oui, l’IHEC Carthage soutient la formation continue et la recherche via des partenariats académiques et des projets collaboratifs.",
  },
  {
    q: "Quels sont les cours disponibles pour les étudiants internationaux ?",
    r: "L’IHEC Carthage propose des cours en français, mais certains modules sont également disponibles en anglais pour les étudiants internationaux.",
  },
  {
    q: "Y a-t-il un logement disponible pour les étudiants internationaux ?",
    r: "Bien que l’IHEC ne dispose pas de résidences universitaires, nous pouvons vous aider à trouver des logements privés à proximité.",
  },
  {
    q: "Quels services sont offerts pour garantir le bien-être des étudiants ?",
    r: "L’IHEC Carthage dispose d’un service médical, d’une assistance psychologique et organise des activités sportives et culturelles pour assurer le bien-être des étudiants.",
  },
  {
    q: "Comment puis-je suivre la progression académique de mon enfant ?",
    r: "Vous pouvez consulter les relevés de notes et autres informations académiques via le portail étudiant avec l’autorisation de votre enfant.",
  },
  {
    q: "Quelles sont les options de restauration sur le campus ?",
    r: "L’IHEC dispose d’une cafétéria offrant des repas abordables ainsi que des snacks et boissons.",
  },
  {
    q: "Y a-t-il des services médicaux sur le campus ?",
    r: "Oui, une infirmerie est disponible pour les premiers soins et les consultations médicales.",
  },
  {
    q: "Le campus est-il accessible aux étudiants en situation de handicap ?",
    r: "Oui, l IHEC Carthage est équipé pour accueillir les étudiants en situation de handicap avec des rampes et des salles adaptées.",
  },
  {
    q: "What programs are offered at IHEC Carthage?",
    r: "IHEC Carthage offers undergraduate, master's, and professional master's programs in several fields such as management, finance, marketing, accounting, and economics.",
  },
  {
    q: "Where is IHEC Carthage located?",
    r: "IHEC Carthage is located in Carthage Présidence, in the northern suburbs of Tunis, Tunisia.",
  },
  {
    q: "How can I contact the administration of IHEC Carthage?",
    r: "You can contact the administration by phone at +216 71 773 144 or by email at contact@ihec.rnu.tn.",
  },
  {
    q: "What are the admission criteria for IHEC Carthage?",
    r: "Admission is mainly through the national university orientation system in Tunisia, based on the results obtained in the baccalaureate.",
  },
  {
    q: "What are the registration dates for new students?",
    r: "Registration for new students typically begins in July after the baccalaureate results.",
  },
  {
    q: "What specializations are available?",
    r: "Specializations include: \n\nUndergraduate: Management, Marketing, Accounting, Economics, Finance.\nMaster's: Strategic Marketing, Finance, Accounting.\nProfessional Master's: Human Resource Management, Entrepreneurship, etc.",
  },
  {
    q: "Are there online courses?",
    r: "IHEC Carthage offers online courses for certain subjects, particularly through platforms like Moodle.",
  },
  {
    q: "How can I access the academic calendar?",
    r: "The academic calendar is available on the official IHEC website or can be obtained from the administration.",
  },
  {
    q: "What clubs or associations are available?",
    r: "IHEC Carthage has several student clubs such as: \n\nThe Finance Club \nThe Marketing Club \nThe Entrepreneurs Club \nAnd the TIMUN (Model United Nations).",
  },
  {
    q: "Are there sports facilities on campus?",
    r: "Yes, there are sports fields for football, basketball, and handball, as well as a gym.",
  },
  {
    q: "What events are organized on campus?",
    r: "Conferences, workshops, and competitions like the IHEC Hackathon and Job Fairs are regularly organized.",
  },
  {
    q: "How does IHEC Carthage help with finding internships?",
    r: "IHEC has partnerships with Tunisian and international companies. Students can check internship offers through the administration or the university portal.",
  },
  {
    q: "Is there a career counseling service?",
    r: "Yes, a career placement office helps students in their search for internships and employment.",
  },
  {
    q: "Are there recruitment events?",
    r: "Yes, IHEC organizes employment forums and meetings with partner companies every year.",
  },
  {
    q: "How can I borrow books from the library?",
    r: "You must register at the library by presenting your student card to access the resources.",
  },
  {
    q: "What types of digital resources are available?",
    r: "The library provides access to international databases like JSTOR and EBSCO for academic research.",
  },
  {
    q: "How do I reset my student portal password?",
    r: "You can reset your password by contacting the IT service at support@ihec.rnu.tn.",
  },
  {
    q: "How do I register for a specific course?",
    r: "Registrations are done online via the student portal or directly with your academic department.",
  },
  {
    q: "How can I give feedback about IHEC Carthage?",
    r: "You can submit your feedback via the official administration email or fill out the satisfaction surveys offered each semester.",
  },
  {
    q: "What are the career prospects after a degree from IHEC Carthage?",
    r: "Graduates from IHEC Carthage work in prestigious companies in Tunisia and internationally, particularly in finance, marketing, management, and entrepreneurship.",
  },
  {
    q: "Can I visit the campus before enrolling?",
    r: "Yes, IHEC Carthage organizes open house days where you can visit the campus and ask questions to students and teachers.",
  },
  {
    q: "What are the advantages of studying at IHEC compared to other universities?",
    r: "IHEC Carthage is one of the best public institutions in management and offers excellent value for money, with experienced teachers, a prestigious location in Carthage, and partnerships with renowned companies.",
  },
  {
    q: "How can I join a student club at IHEC Carthage?",
    r: "You can sign up for clubs during the Student Engagement Week, organized at the beginning of the year, or by directly contacting the club leaders via social media or their events.",
  },
  {
    q: "Who should I contact if I have difficulties in a course?",
    r: "You can contact your teacher directly or request an appointment with the head of your academic department.",
  },
  {
    q: "Are there support sessions for difficult subjects?",
    r: "Yes, support sessions are organized by teachers and teaching assistants for technical subjects such as accounting and finance.",
  },
  {
    q: "How can I participate in international exchange programs?",
    r: "IHEC Carthage offers exchange opportunities through programs like Erasmus+. Contact the International Relations Office for more information.",
  },
  {
    q: "How can I stay in touch with IHEC after graduation?",
    r: "You can join the alumni network of IHEC Carthage by registering on the official website and participating in events organized by the university.",
  },
  {
    q: "Can I return for training or seminars?",
    r: "Absolutely! IHEC Carthage regularly offers continuing education and seminars for former students.",
  },
  {
    q: "How do I access online teaching tools?",
    r: "Teachers can access Moodle and teaching tools via their dedicated account. For any assistance, contact the IT service.",
  },
  {
    q: "Are there training or research opportunities for teachers?",
    r: "Yes, IHEC Carthage supports continuing education and research through academic partnerships and collaborative projects.",
  },
  {
    q: "What courses are available for international students?",
    r: "IHEC Carthage offers courses in French, but some modules are also available in English for international students.",
  },
  {
    q: "Is accommodation available for international students?",
    r: "Although IHEC does not have university residences, we can help you find private accommodation nearby.",
  },
  {
    q: "What services are offered to ensure student well-being?",
    r: "IHEC Carthage has a medical service, psychological assistance, and organizes sports and cultural activities to ensure student well-being.",
  },
  {
    q: "How can I track my child's academic progress?",
    r: "You can consult transcripts and other academic information through the student portal with your child's permission.",
  },
  {
    q: "What dining options are available on campus?",
    r: "IHEC has a cafeteria offering affordable meals as well as snacks and drinks.",
  },
  {
    q: "Are there medical services on campus?",
    r: "Yes, a nurse's office is available for first aid and medical consultations.",
  },
  {
    q: "Is the campus accessible to students with disabilities?",
    r: "Yes, IHEC Carthage is equipped to accommodate students with disabilities with ramps and adapted rooms.",
  },
  {
    q: "What programs are offered at IHEC Carthage?",
    r: "IHEC Carthage offers undergraduate, master’s, and professional master’s programs in various fields such as management, finance, marketing, accounting, and economics.",
  },
  {
    q: "Where is IHEC Carthage located?",
    r: "IHEC Carthage is located in Carthage Présidence, in the northern suburbs of Tunis, Tunisia.",
  },
  {
    q: "How can I contact the administration of IHEC Carthage?",
    r: "You can contact the administration by phone at +216 71 773 144 or via email at contact@ihec.rnu.tn.",
  },
  {
    q: "What are the admission criteria for IHEC Carthage?",
    r: "Admission is mainly through the national university orientation system in Tunisia, based on baccalaureate results.",
  },
  {
    q: "When are registration dates for new students?",
    r: "Registrations for new students generally start in July, after the baccalaureate results are announced.",
  },
  {
    q: "What specializations are available?",
    r: "Specializations include:Undergraduate: Management, Marketing, Accounting, Economics, Finance.Master’s: Strategic Marketing, Finance, Accounting.Professional Master’s: Human Resource Management, Entrepreneurship, etc.",
  },
  {
    q: "Are there online courses?",
    r: "IHEC Carthage offers online courses for certain subjects, particularly through platforms like Moodle.",
  },
  {
    q: "How can I access the academic calendar?",
    r: "The academic calendar is available on the official IHEC website or can be obtained from the administration.",
  },

  {
    q: "What clubs or associations are available?",
    r: "IHEC Carthage has several student clubs, including:Finance ClubMarketing ClubEntrepreneurs ClubHECMUN (Model United Nations).",
  },
  {
    q: "Are there sports facilities on campus?",
    r: "Yes, there are sports fields for football, basketball, and handball, as well as a gymnasium.",
  },
  {
    q: " What events are organized on campus?",
    r: "Conferences, workshops, and competitions like the IHEC Hackathon and Employment Days are regularly organized.",
  },
  {
    q: "How does IHEC Carthage help students find internships?",
    r: "IHEC has partnerships with Tunisian and international companies. Students can consult internship offers through the administration or the university portal.",
  },

  {
    q: "Is there a career guidance service?",
    r: "Yes, a career guidance office helps students in finding internships and jobs.",
  },
  {
    q: "Are there recruitment events?",
    r: "Yes, IHEC organizes annual job fairs and meetings with partner companies.",
  },
  {
    q: " How can I borrow books from the library?",
    r: "You need to register with the library by presenting your student card to access resources.",
  },
  {
    q: "What types of digital resources are available?",
    r: "The library provides access to international databases like JSTOR and EBSCO for academic research.",
  },

  {
    q: "What types of digital resources are available?",
    r: "You can reset your password by contacting the IT department at support@ihec.rnu.tn.",
  },
  {
    q: "How can I enroll in a specific course?",
    r: " Enrollment is done online via the student portal or directly through your academic department.",
  },
  {
    q: "  How can I enroll in a specific course?",
    r: "Enrollment is done online via the student portal or directly through your academic department",
  },
  {
    q: "How can I give feedback about IHEC Carthage?",
    r: " You can submit feedback through the official administration email or fill out satisfaction surveys offered each semester.",
  },

  {
    q: "  What career opportunities are available after earning a degree from IHEC Carthage?",
    r: "IHEC graduates work in prestigious companies in Tunisia and abroad, particularly in finance, marketing, management, and entrepreneurship.",
  },
  {
    q: " Can I visit the campus before enrolling?",
    r: "  Yes, IHEC Carthage organizes open house days where you can visit the campus and ask questions to students and faculty.",
  },
];

// Initialisation de Fuse.js
const fuse = new Fuse(faq, {
  keys: ["q"], 
  threshold: 0.4, 
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
      response:
        "Je n'ai pas compris votre question. Pouvez-vous reformuler ?.",
    });
  }
});

// Lancement du serveur
app.listen(port, () => {
  console.log(`Chatbot backend running on http://localhost:${port}`);
});
