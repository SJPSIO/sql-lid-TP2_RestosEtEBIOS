import { Database } from "./databases";

const initUtilisateur = `
CREATE TABLE utilisateur (
  mailU varchar(150) NOT NULL PRIMARY KEY,
  mdpU varchar(50) DEFAULT NULL,
  pseudoU varchar(50) DEFAULT NULL
) ;

INSERT INTO utilisateur (mailU, mdpU, pseudoU) VALUES
('alex.garat@gmail.com', '$1$zvN5hYSQSQDFUIQSdufUQSDFznHF5osT.', '@lex'),
('exemple@sio.lan', 'sej5vWNdAeBCw', 'toto'),
('jj.soueix@gmail.com', '$1$zvN5hYMI$SDFGSDFGJqJSDJF.', 'drskott'),
('michel.garay@gmail.com', '$1$zvN5hYMI$VSatLQ6SDFGdsfgznHF5osT.', 'Mitch'),
('nicolas.harispe@gmail.com', '$1$zvNDSFQSdfqsDfQsdfsT.', 'Nico40'),
('y.barrot@gmail.com', '$1$zvN5SFDLGKDLFgiIQSOUSDFqqsdFsT.', 'lechambon');
`;

const initTypeCuisine = `
CREATE TABLE typeCuisine (
  idTC bigint(20) NOT NULL PRIMARY KEY,
  libelleTC varchar(255) DEFAULT NULL
) ;

INSERT INTO typeCuisine (idTC, libelleTC) VALUES
(1, 'sud ouest'),
(2, 'japonaise'),
(3, 'orientale'),
(4, 'fastfood'),
(5, 'vegetarienne'),
(6, 'vegan'),
(7, 'crepe'),
(8, 'sandwich'),
(9, 'tartes'),
(10, 'viande'),
(11, 'grillade');
`;

const initResto = `
CREATE TABLE resto (
  idR bigint(20) NOT NULL PRIMARY KEY,
  nomR varchar(255) DEFAULT NULL,
  numAdrR varchar(20) DEFAULT NULL,
  voieAdrR varchar(255) DEFAULT NULL,
  cpR char(5) DEFAULT NULL,
  villeR varchar(255) DEFAULT NULL,
  latitudeDegR float DEFAULT NULL,
  longitudeDegR float DEFAULT NULL,
  descR text DEFAULT NULL,
  horairesR text DEFAULT NULL
) ;

INSERT INTO resto (idR, nomR, numAdrR, voieAdrR, cpR, villeR, latitudeDegR, longitudeDegR, descR, horairesR) VALUES
(1, 'l''entrepote', '2', 'rue Maurice Ravel', '33000', 'Bordeaux', NULL, NULL, 'description', 'horaires'),
(2, 'le bar du charcutier', '30', 'rue Parlement Sainte-Catherine', '33000', 'Bordeaux', NULL, NULL, 'description', 'horaires'),
(3, 'Sapporo', '33', 'rue Saint Rémi', '33000', 'Bordeaux', NULL, NULL, 'Le Sapporo propose à ses clients de délicieux plats typiques japonais.', 'horaire'),
(4, 'Cidrerie du fronton', NULL, 'Place du Fronton', '64210', 'Arbonne', NULL, NULL, 'description', 'horaires'),
(5, 'Agadir', '3', 'Rue Sainte-Catherine', '64100', 'Bayonne', NULL, NULL, 'description', 'horaires'),
(6, 'Le Bistrot Sainte Cluque', '9', 'Rue Hugues', '64100', 'Bayonne', NULL, NULL, 'description', 'horaires'),
(7, 'Talaia', NULL, 'quai pedros', '64100', 'Bayonne', NULL, NULL, 'description', 'horaires'),
(8, 'La table de POTTOKA', '21', 'Quai Amiral Dubourdieu', '64100', 'Bayonne', NULL, NULL, 'description', 'horaires'),
(9, 'La Rotisserie du Roy Léon', '8', 'rue de coursic', '64100', 'Bayonne', NULL, NULL, 'description', 'horaires'),
(10, 'Bar du Marché', '39', 'Rue des Basques', '64100', 'Bayonne', NULL, NULL, 'description', 'horaires'),
(11, 'Trinquet Moderne', '60', 'Avenue Dubrocq', '64100', 'Bayonne', NULL, NULL, 'description', 'horaires');
 `;

