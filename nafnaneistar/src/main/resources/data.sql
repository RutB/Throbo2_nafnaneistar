DROP TABLE IF EXISTS namecards;

CREATE TABLE namecards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    name_desc VARCHAR (255) NOT NULL,
    category INT not null,
);

INSERT INTO namecards (firstname, name_desc) VALUES 
("Aagot","Afbrigði ÅGOT.","1"),
("Abel","Frá hebreska nafninu הֶבֶל (Hevel) sem þýðir `andardráttur`. Í Gamla testamentinu er hann annar sonur Adams og Evu, myrtur af öfund af bróður sínum Kain. Á Englandi kom þetta nafn í notkun á miðöldum og það var algengt á Puritan tímum.","1"),
("Abela","MISSING","1"),
("Júní","Sænskur og norskur fylgdarmaður JÚNÍ.","0"),
("Júníus","dregið af Júní-mánuði, sem aftur dregur nafn af Júnó, konu Júpiters.","0"),
("Júrek","Diminutive af JERZY.","0");