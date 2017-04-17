import _ from 'lodash';

import {roles} from './constants';
// eslint-disable-next-line no-unused-vars
import {pfoho, quincy, leverett} from './houses';
import {getCurrentUser} from './users';
import StorageEngine from '../lib/StorageEngine';

let storage = new StorageEngine('students');

let students = [];
let idCount = 1;  // to mark each student with a unique ID

const add = (firstName, lastName, house, year, concentration, sex, imageURL, bio) => {
  students.push({
    id: idCount++,
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
  'Neel', 'Mehta',
  pfoho,
  '2018',
  'Computer Science',
  'M',
  'https://scontent.fbed1-2.fna.fbcdn.net/v/t31.0-8/12038633_879989328763997_8134931835787599940_o.jpg?oh=91842df5fec4e9e4dd069c3864ea2868&oe=59883C5F',
  'Neel is interested in civic tech. \n\n he/him/his'
);

add(
  'Darius', 'Johnson',
  pfoho,
  '2018',
  'Philosophy',
  'M',
  'https://scontent.fzty2-1.fna.fbcdn.net/v/t1.0-9/16174408_1552379018107437_4877929532012906690_n.jpg?oh=31c1e83d768f65c3c7c5ff5738bc02fe&oe=597EBF4C',
  'Darius enjoys directing theater productions on campus. \n\n they/them/theirs.'
);

add(
  'Leib', 'Celnik',
  pfoho,
  '2018',
  'History of Science, History of Art and Architecture',
  'M',
  'https://scontent.fzty2-1.fna.fbcdn.net/v/t1.0-9/13495198_736078113201444_4008575415469445355_n.jpg?oh=fa470efb6de44e892340ac151d007810&oe=597C4ED1',
  'Leib speaks fluent German. \n\n he/him/his'
);

add(
  'Lucas', 'Conti',
  pfoho,
  '2018',
  'Neurobiology',
  'M',
  'https://scontent.fzty2-1.fna.fbcdn.net/v/t1.0-9/14729155_10210023166832227_1202858060069522989_n.jpg?oh=88c18ebaba87fe677bd3ff627e6fe5c8&oe=5996FD02',
  'Lucas hopes to attend medical school one day. \n\n he/him/his'
);

add(
  'Ben', 'Iuliano',
  pfoho,
  '2018',
  'Comparative Study of Religion',
  'M',
  'https://scontent.fzty2-1.fna.fbcdn.net/v/t31.0-8/11864852_852553568191607_1708957320042489669_o.jpg?oh=f011f7bdb98952156eece07d36e320e4&oe=598ECAE2',
  'Ben enjoys working on the production side of theater shows. \n\n he/him/his'
);

add(
  'McKayla', 'Gourneau',
  pfoho,
  '2017',
  'Molecular and Cellular Biology',
  'F',
  'https://scontent.fzty2-1.fna.fbcdn.net/v/t1.0-9/17630151_1606287126065529_3621963812561932182_n.jpg?oh=59bddb180f91138df6ea148c77e97c1f&oe=595271F6',
  'McKayla ejoys being a part of the extracurricular group Native Americans at Harvard College.'
);

add(
  'Christina', 'Tenuta',
  pfoho,
  '2017',
  'Computer Science',
  'F',
  'https://scontent.fzty2-1.fna.fbcdn.net/v/t1.0-9/15109550_1372517946093371_7408238712204909757_n.jpg?oh=4d4106caf4c05ccc37ec070d1c94d3f9&oe=5986D8D0',
  'Christina is excited to work for Teach for America after graduation.'
);

add(
  'Kayi', 'Okine',
  pfoho,
  '2017',
  'Computer Science',
  'F',
  'https://scontent.fzty2-1.fna.fbcdn.net/v/t31.0-8/13558879_10153935694593124_8674988323305683795_o.jpg?oh=0da12df8e1ac4177cf60100c3434fcc4&oe=594CD92A',
  'Kayi hopes to work as a software engineer one day.'
);

add(
  'Megan', 'Ross',
  pfoho,
  '2018',
  'Computer Science',
  'F',
  'https://scontent.fzty2-1.fna.fbcdn.net/v/t31.0-8/15016355_1029127347214625_1999027232931750215_o.jpg?oh=636b5883376b6446f1c3125b74293199&oe=59500ACA',
  'Megan is originally from Ireland.'
);

add(
  'Hunter', 'Richards',
  pfoho,
  '2018',
  'Environmental Engineering',
  'F',
  'https://scontent.fzty2-1.fna.fbcdn.net/v/t31.0-8/16707438_10208720762442084_5189341941557934144_o.jpg?oh=cf38901012881290fa806657ef90d085&oe=5952F0C7',
  'Hunter enjoys spending time in the Spfa.'
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
  'Camille', 'NDiaye-Muller',
  leverett,
  '2018',
  'Social Studies',
  'F',
  'https://scontent.fzty2-1.fna.fbcdn.net/v/t31.0-8/16402604_1352687891419113_1354289481128810327_o.jpg?oh=73d3efde16a9b25957488e92cbe25364&oe=5986D988',
  'Camille hopes to attend law school. \n\n she/her/hers'
);

add(
  'Sara', 'Atske',
  leverett,
  '2017',
  'Sociology',
  'F',
  'https://scontent.fzty2-1.fna.fbcdn.net/v/t1.0-9/10398883_10203877507057025_780555731914747099_n.jpg?oh=8690d81316648ef560343092d3d7004a&oe=5998B755',
  'Sara enjoys writing for The Crimson in her free time. \n\n she/her/hers'
);

add(
  'Katherine', 'Borrazzo',
  leverett,
  '2018',
  'Psychology',
  'F',
  'https://scontent.fzty2-1.fna.fbcdn.net/v/t31.0-8/14115473_1416923934991299_1992429553703294450_o.jpg?oh=dac9e6b382cd40a79f945daa51579a5a&oe=599B3966',
  'Katherine "Katie" enjoys photography. \n\n she/her/hers'
);

add(
  'Savannah', 'Bradley',
  leverett,
  '2017',
  'Environmental Science and Public Policy',
  'F',
  'https://scontent.fzty2-1.fna.fbcdn.net/v/t1.0-9/12227563_1074342815910181_3793988563039008113_n.jpg?oh=423b35a9416c28af525164aba3c2548f&oe=597C1235',
  'Savannah plays softball for The Crimson. \n\n she/her/hers'
);

add(
  'Siyani', 'Chambers',
  leverett,
  '2017',
  'Sociology',
  'M',
  'https://scontent.fzty2-1.fna.fbcdn.net/v/t1.0-9/10330417_10202619992838808_5173500503865388347_n.jpg?oh=5a11db91cc9dd4e85c703890490a70da&oe=598F4B7C',
  'Siyani is captain of the basketball team. \n\n he/him/his'
);

add(
  'Timmy', 'Freese',
  leverett,
  '2018',
  'Mathematics',
  'M',
  'https://scontent.fzty2-1.fna.fbcdn.net/v/t31.0-8/17349889_1325767400849917_1156449631056657445_o.jpg?oh=e86bf2959d2f7b412730e7ef96218de6&oe=59855571',
  'Timmy very much enjoys mathematical theory. \n\n he/him/his'
);

add(
  'Kamran', 'Jamil',
  leverett,
  '2018',
  'Social Studies',
  'M',
  'https://scontent.fzty2-1.fna.fbcdn.net/v/t31.0-8/1618294_1537775509780259_2082121183_o.jpg?oh=738eb678e8e9b43ccee21f16e26980e2&oe=59950EEE',
  'Kamran has a budding interest in journalism. \n\n he/him/his'
);

add(
  'Joe', 'Kahn',
  leverett,
  '2018',
  'Computer Science',
  'M',
  'https://scontent.fzty2-1.fna.fbcdn.net/v/t1.0-9/12037953_10153355957827705_4691285278107759394_n.jpg?oh=d3567f140558bb68f94794ba2fb93fef&oe=597DA915',
  'Joe is originally from South Africa. \n\n he/him/his'
);

add(
  'Gabe', 'Martinez',
  leverett,
  '2018',
  'Computer Science',
  'M',
  'https://scontent.fzty2-1.fna.fbcdn.net/v/t31.0-8/16422960_1390282251017242_8685202736241506830_o.jpg?oh=d8c1df1d34a264714ca3be8964eaf903&oe=597FD4D9',
  'Gabe directs the Harvard-Radcliffe Modern Dance Company. \n\n he/him/his'
);

add(
  'Cassandra', 'Hastie',
  leverett,
  '2018',
  'Government',
  'F',
  'https://scontent.fzty2-1.fna.fbcdn.net/v/t31.0-8/17240235_10206233354671727_542613872726948648_o.jpg?oh=7d76cfdfaa6fc97d3e33a465bc9b24c5&oe=597C1816',
  'Cass serves as a peer counselor within Echo. \n\n she/her/hers'
);

add(
  'Annie', 'Schugart',
  quincy,
  '2018',
  'Computer Science',
  'F',
  'https://scontent-iad3-1.xx.fbcdn.net/v/t31.0-8/14525085_1216566931742134_7204994523829239446_o.jpg?oh=ae0e72e9b48b0581f1b42ec8ea376138&oe=59531292',
  'Annie is from Kansas. \n\n she/her/hers'
);

add(
  'Jerry', 'Nelluvelil',
  quincy,
  '2018',
  'Linguistics, Neurobiology',
  'M',
  'https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/12243457_10153830647078619_8206633542063117536_n.jpg?oh=52395f3a12f08c9a31f031f8e3681610&oe=598D75AE',
  'Jerry enjoys creating PowerPoint presentations. \n\n he/him/his'
);

add(
  'Brittany', 'Wang',
  quincy,
  '2017',
  'Human Developmental and Regenerative Biology',
  'F',
  'http://facebook.college.harvard.edu//photos/75fd665b944f855a2f3fc51bbae5ba54-559762-250.jpg',
  'Brittany is obsessed with Quincy. \n\n she/her/hers'
);

add(
  'Tayjus', 'Surampudi',
  quincy,
  '2018',
  'Government',
  'M',
  'https://scontent-iad3-1.xx.fbcdn.net/v/t31.0-8/12052650_1101728653178237_8720421064758456128_o.jpg?oh=d4763b97f0e8302867c808226247b180&oe=5993B131',
  'Tayjus loves spending time with friends in Quincy Courtyard. \n\n he/him/his'
);

add(
  'Olivia', 'Goldberg',
  quincy,
  '2017',
  'Government',
  'F',
  'https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/11700854_10205829043539832_3032028927572804033_n.jpg?oh=c77e8509fa88c856f09af18966aaa0f1&oe=599AA113',
  'Olivia enjoys studying political philosophy. \n\n she/her/hers'
);

add(
  'Ibrahim', 'Syed',
  quincy,
  '2019',
  'Applied Mathematics',
  'M',
  'https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/12400429_768379683294648_5930768022171584899_n.jpg?oh=626a2b09a97cc412cda8c4fdfad59ba2&oe=59930745',
  'Ibby enjoys working out in his free time. \n\n he/him/his'
);

add(
  'PJ', 'Kelley',
  quincy,
  '2018',
  'Human Developmental and Regenerative Biology',
  'F',
  'http://facebook.college.harvard.edu//photos/5d45e356ab9ae2d3d08410389c978b46-657759-250.jpg',
  'PJ works in the Quincy Building Manager office. \n\n she/her/hers'
);

add(
  'Simon', 'Sun',
  quincy,
  '2019',
  'Computer Science',
  'M',
  'https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/14725482_1339369299420071_572206681919424743_n.jpg?oh=0fb2337328e4310f41b0742f46d8bff0&oe=5950AE30',
  'Simon is interested in videomaking and hopes to pursue a secondary in VES. \n\n he/him/his'
);

add(
  'Karen', 'Maldonado',
  quincy,
  '2018',
  'Sociology',
  'F',
  'https://scontent-iad3-1.xx.fbcdn.net/v/t31.0-8/14481740_1208143652591024_8405930919252554472_o.jpg?oh=f6b210424a609be8e9168f5ebdbc28e0&oe=59538938',
  'Karen loves to travel. \n\n she/her/hers'
);

add(
  'Curtis', 'Stone',
  quincy,
  '2017',
  'Economics',
  'F',
  'http://facebook.college.harvard.edu//photos/fed02216ef17d8cd33a38e39bc5f9a30-561412-250.jpg',
  'Curtis loves theater, improv, and playwriting. \n\n he/him/his'
);

// TODO: Don't even export these. Force access through a function that checks
//   user permissions.
export default students;


/*
 Gets an array of students that the user has permission to see.
 For now this simply filters by house.
 */
export const getPermittedStudents = () => {
  const user = getCurrentUser();
  if (!user) {
    // User not logged in should not see any students.
    return [];
  }
  return _.filter(students, {
    house: user.house,
  });
};

const STUDENT_DATA = 'student_data';

/**
 * Uses the student ID as a lookup for an object of students.
 * {
 *   42: {
 *     is_flagged: true,
 *     check_ins: [{text: 'She is changing concentration to CS'}],
 *   }
 * }
 */
// Private method.
const _getData = () => {
  return storage.get(STUDENT_DATA) || {};
};

export const getStudentData = (student) => {
  let data = _getData();
  return data[student.id] || {};
};

// Private method. Use `patchStudentData` for updates instead.
const _setStudentData = (student, newData) => {
  let data = _getData();
  data[student.id] = newData;
  storage.set(STUDENT_DATA, data);
};

export const patchStudentData = (student, patchObject) => {
  let studentData = getStudentData(student);
  studentData = Object.assign({}, studentData, patchObject);
  _setStudentData(student, studentData);
};

const IS_FLAGGED_KEY = 'is_flagged';

export const setFlag = (student, isFlagged) => {
  let patch = {};
  patch[IS_FLAGGED_KEY] = isFlagged;
  return patchStudentData(student, patch);
};

// Returns true if student is flagged, false otherwise.
// Defaults to false.
export const getFlag = (student) => {
  return !!getStudentData(student)[IS_FLAGGED_KEY];
};