const initProposer = `
CREATE TABLE proposer (
  idR bigint(20) NOT NULL,
  idTC bigint(20) NOT NULL,
  PRIMARY KEY (idR,idTC),
  FOREIGN KEY (idR) REFERENCES resto (idR) ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY (idTC) REFERENCES typeCuisine (idTC) ON DELETE NO ACTION ON UPDATE NO ACTION
) ;

INSERT INTO proposer (idR, idTC) VALUES
(1, 1),
(2, 1),
(3, 3),
(4, 1),
(4, 11),
(5, 3),
(6, 10),
(7, 6),
(7, 7),
(8, 11),
(9, 10),
(10, 1),
(11, 1),
(11, 10);
 `;

const initPreferer = `
CREATE TABLE preferer (
  mailU varchar(150) NOT NULL,
  idTC bigint(20) NOT NULL,
  PRIMARY KEY (mailU,idTC),
  FOREIGN KEY (mailU) REFERENCES utilisateur (mailU) ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY (idTC) REFERENCES typeCuisine (idTC) ON DELETE NO ACTION ON UPDATE NO ACTION
) ;

INSERT INTO preferer (mailU, idTC) VALUES
('michel.garay@gmail.com', 1),
('michel.garay@gmail.com', 2),
('michel.garay@gmail.com', 3),
('michel.garay@gmail.com', 10),
('nicolas.harispe@gmail.com', 1),
('nicolas.harispe@gmail.com', 2),
('nicolas.harispe@gmail.com', 11),
('y.barrot@gmail.com', 4),
('y.barrot@gmail.com', 10);
 `;

const initPhoto = `
CREATE TABLE photo (
  idP bigint(20) NOT NULL PRIMARY KEY,
  cheminP varchar(255) DEFAULT NULL,
  idR bigint(20) DEFAULT NULL,
  FOREIGN KEY (idR) REFERENCES resto (idR) ON DELETE NO ACTION ON UPDATE NO ACTION
) ;

INSERT INTO photo (idP, cheminP, idR) VALUES
(0, 'entrepote1.jpg', 1),
(1, 'entrepote2.jpg', 1),
(2, 'entrepote3.jpg', 1),
(3, 'resto.jpg', 2);
 `;

const initCritiquer = `
CREATE TABLE critiquer (
  idR bigint(20) NOT NULL,
  mailU varchar(150) NOT NULL,
  note int(11) DEFAULT NULL,
  commentaire varchar(4096) DEFAULT NULL,
  PRIMARY KEY (idR,mailU),
  FOREIGN KEY (idR) REFERENCES resto (idR) ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY (mailU) REFERENCES utilisateur (mailU) ON DELETE NO ACTION ON UPDATE NO ACTION
) ;

INSERT INTO critiquer (idR, mailU, note, commentaire) VALUES
(1, 'michel.garay@gmail.com', 3, 'Tres bonne entrecote, les frites sont maisons et delicieuses.'),
(1, 'nicolas.harispe@gmail.com', 4, 'Très bon accueil.'),
(2, 'jj.soueix@gmail.com', 2, 'bof.'),
(2, 'nicolas.harispe@gmail.com', 1, 'Cuisine tres moyenne.'),
(4, 'nicolas.harispe@gmail.com', 5, 'Rapide.'),
(5, 'nicolas.harispe@gmail.com', 3, 'Cuisine correcte.'),
(6, 'nicolas.harispe@gmail.com', 4, 'Cuisine de qualité.'),
(7, 'alex.garat@gmail.com', 4, 'Bon accueil.'),
(7, 'nicolas.harispe@gmail.com', 5, 'Excellent.'),
(7, 'y.barrot@gmail.com', 5, 'Service efficace.');
 `;

const initAimer = `
CREATE TABLE aimer (
  idR bigint(20) NOT NULL,
  mailU varchar(150) NOT NULL,
  PRIMARY KEY (idR,mailU),
  FOREIGN KEY (idR) REFERENCES resto (idR) ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY (mailU) REFERENCES utilisateur (mailU) ON DELETE NO ACTION ON UPDATE NO ACTION
) ;

INSERT INTO aimer (idR, mailU) VALUES
(1, 'michel.garay@gmail.com'),
(8, 'jj.soueix@gmail.com'),
(10, 'alex.garat@gmail.com'),
(10, 'y.barrot@gmail.com'),
(11, 'nicolas.harispe@gmail.com');
 `;
export const restos: Database = {
  name: "restos",
  initSql: `${initUtilisateur}${initTypeCuisine}${initResto}${initProposer}${initPreferer}${initPhoto}${initCritiquer}${initAimer}`,
};
