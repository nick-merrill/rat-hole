import {roles} from './constants';
// eslint-disable-next-line no-unused-vars
import {pfoho, quincy, leverett} from './houses';

let students = [];

const add = (firstName, lastName, house, year, concentration, sex, imageURL, bio) => {
  students.push({
    role: roles.student,
    firstName,
    lastName,
    house,
    year,
    concentration,
    sex,
    imageURL,
    bio,
  });
};


add(
  'Nick', 'Merrill',
  pfoho,
  '2018',
  'Computer Science',
  'M',
  'https://scontent.fzty2-1.fna.fbcdn.net/v/t1.0-9/417556_4604809077869_865814500_n.jpg?oh=096c4f3f2aa402cc5b7ded76d9606501&oe=59567461',
  'Nick is a senior studying computer science. He took two gap years to work on a startup. \n\n he/him/his'
);

add(
  'Channy', 'Hong',
  pfoho,
  '2019',
  'Economics',
  'M',
  'https://scontent.fzty2-1.fna.fbcdn.net/v/t1.0-9/10392253_1135704643120429_5541253428949532488_n.jpg?oh=f585a2149a16f781ce8418e65c1e6b3b&oe=59510C1C',
  'Channy likes to play Dota'
);

add(
  'Nebras', 'Jemel',
  pfoho,
  '2020',
  'Philosophy',
  'M',
'https://scontent.fzty2-1.fna.fbcdn.net/v/t1.0-1/15079033_10211581463516017_8272026401114106521_n.jpg?oh=adbde74a22790c659e145af0e7e26715&oe=598FA558',
  'Nebras likes to read Kant'
);

add(
  'Chris', 'Morrow',
  pfoho,
  '2020',
  'Applied Mathmatics',
  'M',
  'https://scontent.fzty2-1.fna.fbcdn.net/v/t1.0-9/12227170_1127771520588812_6267020617702920324_n.jpg?oh=d5a77593f4453cd7f2272ac8fc79f14d&oe=598F3D8C',
  'Chris likes to play Tennis'
);

add(
  'Hunter', 'Worland',
  pfoho,
  '2019',
  'Physics',
  'M',
  'https://scontent.fzty2-1.fna.fbcdn.net/v/t1.0-9/16266306_1238600729564901_3203678302104211947_n.jpg?oh=feb2cd3dc500e16f6cb7184a77ebc254&oe=597FFCFF',
  'Hunter likes to ski and travel around the world'
);

add(
  'Isabela', 'Vitta',
  pfoho,
  '2019',
  'Economics',
  'F',
  'https://scontent.fzty2-1.fna.fbcdn.net/v/t1.0-9/13680762_10207105491337107_309880865121545779_n.jpg?oh=7b52f6de190ef385e0d45320ce99df69&oe=5991EB2A',
  'Isabela is from Brazil'
);

add(
  'Sarah', 'Stevens',
  pfoho,
  '2019',
  'Visual and Environmental Studies',
  'F',
  'https://scontent.fzty2-1.fna.fbcdn.net/v/t1.0-9/14520509_1169716576410113_3218914329459535644_n.jpg?oh=70c9cb659b7289776409c5d6e69b7b1c&oe=5982D023',
  'Sarah likes comedy'
);

add(
  'Faith', 'Pak',
  pfoho,
  '2020',
  'English',
  'F',
  'https://scontent.fzty2-1.fna.fbcdn.net/v/t1.0-9/14495325_374457162886143_2644674093942240823_n.jpg?oh=f113e53326652ed462134796b996bf7a&oe=599554B8',
  'Faith enjoys drinking different types of wine'
);

add(
  'Alyn', 'Wallace',
  pfoho,
  '2020',
  'Studies of Woman, Gender, and Sexuality',
  'F',
  'https://scontent.fzty2-1.fna.fbcdn.net/v/t1.0-9/17904335_1602130003161093_4666719983075130483_n.jpg?oh=0ef093477dd62a623dc7a9e6419deaab&oe=59556622',
  'Faith likes to explore different types of light in the world'
);

