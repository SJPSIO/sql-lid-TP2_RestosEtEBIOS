import { Database } from "./databases";

const initTypeMenace = `
CREATE TABLE typeMenace(
    code VARCHAR(3) NOT NULL PRIMARY KEY,
    nom VARCHAR(20) NOT NULL,
    categorie VARCHAR(20) NOT NULL
);

INSERT INTO typeMenace (code, nom, categorie) VALUES
('M1', 'Déstabilisation', 'Intentionnelle'),
('M2', 'Espionnage', 'Intentionnelle'),
('M3', 'Sabotage', 'Intentionnelle'),
('M4', 'Cybercriminalité', 'Intentionnelle'),
('M5', 'Altération du SI', 'Non-Intentionnelle');
`;

const initScenario = `
CREATE TABLE scenario (
    code VARCHAR(3) NOT NULL PRIMARY KEY,
    description VARCHAR(200) NOT NULL,
    menace VARCHAR(3) NOT NULL,
    support VARCHAR(30) DEFAULT NULL,
    FOREIGN KEY (menace) REFERENCES typeMenace (code) ON DELETE NO ACTION ON UPDATE NO ACTION
);

INSERT INTO scenario (code, description, menace, support) VALUES
('S1', 'Usurpation d''un compte d''authentification d''un opérateur, par un technicien de maintenance extérieure, afin de récupérer des données confidentielles.', 'M2', 'Ordinateur opérateur'),
('S2', 'Suppression ou vol de données dans la base de données par un salarié mécontent, dans l''objectif de nuire à l''employeur, voire à les communiquer à un concurrent.', 'M1', 'Serveur de bases de données'),
('S3', 'Modification de données par un employé non-habilité, suite à une erreur de manipulation.', 'M5', 'Base de données centrale'),
('S4', 'Altération de données sur le serveur de base de données, par un attaquant extérieur, afin de bloquer les études de marché actuelles.', 'M1', 'Base de données centrale'),
('S5', 'Arrêt du serveur d''authentification suite à la réception d''une multitude de requêtes de connexion.', 'M1', 'Serveur d''authentification'),
('S6', 'Scenario de test - incomplet', 'M5', '');`;

const initGravite = `
CREATE TABLE gravite(
    code VARCHAR(2) NOT NULL PRIMARY KEY,
    libelle VARCHAR(15) NOT NULL,
    description VARCHAR(280) NOT NULL
);
INSERT INTO gravite (code, libelle, description) VALUES
    ('G1', 'Mineure', 'Aucun impact opérationnel : * ni sur les performances de l’activité * ni sur la sécurité des personnes et des biens.'),
    ('G2', 'Significative', 'Dégradation des performances de l’activité sans impact sur la sécurité des personnes et des biens. ⇒ La société surmontera la situation malgré quelques difficultés (fonctionnement en mode dégradé).'),
    ('G3', 'Grave', 'Forte dégradation des performances de l’activité, avec d’éventuels impacts significatifs sur la sécurité des personnes et des biens. ⇒ La société surmontera la situation avec de sérieuses difficultés (fonctionnement en mode très dégradé).'),
    ('G4', 'Critique', 'Incapacité pour la société d’assurer tout ou partie de son activité, avec d’éventuels impacts graves sur la sécurité des personnes et des biens. ⇒ La société ne surmontera vraisemblablement pas la situation (sa survie est menacée).');
`;

const initImpact = `
CREATE TABLE impact(
    code tinyint(4) NOT NULL PRIMARY KEY,
    libelle VARCHAR(50) NOT NULL,
    details VARCHAR(200) NOT NULL
);
INSERT INTO impact (code, libelle, details) VALUES
(1, 'Impacts sur les services offerts', 'Conséquences directes ou indirectes sur la réalisation des missions de l''entreprise.'),
(2, 'Impacts humains, matériels ou environnementaux', 'Impacts sur la sécurité ou santé des personnes. Dégâts ou destruction de matériels; Conséquences écologiques.'),
(3, 'Impacts sur la gouvernance', 'Impacts sur la capacité de développement ou de décision. Impacts sur le lien social interne. Impacts sur le patrimoine intellectuel de l''organisation.'),
(4, 'Impacts financiers', 'Conséquences pécuniaires.'),
(5, 'Impacts juridiques', 'Conséquences suite à une non-conformité légale, règlementaire ou contractuelle.'),
(6, 'Impacts sur l''image et la confiance', 'Conséquences sur la réputation de l''organisation et sur la confiance de ses clients.');
`;

