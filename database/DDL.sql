SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT=0;

DROP TABLE IF EXISTS cards;
CREATE TABLE cards (
card_id INT AUTO_INCREMENT PRIMARY KEY,
card_name varchar(20) NOT NULL,
card_sphere varchar(10) NOT NULL,
card_type varchar(10) NOT NULL,
card_text varchar(150)
);

DROP TABLE IF EXISTS heroes;
CREATE TABLE heroes (
hero_id INT AUTO_INCREMENT PRIMARY KEY,
card_id INT NOT NULL,
FOREIGN KEY(card_id) REFERENCES cards(card_id),
hero_threat INT NOT NULL,
hero_will INT NOT NULL,
hero_attack INT NOT NULL,
hero_defense INT NOT NULL,
hero_health INT NOT NULL
);

DROP TABLE IF EXISTS allies;
CREATE TABLE allies (
ally_id INT AUTO_INCREMENT PRIMARY KEY,
card_id INT NOT NULL,
FOREIGN KEY(card_id) REFERENCES cards(card_id),
ally_cost INT NOT NULL,
ally_will INT NOT NULL,
ally_attack INT NOT NULL,
ally_defense INT NOT NULL,
ally_health INT NOT NULL
);

DROP TABLE IF EXISTS spells;
CREATE TABLE spells (
spell_id INT AUTO_INCREMENT PRIMARY KEY,
card_id INT NOT NULL,
FOREIGN KEY(card_id) REFERENCES cards(card_id),
spell_cost INT NOT NULL
);

DROP TABLE IF EXISTS attachments;
CREATE TABLE attachments (
attachment_id INT AUTO_INCREMENT PRIMARY KEY,
card_id INT NOT NULL,
FOREIGN KEY(card_id) REFERENCES cards(card_id),
attachment_cost INT NOT NULL
);

DROP TABLE IF EXISTS decks;
CREATE TABLE decks (
deck_id INT AUTO_INCREMENT PRIMARY KEY,
deck_name varchar(20) NOT NULL,
deck_creator varchar(20) DEFAULT "anonymous"
);

DROP TABLE IF EXISTS cards_in_decks;
CREATE TABLE cards_in_decks (
id INT AUTO_INCREMENT PRIMARY KEY,
deck_id INT NOT NULL,
card_id INT NOT NULL,
FOREIGN KEY(deck_id) REFERENCES decks(deck_id),
FOREIGN KEY(card_id) REFERENCES cards(card_id)
)

INSERT INTO cards(card_name, card_sphere, card_text, card_type)
VALUES (
    'Merry',
    'Leadership',
    'Merry was a hobbit.',
    'Hero'
    ),
    ('Forge Forth',
    'Tactics',
    'Adventure onwards.',
    'spell'
    );

INSERT INTO heroes(card_id, hero_threat, hero_will, hero_attack, hero_defense, hero_health)
VALUES (
    (SELECT card_id FROM cards WHERE card_name = 'Merry'),
    7,
    2,
    2,
    1,
    3
);