add(
  'Bryan', 'Hu',
  leverett,
  '2020',
  'Engineering Sciences',
  'M',
  'https://scontent.fzty2-1.fna.fbcdn.net/v/t1.0-9/12311216_10102516766671211_2712199964004302288_n.jpg?oh=07fa026476b894a406f2c584d2dcca77&oe=598E74D8',
  'Bryan likes to play drum'
);

add(
  'George', 'Goodwin',
  leverett,
  '2018',
  'Anthropology',
  'M',
  'https://scontent.fzty2-1.fna.fbcdn.net/v/t1.0-9/1379934_10201165053702387_2007584992_n.jpg?oh=0cb0b5f6d4683692ca905454333c5f29&oe=59832A4D',
  'George digs around at the yard to find about the past'
);

add(
  'Manny', 'Romero',
  leverett,
  '2019',
  'Neurobiology',
  'M',
  'https://scontent.fzty2-1.fna.fbcdn.net/v/t1.0-9/18704_1153415458017233_2695121698464711189_n.jpg?oh=03c67a525649f63039aaf04cda8f367f&oe=598D820E',
  'Manny likes to know about your brain structure'
);

add(
  'Kunho', 'Kim',
  leverett,
  '2017',
  'Folklore and mythology',
  'M',
  'https://scontent.fzty2-1.fna.fbcdn.net/v/t1.0-9/10268487_219869451556277_126286291676155279_n.jpg?oh=625d841cd43a2317f3c6dfe9edc16b87&oe=599AACDC',
  'Kunho eats everything!'
);

add(
  'Carlos', 'Mendizabal',
  leverett,
  '2018',
  'Computer Science',
  'M',
  'https://scontent.fzty2-1.fna.fbcdn.net/v/t1.0-9/11752573_1049889981690581_8079720275024260818_n.jpg?oh=04ca1e977005123193a53e064cd913ea&oe=595290E1',
  'Carlos likes to row'
);

add(
  'Belle', 'Lee',
  leverett,
  '2018',
  'Classics',
  'F',
  'https://scontent.fzty2-1.fna.fbcdn.net/v/t1.0-9/17342737_10209726968026008_6352002458119055700_n.jpg?oh=01d417c1c692e51561517e3e9896bc71&oe=59881679',
  'Belle loves to go see musicals'
);

add(
  'Eliza', 'Mantz',
  leverett,
  '2018',
  'Theater, Dance & Media',
  'F',
  'https://scontent.fzty2-1.fna.fbcdn.net/v/t31.0-8/s960x960/16904908_790843301064927_8299785261010914717_o.jpg?oh=3bc5d1e6d45fa0257e22d860afa72f80&oe=599ACCF0',
  'Eliza wants to work with Comedians!'
);

add(
  'Sarah', 'Chapin',
  leverett,
  '2017',
  'Enginering Sciences',
  'F',
  'https://scontent.fzty2-1.fna.fbcdn.net/v/t1.0-9/1045133_10201532121248870_810462164_n.jpg?oh=ff7ee5ae031e7166dd8274acf2c74705&oe=59800FF1',
  'Sarah likes to make robots during the weekends'
);

add(
  'Katherine', 'Blanton',
  leverett,
  '2019',
  'History and Science',
  'F',
  'https://scontent.fzty2-1.fna.fbcdn.net/v/t1.0-9/11887891_1200767923274092_5875909735324110139_n.jpg?oh=d5a22f3766d476f71860ef6cfcc4172c&oe=59985FC5',
  'Katherine wants to work in Africa to help eradicating AIDS'
);

add(
  'Lara', 'Tang',
  leverett,
  '2018',
  'Human Evolutionary Biology',
  'F',
  'https://scontent.fzty2-1.fna.fbcdn.net/v/t1.0-9/15672742_1167518409964319_3566380102929572702_n.jpg?oh=a414296dfcdaf8ceae7bf1f1a29a6a6b&oe=5989EA49',
  'Lara is obssessed with recycling'
);

add(
  'Annie', 'Schugart',
  quincy,
  '2018',
  'Computer Science',
  'F',
  'https://scontent.fzty2-1.fna.fbcdn.net/v/t1.0-9/15672742_1167518409964319_3566380102929572702_n.jpg?oh=a414296dfcdaf8ceae7bf1f1a29a6a6b&oe=5989EA49',
  'Annie is from Kansas. \n\n she/her/hers'
);