const initCritereSecurite = `
CREATE TABLE critereSecurite(
    code char(1) NOT NULL PRIMARY KEY ,
    libelle VARCHAR(20) NOT NULL,
    complements VARCHAR(20) NOT NULL
);
INSERT INTO critereSecurite (code, libelle, complements) VALUES
('C', 'Confidentialité', 'Etre accessible uniquement aux personnes autorisées'),
('D', 'Disponibilité', 'Service ou ressources accessibles à tout moment'),
('I', 'Intégrité', 'Cohérence assurée aussi bien pendant la collecte, le transfert et le stockage.'),
('P', 'Preuve', 'Prouver l''action avec certitude (non-répudiation)');
`;

const initTypeAttaque = `
CREATE TABLE typeAttaque(
    code VARCHAR(3) NOT NULL PRIMARY KEY,
    libelle VARCHAR(30) NOT NULL,
    description VARCHAR(200) NOT NULL
);

INSERT INTO typeAttaque (code, libelle, description) VALUES
(1, 'Déni de service', 'Rendre un service inaccessible par l''envoi d''une multitude de requêtes vers le serveur.'),
(2, 'Défiguration', 'Ajout ou remplacement de pages d''un site web afin de revendiquer un message idéologique.'),
(3, 'Divulgation de données', 'Diffusion de données confidentielles récupérées par le biais d''une vulnérabilité du SI.'),
(4, 'Attaque par point d''eau', 'Wateringhole : infection du site Internet d''une organisation pour contaminer les ordinateurs des visiteurs pour ensuite accéder au réseau de l''organisation cible.'),
(5, 'Hameçonnage ciblé', 'SpearPhishing : usurpation de l''identité d''une personne connue du destinataire ciblé pour envoyer un message avec pièce  jointe infectée à un membre d''une organisation afin d''accéder au réseau interne'),
(6, 'Rançonlogiciel', 'Ransomware : chiffrement des données de l''entreprise jusqu''à paiement d''une rançon. Certaines données compromettantes sont parfois susceptibles d''être divulguées.'),
(7, 'Hameçonnage', 'Action visant à tromper un utilisateur pour l''inciter à communiquer des données personnelles : données bancaires, codes d''accès, ...Cette attaque passe souvent par les réseaux sociaux, SMS, courriels'),
(8, 'Evènement climatique', 'Orage, inondation, incendie'),
(9, 'Action humaine', 'Erreur de manipulation, maladresse, négligence'),
(10, 'Risque matériel', 'Composant, logiciel intégré,... peuvent être vulnérables, moins tolérants à certaines conditions d''utilisation.');
`;

const initEngendrer = `
CREATE TABLE engendrer(
    codeScenario VARCHAR(3)  NOT NULL,
    codeImpact tinyint(4) NOT NULL,
    PRIMARY KEY (codeScenario, codeImpact),
    FOREIGN KEY (codeImpact) REFERENCES impact (code) ON DELETE NO ACTION ON UPDATE NO ACTION,
    FOREIGN KEY (codeScenario) REFERENCES scenario (code) ON DELETE NO ACTION ON UPDATE NO ACTION
);
INSERT INTO engendrer (codeScenario, codeImpact) VALUES
    ('S1', 3),
('S1', 4),
('S1', 5),
('S1', 6),
('S2', 1),
('S2', 3),
('S2', 4),
('S2', 5),
('S2', 6),
('S3', 1),
('S3', 2),
('S3', 3),
('S3', 4),
('S3', 5),
('S4', 1),
('S4', 3),
('S4', 4),
('S4', 5),
('S4', 6),
('S5', 1),
('S5', 3),
('S5', 4),
('S5', 5);
`;


export const ebios: Database = {
  name: "ebios",
  initSql: `${initScenario}${initGravite}${initImpact}${initCritereSecurite}${initTypeAttaque}${initTypeMenace}${initEngendrer}`,
};
