import { DatabaseId } from "../databases/databases";

export type TaskTopic = "revisions"  | "concat" | "where" ;

export interface Task {
  id: string;
  topic: TaskTopic;
  database: DatabaseId;
  referenceSql: string;
  tables: string[];
}

export const tasksList: Task[] = [
  // Simple select *
  { // Task 1
    id: "select_all_restos",
    topic: "revisions",
    database: "restos",
    referenceSql: "SELECT * FROM resto;",
    tables: ["resto"],
  },
  { // Task 2 Distinct
    id: "select_distinct_ville_of_resto",
    topic: "revisions",
    database: "restos",
    referenceSql: "SELECT DISTINCT villeR FROM resto;",
    tables: ["resto"],
  },
  // Select with attributes
  { // Task 3
    id: "select_mail_and_pseudo_of_utilisateur",
    topic: "revisions",
    database: "restos",
    referenceSql: "SELECT mailU, pseudoU FROM utilisateur;",
    tables: ["utilisateur"],
  },
  { // Task 4
    // Select with order by
    id: "select_libelle_of_typeCuisine_sorted_by_libelle_asc",
    topic: "revisions",
    database: "restos",
    referenceSql: "SELECT libelleTC FROM typeCuisine ORDER BY libelleTC;",
    tables: ["typeCuisine"],
  },
  { // Task 5 with order by asc and DESC
    id: "select_note_and_commentaire_and_idR_of_critiquer_sorted_by_idR_asc_and_note_DESC",
    topic: "revisions",
    database: "restos",
    referenceSql: "SELECT note, commentaire, idR FROM critiquer ORDER BY idR, note DESC;",
    tables: ["critiquer"],
  },
  { // Task 6
    id: "select_idR_and_idP_of_photo_sorted_by_idR_asc",
    topic: "revisions",
    database: "restos",
    referenceSql: "SELECT idR, idP FROM photo ORDER BY idR;",
    tables: ["photo"],
  },
  // concatenation dans le SELECT
  { // Task7 : exemple fourni
    id: "select_codepostalAndVille_renamed_CP_Ville_of_resto",
    topic: "concat",
    database: "restos",
    referenceSql: "SELECT nomR, (cpR || ' ' || villeR) AS CP_VILLE FROM resto;",
    tables: ["resto"],
  },
  { // Task 8 : en autonomie
    id: "select_numRuecodepostalAndVille_renamed_AdresseComplete_of_resto",
    topic: "concat",
    database: "restos",
    referenceSql: "SELECT nomR, numAdrR || ' ' || voieAdrR || ' ' || cpR || ' ' || villeR AS ADRESSECOMPLETE FROM resto;",
    tables: ["resto"],
  },
  //WHERE
  { // Task 9 : exemple fourni
    id: "select_description_of_scenario_where_code_S1",
    topic: "where",
    database: "ebios",
    referenceSql: "SELECT description FROM scenario WHERE code = 'S1';",
    tables: ["scenario"],
  },
 { // Task 10 : en autonomie
    id: "select_nom_of_gravite_where_code_G2",
    topic: "where",
    database: "ebios",
    referenceSql: "SELECT libelle FROM gravite WHERE code = 'G2';",
    tables: ["gravite"],
  } ,
  { // Task 11 : en autonomie
    id: "select_code_of_critereSecurite_where_libelle_Confidentialite",
    topic: "where",
    database: "ebios",
    referenceSql: "SELECT code FROM critereSecurite WHERE libelle = 'Confidentialité';",
    tables: ["critereSecurite"],
  },
 { // Task 12 : exemple fourni
    id: "select_libelle_of_typeAttaque_where_code_4",
    topic: "where",
    database: "ebios",
    referenceSql: "SELECT libelle FROM typeAttaque WHERE code = 4;",
    tables: ["typeAttaque"],
  }  ,
 { // Task 13 : en autonomie
    id: "select_all_data_of_typeAttaque_where_code_9",
    topic: "where",
    database: "ebios",
    referenceSql: "SELECT * FROM typeAttaque WHERE code = 9;",
    tables: ["typeAttaque"],
  }  
  ,
 { // Task 14 : exemple fourni
    id: "select_libelle_and_description_of_typeAttaque_where_code_Above_7",
    topic: "where",
    database: "ebios",
    referenceSql: "SELECT libelle, description FROM typeAttaque WHERE code > 7;",
    tables: ["typeAttaque"],
  } ,
 { // Task 15 : en autonomie
    id: "select_libelle_of_typeAttaque_where_code_Over_3",
    topic: "where",
    database: "ebios",
    referenceSql: "SELECT libelle FROM typeAttaque WHERE code < 3;",
    tables: ["typeAttaque"],
  } ,
 { // Task 16 : exemple fourni
    id: "select_code_of_scenario_where_code_different_from_S1",
    topic: "where",
    database: "ebios",
    referenceSql: "SELECT code FROM scenario WHERE code != 'S1';",
    tables: ["scenario"],
  }  ,
 { // Task 17 : en autonomie
    id: "select_all_data_of_critereSecurite_where_libelle_different_from_Confidentialite",
    topic: "where",
    database: "ebios",
    referenceSql: "SELECT * FROM critereSecurite WHERE libelle !='Confidentialité';",
    tables: ["critereSecurite"],
  },
 { // Task 18 : exemple fourni
    id: "select_code_and_description_of_scenario_where_description_include_données",
    topic: "where",
    database: "ebios",
    referenceSql: "SELECT code, description FROM scenario WHERE description LIKE '% données %';",
    tables: ["scenario"],
  }  ,
 { // Task 19 : en autonomie
    id: "select_code_and_description_of_gravite_where_description_include_performances",
    topic: "where",
    database: "ebios",
    referenceSql: "SELECT code, description FROM gravite WHERE description LIKE '% performances %';",
    tables: ["gravite"],
  } ,
 { // Task 20 : exemple fourni
    id: "select_code_and_description_of_scenario_where_description_not_include_données",
    topic: "where",
    database: "ebios",
    referenceSql: "SELECT code, description FROM scenario WHERE description NOT LIKE '% données %';",
    tables: ["scenario"],
  } ,
 { // Task 21 : en autonomie
    id: "select_description_and_typeMenace_of_scenario_where_support_not_include_serveur",
    topic: "where",
    database: "ebios",
    referenceSql: "SELECT description, support, menace FROM scenario WHERE support NOT LIKE 'Serveur %';",
    tables: ["scenario"],
  }  
 
];