add(
  'Jerry', 'Nelluvelil',
  quincy,
  '2018',
  'Linguistics, Neurobiology',
  'M',
  'https://scontent.fzty2-1.fna.fbcdn.net/v/t1.0-9/15672742_1167518409964319_3566380102929572702_n.jpg?oh=a414296dfcdaf8ceae7bf1f1a29a6a6b&oe=5989EA49',
  'Jerry enjoys creating PowerPoint presentations. \n\n he/him/his'
);

add(
  'Brittany', 'Wang',
  quincy,
  '2017',
  'Human Developmental and Regenerative Biology',
  'F',
  'https://scontent.fzty2-1.fna.fbcdn.net/v/t1.0-9/15672742_1167518409964319_3566380102929572702_n.jpg?oh=a414296dfcdaf8ceae7bf1f1a29a6a6b&oe=5989EA49',
  'Brittany is obsessed with Quincy. \n\n she/her/hers'
);

add(
  'Tayjus', 'Surampudi',
  quincy,
  '2018',
  'Government',
  'M',
  'https://scontent.fzty2-1.fna.fbcdn.net/v/t1.0-9/15672742_1167518409964319_3566380102929572702_n.jpg?oh=a414296dfcdaf8ceae7bf1f1a29a6a6b&oe=5989EA49',
  'Tayjus loves spending time with friends in Quincy Courtyard. \n\n he/him/his'
);

add(
  'Olivia', 'Goldberg',
  quincy,
  '2017',
  'Government',
  'F',
  'https://scontent.fzty2-1.fna.fbcdn.net/v/t1.0-9/15672742_1167518409964319_3566380102929572702_n.jpg?oh=a414296dfcdaf8ceae7bf1f1a29a6a6b&oe=5989EA49',
  'Olivia enjoys studying political philosophy. \n\n she/her/hers'
);

add(
  'Ibrahim', 'Syed',
  quincy,
  '2019',
  'Applied Mathematics',
  'M',
  'https://scontent.fzty2-1.fna.fbcdn.net/v/t1.0-9/15672742_1167518409964319_3566380102929572702_n.jpg?oh=a414296dfcdaf8ceae7bf1f1a29a6a6b&oe=5989EA49',
  'Ibby enjoys working out in his free time. \n\n he/him/his'
);

add(
  'PJ', 'Kelley',
  quincy,
  '2018',
  'Human Developmental and Regenerative Biology',
  'F',
  'https://scontent.fzty2-1.fna.fbcdn.net/v/t1.0-9/15672742_1167518409964319_3566380102929572702_n.jpg?oh=a414296dfcdaf8ceae7bf1f1a29a6a6b&oe=5989EA49',
  'PJ works in the Quincy Building Manager office. \n\n she/her/hers'
);

add(
  'Simon', 'Sun',
  quincy,
  '2019',
  'Computer Science',
  'M',
  'https://scontent.fzty2-1.fna.fbcdn.net/v/t1.0-9/15672742_1167518409964319_3566380102929572702_n.jpg?oh=a414296dfcdaf8ceae7bf1f1a29a6a6b&oe=5989EA49',
  'Simon is interested in videomaking and hopes to pursue a secondary in VES. \n\n he/him/his'
);

add(
  'Karen', 'Maldonado',
  quincy,
  '2018',
  'Sociology',
  'F',
  'https://scontent.fzty2-1.fna.fbcdn.net/v/t1.0-9/15672742_1167518409964319_3566380102929572702_n.jpg?oh=a414296dfcdaf8ceae7bf1f1a29a6a6b&oe=5989EA49',
  'Karen loves to travel. \n\n she/her/hers'
);

add(
  'Curtis', 'Stone',
  quincy,
  '2017',
  'Economics',
  'F',
  'https://scontent.fzty2-1.fna.fbcdn.net/v/t1.0-9/15672742_1167518409964319_3566380102929572702_n.jpg?oh=a414296dfcdaf8ceae7bf1f1a29a6a6b&oe=5989EA49',
  'Curtis loves theater, improv, and playwriting. \n\n he/him/his'
);



export default students;
